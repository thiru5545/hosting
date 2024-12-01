import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";

export const useOrderStore = create((set) => ({
    orders: [], // All orders
    pendingOrders: [], // Orders with status "placed" or "dispatched"
    deliveredOrders: [], // Orders with status "delivered"
    loading: false, // Loading state
    error: null, // Error state for better debugging


    createOrder: async (orderData) => {
        set({ loading: true });
        try {
            console.log("orderdata",orderData);
            const response = await axios.post("/order", orderData);
            set((prevState) => ({
                orders: [...prevState.orders, response.data],
                loading: false,
            }));
            toast.success("Order created successfully!");
        } catch (error) {
            set({ loading: false });
            toast.error(error.response?.data?.message || "Failed to create order.");
        }
    },

    // Helper to categorize orders
    categorizeOrders: (orders) => {
        const pendingOrders = orders.filter(
            (order) => order.status === "placed" || order.status === "dispatched"
        );
        const deliveredOrders = orders.filter((order) => order.status === "delivered");
        set({ pendingOrders, deliveredOrders });
    },

    // Fetch all orders and categorize them
    fetchAllOrders: async () => {
        set({ loading: true });
        try {
            const response = await axios.get("/order");
            const orders = response.data.orders;
            console.log("orders:",orders);
            set({ orders, loading: false });
            // Categorize orders
            useOrderStore.getState().categorizeOrders(orders);
            toast.success("Orders fetched successfully!");
        } catch (error) {
            set({ error: "Failed to fetch orders", loading: false });
            toast.error(error.response?.data?.message || "Failed to fetch orders.");
        }
    },

    // Update the status of an order and re-categorize
    updateOrderStatus: async (orderId, status) => {
        set({ loading: true });
        try {
            const response = await axios.put(`/order/${orderId}/status`, { status });
            set((prevState) => {
                const updatedOrders = prevState.orders.map((order) =>
                    order._id === orderId ? { ...order, status } : order
                );
                // Re-categorize orders
                useOrderStore.getState().categorizeOrders(updatedOrders);
                return { orders: updatedOrders, loading: false };
            });
            toast.success(response.data.message || "Order status updated successfully!");
        } catch (error) {
            set({ loading: false });
            toast.error(error.response?.data?.message || "Failed to update order status.");
        }
    },
}));
