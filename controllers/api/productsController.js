
// Import the Product model
import Product from '../../models/product.js';

export default function ProductsController(req, res, next) {
    // Define the function to get the list of Products
    this.getProducts = async (req, res) => {
        try {
            // Find all Products from the database
            const Products = await Product.find().select('url_product url_image_product title price');
            // Send the Products as a response
            res.json({products : Products});
        } catch (err) {
            // Handle any errors
            res.status(500).json({ error : err.message });
        }
    };
};