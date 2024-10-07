import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Login from "./Login/Login";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
