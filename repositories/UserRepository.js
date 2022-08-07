import { PrismaClient } from "@prisma/client";
var prisma = new PrismaClient()

export default class UserRepository {
    /**
     * This function returns all users from the database.
     * @returns An array of users
     */
    static async getAllUsers() {
        let users = await prisma.user.findMany()
        return users;
    }
    /**
     * It creates a user in the database.
     * @param req - The request object
     * @returns The user object.
     */
    static async createUser(req) {
        const { name, email, password } = req.body
        let user = await prisma.user.create({
            data: {
                name,
                email,
                password
            }
        })
        return user;
    }
}