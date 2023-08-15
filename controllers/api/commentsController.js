// Import the Comment model
import Comment from '../../models/comment.js';
import Video from '../../models/video.js';
import User from '../../models/user.js';

export default function CommentsController(req, res, next) {
    // Define the function to get the list of Comments
    this.getComments = async (req, res) => {
        try {
            // Get the video id from the request query
            const videoId = req.params.video_id;
            if (!videoId) {
                // Return a 404 error if the video id is not provided
                return res.status(404).json({message: 'not found'});
            }
            
            // Check Video
            const video = await Video.findById(videoId).select('_id').then(doc => {return doc;}).catch(err => {});
            // Check if the data is valid
            if (!video) {
                // Return a 404 error if the video _id is not found
                return res.status(404).json({message: "Video doesn't exist"});
            }
            // Find all Comments from the database
            const Comments = await Comment.find({'video_id':videoId}, { addresses: { $slice: [0, 1] } ,'_id': 0}).select('username comment timestamp');
            // Send the Comments as a response
            res.json({comments : Comments});
        } catch (err) {
            // Handle any errors
            res.status(500).json({ message: err.message });
        }
    };  
    // Define the function to handle POST request for comment
    this.submitComment = async (req, res) => {
        // Get the data from the request body
        const { username, comment, video_id } = req.body;
    
        // Check if the data is valid
        if (!username || !comment || !video_id) {
            // Return a 400 error if the data is missing or invalid
            return res.status(400).json({ message: 'Fail' });
        }

        // Check Username
        const user = await User.findOne({ username: username}).select('username');
        // Check if the data is valid
        if (!user) {
            // Return a 404 error if the username is not valid
            return res.status(404).json({ message: 'User not found' });
        }
    
        // Create a new comment object with the data
        const newComment = new Comment({
            username,
            comment,
            video_id,
            timestamp: new Date()
        });
    
        // Save the new comment to the database
        newComment.save();
        
        // Return a 200 response with a success message
        return res.status(200).json({ message: 'Success'});
    }
};
