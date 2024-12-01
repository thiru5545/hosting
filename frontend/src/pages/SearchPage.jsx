import { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";


const SearchPage = () => {
	const { fetchSearchProducts, products } = useProductStore();

	const { productName } = useParams();
	console.log(useParams());

	useEffect(() => {
		fetchSearchProducts(productName);
        
		console.log("Search:",products);
	}, [fetchSearchProducts, productName,products]);

	console.log("products:", products);
	return (
		<div className='min-h-screen'>
			<div className='relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				<motion.h1
					className='text-center text-4xl sm:text-5xl font-bold text-emerald-400 mb-8'
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					Results For {productName.charAt(0).toUpperCase() + productName.slice(1)}...
				</motion.h1>

				<motion.div
					className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
				>
					{products?.length === 0 && (
						<h2 className='text-3xl font-semibold text-gray-300 text-center col-span-full'>
							No products found
						</h2>
					)}

					{products?.map((product) => (
					// 	<Link 
					// 	to={`/product/${product._id}`} 
					// 	key={product._id}
					// 	className="block hover:shadow-lg transition duration-300"
					// >
						<ProductCard key={product._id} product={product} />
					//{/* </Link> */}
						
					))}
				</motion.div>
			</div>
		</div>
	);
};
export default SearchPage;
