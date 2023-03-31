import ProductController from "./ProductController.js";
import express from 'express';
var router = express.Router();

router.get('/', ProductController.index)
router.get('/:id', ProductController.show)

export default router;