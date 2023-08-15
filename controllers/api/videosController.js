
// Import the Video model
import Video from '../../models/video.js';

export default function VideosController(req, res, next) {
    // Define the function to get the list of videos
    this.getVideos = async (req, res) => {
        try {
            // Find all videos from the database
            const videos = await Video.find().select('_id url_image_thumbnail url_video');
            // Send the videos as a response
            res.json({videos : videos});
        } catch (err) {
            // Handle any errors
            res.status(500).json({ error : err.message });
        }
    };
    // Define the function to get a video by video id
    this.getVideo = async (req, res) => {
        // Get the video_id from the request parameters
        const video_id = req.params.video_id;
        
        // Use the findById method of the Video model to find the video document by _id
        try {
            // Await for the promise to be fulfilled
            const result = await Video.findById(video_id);
        
            // Check if the video document is found
            if (result) {
                // Send the video data as a JSON response with status code 200 (OK)
                res.status(200).json({video: result});
            } else {
                // Send an error message as a JSON response with status code 404 (Not Found)
                res.status(404).json({ message: 'Video not found' });
            }
        } catch (error) {
            // Catch any error that occurs and send an error message as a JSON response with status code 500 (Internal Server Error)
            res.status(404).json({ message: 'Video not found' });
        }
    };

    // Create a function to search for videos by name
    this.searchVideoByName = async (req, res) => {
        try {
            // Get the name parameter from the query string
            const name = req.query.name;
        
            // Call the find() method of the video model with the $text and $search operators
            const result = await Video. find({ $text: { $search: name } }).select('title');
        
            // Sends a response with status 200 and video data found
            res. status(200).json({ videos: result });
        } catch(error) {
            // Catches the error and sends a response with status 500 and error message
            res. status(500).json({ message: error. message });
        }
    };
};