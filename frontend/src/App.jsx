import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateProject from "./pages/CreateProject.jsx";
import Login from "./pages/Login.jsx";
import ProjectDetails from "./pages/ProjectDetails.jsx";
import ProtectedRoute from "../src/components/PrivateRoute.jsx";
//import toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/projects" element={<CreateProject />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
