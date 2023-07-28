// import
import express from "express";

// setup server
const app = express();
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true,  })) // for parsing application/x-www-form-urlencoded
import "dotenv/config.js";

// routers
import videosRouter from './routes/videosRoute.js';
import productsRouter from './routes/productsRoute.js';
import watchsRouter from './routes/watchsRoute.js';

app.all('/', (req, res) => {
    return res.status(404).json({message: 'not found'});
});
app.use('/videos', videosRouter);
app.use('/products', productsRouter);
app.use('/watch', watchsRouter);

app.listen(process.env.SERVER_PORT, () => {
    console.log(`listening on port ${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`);
});