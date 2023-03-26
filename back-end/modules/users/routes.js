import express from 'express';
var router = express.Router();

import UserController from './UserController.js';
import {userValidationRules, validateUser} from './UserRequest.js';
import { upload } from "../../services/MulterService.js"

/* GET users listing. */
router.get('/', UserController.index);
router.post('/', upload.single('image'), userValidationRules(), validateUser, UserController.store);

export default router;
