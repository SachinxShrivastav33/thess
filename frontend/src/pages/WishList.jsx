import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";

const WishList = () => {
  const [wishList, setWishList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userData = JSON.parse(localStorage.getItem("user"));
  const token = userData?.token;

  useEffect(() => {
    const fetchWishList = async () => {
      if (!token) {
        setError("Please log in to view your wish list.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await axios.get(
          "http://localhost:4001/api/v1/user/wish-list",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        setWishList(res.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch wish list. Please try again.");
        console.error("Error fetching wish list", err);
      } finally {
        setLoading(false);
      }
    };
    fetchWishList();
  }, [token]);

  const handleRemove = async (serviceId) => {
    if (!token) {
      setError("Please log in to remove items from your wish list.");
      return;
    }

    try {
      const res = await axios.delete(
        `http://localhost:4001/api/v1/user/wish-list/${serviceId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      setWishList(res.data); // Update wish list state
      toast.success("service remove from wish-list Successfull !!");
    } catch (err) {
      setError("Failed to remove item. Please try again.");
      console.error("Error removing item", err);
    }
  };

  if (loading)
    return <p className="text-center text-gray-500">Loading Wish-List...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <>
      <div className="flex">
        <Navbar />
        <div className="min-h-screen ml-0 md:ml-64 w-full bg-gray-100 p-6 pt-10">
          {" "}
          {/* Added pt-20 to offset Navbar height */}
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center md:text-left">
            Your Wish-List
          </h1>
          {wishList?.items?.length === 0 ? (
            <p className="text-center text-gray-500">
              No items in your wish list.
            </p>
          ) : (
            <div className="max-w-4xl mx-auto">
              <ul className="space-y-4">
                {wishList?.items?.map((item) => (
                  <li
                    key={item.serviceId._id}
                    className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={
                          item.serviceId.image?.url || "/placeholder-image.jpg"
                        } // Fallback image
                        alt={item.serviceId.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div>
                        <span className="text-lg font-medium text-gray-700">
                          {item.serviceId.name || "Unnamed Service"}
                        </span>
                        <p className="text-gray-500">
                          ₹{item.serviceId.price || 0} x {item.quantity || 1}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemove(item.serviceId._id)}
                      className="px-2 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-xl transition-colors"
                    >
                      <MdDelete />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WishList;
