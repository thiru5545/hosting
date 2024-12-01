import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";
import { useCategoryStore } from "../stores/useCategoryStore";

const CreateProductForm = () => {
	const { categories, fetchAllCategory, loading: categoriesLoading } = useCategoryStore();

	useEffect(() => {
		if (!categories.length) {
			fetchAllCategory();
		}
	}, [categories, fetchAllCategory]);

	const [newProduct, setNewProduct] = useState({
		name: "",
		description: "",
		price: "",
		category: "",
		image: "",
		images: [], // For additional images
	});

	const { createProduct, loading: productLoading } = useProductStore();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await createProduct(newProduct);
			setNewProduct({ name: "", description: "", price: "", category: "", image: "", images: [] });
		} catch (error) {
			console.error("Error creating a product:", error);
		}
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setNewProduct({ ...newProduct, image: reader.result });
			};
			reader.readAsDataURL(file); // Convert to base64
		}
	};

	const handleExtraImageChange = (e, index) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				const updatedImages = [...newProduct.images];
				updatedImages[index] = reader.result; // Update the specific image
				setNewProduct({ ...newProduct, images: updatedImages });
			};
			reader.readAsDataURL(file); // Convert to base64
		}
	};

	const addNewImageField = () => {
		setNewProduct({ ...newProduct, images: [...newProduct.images, ""] }); // Add an empty placeholder for a new image
	};

	return (
		<motion.div
			className="bg-gray-800 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
		>
			<h2 className="text-2xl font-semibold mb-6 text-emerald-300">Create New Product</h2>

			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label htmlFor="name" className="block text-sm font-medium text-gray-300">
						Product Name
					</label>
					<input
						type="text"
						id="name"
						name="name"
						value={newProduct.name}
						onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
						className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
						required
					/>
				</div>

				{/* Other fields remain the same */}

				<div>
					<label htmlFor="image" className="block text-sm font-medium text-gray-300">
						Main Image
					</label>
					<input type="file" id="image" className="mt-1" accept="image/*" onChange={handleImageChange} />
					{newProduct.image && <span className="mt-1 text-sm text-gray-400">Image uploaded</span>}
				</div>

				{/* Additional Images */}
				<div>
					<label className="block text-sm font-medium text-gray-300">Extra Images</label>
					{newProduct.images.map((image, index) => (
						<div key={index} className="flex items-center mt-2 space-x-4">
							<input
								type="file"
								accept="image/*"
								onChange={(e) => handleExtraImageChange(e, index)}
								className="bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white"
							/>
							{image && <span className="text-sm text-gray-400">Image uploaded</span>}
						</div>
					))}
					{/* Add New Image Field */}
					<button
						type="button"
						onClick={addNewImageField}
						className="mt-2 text-sm text-emerald-300 hover:text-emerald-500"
					>
						+ Add another image
					</button>
				</div>

				<button
					type="submit"
					className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
					disabled={productLoading}
				>
					{productLoading ? (
						<>
							<Loader className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
							Loading...
						</>
					) : (
						<>
							<PlusCircle className="mr-2 h-5 w-5" />
							Create Product
						</>
					)}
				</button>
			</form>
		</motion.div>
	);
};

export default CreateProductForm;
