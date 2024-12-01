import { useState } from "react";
import { ClipboardList, CheckCircle, Clock, X } from "lucide-react";

const tabs = [
    { id: "pending", label: "Pending Orders", icon: Clock },
    { id: "delivered", label: "Delivered Orders", icon: CheckCircle },
    { id: "history", label: "Order History", icon: ClipboardList },
];

// Mock Order Data
const orders = {
    pending: [
        { id: 1, product: "T-shirt", customer: "John Doe", date: "2024-11-15", details: "Size: M, Color: Blue" },
        { id: 2, product: "Sneakers", customer: "Jane Smith", date: "2024-11-16", details: "Size: 9, Color: White" },
    ],
    delivered: [
        { id: 3, product: "Jacket", customer: "Mark Green", date: "2024-11-14", details: "Size: L, Color: Black" },
    ],
    history: [
        { id: 4, product: "Hat", customer: "Anna White", date: "2024-10-25", details: "Size: Adjustable, Color: Red" },
        { id: 5, product: "Backpack", customer: "Chris Brown", date: "2024-10-20", details: "Capacity: 20L, Color: Gray" },
    ],
};

const CustomerOrderPage = () => {
    const [activeTab, setActiveTab] = useState("pending");
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handleOrderClick = (order) => {
        setSelectedOrder(order);
    };

    const closeModal = () => {
        setSelectedOrder(null);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <h1 className="text-3xl font-bold text-emerald-400 mb-6 text-center">
                Customer Orders
            </h1>

            {/* Tabs Navigation */}
            <div className="flex justify-center mb-8">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center px-4 py-2 mx-2 rounded-md transition-colors duration-200 ${
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

            {/* Orders Content */}
            <div className="bg-gray-800 rounded-lg p-6">
                {orders[activeTab]?.length ? (
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-emerald-400 border-b border-gray-700">
                                <th className="py-2 px-4">Order ID</th>
                                <th className="py-2 px-4">Product</th>
                                <th className="py-2 px-4">Customer</th>
                                <th className="py-2 px-4">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders[activeTab].map((order) => (
                                <tr
                                    key={order.id}
                                    onClick={() => handleOrderClick(order)}
                                    className="hover:bg-gray-700 transition-colors cursor-pointer"
                                >
                                    <td className="py-2 px-4">{order.id}</td>
                                    <td className="py-2 px-4">{order.product}</td>
                                    <td className="py-2 px-4">{order.customer}</td>
                                    <td className="py-2 px-4">{order.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center text-gray-400">No orders available</p>
                )}
            </div>

            {/* Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-1/3">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl text-emerald-400">Order Details</h2>
                            <button onClick={closeModal} className="text-gray-400 hover:text-white">
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        <p><strong>Order ID:</strong> {selectedOrder.id}</p>
                        <p><strong>Product:</strong> {selectedOrder.product}</p>
                        <p><strong>Customer:</strong> {selectedOrder.customer}</p>
                        <p><strong>Date:</strong> {selectedOrder.date}</p>
                        <p><strong>Details:</strong> {selectedOrder.details}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomerOrderPage;