import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      alert("Fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        "https://skillbridge-project-3.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      );

      const data = await res.json();

      console.log("LOGIN RESPONSE:", data);

      if (res.ok) {

        // Save only user details
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        // Save JWT token
        localStorage.setItem(
          "token",
          data.token
        );

        alert("Login Successful");

        navigate("/dashboard");

      } else {
        alert(data.message || "Login failed");
      }

    } catch (err) {
      console.error("LOGIN ERROR:", err);
      alert("Unable to connect to server");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">

      <div className="login-box">

        <h1>SkillBridge</h1>

        <p>
          Student Collaboration Platform
        </p>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p>
          Don't have account?{" "}

          <Link to="/">
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;
