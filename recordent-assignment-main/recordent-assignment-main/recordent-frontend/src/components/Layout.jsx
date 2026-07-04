import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Upload,
  Users,
  Bell,
  Search,
  LogOut,
} from "lucide-react";
import { motion } from "framer-motion";

function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const username = "Nithin";

  const logout = () => {
        sessionStorage.clear();
    navigate("/");
  };

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Upload Buyers",
      path: "/upload",
      icon: Upload,
    },
    {
      name: "View Buyers",
      path: "/view",
      icon: Users,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-indigo-50 to-purple-100 flex">

      {/* Background */}

      <div className="fixed -top-32 -left-32 w-96 h-96 rounded-full bg-indigo-400/20 blur-3xl animate-pulse"></div>

      <div className="fixed bottom-0 right-0 w-[450px] h-[450px] rounded-full bg-purple-400/20 blur-3xl animate-pulse"></div>

      {/* Sidebar */}

      <aside className="sticky top-0 h-screen w-72 bg-slate-900 text-white shadow-2xl flex flex-col">
        {/* Logo */}

        <div className="p-7 border-b border-slate-700">

          <div className="flex items-center gap-4">

            <motion.div
              whileHover={{ rotate: 15, scale: 1.08 }}
              className="w-14 h-14 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-2xl font-bold shadow-xl"
            >
              R
            </motion.div>

            <div>

              <h1 className="text-2xl font-bold">
                Recordent
              </h1>

              <p className="text-sm text-gray-400">
                Buyer Management
              </p>

            </div>

          </div>

        </div>

        {/* Navigation */}

        <div className="flex-1 p-4 space-y-3 mt-4">

          {menuItems.map((item) => {
            const Icon = item.icon;

            const active = location.pathname === item.path;

            return (
              <NavLink key={item.path} to={item.path}>
                <motion.div
                  whileHover={{ x: 5 }}
                  className={`flex items-center gap-4 rounded-xl px-5 py-4 transition-all duration-300 ${
                    active
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg"
                      : "hover:bg-slate-800"
                  }`}
                >
                  <Icon size={20} />

                  <span>{item.name}</span>
                </motion.div>
              </NavLink>
            );
          })}

        </div>

        {/* Logout */}

        <div className="p-5">

          <button
            onClick={logout}
            className="w-full rounded-xl bg-red-500 hover:bg-red-600 py-3 flex justify-center items-center gap-3 transition-all duration-300 hover:scale-105"
          >
            <LogOut size={18} />

            Logout

          </button>

        </div>

      </aside>

      {/* Main */}

      <div className="flex-1 flex flex-col h-screen overflow-hidden">

        {/* Navbar */}

        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-sm px-10 py-5 flex justify-between items-center">

          <div>

            <h1 className="text-3xl font-bold text-gray-800">
              Buyer Management System
            </h1>

            <p className="text-gray-500">
              Manage buyers efficiently
            </p>

          </div>

          <div className="flex items-center gap-5">

            {/* Search */}

            <div className="relative">

              <Search
                size={18}
                className="absolute left-4 top-3 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search..."
                className="pl-11 pr-4 py-2 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-indigo-500 w-72"
              />

            </div>

            {/* Notification */}

            <button className="relative p-3 rounded-xl bg-gray-100 hover:bg-indigo-100 transition">

              <Bell size={20} />

              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>

            </button>

            {/* User */}

            <motion.div
              whileHover={{ scale: 1.03 }}
              className="flex items-center gap-3 bg-white rounded-xl border px-3 py-2 shadow cursor-pointer"
            >

              <div className="w-11 h-11 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-center font-bold">

                {username.charAt(0)}

              </div>

              <div>

                <h3 className="font-semibold">
                  {username}
                </h3>

                <p className="text-xs text-gray-500">
                  Administrator
                </p>

              </div>

            </motion.div>

          </div>

        </header>

        {/* Page Content */}

        <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex-1 overflow-y-auto p-8"
            >
            {children}
        </motion.main>

      </div>

    </div>
  );
}

export default Layout;