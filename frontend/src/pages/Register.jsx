import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleRegister = async () => {

    if (
      !formData.name ||
      !formData.email ||
      !formData.password
    ) {

      alert("Fill all fields");

      return;

    }

    try {

      const res = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      );

      const data = await res.json();

      if (res.ok) {

        alert("Registered Successfully");

        navigate("/login");

      } else {

        alert(data.message);

      }

    } catch (err) {

      console.log(err);

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

        <button onClick={handleRegister}>
          Register
        </button>

        <p>
          Already have account?
          <Link to="/login">
            Login
          </Link>
        </p>

      </div>

    </div>

  );

}

export default Register;