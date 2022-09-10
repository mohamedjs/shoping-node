import PostRepository from "./PostRepository.js"

export default class PostController {
    /**
     * It gets all the posts from the database and returns them as a JSON object.
     * @param req - the request object
     * @param res - the response object
     * @param next - The next middleware function in the stack.
     */
    static index(req, res, next) {
        PostRepository.getAllPosts()
        .then((posts) => {
            return res.json({posts: posts})
        }).catch((err) => {
            return res.json({error: "there are no data"})
        })
    }
}