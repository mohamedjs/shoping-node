import { PrismaClient } from "@prisma/client";
import UploadImage from "../../services/UploadImage.js";
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
     * It creates a user in the database
     * @param req - The request object
     * @returns The user object.
     */
    static async createUser(req) {
        const { name, email, password } = req.body
        var image = await UploadImage.upload(req, "images")
        try {
            let user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password,
                    image
                }
            })
            return user;
        } catch (error) {
            console.error('An error occurred:', error);
            return {};
        }
    }
}