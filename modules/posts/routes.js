import PostController from "./PostController.js";
import express from 'express';
var router = express.Router();

router.get('/', PostController.index)

export default router;