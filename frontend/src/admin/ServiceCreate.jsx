import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";

export default function ServiceCreate() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const navigate = useNavigate();

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const admin = JSON.parse(localStorage.getItem("admin"));
    const token = admin?.token;

    if (!token) return navigate("/admin/login");

    const fd = new FormData();
    fd.append("title", title);
    fd.append("description", description);
    fd.append("price", price);
    fd.append("category", category);
    fd.append("image", image);

    try {
      const res = await axios.post(
        "http://localhost:4001/api/v1/services/create",
        fd,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(res.data.message);
      navigate("/admin/our-services");
    } catch (err) {
      toast.error(err.response?.data?.errors || "Error creating service");
    }
  };

  return (
    <div className="flex">
      <AdminNavbar />

      <div className="w-full flex justify-center p-6">
        <div className="w-full max-w-xl bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Create Service
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border rounded-md p-2 w-full focus:ring focus:ring-blue-200 outline-none"
            />

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded-md p-2 w-full focus:ring focus:ring-blue-200 outline-none"
              rows={4}
            />

            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border rounded-md p-2 w-full focus:ring focus:ring-blue-200 outline-none"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border rounded-md p-2 w-full focus:ring focus:ring-blue-200 outline-none"
            >
              <option value="">Select Category</option>
              <option>Home Cleaning</option>
              <option>Electrician</option>
              <option>Carpenter</option>
              <option>Motor Mechanic</option>
              <option>Salon</option>
            </select>

            <div>
              <input
                type="file"
                onChange={changePhotoHandler}
                className="border rounded-md p-2 w-full"
              />

              {preview && (
                <img
                  src={preview}
                  className="w-full h-48 object-cover rounded-md mt-3 border"
                />
              )}
            </div>

            <button className="bg-blue-600 hover:bg-blue-700 transition text-white py-2 w-full rounded-md font-semibold">
              Create Service
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
