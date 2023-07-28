
// Import the Video model
import Video from '../../models/video.js';

export default function VideosController(req, res, next) {
    // Define the function to get the list of videos
    this.getVideos = async (req, res) => {
        try {
            // Find all videos from the database
            const videos = await Video.find().select('_id url_image_thumbnail');
            // Send the videos as a response
            res.json({videos : videos});
        } catch (err) {
            // Handle any errors
            res.status(500).json({ error : err.message });
        }
    };
};