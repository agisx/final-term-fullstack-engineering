import express from 'express';
const router = express.Router();

// videos
import VideosController from '../controllers/api/videosController.js';
const videosController = new VideosController();

router.get('/', videosController.getVideos);    // for all videos
router.get(['/search', '/search/o'], (req, res) => { return res.status(404).json({message: 'not found'}); });
router.get('/search/o/:video_id', videosController.getVideo);   // for a video
router.get('/search/m/', videosController.searchVideoByName);   // for some videos

export default router;
