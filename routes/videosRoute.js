import express from 'express';
const router = express.Router();

// videos
import VideosController from '../controllers/api/videosController.js';
const videosController = new VideosController();

router.get('/', videosController.getVideos);

export default router;
