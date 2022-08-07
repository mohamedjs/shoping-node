import express from 'express';
var router = express.Router();

import UserController from '../controllers/UserController.js';
import {userValidationRules, validateUser} from '../requests/UserRequest.js';
import { upload } from "../services/MulterService.js"

/* GET users listing. */
router.get('/', UserController.index);
router.post('/', userValidationRules(), validateUser, upload.single('image'), UserController.store);

export default router;
