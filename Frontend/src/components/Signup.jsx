import axios from "axios";
import { useEffect, useState } from "react";
import {
  FaLock,
  FaUser,
  FaArrowLeft,
  FaUserPlus,
  FaCheckCircle,
  FaEyeSlash,
  FaEye,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const AwesomeToast = ({ message, icon }) => {
  return (
    <div className="animate-slide-in fixed bottom-6 right-6 flex  items-center bg-linear-to-br from-amber-500 to-amber-600 px-6 py-4 shadow-lg border-2 border-amber-300/20">
      {icon == "X" ? (
        <span className="text-red-500">{icon}</span>
      ) : (
        <span className="text-green-500">{icon}</span>
      )}

      {message == "Sing Up Successfull" ? (
        <span className="text-green-500">{message}</span>
      ) : (
        <span className="text-red-500">{message}</span>
      )}
    </div>
  );
};
const url = "http://localhost:4000";
const Signup = () => {
  const [showToast, setShowToast] = useState(false);
  const [showPassword, setshowPassword] = useState(false);
  const [formData, setfromData] = useState({
    username: "",
    password: "",
    email: "",
    rememberMe: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
        navigate("/login");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [navigate, showToast]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${url}/api/auth/register`, formData);

      if (res.data.success) {
        localStorage.setItem("authToken", res.data.token);
        setShowToast(true);

        return;
      } else {
        throw new Error(res.data.message || "Registration Failed");
      }
    } catch (error) {
      console.error("Registration Error:", error);
    }
  };
  const hadleChange = (e) => {
    setfromData({ ...formData, [e.target.name]: e.target.value });
  };
  const toggleShowPassword = () => {
    setshowPassword((prev) => !prev);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black/60">
      {showToast ? (
        <AwesomeToast message="Sing Up Successfull" icon={<FaCheckCircle />} />
      ) : (
        <AwesomeToast message="Registration Failed" icon={"X"} />
      )}
      <div className=" w-100  bg-linear-to-br from-[#4fe065] to-[#6b3a23] via-blue-400 rounded-2xl p-6 relative flex items-center justify-center border-2  border-cyan-400 shadow-2xl hover:shadow-cyan-300 ">
        <form className="space-y-3 " onSubmit={handleSubmit}>
          <h1 className="flex  justify-center text-2xl font-bold text-blue-500 hover:text-3xl ">
            {" "}
            Create Account{" "}
          </h1>
          <div className=" flex items-center  border hover:bg-gray-50 rounded  shadow-lg hover:shadow-amber-100 ">
            <FaUser className="mr-2 ml-3 text-amber-300 " />
            <input
              type="text"
              name="username"
              onChange={hadleChange}
              placeholder="UserName"
              value={formData.username}
              className=" outline-0 w-full p-2"
              required
            />
          </div>
          <div className=" flex items-center  border hover:bg-gray-50 rounded  shadow-lg hover:shadow-amber-100 ">
            <MdEmail className="mr-2 ml-3 text-amber-300 " />
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Email"
              onChange={hadleChange}
              className=" outline-0 w-full  p-2"
              required
            />
          </div>
          <div className="mt-3 flex items-center  border hover:bg-gray-50 rounded  shadow-lg hover:shadow-amber-100 w-85">
            <FaLock className="mr-2 ml-3 text-amber-300 " />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={hadleChange}
              className=" outline-0 w-full p-2 "
              required
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className=" mr-2 text-amber-400"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={(e) =>
              setfromData({
                ...formData,
                rememberMe: e.target.checked,
              })
            }
            required
          />
          <span className="text-white font-serif ">Remember me</span>

          <button
            type="submit"
            className="flex items-center justify-center border w-full gap-2 bg-linear-to-bl from-amber-500 via-mauve-500 to-cyan-500 rounded-2xl p-2 mt-3 cursor-pointer hover:scale-95 hover:bg-linear-to-bl hover:from-amber-500 hover:via-white hover:to-emerald-300 text-amber-900 hover:text-emerald-600"
          >
            Sign Up
            <span>
              <FaArrowLeft className="text-sm text-emerald-500" />
            </span>
          </button>
          <Link
            to="/login"
            className="flex items-center justify-center border p-2 mt-3 rounded-2xl gap-2 bg-amber-400 hover:scale-96 hover:bg-blue-300 hover:text-fuchsia-400"
          >
            <FaUserPlus />
            Back To Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
