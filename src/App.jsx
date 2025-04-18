import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import Learn from "./pages/Learn";
import GroupStudy from "./pages/GroupStudy";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/learn/:courseId" element={<Learn />} />
        <Route path="/elearning" element={<Learn />} />
        <Route path="/groupstudy" element={<GroupStudy />} />
        <Route path="/skills" element={<Learn />} />
        <Route path="/mentorship" element={<GroupStudy />} />
        <Route path="/entrepreneurship" element={<Learn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;