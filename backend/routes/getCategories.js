import Category from "../models/Category.js";
import express from "express";
const router = express.Router();
router.get('/getcategories', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router