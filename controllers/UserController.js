import { PrismaClient } from "@prisma/client";
var prisma = new PrismaClient()

export default class UserController {
    /**
     * This function will return a JSON object containing all the users in the database.
     * @param req - The request object.
     * @param res - The response object.
     * @param next - The next middleware function in your application’s request-response cycle.
     * @returns An array of objects.
     */
    static async index(req, res, next) {
        let users = await prisma.user.findMany()
        return res.json({users: users}); 
    }
    /**
     * It creates a new user in the database with the data provided in the request body.
     * @param req - The request object.
     * @param res - The response object.
     * @param next - The next middleware function in the stack.
     * @returns The user object.
     */
    static async store(req, res, next) {
        const { name, email, password } = req.body
        let user = await prisma.user.create({
            data: {
                name,
                email,
                password
            }
        })
        return res.json({users: user}); 
    }
}