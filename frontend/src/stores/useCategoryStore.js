import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";

export const useCategoryStore = create((set) => ({
	categories: [],
	loading: false,

	fetchAllCategory: async () => {
		set({ loading: true });
		try {
			const response = await axios.get("/category");
			// Extract just the name from each category object
            // console.log("Before",response);
			const category = response.data.categories;
            console.log("After",category);

			set({ categories: category, loading: false });
		} catch (error) {
			set({ loading: false });
			toast.error(error.response || "Failed to fetch categories");
		}
	},
	createCategory: async (categoryData) => {
		set({ loading: true });
		try {
			const res = await axios.post("/category", categoryData); // Adjust endpoint to match your API
			set((prevState) => ({
				categories: [...prevState.categories, res.data], // Update the categories state
				loading: false,
			}));
			toast.success("Category created successfully!");
		} catch (error) {
			toast.error(error.response?.data?.error || "Failed to create category");
			set({ loading: false });
		}
	},
	
}));
