import  { body, validationResult } from 'express-validator'

/**
 * It returns an array of validation rules that can be used to validate a user object.
 * @returns An array of functions.
 */
export const userValidationRules = () => {
  return [
    // name must be not empty
    body('name').notEmpty(),
    // username must be an email
    body('email').isEmail(),
    // password must be at least 5 chars long
    body('password').isLength({ min: 5 }),
  ]
}

/**
 * It takes the errors from the validationResult function and if there are no errors, it calls the next
 * function. If there are errors, it creates an array of objects with the error messages and returns a
 * 422 status code with the errors
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function in the stack.
 * @returns {
 *     errors: [
 *       {
 *         "email": "Invalid email"
 *       },
 *       {
 *         "password": "Password must be at least 6 characters"
 *       }
 *     ]
 *   }
 */
export const validateUser = (req, res, next) => {
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