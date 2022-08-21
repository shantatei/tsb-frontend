import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Login,
  Signup,
  Home,
  Settings,
  Profile,
  ProductInfo,
  Favourites,
  Cart,
  Checkout,
  Dashboard,
  Users,
  Sell,
  Roles,
  Products,
  Orders,
  Unauthorized,
  Missing,
} from "./pages";
import "./css/styles.css";
import "./css/profile.css";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import AdminLayout from "./components/AdminLayout";

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/profile/:id" element={<Profile />}></Route>
          <Route path="/product" element={<ProductInfo />}></Route>

          {/* isAuth route */}
          <Route element={<RequireAuth allowedRoles={["Customer"]} />}>
            <Route path="/settings" element={<Settings />}></Route>
            <Route path="/favourites" element={<Favourites />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/checkout" element={<Checkout />}></Route>
          </Route>

          {/* admin routes */}
          <Route element={<RequireAuth allowedRoles={["Admin"]} />}>
            <Route path="/" element={<AdminLayout />}>
              <Route path="/dashboard" element={<Dashboard />}></Route>
              <Route path="/users" element={<Users />}></Route>
              <Route path="/roles" element={<Roles />}></Route>
              <Route path="/products" element={<Products />}></Route>
              <Route path="/orders" element={<Orders />}></Route>
            </Route>
          </Route>

          {/* seller routes */}
          <Route element={<RequireAuth allowedRoles={["Seller"]} />}>
            <Route path="/sell" element={<Sell />}></Route>
          </Route>

          <Route path="*" element={<Missing />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

        </Route>

      </Routes>
    </Router>
  );
}

export default App;
