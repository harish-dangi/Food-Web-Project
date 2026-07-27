import axios from "axios";
import { useEffect, useState } from "react";
import {
  FaLock,
  FaUserPlus,
  FaUser,
  FaArrowRight,
  FaCheckCircle,
  FaEyeSlash,
  FaEye,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = ({ onLoginSuccess, onClose }) => {
  const url = "http://localhost:4000";

  const [showToast, setShowToast] = useState(false);
  const [showPassword, setshowPassword] = useState(false);
  const [formData, setfromData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });
  const [message, setmessage] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("loginData");
    if (stored) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setfromData(JSON.stringify(stored));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${url}/api/auth/login`, {
        email: formData.email,
        password: formData.password,
      });

      if (res.status === 200 && res.data.token) {
        localStorage.setItem("authToken", res.data.token);

        // Remember Me
        if (formData.rememberMe) {
          localStorage.setItem("loginData", JSON.stringify(formData));
        } else {
          localStorage.removeItem("loginData");
        }
        setmessage("Login Successful!");
        setShowToast(true);

        setTimeout(() => {
          setShowToast(false);
          onLoginSuccess(res.data.token);
        }, 2000);
      } else {
        console.warn("Unexpected Response:", res.data);
        throw new Error(res.data.message || "Login Failed");
      }
    } catch (error) {
      console.error("Axios Error:", error);
      setShowToast(true);
      setmessage("Login Failed!.Password Or Email not match.");
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    }
  };

  const handleChange = ({ target: { name, value, type, checked } }) => {
    setfromData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const toggleShowPassword = () => {
    setshowPassword((prev) => !prev);
  };

  return (
    <div className="w-70 ">
      <div
        className={`fixed top-4 right-4 z-50 transition-all duration-300
        ${showToast ? "translate-y-0 opacity-100" : " -translate-y-20 opacity-0"}  `}
      >
        <div className={`${message == "Login Successful!" ? "bg-green-500": " bg-red-500"} text-white px-4 py-3 rounded flex items-center gap-2 text-sm`}>
          {message == "Login Successful!" ? <FaCheckCircle className="shrink-0" /> : "X"}
          
          <span>{message}</span>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className=" flex items-center  border hover:bg-gray-50 rounded  shadow-lg hover:shadow-amber-100 ">
          <FaUser className="mr-2 ml-3 text-amber-300 " />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className=" outline-0 w-full p-2"
          />
        </div>
        <div className="mt-3 flex items-center  border hover:bg-gray-50 rounded  shadow-lg hover:shadow-amber-100 ">
          <FaLock className="mr-2 ml-3 text-amber-300 " />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            value={formData.password}
            className=" outline-0 w-full p-2"
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={toggleShowPassword}
            className=" mr-2 text-amber-400"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <div className="pt-3 ">
          <input type="checkbox" onChange={handleChange} className="mr-2" />
          <span className="text-white font-serif ">Remember me</span>
        </div>
        <button className="flex items-center justify-center border w-full gap-2 bg-linear-to-bl from-amber-500 via-mauve-500 to-cyan-500 rounded-2xl p-2 mt-3 cursor-pointer hover:scale-95 hover:bg-linear-to-bl hover:from-amber-500 hover:via-white hover:to-emerald-300 text-amber-900 hover:text-emerald-600">
          Sing In
          <span>
            <FaArrowRight className="text-sm text-emerald-500" />
          </span>
        </button>
      </form>
      <Link
        to="/signup"
        onClick={onClose}
        className="flex items-center justify-center border p-2 mt-3 rounded-2xl gap-2 bg-amber-400 hover:scale-96 hover:bg-blue-300 hover:text-fuchsia-400"
      >
        <FaUserPlus />
        Create New Accoount
      </Link>
    </div>
  );
};

export default Login;
