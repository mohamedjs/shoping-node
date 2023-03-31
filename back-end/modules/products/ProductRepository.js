import { PrismaClient } from "@prisma/client";
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
        const { id } = req.params
        const product = await prisma.product.findUnique({
            where: { id },
            include: {
                category:true,
                images: true
            }
        })
        return product
    }
}