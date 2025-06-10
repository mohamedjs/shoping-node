import { body, validationResult } from 'express-validator'

export class ProductRequest {
    static productValidationRules = () => {
      return [
        // name must be not empty
        body('name')
          .notEmpty()
          .withMessage('Product name is required'),
    
        // price must be a positive float
        body('price')
          .notEmpty()
          .withMessage('Product price is required')
          .isFloat({ gt: 0 })
          .withMessage('Product price must be a positive number'),
    
        // categoryId must be a positive integer
        body('categoryId')
          .notEmpty()
          .withMessage('Category ID is required')
          .isInt({ gt: 0 })
          .withMessage('Category ID must be a valid integer'),
    
        // stock is optional, but if present, must be a non-negative integer
        body('stock')
          .optional()
          .isInt({ min: 0 })
          .withMessage('Stock must be a non-negative integer'),
    
        // rate is optional, but if present, must be an integer between 0 and 5
        body('rate')
          .optional()
          .isInt({ min: 0, max: 5 })
          .withMessage('Rate must be an integer between 0 and 5'),
    
        // icon, image, description, brand are optional strings and don't require specific validation
        // beyond what express-validator handles by default for optional fields.
      ]
    }
    
    static validate = (req, res, next) => {
      const errors = validationResult(req)
      if (errors.isEmpty()) {
        return next()
      }
      const extractedErrors = []
      errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
    
      return res.status(422).json({
        errors: extractedErrors,
      })
    }
}
