// import { Navigate, Route, Routes } from "react-router-dom";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import { Toaster } from "react-hot-toast";
// import Services from "./pages/Services";
// import AdminSignup from "./admin/AdminSignup";
// import AdminLogin from "./admin/AdminLogin";
// import Dashboard from "./admin/Dashboard";
// import ServiceCreate from "./admin/ServiceCreate";
// import UpdateService from "./admin/UpdateService";
// import OurServices from "./admin/OurServices";
// import MyServices from "./pages/MyServices";
// import Profile from "./pages/Profile";
// import BookServices from "./pages/BookServices";
// import CartPage from "./pages/CartPage";
// import NotFound from "./pages/NotFound";
// import Navbar from "./components/Navbar";
// import WishList from "./pages/WishList";
// import ProviderLogin from "./provider/ProviderLogin";
// import ProviderSignup from "./provider/providerSignup";
// import ProviderDashboard from "./provider/ProviderDashboard";
// import ProviderNavbar from "./provider/ProviderNavbar";
// import GetTotalServices from "./admin/GetTotalServices";
// import GetTotoalUser from "./admin/GetTotoalUser";
// import AdminProfile from "./admin/AdminProfile";
// import BookingModel from "./pages/BookingModal";

// const App = () => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const admin = JSON.parse(localStorage.getItem("admin"));

//   return (
//     <>
//       <div>
//         <Routes>
//           <Route path="/navbar" element={<Navbar />} />
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/services" element={<Services />} />
//           {/* <Route path="/buy-services" element={<Buy />} /> */}
//           <Route path="/book-services/:serviceId" element={<BookServices />} />
//           <Route path="/my-order" element={<MyServices />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/cart" element={<CartPage />} />
//           <Route path="/wish-list" element={<WishList />} />
//           <Route path="*" element={<NotFound />} />
//           <Route path="bookkk" element={<BookingModel />} />

//           {/* Admin Routes */}
//           <Route path="/admin/signup" element={<AdminSignup />} />
//           <Route path="/admin/login" element={<AdminLogin />} />
//           <Route
//             path="/admin/dashboard"
//             element={admin ? <Dashboard /> : <Navigate to={"/admin/login"} />}
//             // element={<Dashboard />}
//           />
//           <Route path="/admin/create-service" element={<ServiceCreate />} />
//           <Route path="/admin/update-service/:id" element={<UpdateService />} />
//           <Route path="/admin/our-services" element={<OurServices />} />
//           <Route path="/admin/user" element={<GetTotoalUser />} />
//           <Route path="/admin/services" element={<GetTotalServices />} />
//           <Route path="/admin/profile" element={<AdminProfile />} />

//           {/* Provider Routes */}
//           <Route path="/provider/login" element={<ProviderLogin />} />
//           <Route path="/provider/signup" element={<ProviderSignup />} />
//           <Route path="/provider/dashboard" element={<ProviderDashboard />} />
//           <Route path="/provider/navbar" element={<ProviderNavbar />} />
//         </Routes>

//         <Toaster />
//       </div>
//     </>
//   );
// };

// export default App;

import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import Services from "./pages/Services";
import AdminSignup from "./admin/AdminSignup";
import AdminLogin from "./admin/AdminLogin";
import Dashboard from "./admin/Dashboard";
import ServiceCreate from "./admin/ServiceCreate";
import UpdateService from "./admin/UpdateService";
import OurServices from "./admin/OurServices";
import MyServices from "./pages/MyServices";
import Profile from "./pages/Profile";
import BookServices from "./pages/BookServices";
import CartPage from "./pages/CartPage";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import WishList from "./pages/WishList";
import ProviderLogin from "./provider/ProviderLogin";
import ProviderSignup from "./provider/providerSignup";
import ProviderDashboard from "./provider/ProviderDashboard";
import ProviderNavbar from "./provider/ProviderNavbar";
import GetTotalServices from "./admin/GetTotalServices";
import GetTotoalUser from "./admin/GetTotoalUser";
import AdminProfile from "./admin/AdminProfile";
import BookingModel from "./pages/BookingModal";

// ✅ Import Buy Page (New)
import Buy from "./pages/Buy";

const App = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const admin = JSON.parse(localStorage.getItem("admin"));

  return (
    <>
      <div>
        <Routes>
          {/* General Routes */}
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/services" element={<Services />} />

          {/* ✅ Stripe Purchase Route */}
          <Route path="/buy/:serviceId" element={<Buy />} />

          <Route path="/book-services/:serviceId" element={<BookServices />} />
          <Route path="/my-order" element={<MyServices />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wish-list" element={<WishList />} />
          <Route path="*" element={<NotFound />} />
          <Route path="bookkk" element={<BookingModel />} />

          {/* Admin Routes */}
          <Route path="/admin/signup" element={<AdminSignup />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={admin ? <Dashboard /> : <Navigate to={"/admin/login"} />}
          />
          <Route path="/admin/create-service" element={<ServiceCreate />} />
          <Route path="/admin/update-service/:id" element={<UpdateService />} />
          <Route path="/admin/our-services" element={<OurServices />} />
          <Route path="/admin/user" element={<GetTotoalUser />} />
          <Route path="/admin/services" element={<GetTotalServices />} />
          <Route path="/admin/profile" element={<AdminProfile />} />

          {/* Provider Routes */}
          <Route path="/provider/login" element={<ProviderLogin />} />
          <Route path="/provider/signup" element={<ProviderSignup />} />
          <Route path="/provider/dashboard" element={<ProviderDashboard />} />
          <Route path="/provider/navbar" element={<ProviderNavbar />} />
        </Routes>

        <Toaster />
      </div>
    </>
  );
};

export default App;
