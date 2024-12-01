import { useState } from "react";
import { useCategoryStore } from "../stores/useCategoryStore";
import { motion } from "framer-motion";
import { PlusCircle, Loader } from "lucide-react";

const CreateCategoryForm = () => {
	const [newCategory, setNewCategory] = useState("");
	const { createCategory, loading } = useCategoryStore();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await createCategory({ name: newCategory });
			setNewCategory(""); // Reset form on success
		} catch {
			console.log("Error creating category");
		}
	};

	return (
		<motion.div
			className="bg-gray-800 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
		>
			<h2 className="text-2xl font-semibold mb-6 text-emerald-300">Create New Category</h2>

			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label htmlFor="name" className="block text-sm font-medium text-gray-300">
						Category Name
					</label>
					<input
						type="text"
						id="name"
						name="name"
						value={newCategory}
						onChange={(e) => setNewCategory(e.target.value)}
						className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
						required
					/>
				</div>

				<button
					type="submit"
					className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
					disabled={loading}
				>
					{loading ? (
						<>
							<Loader className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
							Loading...
						</>
					) : (
						<>
							<PlusCircle className="mr-2 h-5 w-5" />
							Create Category
						</>
					)}
				</button>
			</form>
		</motion.div>
	);
};

export default CreateCategoryForm;
