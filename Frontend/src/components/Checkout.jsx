import { FaArrowLeft, FaLock } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../Context/CartContext";
import { useEffect, useState } from "react";
import axios from "axios";
const Checkout = () => {
  const { totalAmount, cartItems, clearCart } = useCart();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    paymentMethod: "",
  });
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState("");
  const [error, setError] = useState(null);

  const token = localStorage.getItem("authToken");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const authHeader = token ? { Authorization: `Bearer ${token}` } : null;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const paymentStatus = params.get("payment_status");
    const sessionId = params.get("session_id");

    if (paymentStatus) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(true);

      if (paymentStatus === "success" && sessionId) {
        axios
          .post(
            "https://builder-ai-website.onrender.com/api/order/create",
            { sessionId },
            { headers: authHeader },
          )
          .then(({ data }) => {
            clearCart();
            navigate("/myorder", { state: { order: data.order } });
          })
          .catch((err) => {
            console.error(err);
           
          })
          .finally(() => setLoading(false));
      } else if (paymentStatus === "cancel") {
        setError("Payment was cancelled or failed. Please contact support");
        setLoading(false);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search, clearCart, navigate, authHeader]);
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const subtotal = Number(totalAmount.toFixed(2));
    const tax = Number((subtotal * 0.05).toFixed(2));

    const payload = {
      ...formData,
      subtotal,
      tax,
      total: Number((subtotal + tax).toFixed(2)),
      items: cartItems.map((item) => ({
        item: {
          name: item.item.name,
          price: item.item.price,
          imageUrl: item.item.imageUrl,
        },
        quantity: item.quantity,
      })),
    };

    try {
      if (formData.paymentMethod === "online") {
        // Save payload before redirecting to Stripe
       
        const { data } = await axios.post(
          "https://builder-ai-website.onrender.com/api/order/stripe",
          payload,
          { headers: authHeader },
        );

        console.log(data.url)
        window.location.href = data.url;
      } else {
        const { data } = await axios.post(
          "https://builder-ai-website.onrender.com/api/order/create",
          payload,
          { headers: authHeader },
        );

        clearCart();
        navigate("/myorder", {
          state: { order: data.order },
        });
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to submit order");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-linear-to-bl from-blue-500 via-emerald-700 to-lime-500 h-full p-3">
      <div className=" mx-auto max-w-4xl  ">
        <Link
          to="/cart"
          className="flex items-center justify-center pt-4 italic   bg-linear-to-br from-amber-800 via-amber-500 to-emerald-500  bg-clip-text text-transparent tracking-tighter font-serif text-2xl "
        >
          <FaArrowLeft className="mr-2 text-amber-800" />
          Back to Cart
        </Link>
        <h1 className="mx-auto max-w-4xl  items-center text-center text-xl p-2 text-blue-900">
          CheckOut
        </h1>
        <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-12">
          <div className="bg-amber-900/70 rounded-2xl p-6 space-y-6">
            <h2 className="flex items-center justify-center text-amber-500 text-2xl">
              Personal Information
            </h2>
            <div className=" flex items-center justify-start gap-1">
              <label className="  ">First Name</label>
              <br />
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                className="border rounded outline-0 pl-2 hover:bg-amber-50/30 h-10  w-full "
                onChange={handleInput}
              />
            </div>
            <div className=" flex items-center justify-start gap-1">
              <label className="block">Last -Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                className="border rounded outline-0 pl-2  h-10 hover:bg-amber-50/30 w-full "
                onChange={handleInput}
              />
            </div>
            <div className=" flex items-center justify-start gap-1">
              <label>PhoneNu</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInput}
                className="border rounded outline-0 pl-2 hover:bg-amber-50/30 w-full h-10"
              />
            </div>
            <div className=" flex items-center justify-start gap-1">
              <label>EmailAdd</label>
              <input
                type="email"
                name="email"
                onChange={handleInput}
                value={formData.email}
                className="border rounded outline-0 pl-2 hover:bg-amber-50/30  w-full h-10"
              />
            </div>
            <div className=" flex items-center justify-start gap-1">
              <label>Address_</label>
              <input
                onChange={handleInput}
                type="text"
                name="address"
                value={formData.address}
                className="border rounded outline-0 pl-2 hover:bg-amber-50/30  w-full h-10"
              />
            </div>
            <div className=" flex items-center justify-start gap-1">
              <label>City(curr)</label>
              <input
                onChange={handleInput}
                type="text"
                name="city"
                value={formData.city}
                className="border rounded outline-0 pl-2 hover:bg-amber-50/30 w-full h-10"
              />
            </div>
            <div className=" flex items-center justify-start gap-1">
              <label>ZipCode_</label>
              <input
                onChange={handleInput}
                type="text"
                name="zipCode"
                value={formData.zipCode}
                className="border rounded outline-0 pl-2 hover:bg-amber-50/30  w-full h-10"
              />
            </div>
          </div>
          <div className="bg-amber-950/70  p-6 space-y-6">
            <h2 className="text-amber-700 text-2xl items-center justify-center flex">
              Payment Details
            </h2>

            <div className="">
              <h3 className="text-white flex items-center  justify-center underline pb-5">
                Your Order Items
              </h3>
              {cartItems.map((item) => {
                return (
                  <div
                    key={item._id}
                    className="flex justify-between py-2 text-white"
                  >
                    <img
                      src={`https://builder-ai-website.onrender.com${item.item.imageUrl}`}
                      className="w-16 h-16 rounded-xl object-contain "
                    />
                    <span>{item.item.name}</span>
                    <span>x{item.quantity}</span>
                    <span>₹{(item.item.price * item.quantity).toFixed(2)}</span>
                  </div>
                );
              })}
            </div>
            <PaymentSummary totalAmount={totalAmount} />
            <div
              className="
            text-white"
            >
              <label className="block ">Payment Method</label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInput}
                className="border  w-full p-2 rounded-2xl outline-0 bg-amber-500/50"
              >
                <option value="" disabled>
                  Select Method
                </option>
                <option value="cod">Cash on Delivery</option>
                <option value="online">Online Payment</option>
              </select>
            </div>
            {error && <p className="text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center p-3 px-20 w-full rounded-2xl gap-2 cursor-pointer hover:scale-95 duration-300  bg-linear-to-bl from-amber-600 to-amber-800 text-white"
            >
              <FaLock /> {loading ? "Processing..." : "Complete Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
const PaymentSummary = ({ totalAmount }) => {
  const subtotal = Number(totalAmount.toFixed(2));
  const tax = Number((subtotal * 0.05).toFixed(2));
  const total = Number((subtotal + tax).toFixed(2));

  return (
    <div className=" text-white w-full ">
      <div className="flex items-center justify-between ">
        <span>Subtotal:</span>
        <span>₹{subtotal.toFixed(2)}</span>
      </div>
      <div className="flex items-center justify-between ">
        <span>Tax (5%):</span>
        <span>₹{tax.toFixed(2)}</span>
      </div>
      <hr className="mt-2" />
      <div className="flex items-center justify-between ">
        <span>Total:</span>
        <span>₹{total.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default Checkout;
