import { useEffect, useState } from "react";
import { CheckCircle, Clock, X } from "lucide-react";
import { useOrderStore } from "../stores/useOrderStore";

const tabs = [
    { id: "pending", label: "Pending Orders", icon: Clock },
    { id: "delivered", label: "Delivered Orders", icon: CheckCircle },
];

const OrdersStatus = () => {
    const [activeTab, setActiveTab] = useState("pending");
    const { fetchAllOrders, pendingOrders, deliveredOrders, loading, updateOrderStatus } = useOrderStore();
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [setNewStatus] = useState(null);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    

    const handleOrderClick = (order) => {
        setSelectedOrder(order);
    };

    const closeModal = () => {
        setSelectedOrder(null);
    };

    // Fetch orders on component mount
    useEffect(() => {
        fetchAllOrders();
    }, [fetchAllOrders]);
    useEffect(() => {
        fetchAllOrders();
    }, [fetchAllOrders]);

    const handleStatusClick = (orderId, currentStatus) => {
        setSelectedOrderId(orderId);
        setShowDropdown(true);
        setNewStatus(currentStatus); // Set the current status
    };

    const handleStatusChange = (status) => {
        updateOrderStatus(selectedOrderId, status); // Call the store function to update the status
        setShowDropdown(false); // Close the dropdown after updating
        setSelectedOrder(null);
    };

    const orders = {
        pending: pendingOrders,
        delivered: deliveredOrders,
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
                {loading ? (
                    <p className="text-center text-gray-400">Loading...</p>
                ) : orders[activeTab]?.length ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-emerald-400 border-b border-gray-700">
                                    <th className="py-2 px-4">Order ID</th>
                                    <th className="py-2 px-4">Product</th>
                                    <th className="py-2 px-4">Customer</th>
                                    <th className="py-2 px-4">Date</th>
                                    <th className="py-2 px-4">Status</th>
                                    <th className="py-2 px-2">Address</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders[activeTab].map((order) => (
                                    <tr
                                        key={order._id}
                                        onClick={() => handleOrderClick(order)}
                                        className="hover:bg-gray-700 transition-colors border-b border-gray-700"
                                    >
                                        <td className="py-2 px-4">{order._id}</td>
                                        <td className="py-2 px-4">
                                            <table className="w-full text-left">
                                                <tbody>
                                                    {order.products.map((p, index) => (
                                                        <tr
                                                            key={p.product?._id}
                                                            className={
                                                                index > 0
                                                                    ? "border-t border-gray-700"
                                                                    : ""
                                                            }
                                                        >
                                                            <td className="py-1 px-2 text-gray-400">
                                                                {index + 1}
                                                            </td>
                                                            <td className="py-1 px-2 text-gray-200">
                                                                <div className="ml-4 max-w-[150px] text-left">
                                                                    <div
                                                                        className="text-sm font-medium text-white"
                                                                        title={p.product?.name} // Shows full name on hover
                                                                    >
                                                                        {p.product?.name}
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </td>
                                        <td className="py-2 px-4">
                                            {order.user?.name || "N/A"}
                                        </td>
                                        <td className="py-2 px-4">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="py-2 px-4">{order.status}</td>
                                        <td className="py-1 px-2 text-gray-200">
                                            <div className="ml-4 max-w-[150px] text-left">
                                                <div
                                                    className="text-sm font-medium text-white"
                                                    title={order.address} // Shows full name on hover
                                                >
                                                    {order.address}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-center text-gray-400">No orders available</p>
                )}
            </div>

            {selectedOrder && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-1/2 h-[80vh]">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl text-emerald-400">Order Details</h2>
                <button onClick={closeModal} className="text-gray-400 hover:text-white">
                    <X className="h-6 w-6" />
                </button>
            </div>

            <p><strong>Order ID:</strong> {selectedOrder._id}</p>
            <p><strong>Customer Name:</strong> {selectedOrder.user.name}</p>
            <p><strong>Date:</strong> {new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
            <p><strong>Address:</strong> {selectedOrder.address}</p>
                                            <button
                                                onClick={() => handleStatusClick(selectedOrder._id, selectedOrder.status)}
                                                className="text-emerald-400"
                                            >
                                                {selectedOrder.status}
                                            </button>

                                            {/* Dropdown */}
                                            {showDropdown && selectedOrderId === selectedOrder._id && (
                                                <div className="absolute mt-2 bg-gray-800 rounded-lg shadow-md z-10">
                                                    <ul className="text-white">
                                                        <li
                                                            onClick={() => handleStatusChange("placed")}
                                                            className="px-4 py-2 cursor-pointer hover:bg-gray-700"
                                                        >
                                                            Placed
                                                        </li>
                                                        <li
                                                            onClick={() => handleStatusChange("dispatched")}
                                                            className="px-4 py-2 cursor-pointer hover:bg-gray-700"
                                                        >
                                                            Dispatched
                                                        </li>
                                                        <li
                                                            onClick={() => handleStatusChange("delivered")}
                                                            className="px-4 py-2 cursor-pointer hover:bg-gray-700"
                                                        >
                                                            Delivered
                                                        </li>
                                                    </ul>
                                                </div>
                                            )}
            {/* Scrollable products list */}
            <div className="mt-4 h-[50vh] overflow-y-auto">
                <h3 className="text-xl text-emerald-400">Products:</h3>
                {selectedOrder.products.map((product) => (
                    <div key={product._id} className="mt-4">
                        <div className="flex items-center space-x-4">
                            <img src={product.product.image} alt={product.product.name} className="w-24 h-24 object-cover" />
                            <div>
                                <p><strong>Name:</strong> {product.product.name}</p>
                                <p><strong>Size:</strong> {product.size}</p>
                                <p><strong>Color:</strong> {product.color}</p>
                                
                                {/* Conditionally display customization if it's not an empty string */}
                                {product.customization && product.customization !== "" ? (
                                    <p><strong>Customization:</strong> {product.customization}</p>
                                ) : null}

                                <p><strong>Quantity:</strong> {product.quantity}</p>
                                <p><strong>Price:</strong> ${product.price}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
)}

        </div>
    );
};

export default OrdersStatus;
