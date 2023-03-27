import CategoryRepository from "./CategoryRepository.js"

export default class CategoryController {
    /**
     * It gets all the categories from the database and returns them as a JSON object.
     * @param req - the request object
     * @param res - the response object
     * @param next - The next middleware function in the stack.
     */
    static index(req, res, next) {
        CategoryRepository.getAllCategories()
        .then((categories) => {
            return res.json(categories)
        }).catch((err) => {
            return res.json({error: "there are no data"})
        })
    }
}