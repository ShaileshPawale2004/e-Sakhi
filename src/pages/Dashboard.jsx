import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  FaBook,
  FaBrain,
  FaUserTie,
  FaUsers,
  FaBriefcase,
  FaMedal,
  FaDownload,
  FaComments,
  FaUser,
  FaInfoCircle,
  FaSignOutAlt
} from "react-icons/fa";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const logout = () => {
    signOut(auth).then(() => navigate("/"));
  };

  const modules = [
    {
      icon: <FaBook />,
      title: "Localized E-Learning",
      description: "Access educational content tailored to your local context and needs.",
      link: "/searchFeed"
    },
    {
      icon: <FaUsers />,
      title: "Group Study & Mentorship",
      description: "Learn together with peers/mentors in collaborative study sessions.",
      link: "https://ruralgrow.onrender.com"
    },
    {
      icon: <FaBriefcase />,
      title: "Micro-Entrepreneurship",
      description: "Learn business skills and start your own micro-enterprise.",
      link: "/entrepreneurship"
    },
    {
      icon: <FaInfoCircle />,
      title: "Govt. Schemes for Women",
      description: "Explore government programs and schemes dedicated to women's empowerment.",
      link: "/schemes"
    }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <header className="dashboard-header">
          <h1 className="dashboard-title">Welcome to Your Learning Journey</h1>
          <div className="header-buttons">
            <Link to="/about" className="action-card">
              <FaInfoCircle className="action-icon" />
              <h3 className="action-title">About</h3>
            </Link>
            <Link to="/profile" className="action-card">
              <FaUser className="action-icon" />
              <h3 className="action-title">Profile</h3>
            </Link>
            <button className="action-card" onClick={logout}>
              <FaSignOutAlt className="action-icon" />
              <h3 className="action-title">Logout</h3>
            </button>
          </div>
        </header>

        <div className="module-grid">
          {modules.map((module, index) => (
            <a key={index} href={module.link} className="module-card">
              <div className="module-icon">{module.icon}</div>
              <h3 className="module-title">{module.title}</h3>
              <p className="module-description">{module.description}</p>
            </a>
          ))}

          <Link to="/resources" className="module-card">
            <FaDownload className="module-icon" />
            <h3 className="module-title">Learning Resources</h3>
            <p className="module-description">
              Access study guides, planners, and educational materials in pdf
            </p>
          </Link>

          <Link to="/feedback" className="module-card">
            <FaComments className="module-icon" />
            <h3 className="module-title">Share Feedback</h3>
            <p className="module-description">
              Help us improve with your text feedback
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
