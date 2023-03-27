import CategoryController from "./CategoryController.js";
import express from 'express';
var router = express.Router();

router.get('/', CategoryController.index)

export default router;