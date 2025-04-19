import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import Learn from "./pages/Learn";
import GroupStudy from "./pages/GroupStudy";
import CourseDetail from "./pages/CourseDetail";
import Quiz from "./pages/Quiz";
import Progress from "./pages/Progress";
import Resources from "./pages/Resources";
import Feedback from "./pages/Feedback";
import Profile from "./pages/Profile";
import About from "./pages/About";
import SearchFeed from "./pages/SearchFeed";
import Video from "./pages/Video";
import Entrepreneurship from "./pages/Entrepreneurship"; 
import PracticeDetails from './pages/PracticeDetails';
import Schemes from "./pages/Schemes";
import ResourceSearch from "./pages/ResourceSearch";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/learn/:courseId" element={<CourseDetail />} />
        <Route path="/learn/:courseId/quiz" element={<Quiz />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/schemes" element={<Schemes />} />
        <Route path="/elearning" element={<Learn />} />
        <Route path="/groupstudy" element={<GroupStudy />} />
        <Route path="/skills" element={<Learn />} />
        <Route path="/mentorship" element={<GroupStudy />} />
        <Route path="/entrepreneurship" element={<Entrepreneurship />} /> {/* ✅ fixed */}
        <Route path="/entrepreneurship/:practiceId" element={<PracticeDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/searchFeed" element={<SearchFeed />} />
        <Route path='/ResourceSearch' element={<ResourceSearch/>}/>
        <Route path="/video/:vpid" element={<Video />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
