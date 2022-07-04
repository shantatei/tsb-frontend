import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login, Navbar, Signup, Listings } from "./components";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route  path="/" element = {<Listings/>}> </Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
