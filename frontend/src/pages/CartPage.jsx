import { useEffect, useState } from "react";
import axios from "axios";

const CartPage = () => {
  const [cart, setCart] = useState(null);

  const userData = JSON.parse(localStorage.getItem("user"));
  const token = userData?.token;

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("http://localhost:4001/api/v1/user/cart", {
          headers: {
            Authorization: `Bearer ${token}`, //  send token
          },
          withCredentials: true,
        });
        setCart(res.data);
      } catch (error) {
        console.error("Error fetching cart", error);
      }
    };
    fetchCart();
  }, []);

  const handleRemove = async (serviceId) => {
    try {
      const res = await axios.delete(
        `http://localhost:4001/api/v1/user/cart/${serviceId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, //  send token
          },
          withCredentials: true,
        }
      );
      setCart(res.data); // update cart
    } catch (error) {
      console.error("Error removing item", error);
    }
  };

  if (!cart) return <p>Loading cart...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.items.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <ul>
          {cart.items.map((item) => (
            <li
              key={item.serviceId._id}
              className="flex justify-between items-center border-b py-2"
            >
              <span>
                {item.serviceId.name} - ₹{item.serviceId.price} x{" "}
                {item.quantity}
              </span>
              <button
                onClick={() => handleRemove(item.serviceId._id)}
                className="text-red-500"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartPage;
