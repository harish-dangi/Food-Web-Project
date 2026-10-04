import axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import {
  FiClock,
  FiTruck,
  FiCheckCircle,
  FiUser,
  FiMapPin,
  FiBox,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const Myorder = () => {
  const [orders, setOrders] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  //petch orders for a user
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "https://builder-ai-website.onrender.com/api/order/getall",
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        const formattedOrders = response.data.orders.map((order) => ({
          ...order,
          createdAt: new Date(order.createdAt).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
          paymentStatus:
            order.paymentStatus?.charAt(0).toUpperCase() +
            order.paymentStatus?.slice(1),

          status: order.status
            ?.replace(/([A-Z])/g, " $1")
            .replace(/^./, (s) => s.toUpperCase()),
        }));
        setOrders(formattedOrders);
        setError(null);
      } catch (err) {
        console.error("Error fetchOrders ", err);
        setError(
          err.response?.data?.message ||
          "Failed to loading orders. Please try again later",
        );
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user?.email]);
  const statusStyles = {
    processing: {
      color: "text-amber-400",
      bg: "bg-amber-900/20",
      icon: <FiClock className="text-lg" />,
      label: "Processing",
    },
    outForDelivery: {
      color: "text-blue-400",
      bg: "bg-blue-900/20",
      icon: <FiTruck className="text-lg" />,
      label: "Out for Delivery",
    },
    delivered: {
      color: "text-green-400",
      bg: "bg-green-900/20",
      icon: <FiCheckCircle className="text-lg" />,
      label: "Delivered",
    },
    pending: {
      color: "text-yellow-400",
      bg: "bg-yellow-900/20",
      icon: <FiClock className="text-lg" />,
      label: "Payment Pending",
    },
    succeeded: {
      color: "text-green-400",
      bg: "bg-green-900/20",
      icon: <FiCheckCircle className="text-lg" />,
      label: "Completed",
    },
  };
  const getPaymentMethodDetails = (method) => {
    switch (method.toLowerCase()) {
      case "cod":
        return {
          label: "COD",
          class: "bg-yellow-600/30 text-yellow-300 border-yellow-500/50",
        };
      case "card":
        return {
          label: "Credit/Debit Card",
          class: "bg-blue-600/30 text-blue-300 border-blue-500/50",
        };
      case "upi":
        return {
          label: "UPI Payment",
          class: "bg-purple-600/30 text-purple-300 border-purple-500/50",
        };
      default:
        return {
          label: "Online",
          class: "bg-green-600/30 text-green-400 border-green-500/50",
        };
    }
  };
  //if case of error
  if (error) {
    <div>
      <p>{error}</p>
      <button onClick={() => window.location.reload()}>
        <FaArrowLeft />
        <span>Try Again</span>
      </button>
    </div>;
  }
  return (
    <div className="min-h-screen bg-linear-to-bl from-emerald-600 via-amber-500 to-fuchsia-700/60 p-4 ">
      <div className="border rounded-2xl bg-amber-600 p-3 ">
        <div className="w-50 border-2 rounded-2xl flex items-center justify-center bg-amber-50   shadow-blue-400 hover:scale-95 duration-300 hover:border-fuchsia-800  hover:shadow-[1px_1px_15px_1px] ">
          <Link
            to="/"
            className="flex items-center justify-center pt-4 italic   bg-linear-to-br from-amber-800 via-amber-500 to-emerald-500  bg-clip-text text-transparent tracking-tighter font-serif text-2xl "
          >
            <FaArrowLeft className="mr-2 text-amber-800" />
            Back to Home
          </Link>
          {/* <div>
            <span>{user?.email}</span>
          </div> */}
        </div>
        <div className="bg-amber-50/70 rounded-2xl mt-2 p- ">
          <h2 className="text-center text-2xl md:text-4xl font-bold mb-4">
            Order History
          </h2>
          <div className="bg-amber-50 shadow-2xl rounded-2xl mt-4 overflow-x-auto ">
            <table className="min-w-300 w-full border-collapse">
              <thead>
                <tr className="">
                  <th className="px-3 py-4 text-left text-amber-500 whitespace-nowrap">Order ID</th>
                  <th className="px-3 py-4 text-left text-amber-500 whitespace-nowrap">Customer</th>
                  <th className="px-3 py-4 text-left text-amber-500 whitespace-nowrap">Address</th>
                  <th className="px-3 py-4 text-left text-amber-500 whitespace-nowrap">Items</th>
                  <th className="px-3 py-4 text-left text-amber-500 whitespace-nowrap">Total Items</th>
                  <th className="px-3 py-4 text-left text-amber-500 whitespace-nowrap">Price</th>
                  <th className="px-3 py-4 text-left text-amber-500 whitespace-nowrap">Payment</th>
                  <th className="px-3 py-4 text-left text-amber-500 whitespace-nowrap">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  const totalItems = order.items.reduce(
                    (sum, item) => sum + item.quantity,
                    0,
                  );
                  // console.log("Status from API:", order.status);
                  const totalPrice =
                    order.total ??
                    order.items.reduce(
                      (sum, item) => sum + item.item.price * item.quantity,
                      0,
                    );
                  const paymentMethod = getPaymentMethodDetails(
                    order.paymentMethod,
                  );
                  // console.log(statusStyles[order.status]);
                  const status =
                    statusStyles[order.status] || statusStyles.processing;
                  // eslint-disable-next-line no-unused-vars
                  const paymentStatus =
                    statusStyles[order.paymentStatus] || statusStyles.pending;
                  // console.log(paymentStatus);
                  return (
                    <tr key={order._id } className="">
                      <td className="text-cyan-700">{order._id?.slice(-8)}</td>
                      <td>
                        <div className="flex items-center gap-1">
                          <FiUser className="text-amber-500" />

                          <div className="text-blue-600">
                            <p>
                              {order.firstName}, {order.lastName}
                            </p>
                            <p>{order.phone}</p>
                          </div>
                        </div>
                      </td>

                      <td className=" ">
                        <div className="flex  items-center gap-2">
                          <FiMapPin className="text-amber-600 flex" />

                          <div>
                            <p className="w-40">
                              {order.address}, {order.city} - {order.zipCode}
                            </p>
                            <p className="text-emerald-600">
                              <span className="text-fuchsia-600">Phone:</span>
                              {order.phone}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="w-45 md:w-72 lg:w-80 space-y-3 flex  items-center justify-center flex-col">
                          {order.items.map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-fuchsia-500"
                            >
                              <img
                                src={`http://localhost:4000${item.item.imageUrl}`}
                                alt={item.item.name}
                                className="h-12 w-12 md:h-16 md:w-16 rounded-lg object-cover border"
                              />

                              <div className="flex-1">
                                <h3 className="text-sm font-semibold text-gray-800">
                                  {item.item.name}
                                </h3>

                                <div className="mt-1 flex items-center gap-2 text-sm text-gray-600">
                                  <span className="font-medium text-green-600">
                                    ₹{item.item.price}
                                  </span>
                                  <span>•</span>
                                  <span>Qty: {item.quantity}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="">
                        <div className="flex  items-center justify-center gap-1">
                          <FiBox className="text-cyan-500" />
                          <span>{totalItems}</span>
                        </div>
                      </td>

                      <td className="text-blue-600">
                        <span className="text-2xl text-emerald-500">₹</span>
                        {totalPrice.toFixed(2)}/-
                      </td>
                      <td className="p-2">
                        <div className=" items-center">
                          <div
                            className={`flex items-center justify-center  border rounded-2xl bg-amber-500 w-20 `}
                          >
                            {paymentMethod.label}
                          </div>
                          <div className="flex items-center gap-1 text-emerald-600">
                            <FiCheckCircle  />
                            <span className="w-20">{paymentStatus.label}</span>
                          </div>
                        </div>
                      </td>

                      <td>
                        <div
                          className={`${status.bg} ${status.color} px-2 md:px-3 py-1 flex items-center justify-center gap-2 text-xs md:text-sm rounded-2xl mr-2`}
                        >
                          {status.icon}
                          <span className="text-amber-800">{order.status}</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
  
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {orders.length === 0 && (
        <div className="flex items-center justify-center text-2xl text-amber-500 underline">
          No Orders Found
        </div>
      )}
    </div>
  );
};

export default Myorder;
