import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Users,
  Mail,
  Phone,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Layout from "../components/Layout";

function ViewBuyers() {
  const navigate = useNavigate();

  const [buyers, setBuyers] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const fetchBuyers = async () => {
    try {
      const res = await API.get(
        `/buyer/view?page=${page}&limit=5&search=${search}`,
        {
          headers: {
            Authorization:
              "Bearer " + sessionStorage.getItem("token"),
          },
        }
      );

      setBuyers(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBuyers();
  }, [page, search]);

  return (
    <Layout>

      {/* Header */}

      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-6">

          <div>

            <h1 className="text-3xl font-bold text-gray-800">
              Buyer Records
            </h1>

            <p className="text-gray-500 mt-1 text-sm">
              Search and manage uploaded buyers.
            </p>

          </div>

          <button
            onClick={() => navigate("/upload")}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow transition"
          >
            <Plus size={18} />
            Upload Buyers
          </button>

        </div>

        {/* Search */}

        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 mb-5">

          <div className="relative w-80">

            <Search
              size={18}
              className="absolute left-3 top-3 text-gray-400"
            />

            <input
              value={search}
              placeholder="Search buyers..."
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
              className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
            />

          </div>

        </div>

        {/* Table */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden"
        >

          <div className="flex items-center gap-2 px-5 py-4 border-b bg-gray-50">

            <Users className="text-indigo-600" size={20} />

            <h2 className="font-semibold text-gray-800">
              Buyer List
            </h2>

          </div>

          <table className="w-full border-collapse">

            <thead>

              <tr className="bg-gray-100">

                <th className="border border-gray-200 px-5 py-3 text-left text-sm font-semibold">
                  Buyer
                </th>

                <th className="border border-gray-200 px-5 py-3 text-left text-sm font-semibold">
                  Email
                </th>

                <th className="border border-gray-200 px-5 py-3 text-left text-sm font-semibold">
                  Mobile
                </th>

              </tr>

            </thead>

            <tbody>

              {buyers.length > 0 ? (

                buyers.map((buyer, index) => (

                  <tr
                    key={index}
                    className="hover:bg-indigo-50 transition"
                  >

                    <td className="border border-gray-200 px-5 py-3">

                      <div className="flex items-center gap-3">

                        <div className="w-9 h-9 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center justify-center text-sm font-semibold">

                          {buyer.name?.charAt(0).toUpperCase()}

                        </div>

                        <span className="text-sm font-medium text-gray-700">

                          {buyer.name}

                        </span>

                      </div>

                    </td>

                    <td className="border border-gray-200 px-5 py-3">

                      <div className="flex items-center gap-2 text-sm text-gray-600">

                        <Mail size={15} />

                        {buyer.email}

                      </div>

                    </td>

                    <td className="border border-gray-200 px-5 py-3">

                      <div className="flex items-center gap-2 text-sm text-gray-600">

                        <Phone size={15} />

                        {buyer.mobile}

                      </div>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="3"
                    className="border border-gray-200 text-center py-12"
                  >

                    <Users
                      size={50}
                      className="mx-auto text-gray-300 mb-3"
                    />

                    <h3 className="font-semibold text-gray-600">
                      No Buyers Found
                    </h3>

                    <p className="text-gray-400 text-sm mt-2">
                      Upload a CSV file to add buyers.
                    </p>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </motion.div>

        {/* Pagination */}

        <div className="flex justify-center items-center gap-3 mt-6">

          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-indigo-600 hover:text-white transition disabled:opacity-40 text-sm"
          >
            <ChevronLeft size={16} />
            Previous
          </button>

          <div className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold shadow">

            {page}

          </div>

          <button
            onClick={() => setPage(page + 1)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-indigo-600 hover:text-white transition text-sm"
          >
            Next
            <ChevronRight size={16} />
          </button>

        </div>

      </div>

    </Layout>
  );
}

export default ViewBuyers;