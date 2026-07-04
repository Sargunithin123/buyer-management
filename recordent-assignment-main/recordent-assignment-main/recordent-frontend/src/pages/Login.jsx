import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      alert("Please enter email/mobile and password");
      return;
    }

    try {
      sessionStorage.clear();

      const res = await API.post("/auth/login", {
        emailorMobile: email,
        password,
      });
      console.log("Login Response:", res.data);
      sessionStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex overflow-hidden">

      {/* LEFT */}

      <div className="hidden lg:flex w-1/2 relative bg-gradient-to-br from-indigo-900 via-purple-700 to-blue-600 items-center justify-center">

        {/* Animated Circles */}

        <div className="absolute w-72 h-72 bg-white/10 rounded-full top-20 left-20 animate-pulse"></div>

        <div className="absolute w-56 h-56 bg-pink-400/20 rounded-full bottom-24 right-20 animate-bounce"></div>

        <div className="z-10 text-center text-white px-10">

          <div className="mx-auto w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-xl flex items-center justify-center shadow-2xl">

            <i className="fa-solid fa-database text-5xl"></i>

          </div>

          <h1 className="text-6xl font-extrabold mt-8 tracking-wide">
            Recordent
          </h1>

          <p className="mt-6 text-xl text-white/90 leading-9">
            Securely manage buyers, upload records,
            analyze data and access everything
            from one beautiful dashboard.
          </p>

          <div className="flex justify-center gap-10 mt-12">

            <div className="text-center">

              <i className="fa-solid fa-users text-3xl"></i>

              <p className="mt-3">Manage Buyers</p>

            </div>

            <div className="text-center">

              <i className="fa-solid fa-file-arrow-up text-3xl"></i>

              <p className="mt-3">Upload Files</p>

            </div>

            <div className="text-center">

              <i className="fa-solid fa-shield-halved text-3xl"></i>

              <p className="mt-3">Secure Access</p>

            </div>

          </div>

        </div>

      </div>

      {/* RIGHT */}

      <div className="flex-1 bg-slate-100 flex justify-center items-center relative">

        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-100 via-white to-purple-100"></div>

        <div className="relative w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white">

          <div className="text-center">

            <div className="mx-auto w-20 h-20 rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-xl">

              <i className="fa-solid fa-user-lock text-3xl"></i>

            </div>

            <h2 className="mt-6 text-4xl font-bold text-gray-800">
              Welcome Back
            </h2>

            <p className="text-gray-500 mt-2">
              Login to continue
            </p>

          </div>

          {/* Email */}

          <div className="mt-8 relative">

            <i className="fa-solid fa-envelope absolute left-4 top-4 text-gray-400"></i>

            <input
              type="text"
              placeholder="Email or Mobile"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200 outline-none transition-all"
            />

          </div>

          {/* Password */}

          <div className="mt-5 relative">

            <i className="fa-solid fa-lock absolute left-4 top-4 text-gray-400"></i>

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-200 outline-none transition-all"
            />

          </div>

          <button
            onClick={handleLogin}
            className="mt-8 w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <i className="fa-solid fa-right-to-bracket mr-2"></i>

            Login
          </button>

          <div className="mt-8 text-center">

            <span className="text-gray-600">
              Don't have an account?
            </span>

            <button
              onClick={() => navigate("/register")}
              className="ml-2 text-indigo-600 font-semibold hover:text-purple-600 transition"
            >
              Register
            </button>

          </div>

          <div className="flex justify-center gap-8 mt-10 text-gray-400">

            <i className="fa-brands fa-react text-2xl hover:text-cyan-500 transition"></i>

            <i className="fa-brands fa-node-js text-2xl hover:text-green-500 transition"></i>

            <i className="fa-solid fa-database text-2xl hover:text-indigo-500 transition"></i>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;