import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <main className="App">
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Navbar />
        <div style={{ width: "100%", height: "70px" }}></div>
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;
