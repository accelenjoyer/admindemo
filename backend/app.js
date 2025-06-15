import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import articleRoutes from "./routes/postArticle.js"
import articlesFilterRoutes from "./routes/articlesFilter.js";
import deleteArticleRoutes from "./routes/deleteArticle.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use("/api", articleRoutes)
app.use("/api", articlesFilterRoutes);
app.use("/api",deleteArticleRoutes);
(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB connected');

        app.listen(port, () => {
            console.log(`Server is running on port: ${port}`);
        });

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
})();