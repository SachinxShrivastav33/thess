import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import toast from "react-hot-toast";

const Home = () => {
  const [services, setServices] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // token
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // fetch services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4001/api/v1/services/services",
          { withCredentials: true }
        );
        // console.log(response.data);
        setServices(response.data.services);
      } catch (error) {
        console.log("error in fetchServices ", error.message);
      }
    };
    fetchServices();
  }, []);

  // logout
  const handleLogout = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4001/api/v1/user/logout`,
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsLoggedIn(false);
    } catch (error) {
      console.log("Error in logging out ", error);
      toast.error(error.response.data.errors || "Error in logging out");
    }
  };

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="bg-gradient-to-r from-black to-blue-950 px-10">
        <div className="h-[1250px] md:h-[1050px] text-white container mx-auto">
          {/* Header */}
          <header className="flex items-center justify-between p-6 ">
            <div className="flex items-center space-x-2">
              <h1 className="md:text-2xl text-orange-500 font-bold">
                ServiceHub
              </h1>
            </div>

            <div className="space-x-4">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="bg-transparent text-white text-xs md:text-lg md:py-2 md:px-4 p-2 border border-white rounded"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to={"/login"}
                    className="bg-transparent text-white text-xs md:text-lg md:py-2 md:px-4 p-2 border border-white rounded hover:text-orange-500"
                  >
                    Login
                  </Link>
                  <Link
                    to={"/signup"}
                    className="bg-transparent text-white text-xs md:text-lg md:py-2 md:px-4 p-2 border border-white rounded hover:text-orange-500"
                  >
                    Signup
                  </Link>
                </>
              )}
            </div>
          </header>

          {/* Main section */}
          <section className="text-center py-20">
            <h1 className="text-4xl font-semibold text-orange-500">
              ServiceHub
            </h1>

            <br />
            <p className="text-gray-500">
              Book reliable professionals for home cleaning, electrical,
              plumbing, and more with ease.
            </p>
            <div className="space-x-4 mt-8">
              <Link
                to={"/services"}
                className="bg-green-500 text-white p-2 md:py-3 md:px-6 rounded font-semibold hover:bg-white duration-300 hover:text-black"
              >
                Explore services
              </Link>
            </div>
          </section>

          <section className="p-10">
            <Slider {...settings}>
              {services.map((service) => (
                <div key={service._id} className="p-4">
                  <div className="relative flex-shrink-0 w-92 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                    <div className="bg-gray-900 rounded-lg overflow-hidden group">
                      {/* Image with gradient overlay */}
                      <div className="relative">
                        <img
                          className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          src={service.image?.url}
                          alt={service.title}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center p-4">
                          <h2 className="text-lg md:text-xl font-bold text-white">
                            {service.title}
                          </h2>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-6 text-center">
                        <p className="text-gray-300 mb-4 text-sm truncate">
                          {service.description.length > 60
                            ? service.description.slice(0, 60) + "..."
                            : service.description}
                        </p>

                        <Link
                          to={`/book-service/${service._id}`}
                          className="mt-4 inline-block bg-gradient-to-r from-orange-400 to-orange-600 text-white py-2 px-6 rounded-full font-semibold shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:from-blue-500 hover:to-blue-700"
                        >
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </section>

          <hr />
          {/* Footer */}
          <footer className="my-12">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="flex flex-col items-center md:items-start">
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl text-orange-500 font-bold">
                    ServiceHub
                  </h1>
                </div>
                <div className="mt-3 ml-2 md:ml-8">
                  <p className="mb-2">Follow us</p>
                  <div className="flex space-x-4">
                    <a href="">
                      <FaFacebook className="text-2xl hover:text-blue-400 duration-300" />
                    </a>
                    <a href="">
                      <FaInstagram className="text-2xl hover:text-pink-600 duration-300" />
                    </a>
                    <a href="">
                      <FaTwitter className="text-2xl hover:text-blue-600 duration-300" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="items-center mt-6 md:mt-0 flex flex-col">
                <h3 className="text-lg font-semibold md:mb-4">Quick Links</h3>
                <ul className=" space-y-2 text-gray-400">
                  <li className="hover:text-white cursor-pointer duration-300">
                    services
                  </li>
                  <li className="hover:text-white cursor-pointer duration-300">
                    MyOrder
                  </li>
                  <li className="hover:text-white cursor-pointer duration-300">
                    etc
                  </li>
                </ul>
              </div>
              <div className="items-center mt-6 md:mt-0 flex flex-col">
                <h3 className="text-lg font-semibold mb-4">
                  copyrights &#169; 2025
                </h3>
                <ul className=" space-y-2 text-center text-gray-400">
                  <li className="hover:text-white cursor-pointer duration-300">
                    Terms & Conditions
                  </li>
                  <li className="hover:text-white cursor-pointer duration-300">
                    Privacy Policy
                  </li>
                  <li className="hover:text-white cursor-pointer duration-300">
                    Refund & Cancellation
                  </li>
                </ul>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Home;
