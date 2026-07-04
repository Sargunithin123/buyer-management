import Layout from "../components/Layout";
import { motion } from "framer-motion";
import {
  Upload,
  Users,
  ArrowRight,
  Database,
  ShieldCheck,
  Server,
  TrendingUp,
  CircleCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Upload Buyers",
      description: "Import buyer data using CSV files.",
      icon: Upload,
      color: "bg-indigo-100 text-indigo-600",
      button: "Upload Now",
      action: () => navigate("/upload"),
    },
    {
      title: "View Buyers",
      description: "Search and manage uploaded buyers.",
      icon: Users,
      color: "bg-purple-100 text-purple-600",
      button: "View Buyers",
      action: () => navigate("/view"),
    },
  ];

  const statusCards = [
    {
      title: "Server",
      value: "Online",
      icon: Server,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      title: "Database",
      value: "Connected",
      icon: Database,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      title: "Security",
      value: "Protected",
      icon: ShieldCheck,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
    {
      title: "System",
      value: "Healthy",
      icon: TrendingUp,
      color: "text-orange-600",
      bg: "bg-orange-100",
    },
  ];

  return (
    <Layout>

      {/* Welcome */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-gray-800">
          Welcome Back 👋
        </h1>

        <p className="text-gray-500 mt-2">
          Manage buyers and monitor your Recordent application from one place.
        </p>

      </div>

      {/* Quick Actions */}

      <div className="grid md:grid-cols-2 gap-6">

        {actions.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={index}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
            >
              <div className="flex justify-between items-start">

                <div>

                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.color}`}>

                    <Icon size={22} />

                  </div>

                  <h2 className="text-xl font-semibold mt-5">
                    {item.title}
                  </h2>

                  <p className="text-gray-500 mt-2 text-sm">
                    {item.description}
                  </p>

                </div>

              </div>

              <button
                onClick={item.action}
                className="mt-6 inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl transition"
              >
                {item.button}
                <ArrowRight size={16} />
              </button>

            </motion.div>
          );
        })}

      </div>

      {/* System Status */}

      <div className="mt-8">

        <h2 className="text-xl font-semibold text-gray-800 mb-5">
          System Status
        </h2>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">

          {statusCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-2xl shadow-md border border-gray-100 p-5"
              >

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-gray-500 text-sm">
                      {card.title}
                    </p>

                    <h3 className={`font-semibold mt-1 ${card.color}`}>
                      {card.value}
                    </h3>

                  </div>

                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${card.bg}`}>

                    <Icon className={card.color} size={20} />

                  </div>

                </div>

              </motion.div>
            );
          })}

        </div>

      </div>

      {/* Activity */}

      <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">

        <h2 className="text-xl font-semibold mb-6">
          Recent Activity
        </h2>

        <div className="space-y-5">

          <div className="flex items-center gap-4">

            <CircleCheck className="text-green-600" size={20} />

            <div>

              <h4 className="font-medium">
                Buyer module is ready
              </h4>

              <p className="text-sm text-gray-500">
                Upload new buyers using CSV files.
              </p>

            </div>

          </div>

          <div className="flex items-center gap-4">

            <CircleCheck className="text-blue-600" size={20} />

            <div>

              <h4 className="font-medium">
                Search buyers
              </h4>

              <p className="text-sm text-gray-500">
                Search uploaded buyers instantly.
              </p>

            </div>

          </div>

          <div className="flex items-center gap-4">

            <CircleCheck className="text-purple-600" size={20} />

            <div>

              <h4 className="font-medium">
                System running normally
              </h4>

              <p className="text-sm text-gray-500">
                Database and authentication services are active.
              </p>

            </div>

          </div>

        </div>

      </div>

    </Layout>
  );
}

export default Dashboard;