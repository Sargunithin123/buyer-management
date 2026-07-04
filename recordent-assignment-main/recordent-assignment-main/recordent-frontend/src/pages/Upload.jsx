import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import API from "../services/api";
import { UploadCloud, FileText, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Upload() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);

  const uploadFile = async () => {
    if (!file) {
      alert("Please select a CSV file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await API.post("/buyer/upload", formData, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      });

      alert("✅ File uploaded successfully");

      navigate("/view");
    } catch {
      alert("Upload failed");
    }
  };

  return (
    <Layout>

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-gray-800">
          Upload Buyers
        </h1>

        <p className="text-gray-500 mt-2">
          Upload a CSV file to import buyer records into the system.
        </p>

      </div>

      <div className="flex justify-center">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .5 }}
          className="w-full max-w-3xl bg-white rounded-3xl shadow-xl overflow-hidden"
        >

          {/* Header */}

          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8">

            <div className="flex items-center gap-4">

              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">

                <UploadCloud size={34} />

              </div>

              <div>

                <h2 className="text-3xl font-bold">
                  Import Buyers
                </h2>

                <p className="text-white/80 mt-1">
                  Upload CSV files quickly and securely.
                </p>

              </div>

            </div>

          </div>

          {/* Body */}

          <div className="p-10">

            <label className="cursor-pointer">

              <div className="border-2 border-dashed border-indigo-300 rounded-3xl p-12 text-center transition-all duration-300 hover:border-indigo-600 hover:bg-indigo-50">

                <div className="w-24 h-24 rounded-full bg-indigo-100 mx-auto flex items-center justify-center">

                  <UploadCloud
                    size={42}
                    className="text-indigo-600"
                  />

                </div>

                <h3 className="text-2xl font-semibold mt-6">
                  Select CSV File
                </h3>

                <p className="text-gray-500 mt-3">
                  Click here to browse your computer
                </p>

                <input
                  type="file"
                  accept=".csv"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files[0])}
                />

              </div>

            </label>

            {/* Selected File */}

            {file && (

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-8 bg-green-50 border border-green-200 rounded-2xl p-5 flex justify-between items-center"
              >

                <div className="flex items-center gap-4">

                  <FileText
                    className="text-green-600"
                    size={34}
                  />

                  <div>

                    <h4 className="font-semibold">
                      {file.name}
                    </h4>

                    <p className="text-sm text-gray-500">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>

                  </div>

                </div>

                <CheckCircle2
                  className="text-green-600"
                  size={28}
                />

              </motion.div>

            )}

            {/* Buttons */}

            <div className="flex justify-end gap-4 mt-10">

              <button
                onClick={() => navigate("/dashboard")}
                className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={uploadFile}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold hover:scale-105 transition-all shadow-lg"
              >
                Upload File
              </button>

            </div>

          </div>

        </motion.div>

      </div>

    </Layout>
  );
}

export default Upload;