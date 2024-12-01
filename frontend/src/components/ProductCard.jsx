import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import InnerImageZoom from "react-inner-image-zoom";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";

const ProductCard = ({ product }) => {
    const { user } = useUserStore();
    const { addToCart } = useCartStore();
    const [showModal, setShowModal] = useState(false);
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
	const [customization, setCustomization] = useState("");
    const [selectedImage, setSelectedImage] = useState(product.image);
    const settings = {
        dots: true,  // Show navigation dots
        infinite: true,  // Infinite loop
        speed: 500,  // Transition speed
        slidesToShow: 1,  // Show one image at a time
        slidesToScroll: 1,  // Scroll one image at a time
        focusOnSelect: true,  // Click to change image
    };

	// Array of all images (main + additional images)
	const allImages = [product.image, ...(product.images || [])];

    const handleAddToCart = () => {
        if (!user) {
            toast.error("Please login to add products to cart", { id: "login" });
            return;
        }
        if (!selectedSize || !selectedColor) {
            toast.error("Please select a size and color", { id: "select-options" });
            return;
        }
        
        // Add the product with selected options and optional customization
        addToCart({
            ...product,
            size: selectedSize,
            color: selectedColor,
            customization: customization || "" // Include customization if provided, otherwise send an empty string
        });
        
        // toast.success("Product added to cart", { id: "cart-success" });
        // console.log("why");
        setShowModal(false);
        
    };

    const handleCloseModal = () => setShowModal(false);

    return (
        <div className="flex w-full relative flex-col overflow-hidden rounded-lg border border-gray-1000 shadow-lg">
            <div
                className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl cursor-pointer"
                onClick={() => setShowModal(true)}
            >
                <img className="object-cover w-full" src={product.image} alt="product image" />
                <div className="absolute inset-0 bg-black bg-opacity-20" />
            </div>

            <div className="mt-4 px-5 pb-5">
                <h5 className="text-xl font-semibold tracking-tight text-black">{product.name}</h5>
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
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto"
                    onClick={handleCloseModal} // Close modal when clicking outside
                >
                    <div
                        className="bg-white rounded-lg p-8 w-3/4 mt-16 max-h-[90%] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
                    >
                        <div className="flex flex-col md:flex-row md:space-x-8">
                            {/* Left: Centered Product Image */}
                            <div className="w-full md:w-1/2">
                                {/* Main Image */}
                                <Slider {...settings}>
                                    {allImages.map((image, index) => (
                                        <div key={index} onClick={() => setSelectedImage(image)}>
                                            <InnerImageZoom
                                                src={image}
                                                zoomSrc={image}
                                                zoomType="click"
                                                zoomScale={1}
                                                className="rounded-lg mb-4"
                                                alt={product.name}
                                            />
                                        </div>
                                    ))}
                                </Slider>
                                {/* Sub Images */}
                                <div className="flex space-x-2">
                                    {allImages.map((image, index) => (
                                        <img
                                            key={index}
                                            src={image}
                                            alt={`Thumbnail ${index + 1}`}
                                            onClick={() => setSelectedImage(image)}
                                            className={`h-20 w-20 object-cover rounded-lg cursor-pointer transition duration-300 
                                            border-2 ${selectedImage === image ? "border-emerald-400" : "border-transparent"}`}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Right: Product Details and Form */}
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-gray-800 mb-2">{product.name}</h3>
                                <p className="text-gray-600 mb-4">{product.description}</p>
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
                                    <h4 className="text-black font-semibold mb-2">Select Color:</h4>
                                    <div className="flex flex-wrap gap-2">
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

                                {/* Customization Text Field */}
                                <div className="mb-4">
                                    <h4 className="text-black font-semibold mb-2">Customization:</h4>
                                    <input
                                        type="text"
                                        className="text-black w-full px-4 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                                        placeholder="Enter customization details (e.g., initials, text)"
                                        value={customization}
                                        onChange={(e) => setCustomization(e.target.value)}
                                    />
                                </div>

                                {/* Add to Cart Button */}
                                <button
                                    onClick={handleAddToCart}
                                    className="w-full mt-4 bg-emerald-600 text-white py-2 rounded-lg font-semibold hover:bg-emerald-700"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}



        </div>
    );
};

export default ProductCard;