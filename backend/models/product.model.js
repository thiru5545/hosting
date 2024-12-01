import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			min: 0,
			required: true,
		},
		image: 
		// [
			{
			type: String,
			required: [true, "Image is required"],
			},
		// ],
		images:[
			{
				type: String
			},
		],
		category: {
			type: String,
			required: true,
		},
		isFeatured: {
			type: Boolean,
			default: false,
		},
		rating: {
			type: Number,
			enum: [0,1,2,3,4,5],
			default: 0,
		},
		review: [
			{
				type: String,
			},
		],
	},
	{ timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
