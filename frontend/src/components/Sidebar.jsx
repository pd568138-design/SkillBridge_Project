import { Link, useLocation, useNavigate } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="sidebar">

      <div className="logo-box">
        <h2>SkillBridge</h2>
        <p>Student Collaboration Platform</p>
      </div>

      <div className="nav-links">

        <Link to="/dashboard" className={location.pathname === "/dashboard" ? "active-link" : ""}>
          Dashboard
        </Link>

        <Link to="/learners" className={location.pathname === "/learners" ? "active-link" : ""}>
          Learners
        </Link>

        <Link to="/mentors" className={location.pathname === "/mentors" ? "active-link" : ""}>
          Mentors
        </Link>

        <Link to="/challenges" className={location.pathname === "/challenges" ? "active-link" : ""}>
          Challenges & Quiz
        </Link>

        <Link to="/hackathon" className={location.pathname === "/hackathon" ? "active-link" : ""}>
          Hackathon
        </Link>

        <Link to="/profile" className={location.pathname === "/profile" ? "active-link" : ""}>
          Profile Setup
        </Link>

        <Link to="/portfolio" className={location.pathname === "/portfolio" ? "active-link" : ""}>
          Portfolio
        </Link>

      </div>

      {/* ✅ LOGOUT ONLY */}
      <button
        onClick={logout}
        className="logout-btn"
      >
        Logout
      </button>

    </div>
  );
}

export default Sidebar;