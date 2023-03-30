import ProductController from "./ProductController.js";
import express from 'express';
var router = express.Router();

router.get('/', ProductController.index)

export default router;