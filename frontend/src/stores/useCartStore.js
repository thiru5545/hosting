import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useCartStore = create((set, get) => ({
    cart: [],
    coupon: null,
    total: 0,
    subtotal: 0,
    isCouponApplied: false,

    getMyCoupon: async () => {
        try {
            const response = await axios.get("/coupons");
            set({ coupon: response.data });
        } catch (error) {
            console.error("Error fetching coupon:", error);
        }
    },

    applyCoupon: async (code) => {
        try {
            const response = await axios.post("/coupons/validate", { code });
            set({ coupon: response.data, isCouponApplied: true });
            get().calculateTotals();
            toast.success("Coupon applied successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to apply coupon");
        }
    },

    removeCoupon: () => {
        set({ coupon: null, isCouponApplied: false });
        get().calculateTotals();
        toast.success("Coupon removed");
    },

    getCartItems: async () => {
        try {
            const res = await axios.get("/cart");
			console.log("get all items",res.data);
            set({ cart: res.data });
            get().calculateTotals();
        } catch (error) {
            set({ cart: [] });
            toast.error(error.response?.data?.message || "An error occurred");
        }
    },

    clearCart: async () => {
        try {
            await axios.delete("/cart");
            set({ cart: [], coupon: null, total: 0, subtotal: 0 });
        } catch (error) {
            toast.error("Failed to clear the cart");
        }
    },

    addToCart: async (product) => {
        try {
            // Send size, color, and customization details in the payload
            const response = await axios.post("/cart", {
                product: product._id,
                size: product.size,
                color: product.color,
                customization: product.customization,
            });
            toast.success("Product added to cart");
			const updatedCartItems = response.data.cartItems;
            set((prevState) => {
                // prevState.cart.map((item)=>console.log("testing:",item.product,product._id));
                const existingItem = prevState.cart.find(
                    (item) =>
                        item.product === product._id &&
                        item.size === product.size &&
                        item.color === product.color &&
                        item.customization === product.customization
                );

                const newCart = existingItem
                    ? prevState.cart.map((item) =>
                          item.product === product._id &&
                          item.size === product.size &&
                          item.color === product.color &&
                          item.customization === product.customization
                              ? { ...item, quantity: item.quantity + 1 }
                              : item
                      )
                    : [...prevState.cart, { ...product,_id: updatedCartItems.find(
						(item) =>
							item.product === product._id &&
							item.size === product.size &&
							item.color === product.color &&
							item.customization === product.customization
					)._id, quantity: 1 }];

                return { cart: newCart };
            });

            get().calculateTotals();
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred");
        }
    },

    removeFromCart: async ({ productId, size, color, customization }) => {
        try {
            await axios.delete("/cart", { data: { productId, size, color, customization } });

            set((prevState) => ({
                cart: prevState.cart.filter(
                    (item) =>
                        item._id !== productId ||
                        item.size !== size ||
                        item.color !== color ||
                        item.customization !== customization
                ),
            }));

            get().calculateTotals();
        } catch (error) {
            toast.error("Failed to remove item from cart");
        }
    },

    updateQuantity: async ({ productId, size, color, customization, quantity }) => {
        try {
            if (quantity === 0) {
                get().removeFromCart({ productId, size, color, customization });
                return;
            }

            await axios.put(`/cart/${productId}`, {
                size,
                color,
                customization,
                quantity,
            });

            set((prevState) => ({
                cart: prevState.cart.map((item) =>
                    item._id === productId &&
                    item.size === size &&
                    item.color === color &&
                    item.customization === customization
                        ? { ...item, quantity }
                        : item
                ),
            }));

            get().calculateTotals();
        } catch (error) {
            toast.error("Failed to update item quantity");
        }
    },

    calculateTotals: () => {
        const { cart, coupon } = get();
        const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        let total = subtotal;

        if (coupon) {
            const discount = subtotal * (coupon.discountPercentage / 100);
            total = subtotal - discount;
        }

        set({ subtotal, total });
    },
}));
