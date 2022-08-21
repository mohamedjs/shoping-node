import { PrismaClient } from "@prisma/client";
var prisma = new PrismaClient()

export default class PostRepository {
    /**
     * It returns all posts from the database.
     * @returns An array of posts
     */
    static async getAllPosts() {
        let posts = await prisma.post.findMany()
        return posts;
    }
}