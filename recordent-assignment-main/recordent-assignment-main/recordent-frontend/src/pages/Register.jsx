import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await API.post("/auth/register", {
        name,
        email,
        mobile,
        password,
      });

      alert("Registration successful");
      navigate("/");
    
    } catch (err) {
      console.log(err.response);

      alert(
        err.response?.data?.message || "Registration failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-100 via-indigo-100 to-purple-100">

      {/* Left Section */}

      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-gradient-to-br from-indigo-800 via-purple-700 to-blue-700 items-center justify-center">

        <div className="absolute w-72 h-72 bg-white/10 rounded-full -top-20 -left-20 animate-pulse"></div>

        <div className="absolute w-60 h-60 bg-pink-400/20 rounded-full bottom-10 right-10 animate-bounce"></div>

        <div className="relative text-center text-white px-10">

          <div className="mx-auto w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-lg flex items-center justify-center shadow-2xl">
            <i className="fa-solid fa-user-plus text-4xl"></i>
          </div>

          <h1 className="text-5xl font-bold mt-6">
            Recordent
          </h1>

          <p className="mt-5 text-lg text-white/90 leading-8">
            Create your account and start managing
            buyers in a secure and modern platform.
          </p>

          <div className="flex justify-center gap-8 mt-10">

            <div>
              <i className="fa-solid fa-users text-2xl"></i>
              <p className="mt-2 text-sm">Buyers</p>
            </div>

            <div>
              <i className="fa-solid fa-upload text-2xl"></i>
              <p className="mt-2 text-sm">Upload</p>
            </div>

            <div>
              <i className="fa-solid fa-lock text-2xl"></i>
              <p className="mt-2 text-sm">Secure</p>
            </div>

          </div>

        </div>

      </div>

      {/* Right Section */}

      <div className="flex-1 flex justify-center items-center p-6">

        <div className="w-full max-w-sm bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white p-8">

          <div className="text-center">

            <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-lg">
              <i className="fa-solid fa-user-plus text-2xl"></i>
            </div>

            <h2 className="text-3xl font-bold mt-5 text-gray-800">
              Create Account
            </h2>

            <p className="text-gray-500 text-sm mt-2">
              Join Recordent today
            </p>

          </div>

          {/* Name */}

          <div className="relative mt-6">

            <i className="fa-solid fa-user absolute left-3 top-3.5 text-gray-400"></i>

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 pr-3 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none transition"
            />

          </div>

          {/* Email */}

          <div className="relative mt-4">

            <i className="fa-solid fa-envelope absolute left-3 top-3.5 text-gray-400"></i>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-3 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none transition"
            />

          </div>

          {/* Mobile */}

          <div className="relative mt-4">

            <i className="fa-solid fa-phone absolute left-3 top-3.5 text-gray-400"></i>

            <input
              type="text"
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full pl-10 pr-3 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none transition"
            />

          </div>

          {/* Password */}

          <div className="relative mt-4">

            <i className="fa-solid fa-lock absolute left-3 top-3.5 text-gray-400"></i>

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-3 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none transition"
            />

          </div>

          {/* Register Button */}

          <button
            onClick={handleRegister}
            className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:scale-[1.03] hover:shadow-xl transition-all duration-300"
          >
            <i className="fa-solid fa-user-plus mr-2"></i>
            Register
          </button>

          {/* Login Link */}

          <div className="text-center mt-5 text-sm">

            <span className="text-gray-600">
              Already have an account?
            </span>

            <button
              onClick={() => navigate("/")}
              className="ml-2 text-indigo-600 font-semibold hover:text-purple-600 transition"
            >
              Login
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;