import express from 'express';
let router = express.Router()

import postRouter from './routes/post.mjs'
router.use(postRouter)

export default router