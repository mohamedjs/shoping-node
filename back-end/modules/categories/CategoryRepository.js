import { PrismaClient } from "@prisma/client";
var prisma = new PrismaClient()

export default class CategoryRepository {
    /**
     * It returns all categories from the database.
     * @returns An array of categories
     */
    static async getAllCategories() {
        try {     
            let categories = await prisma.category.findMany()
            return categories;
        } catch (error) {
            return []
        }
    }
}