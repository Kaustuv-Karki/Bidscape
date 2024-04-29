import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import ProjectPage from "./pages/ProjectPage";
import AdminProjects from "./pages/AdminProjects";
import AdminProjectBids from "./pages/AdminProjectBids";

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
