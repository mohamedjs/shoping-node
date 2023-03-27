import { PrismaClient } from "@prisma/client";
var prisma = new PrismaClient()

export default class ProductRepository {
    /**
     * It returns all products from the database.
     * @returns An array of products
     */
    static async getAllProducts() {
        try {     
            let products = await prisma.product.findMany()
            return products;
        } catch (error) {
            return []
        }
    }
}