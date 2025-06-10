import ProductController from "./ProductController.js";
import express from 'express';
import { ProductRequest } from "./ProductRequest.js";
import { upload } from "../../services/MulterService.js";
var router = express.Router();

router.get('/', ProductController.index)
router.get('/:id', ProductController.show)
router.post('/', upload.single('image'), upload.array('files', 15), ProductRequest.productValidationRules(), ProductRequest.validate, ProductController.store)
export default router;