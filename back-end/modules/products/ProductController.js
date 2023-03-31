import ProductRepository from "./ProductRepository.js"

export default class ProductController {
    /**
     * It gets all the products from the database and returns them as a JSON object.
     * @param req - the request object
     * @param res - the response object
     * @param next - The next middleware function in the stack.
     */
    static index(req, res, next) {
        ProductRepository.getAllProducts(req)
            .then((products) => {
                return res.json({products: products})
            }).catch((err) => {
                return err
            })
    }

    static show(req, res, next) {
        ProductRepository.findProduct(req)
            .then(function(product) {
                return res.json(product)
            }).catch((err) => {
                return err
            })
    }
}