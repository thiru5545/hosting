import { useParams } from "react-router-dom";
import { useEffect} from "react";
import { useProductStore } from "../stores/useProductStore";
const ProductDetailsPage = () => {
	const  productId  = useParams().id; // Fetch the product ID from the URL
    console.log(useParams());
	const {fetchProduct, product} = useProductStore();

	useEffect(() => {
		// Replace this with your actual API call
		fetchProduct(productId);
	}, [fetchProduct, productId]);

	if (!product) {
		return <p>Loading product details...</p>;
	}
    console.log("page",product);
	return (
		<div className='p-4'>
			{/* Product Image */}
			<img
				src={product.image}
				alt={product.name}
				className='w-full h-64 object-cover rounded-lg mb-4'
			/>

			{/* Product Name */}
			<h1 className='text-2xl font-bold'>{product.name}</h1>

			{/* Product Description */}
			<p className='text-gray-600 mb-4'>{product.description}</p>

			{/* Price */}
			<h3 className='text-xl font-semibold'>Price</h3>
			<p className='mb-4'>${product.price.toFixed(2)}</p>

			{/* Category */}
			<h3 className='text-xl font-semibold'>Category</h3>
			<p className='mb-4'>{product.category}</p>

			{/* Rating */}
			<h3 className='text-xl font-semibold'>Rating</h3>
			<p className='mb-4'>{product.rating}★</p>

			{/* Reviews */}
			{product.review && product.review.length > 0 && (
				<>
					<h3 className='text-xl font-semibold'>Reviews</h3>
					<ul>
						{product.review.map((comment, index) => (
							<li key={index} className='mb-2'>
								<p>{comment}</p>
							</li>
						))}
					</ul>
				</>
			)}
		</div>
	);
};

export default ProductDetailsPage;
