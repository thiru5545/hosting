import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		
		// image: {
		// 	type: String,
		// 	required: [true, "Image is required"],
		// },
	},
	{ timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;