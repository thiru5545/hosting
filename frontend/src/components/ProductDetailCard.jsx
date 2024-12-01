// import toast from "react-hot-toast";
// import { ShoppingCart } from "lucide-react";
// import { useUserStore } from "../stores/useUserStore";
// import { useCartStore } from "../stores/useCartStore";

// const ProductCard = ({ product }) => {
// 	const { user } = useUserStore();
// 	const { addToCart } = useCartStore();
// 	const handleAddToCart = () => {
// 		if (!user) {
// 			toast.error("Please login to add products to cart", { id: "login" });
// 			return;
// 		} else {
// 			// add to cart
// 			addToCart(product);
// 		}
// 	};

// 	return (
// 		<div className='flex w-full relative flex-col overflow-hidden rounded-lg border border-gray-700 shadow-lg'>
// 			<div className='relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl'>
// 				<img className='object-cover w-full' src={product.image} alt='product image' />
// 				<div className='absolute inset-0 bg-black bg-opacity-20' />
// 			</div>

// 			<div className='mt-4 px-5 pb-5'>
// 				<h5 className='text-xl font-semibold tracking-tight text-white'>{product.name}</h5>
// 				<div className='mt-2 mb-5 flex items-center justify-between'>
// 					<p>
// 						<span className='text-3xl font-bold text-emerald-400'>${product.price}</span>
// 					</p>
// 				</div>
// 				<button
// 					className='flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-center text-sm font-medium
// 					 text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300'
// 					onClick={handleAddToCart}
// 				>
// 					<ShoppingCart size={22} className='mr-2' />
// 					Add to cart
// 				</button>
// 			</div>
// 		</div>
// 	);
// };
// export default ProductCard;


// import { useState } from "react";
// import toast from "react-hot-toast";
// import { ShoppingCart, X } from "lucide-react";
// import { useUserStore } from "../stores/useUserStore";
// import { useCartStore } from "../stores/useCartStore";

// const ProductCard = ({ product }) => {
// 	const { user } = useUserStore();
// 	const { addToCart } = useCartStore();
// 	const [showModal, setShowModal] = useState(false);
// 	const [selectedSize, setSelectedSize] = useState("");
// 	const [selectedColor, setSelectedColor] = useState("");

// 	const handleAddToCart = () => {
// 		if (!user) {
// 			toast.error("Please login to add products to cart", { id: "login" });
// 			return;
// 		}
// 		if (!selectedSize || !selectedColor) {
// 			toast.error("Please select a size and color", { id: "select-options" });
// 			return;
// 		}
// 		addToCart({ ...product, size: selectedSize, color: selectedColor });
// 		toast.success("Product added to cart");
// 		setShowModal(false);
// 	};

// 	return (
// 		<div className='flex w-full relative flex-col overflow-hidden rounded-lg border border-gray-700 shadow-lg'>
// 			<div
// 				className='relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl cursor-pointer'
// 				onClick={() => setShowModal(true)}
// 			>
// 				<img className='object-cover w-full' src={product.image} alt='product image' />
// 				<div className='absolute inset-0 bg-black bg-opacity-20' />
// 			</div>

// 			<div className='mt-4 px-5 pb-5'>
// 				<h5 className='text-xl font-semibold tracking-tight text-white'>{product.name}</h5>
// 				<div className='mt-2 mb-5 flex items-center justify-between'>
// 					<p>
// 						<span className='text-3xl font-bold text-emerald-400'>${product.price}</span>
// 					</p>
// 				</div>
// 				<button
// 					className='flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-center text-sm font-medium
// 					 text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300'
// 					onClick={() => setShowModal(true)}
// 				>
// 					<ShoppingCart size={22} className='mr-2' />
// 					View Details
// 				</button>
// 			</div>

// 			{/* Modal */}
// 			{showModal && (
// 				<div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
// 					<div className='bg-white rounded-lg p-6 w-96'>
// 						<div className='flex justify-between items-center mb-4'>
// 							<h3 className='text-lg font-bold text-gray-800'>{product.name}</h3>
// 							<button onClick={() => setShowModal(false)}>
// 								<X size={24} className='text-gray-500 hover:text-gray-800' />
// 							</button>
// 						</div>
// 						<img
// 							src={product.image}
// 							alt={product.name}
// 							className='w-full h-40 object-cover rounded-lg mb-4'
// 						/>
// 						<p className='text-gray-700 text-lg mb-4'>Price: ${product.price}</p>

// 						{/* Size Carousel */}
// 						<div className='mb-4'>
// 							<h4 className='font-semibold mb-2'>Select Size:</h4>
// 							<div className='flex overflow-x-auto space-x-4 scrollbar-hide'>
// 								{["S", "M", "L", "XL", "XXL"].map((size) => (
// 									<button
// 										key={size}
// 										onClick={() => setSelectedSize(size)}
// 										className={`px-4 py-2 rounded border flex-shrink-0 ${
// 											selectedSize === size
// 												? "bg-emerald-600 text-white"
// 												: "bg-gray-100 text-gray-700"
// 										} hover:bg-emerald-600 hover:text-white`}
// 									>
// 										{size}
// 									</button>
// 								))}
// 							</div>
// 						</div>

// 						{/* Color Carousel */}
// 						<div className='mb-4'>
// 							<h4 className='font-semibold mb-2'>Select Color:</h4>
// 							<div className='flex overflow-x-auto space-x-4 scrollbar-hide'>
// 								{["Red", "Blue", "Green", "Black", "White"].map((color) => (
// 									<button
// 										key={color}
// 										onClick={() => setSelectedColor(color)}
// 										className={`px-4 py-2 rounded border flex-shrink-0 ${
// 											selectedColor === color
// 												? "bg-emerald-600 text-white"
// 												: "bg-gray-100 text-gray-700"
// 										} hover:bg-emerald-600 hover:text-white`}
// 									>
// 										{color}
// 									</button>
// 								))}
// 							</div>
// 						</div>

// 						<button
// 							onClick={handleAddToCart}
// 							className='w-full mt-4 bg-emerald-600 text-white py-2 rounded-lg font-semibold hover:bg-emerald-700'
// 						>
// 							Add to Cart
// 						</button>
// 					</div>
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// export default ProductCard;

// import toast from "react-hot-toast";
// import { ShoppingCart } from "lucide-react";
// import { useUserStore } from "../stores/useUserStore";
// import { useCartStore } from "../stores/useCartStore";

// const ProductCard = ({ product }) => {
// 	const { user } = useUserStore();
// 	const { addToCart } = useCartStore();
// 	const handleAddToCart = () => {
// 		if (!user) {
// 			toast.error("Please login to add products to cart", { id: "login" });
// 			return;
// 		} else {
// 			// add to cart
// 			addToCart(product);
// 		}
// 	};

// 	return (
// 		<div className='flex w-full relative flex-col overflow-hidden rounded-lg border border-gray-700 shadow-lg'>
// 			<div className='relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl'>
// 				<img className='object-cover w-full' src={product.image} alt='product image' />
// 				<div className='absolute inset-0 bg-black bg-opacity-20' />
// 			</div>

// 			<div className='mt-4 px-5 pb-5'>
// 				<h5 className='text-xl font-semibold tracking-tight text-white'>{product.name}</h5>
// 				<div className='mt-2 mb-5 flex items-center justify-between'>
// 					<p>
// 						<span className='text-3xl font-bold text-emerald-400'>${product.price}</span>
// 					</p>
// 				</div>
// 				<button
// 					className='flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-center text-sm font-medium
// 					 text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300'
// 					onClick={handleAddToCart}
// 				>
// 					<ShoppingCart size={22} className='mr-2' />
// 					Add to cart
// 				</button>
// 			</div>
// 		</div>
// 	);
// };
// export default ProductCard;





// component/productcard
import { useState } from "react";
import { ShoppingCart, X } from "lucide-react";
import toast from "react-hot-toast";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const ProductCard = ({ product }) => {
    const { user } = useUserStore();
    const { addToCart } = useCartStore();
    const [showModal, setShowModal] = useState(false);
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");

    const handleAddToCart = () => {
        if (!user) {
            toast.error("Please login to add products to cart", { id: "login" });
            return;
        }
        if (!selectedSize || !selectedColor) {
            toast.error("Please select a size and color", { id: "select-options" });
            return;
        }
        addToCart({ ...product, size: selectedSize, color: selectedColor });
        toast.success("Product added to cart");
        setShowModal(false);
    };

    const handleCloseModal = () => setShowModal(false);

    return (
        <div className="flex w-full relative flex-col overflow-hidden rounded-lg border border-gray-700 shadow-lg">
            <div
                className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl cursor-pointer"
                onClick={() => setShowModal(true)}
            >
                <img className="object-cover w-full" src={product.image} alt="product image" />
                <div className="absolute inset-0 bg-black bg-opacity-20" />
            </div>

            <div className="mt-4 px-5 pb-5">
                <h5 className="text-xl font-semibold tracking-tight text-white">{product.name}</h5>
                <div className="mt-2 mb-5 flex items-center justify-between">
                    <p>
                        <span className="text-3xl font-bold text-emerald-400">${product.price}</span>
                    </p>
                </div>
                <button
                    className="flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-center text-sm font-medium
					 text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300"
                    onClick={() => setShowModal(true)}
                >
                    <ShoppingCart size={22} className="mr-2" />
                    View Details
                </button>
            </div>

            {/* Modal */}
            {showModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                    onClick={handleCloseModal} // Close modal when clicking outside
                >
                    <div
                        className="bg-white rounded-lg p-8 w-3/4"
                        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside the modal
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
                            <button onClick={handleCloseModal}>
                                <X size={24} className="text-gray-500 hover:text-gray-800" />
                            </button>
                        </div>
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-40 object-cover rounded-lg mb-4"
                        />
                        <p className="text-gray-700 text-lg mb-4">Price: ${product.price}</p>

                        {/* Size Selection */}
                        <div className="mb-4">
                            <h4 className="text-black font-semibold mb-2">Select Size:</h4>
                            <div className="flex space-x-4">
                                {["S", "M", "L", "XL", "XXL"].map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-4 py-2 rounded-lg border ${
                                            selectedSize === size
                                                ? "bg-emerald-600 text-white"
                                                : "bg-gray-100 text-gray-700"
                                        } hover:bg-emerald-600 hover:text-white`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Color Selection */}
                        <div className="mb-4">
                            <h4 className="text-black font-semibold mb-2 ">Select Color:</h4>
                            <div className="flex space-x-4">
                                {["Red", "Blue", "Green", "Black", "White"].map((color) => (
                                    <button
                                        key={color}
                                        onClick={() => setSelectedColor(color)}
                                        className={`px-4 py-2 rounded-lg border ${
                                            selectedColor === color
                                                ? "bg-emerald-600 text-white"
                                                : "bg-gray-100 text-gray-700"
                                        } hover:bg-emerald-600 hover:text-white`}
                                    >
                                        {color}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        <button
                            onClick={handleAddToCart}
                            className="w-1/2 mx-auto mt-4 bg-emerald-600 text-white py-2 rounded-lg font-semibold hover:bg-emerald-700"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductCard;



