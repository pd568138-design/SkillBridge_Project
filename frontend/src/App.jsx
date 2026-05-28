import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Learners from "./pages/Learners";
import Mentors from "./pages/Mentors";
import Challenges from "./pages/Challenges";
import Quiz from "./pages/Quiz";

// 🔥 MISSING PAGES ADD HERE
import Hackathon from "./pages/Hackathon";
import ProfileForm from "./pages/ProfileForm";
import Portfolio from "./pages/Portfolio";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/learners" element={<Learners />} />
        <Route path="/mentors" element={<Mentors />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/quiz" element={<Quiz />} />

        {/* 🔥 NEW ROUTES */}
        <Route path="/hackathon" element={<Hackathon />} />
        <Route path="/profile" element={<ProfileForm />} />
        <Route path="/portfolio" element={<Portfolio />} />

      </Routes>

    </BrowserRouter>

  );
}

export default App;