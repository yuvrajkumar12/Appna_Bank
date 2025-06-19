import "./App.css";
import Header from "./componentes/Header"; // Corrected the spelling of "componentes" to "components"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./pages/signup";
import Dashboard from "./pages/Dashboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <>
      <ToastContainer/>
        <Router basename="/Appna_Bank">
          <Routes>
            <Route path="/Appna_Bank/" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
    </>
  );
}

export default App;
