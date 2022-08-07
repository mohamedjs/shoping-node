import UserRepository from "../repositories/UserRepository.js";

export default class UserController {
    
    /**
     * It gets all the users from the database and returns them as a JSON object.
     * @param req - The request object. This object represents the HTTP request and has properties for
     * the request query string, parameters, body, HTTP headers, and so on.
     * @param res - The response object.
     * @param next - The next middleware function in the stack.
     */
    static index(req, res, next) {
        UserRepository.getAllUsers()
        .then(users => {
            return res.json({users: users}); 
        }).catch(err => {
            return res.json({error: "there is no data"}); 
        })
    }
    
    /**
     * It creates a user and returns a json response with the user or an error message.
     * @param req - request object
     * @param res - The response object.
     * @param next - The next middleware function in the stack.
     */
    static store(req, res, next) {
        UserRepository.createUser(req)
        .then(user => {
            return res.json({user: user}); 
        }).catch(err => {
            return res.json({error: "there is no data"}); 
        })
    }
}