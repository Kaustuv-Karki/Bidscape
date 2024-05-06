import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Header from "./components/Header.jsx";
import ProjectPage from "./pages/ProjectPage.jsx";
import AdminProjects from "./pages/AdminProjects.jsx";
import AdminProjectBids from "./pages/AdminProjectBids.jsx";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/project/:id" element={<ProjectPage />} />
        <Route path="/admin/projects" element={<AdminProjects />} />
        <Route path="/admin/projectBids/:id" element={<AdminProjectBids />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
