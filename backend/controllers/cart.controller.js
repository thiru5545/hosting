import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getCartProducts = async (req, res) => {
    try {
        // Fetch all products present in the user's cart
		// console.log(req.user.cartItems.map((item) => item.product));
        const products = await Product.find({
            _id: { $in: req.user.cartItems.map((item) => item.product) },
        });
		// console.log(products);
		
        // Add size, color, customization, and quantity for each product
        const cartItems = req.user.cartItems.map((cartItem) => {
			const product = products.find((prod) => prod._id.toString() === cartItem.product.toString());
			// console.log("ps",products[1]._id.toString()===cartItem.product.toString());
            if (product) {
				return {
					...product.toJSON(),
                    quantity: cartItem.quantity,
                    size: cartItem.size,
                    color: cartItem.color,
                    customization: cartItem.customization,
					_id: cartItem._id,
					product: cartItem.product,
                };
            }
            return null;
        }).filter((item) => item !== null);
		
		// console.log(cartItems);
        res.json(cartItems);
    } catch (error) {
        console.error("Error in getCartProducts controller:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const addToCart = async (req, res) => {
    try {
        const { product, size, color, customization } = req.body;
		console.log(req.body);
        const user = req.user;

        // Find if an item with the same variations exists
        user.cartItems.map((item)=>console.log(item.product.toString()===product));
        const existingItem = user.cartItems.find(
            (item) =>
                item.product.toString() === product &&
                item.size === size &&
                item.color === color &&
                item.customization === customization
        );

        if (existingItem) {
            // Increment quantity if the item already exists
            existingItem.quantity += 1;
        } else {
            // Add new item to the cart
            user.cartItems.push({
				_id: new mongoose.Types.ObjectId(),
                product,
                size,
                color,
                customization,
                quantity: 1,
            });
        }

        // Save the updated cart to the database
        await user.save();

        // Respond with the updated cart
        res.json({ cartItems: user.cartItems });
    } catch (error) {
        console.error("Error in addToCart controller:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const removeAllFromCart = async (req, res) => {
    try {
        const { product } = req.body;
        const user = req.user;
        // console.log(product);

        if (!product) {
            // If no productId is provided, clear the entire cart
            console.log(user.cartItems);
            user.cartItems = [];
        } else {
            // Remove items with matching details from the cart
            user.cartItems = user.cartItems.filter(
                (item) =>
                    item.product !== product 
                    // || item.size !== size ||
                    // item.color !== color ||
                    // item.customization !== customization
            );
        }

        // Save the updated cart
        await user.save();

        res.json(user.cartItems);
    } catch (error) {
        console.error("Error in removeAllFromCart controller:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const updateQuantity = async (req, res) => {
    try {
        const { id: product } = req.params;
		console.log("para",product);
        const { quantity } = req.body;
        const user = req.user;

        // Find the item with matching details
		user.cartItems.map((item)=>console.log("ci",item._id.toString()));
        const existingItem = user.cartItems.find(
            (item) =>
                item._id.toString() === product 
				// && item.size === size &&
                // item.color === color &&
                // item.customization === customization
        );
		console.log(existingItem);
        if (existingItem) {
            if (quantity === 0) {
                // Remove the item if quantity is set to 0
                user.cartItems = user.cartItems.filter(
                    (item) =>
                        item._id.toString() !== product 
						// || item.size !== size ||
                        // item.color !== color ||
                        // item.customization !== customization
                );
            } else {
                // Update the quantity
                existingItem.quantity = quantity;
            }

            // Save the updated cart
            await user.save();
            res.json(user.cartItems);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.error("Error in updateQuantity controller:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
