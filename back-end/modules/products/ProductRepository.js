import { PrismaClient } from "@prisma/client";
import  RedisCahce  from "../../utils/cache/redis.cache.js";

var prisma = new PrismaClient()

export default class ProductRepository {
    /**
     * It returns all products from the database.
     * @returns An array of products
     */
    static async getAllProducts(req) {
        const { category_id, category_name, search } = req.query

        const filter = {
            where: {},
            include: {category:true},
        }
        
        if (category_id) {
            filter.where.categoryId = category_id
        }
    
        if (category_name) {
            filter.where.category = {
                name: { equals: category_name },
            }
        }

        if(search) {
            filter.where.OR = [
                {
                    name: {
                        contains: search,
                    },
                },
                {
                    description: {
                        contains: search,
                    },
                },
                {
                    brand: {
                        contains: search,
                    },
                },
                {
                    category: {
                        name: {
                            contains: search
                        }
                    }
                }
            ]
        }
    
        const products = await prisma.product.findMany(filter)
    
        return products
    }

    static async findProduct(req) {
        const { id } = req.params;
        const cacheKey = `product:${id}`; // Use a consistent key for caching

        // 1. Try to retrieve the product from Redis cache
        let product = await RedisCahce.get(cacheKey);
        

        if (product) {
            // If found in cache, parse the JSON string and return it immediately
            return JSON.parse(product);
        }

        // 2. If not found in cache, query the database
        product = await prisma.product.findUnique({
            where: { id: parseInt(id) },
            include: {
                category: true,
                images: true
            }
        });

        // 3. If a product was found in the database, store it in Redis cache
        if (product) {
            // Store as a JSON string with an expiration time (e.g., 600 seconds = 10 minutes)
            await RedisCahce.set(cacheKey, JSON.stringify(product), 'EX', 600);
        }

        // 4. Return the product (either from DB or null if not found)
        return product;
    }

    static async createProduct(req) {
        const { name, icon, image, description, brand, rate, stock, price, categoryId } = req.body;
        const files = req.files; // This will be an array of image files from multer for the 'images' field

        // Parse numerical fields from string to their respective types
        const parsedPrice = parseFloat(price);
        const parsedRate = rate ? parseInt(rate) : null;
        const parsedStock = stock ? parseInt(stock) : null;
        const parsedCategoryId = parseInt(categoryId);

        // Prepare data for product creation, including optional fields
        const productData = {
            name,
            description,
            brand,
            price: parsedPrice,
            categoryId: parsedCategoryId,
            icon: icon || null, // Use null if icon is not provided
            image: image || null, // Use null if image is not provided
            rate: parsedRate,
            stock: parsedStock,
        };

        // Create the product in the database
        const newProduct = await prisma.product.create({
            data: productData,
        });

        // Handle multiple product images if files were uploaded
        if (files && files.length > 0) {
            // Assuming 'public/images' is the desired folder for storing product images
            const imageResizer = new Resize('public/images'); 
            const productImageRecords = [];

            for (const file of files) {
                // Save each image buffer and get the unique filename
                const filename = await imageResizer.save(file.buffer);
                productImageRecords.push({
                    image: filename,
                    productId: newProduct.id, // Link image to the newly created product
                });
            }

            // Create multiple product image records in the database in a single batch operation
            await prisma.productImage.createMany({
                data: productImageRecords,
            });
        }

        // Fetch the newly created product along with its associated images and category
        // to return a complete and up-to-date object to the caller.
        const createdProductWithRelations = await prisma.product.findUnique({
            where: { id: newProduct.id },
            include: {
                images: true,   // Include all associated ProductImage records
                category: true, // Include the associated Category details
            },
        });

        return createdProductWithRelations;
    }
}