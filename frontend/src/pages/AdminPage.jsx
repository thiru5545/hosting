import { BarChart, PlusCircle, FolderPlus, ShoppingBasket, ClipboardList } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import AnalyticsTab from "../components/AnalyticsTab";
import CreateProductForm from "../components/CreateProductForm";
import CreateCategoryForm from "../components/createCategoryForm";
import ProductsList from "../components/ProductsList";
import OrdersStatus from "../components/OrdersStatus";
import { useProductStore } from "../stores/useProductStore";

const tabs = [
	{ id: "createCategory", label: "Create Category", icon: FolderPlus },
	{ id: "create", label: "Create Product", icon: PlusCircle },
	{ id: "products", label: "Products", icon: ShoppingBasket },
	{ id: "analytics", label: "Analytics", icon: BarChart },
	{ id: "orders", label: "Orders", icon: ClipboardList },
];

const AdminPage = () => {
	const [activeTab, setActiveTab] = useState("create");
	const { fetchAllProducts } = useProductStore();

	useEffect(() => {
		fetchAllProducts();
	}, [fetchAllProducts]);

	return (
		<div className="min-h-screen relative overflow-hidden">
			<div className="relative z-10 container mx-auto px-4 py-16">
				<motion.h1
					className="text-4xl font-bold mb-8 text-emerald-400 text-center"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					Admin Dashboard
				</motion.h1>

				<div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8">
					{tabs.map((tab) => (
						<button
							key={tab.id}
							onClick={() => setActiveTab(tab.id)}
							className={`flex items-center px-4 py-2 rounded-md transition-colors duration-200 text-sm w-full sm:w-auto md:w-auto ${
								activeTab === tab.id
									? "bg-emerald-600 text-white"
									: "bg-gray-700 text-gray-300 hover:bg-gray-600"
							}`}
						>
							<tab.icon className="mr-2 h-5 w-5" />
							{tab.label}
						</button>
					))}
				</div>

				{activeTab === "createCategory" && <CreateCategoryForm />}
				{activeTab === "create" && <CreateProductForm />}
				{activeTab === "products" && <ProductsList />}
				{activeTab === "analytics" && <AnalyticsTab />}
				{activeTab === "orders" && <OrdersStatus />}
			</div>
		</div>
	);
};

export default AdminPage;
