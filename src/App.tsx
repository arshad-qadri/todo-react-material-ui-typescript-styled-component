import Navbar from "./components/navbar/Navbar";
import Todo from "./pages/Todo";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
    <div className="w-screen bg-gray-100 mx-auto min-h-screen overflow-x-hidden overflow-y-auto">
      <div className="md:w-10/12 mx-auto bg-white min-h-screen p-5">
        <Navbar />
        <Routes>
          <Route path="/" element={<Todo />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
