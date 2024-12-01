import { redis } from "../lib/redis.js";
import cloudinary from "../lib/cloudinary.js";
import Category from "../models/category.model.js";

export const getAllCategory = async (req, res) => {
	try {
		const categories = await Category.find({}); // find all products
		res.json({ categories });
	} catch (error) {
		console.log("Error in getAllCategories controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};


export const createCategory = async (req, res) => {
	try {
		const { name } = req.body;

		// Create a new category with only the name
		const category = await Category.create({ name });

		// Send a success response with the created category
		res.status(201).json(category);
	} catch (error) {
		console.log("Error in createCategory controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};
