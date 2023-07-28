import express from 'express';
const router = express.Router();

// live offers
import LiveOffersController from '../controllers/api/liveOffersController.js';
const liveOffersController = new LiveOffersController();

// comments
import CommentsController from '../controllers/api/commentsController.js';
const commentsController = new CommentsController();

router.get('/', (req, res) => { return res.status(404).json({message: 'not found'}); });
router.get('/:video_id', liveOffersController.getProductListByVideoId); // Use a route query for video id

router.get('/comments/:video_id', commentsController.getComments); // Use a route query for video id
router.post('/comments/submit', commentsController.submitComment); // Submit
export default router;
