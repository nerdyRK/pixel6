import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./app.css";

const App = () => {
  return (
    <div className="min-h-screen w-screen text-white">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default App;
