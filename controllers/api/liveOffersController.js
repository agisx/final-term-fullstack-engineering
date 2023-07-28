// Import the LiveOffer model
import LiveOffer from '../../models/liveOffer.js';
import Video from '../../models/video.js';

export default function LiveOffersController(req, res, next) {
    // Define the function to get the list of live offers
    this.getLiveOffers = async (req, res) => {
        try {
            // Find all live offers from the database
            const liveOffers = await LiveOffer.find();
            // Send the live offers as a response
            res.json(liveOffers);
        } catch (err) {
            // Handle any errors
            res.status(500).json({ error : err.message });
        }
    };

    // Define the function to get the product list from live offers by video id
    this.getProductListByVideoId = async (req, res) => {
        try {
            // Get the video id from the request query
            const videoId = req.params.video_id;
            if (!videoId) {
                // Return a 404 error if the video id is not provided
                return res.status(404).json({error : 'not found'});
            }
            // Check Video
            const video = await Video.findById(videoId).select('_id').then(doc => {return doc;}).catch(err => {});
            // Check if the data is valid
            if (!video) {
                // Return a 404 error if the video _id is not found
                return res.status(404).json({error : "Video doesn't exist"});
            }
            // Aggregate the live offers and products collections
            const productList = 
            await LiveOffer.aggregate([
                // Filter by video id
                { $match: { video_id: videoId } },
                // Convert the product field from string to ObjectId
                { $project: { "product_id": { $toObjectId: "$product_id" } } },
                // Join with products collection using product field as foreign key
                { $lookup: { from: 'products', localField: 'product_id', foreignField: '_id', as: 'product' } },
                // Unwind the product array to make it an object
                { $unwind: '$product' },
                // Project only the fields that we want to show in the output
                { $project: { _id: '$product._id', url_product: '$product.url_product', title: '$product.title', price: '$product.price' } },
            ]);
        
            // Send the product list as a response
            res.json({products : productList});
        } catch (err) {
            // Handle any errors
            res.status(500).json({ error : err.message });
        }
    };
  
};
