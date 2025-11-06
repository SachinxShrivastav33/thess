import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";

function UpdateService() {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // ✅ Fetch service data
  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4001/api/v1/services/${id}`,
          { withCredentials: true }
        );

        setTitle(data.service.title);
        setDescription(data.service.description);
        setPrice(data.service.price);
        setCategory(data.service.category);

        // ✅ Set correct preview URL
        if (data.service.image && data.service.image.url) {
          setImagePreview(data.service.image.url);
        }
      } catch (error) {
        toast.error("Failed to fetch service details");
      } finally {
        setLoading(false);
      }
    };

    fetchServiceData();
  }, [id]);

  // ✅ Handle new image upload (Preview instantly)
  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setImagePreview(URL.createObjectURL(file)); // ✅ Fix Preview
  };

  // ✅ Update Service API Call
  const handleUpdateService = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);

    if (image) formData.append("image", image); // ✅ Only include if updated

    const admin = localStorage.getItem("admin")
      ? JSON.parse(localStorage.getItem("admin"))
      : null;

    const token = admin?.token;
    if (!token) {
      toast.error("Please login to admin");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:4001/api/v1/services/update/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      toast.success(response.data.message || "Service updated ✅");
      navigate("/admin/our-services");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update service, try again!"
      );
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500 mt-10">Loading...</p>;
  }

  return (
    <>
      <AdminNavbar />

      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 via-white to-blue-100">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-2xl border border-gray-200">
          <h3 className="text-3xl font-bold mb-8 text-center text-gray-800">
            ✨ Update Service
          </h3>

          <form onSubmit={handleUpdateService} className="space-y-6">
            <div>
              <label className="block text-lg mb-1 text-gray-700">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-lg mb-1 text-gray-700">
                Description
              </label>
              <textarea
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
              ></textarea>
            </div>

            <div>
              <label className="block text-lg mb-1 text-gray-700">
                Price (₹)
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-lg mb-2 text-gray-700">
                Service Image
              </label>

              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <img
                  src={imagePreview || "/imgPL.webp"}
                  className="w-40 h-40 rounded-lg object-cover border shadow-md"
                  alt="Preview"
                />

                <input
                  type="file"
                  accept="image/*"
                  onChange={changePhotoHandler}
                  className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-lg mb-1 text-gray-700">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400 bg-white"
              >
                <option value="">Select category</option>
                <option value="Home Cleaning">Home Cleaning</option>
                <option value="Electrician">Electrician</option>
                <option value="Carpenter">Carpenter</option>
                <option value="Motor Mechanic">Motor Mechanic</option>
                <option value="Salon">Salon</option>
                <option value="Any other">Any other</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md"
            >
              Update Service 🚀
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default UpdateService;
