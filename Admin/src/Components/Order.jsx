/* eslint-disable no-unused-vars */
// import React from 'react'

import { useState, useEffect } from "react";
import { layoutClasses, styles, tableClasses } from "../assets/dummyadmin(1)";
import axios from "axios";


const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          'http://localhost:4000/api/order/getall',
          {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          }
        );
        const formatted = response.data.orders.map(order => {
          return {
            ...order,
            address: order.address ?? order.shippingAddress?.address ?? '',
            city: order.city ?? order.shippingAddress?.city ?? '',
            zipCode: order.zipCode ?? order.shippingAddress?.zipCode ?? '',
            phone: order.phone ?? '',
            items: order.items?.map(e => ({
              _id: e._id,
              item: e.item,
              quantity: e.quantity
            })) || [],
            createdAt: new Date(order.createdAt).toLocaleDateString('en-IN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            }),
          };
        });
        setOrders(formatted);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load orders.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className={layoutClasses.page}>
        <h1 className=" absolute left-[45%] top-1/2 text-amber-50 text-2xl " >Loading Orders...</h1>
      </div>
    )
  }
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await axios.put(
        `http://localhost:4000/api/order/${orderId}`,
        { paymentStatus: newStatus }
      );
      setOrders(prev =>
        prev.map(o =>
          o._id === orderId
            ? { ...o, status: newStatus }
            : o
        )
      );
    } catch (err) {
      console.log(err.response?.data);
      console.log(err.message);
    }
  };

  const paymentMethodDetails = {
    cod: {
      label: "Cash on Delivery",
      color: "green",
    },
    stripe: {
      label: "Stripe",
      color: "blue",
    },
    razorpay: {
      label: "Razorpay",
      color: "purple",
    },
    default: {
      label: "Unknown",
      color: "gray",
    },
  };
  const statusStyles = {
    processing: {
      text: "Processing",
      color: "text-yellow-600",
    },
    paid: {
      text: "Paid",
      color: "text-green-600",
    },
    pending: {
      text: "Pending",
      color: "text-orange-600",
    },
    failed: {
      text: "Failed",
      color: "text-red-600",
    },
  };
  const updatePaymentStatus = async (orderId, status) => {
    try {
      const fetchOrders = await axios.patch(
        `http://localhost:4000/api/order/${orderId}/payment-status`,
        {
          paymentStatus: status,
        }
      );
      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={layoutClasses.page}>
      <div className="max-w-full mx-auto ">
        <div className={layoutClasses.card + "w-full "} >
          <h2 className={styles.title}> Order Mangement</h2>
          <div className={tableClasses.headerRow} className=''>
            <table className=" overflow-auto ">
              <thead className='bg-amber-500/10    '>
                <tr className=" items-center justify-center gap-10 ">
                  {['Order ID', 'Customer', 'Address', 'Items', 'Total Items', 'Price', 'Payment', 'Status'].map(h => (
                    <th key={h} className={tableClasses.headerCell + (h === 'Total Items' ? ' text-center' : '')}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="">
                {orders.map((order) => {
                  // Sum up the quantities of all items in the order
                  const totalItems = order.items.reduce((s, i) => s + i.quantity, 0);
                  // Use the precomputed total if available; otherwise calculate price × quantity for each item
                  const totalPrice = order.total ?? order.items.reduce((s, i) => s + i.item.price * i.quantity, 0);
                  // Look up the display details for the payment method (lowercased), defaulting if not found
                  // eslint-disable-next-line no-undef
                  const payMethod = paymentMethodDetails[order.paymentMethod?.toLowerCase()] || paymentMethodDetails.default;
                  // Pick the style for the payment status, falling back to “processing” if unknown
                  // eslint-disable-next-line no-undef
                  const payStatusStyle = statusStyles[order.paymentStatus] || statusStyles.processing;
                  // Pick the style for the order’s overall status, falling back to “processing” if unknown
                  // eslint-disable-next-line no-undef
                  const stat = statusStyles[order.status] || statusStyles.processing;

                  return (
                    <tr
                      key={order._id}
                      className="border-b border-gray-200 hover:bg-amber-50/50 transition-all duration-300 rounded-2xl"
                    >
                      {/* Order ID */}
                      <td className="px-4 py-5">
                        <span className="rounded-lg bg-amber-100 px-3 py-2 text-xs font-semibold text-amber-700">
                          {order._id.slice(-8)}
                        </span>
                      </td>

                      {/* Customer */}
                      <td className="px-4 py-5">
                        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 shadow-sm">
                          <p className="font-semibold text-gray-800">
                            {order.user?.name || `${order.firstName} ${order.lastName}`}
                          </p>

                          <p className="mt-2 text-sm text-gray-600">
                            📞 {order.user?.phone || order.phone}
                          </p>

                          <p className="text-sm text-gray-600 break-all">
                            ✉️ {order.user?.email || order.email}
                          </p>
                        </div>
                      </td>

                      {/* Address */}
                      <td className="px-4 py-5">
                        <div className="rounded-xl bg-gray-50 p-4 border">
                          <p className="text-gray-700">{order.address}</p>

                          <p className="mt-2 text-sm text-gray-500">
                            {order.city} - {order.zipCode}
                          </p>
                        </div>
                      </td>

                      {/* Items */}
                      <td className="px-4 py-5">
                        <div className="space-y-3">
                          {order.items.map((itm, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-3 rounded-xl border bg-white p-2 shadow-sm hover:shadow-md transition"
                            >
                              <img
                                src={`http://localhost:4000${itm.item.imageUrl}`}
                                alt={itm.item.name}
                                className="h-14 w-14 rounded-lg border object-cover"
                              />

                              <span className="font-medium text-gray-700">
                                {itm.item.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </td>

                      {/* Quantity */}
                      <td className="px-4 py-5">
                        <div className="space-y-3">
                          {order.items.map((itm, idx) => (
                            <div
                              key={idx}
                              className="rounded-lg bg-blue-100 px-3 py-2 text-center font-semibold text-blue-700"
                            >
                              {itm.quantity}
                            </div>
                          ))}
                        </div>
                      </td>

                      {/* Price */}
                      <td className="px-4 py-5">
                        <div className="space-y-3">
                          {order.items.map((itm, idx) => (
                            <div
                              key={idx}
                              className="rounded-lg bg-green-100 px-3 py-2 text-center font-bold text-green-700"
                            >
                              ₹{itm.item.price}
                            </div>
                          ))}
                        </div>
                      </td>

                      {/* Payment Method */}
                      <td className="px-4 py-5 text-center">
                        <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
                          {order.paymentMethod}
                        </span>
                      </td>

                      <td className="px-4 py-5 text-center">
                        <select
                          value={order.paymentStatus}
                          onChange={(e) =>
                            handleStatusChange(order._id, e.target.value)
                          }
                          className={`rounded-lg px-3 py-2 text-sm font-semibold border outline-none
                             ${order.paymentStatus === "completed"
                              ? "bg-green-100 text-green-700 border-green-300"
                              : order.paymentStatus === "pending"
                                ? "bg-yellow-100 text-yellow-700 border-yellow-300"
                                : "bg-red-100 text-red-700 border-red-300"
                            }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="succeeded">Succeeded</option>
                          <option value="failed">Failed</option>
                        </select>
                      </td>
                    </tr>
                  )
                })}

              </tbody>
            </table>
            <div className="items-center justify-center flex text-2xl text-amber-300">{orders.length == 0 ? "Items Not Found  " : " "}</div>
          </div>
          <div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Order