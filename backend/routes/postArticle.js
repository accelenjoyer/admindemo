import express from "express";
import Article from "../models/Article.js";
const router = express.Router();

router.get('/adminmenu', async (req, res) => {
    try {
        console.log("req.body:", req.body);
        const articles = await Article.find();
        res.status(200).json(articles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка при получении новостей' });
    }
});
router.post('/adminmenu', async (req, res) => {
    try {
        const { title,content,images,author,categories } = req.body;


        const newArticle = new Article({ title : title,content : content,images : images,author : author,categories : categories });
        await newArticle.save();

        res.status(201).json({ message: 'Новость зарегистрирована' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ошибка при регистрации новости' });
    }
});

export default router;