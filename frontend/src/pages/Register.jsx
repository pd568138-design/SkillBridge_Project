import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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

  const handleRegister = async () => {

    if (!formData.name || !formData.email || !formData.password) {
      alert("Fill all fields");
      return;
    }

    setLoading(true);

    try {

      const res = await fetch(
        "https://skillbridge-project-1-ck1y.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      );

      let data;
      try {
        data = await res.json();
      } catch (err) {
        data = { message: "Invalid server response" };
      }

      if (res.ok) {

        alert("Registered Successfully");

        navigate("/login");

      } else {

        alert(data.message || "Registration failed");

      }

    } catch (err) {
      console.log("Register Error:", err);
      alert("Network Error / Server not responding");
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="login-container">

      <div className="login-box">

        <h1>SkillBridge</h1>

        <p>Create Account</p>

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
        />

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

        <button onClick={handleRegister} disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        <p>
          Already have account?{" "}
          <Link to="/login">Login</Link>
        </p>

      </div>

    </div>

  );

}

export default Register;
