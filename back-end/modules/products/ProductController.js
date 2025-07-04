import ProductRepository from "./ProductRepository.js"
import productEventService from "../../events/ProductEventService.js"

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

    static async store(req, res, next) {
        try {
            const product = await ProductRepository.createProduct(req);
            // Emit the event using our service
            productEventService.emit('product:created', product);
            
            return res.status(201).json({
                message: 'Product created successfully',
                product
            });
        } catch (error) {
            next(error);
        }
    }
}