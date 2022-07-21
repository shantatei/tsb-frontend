import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login, Navbar, Signup, Listings, Settings, Profile } from "./components";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        
        <Routes>
          <Route path="/" element = {<Listings/>}> </Route>
          <Route path="/settings" element = {<Settings/>}> </Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
