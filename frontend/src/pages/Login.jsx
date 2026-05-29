import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleLogin = async () => {

    if (
      !formData.email ||
      !formData.password
    ) {

      alert("Fill all fields");
      return;

    }

    try {

      const res = await fetch(
        "https://skillbridge-project-1-ck1y.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      );

      const data = await res.json();

      if(res.ok){

        // SAVE USER
        localStorage.setItem(
          "user",
          JSON.stringify(data)
        );

        navigate("/dashboard");

      } else {

        alert(data.message);

      }

    } catch(err){

      console.log(err);

    }

  };

  return(

    <div className="login-container">

      <div className="login-box">

        <h1>SkillBridge</h1>

        <p>Student Collaboration Platform</p>

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

        <button onClick={handleLogin}>
          Login
        </button>

        <p>

          Don't have account?

          <Link to="/">
            Register
          </Link>

        </p>

      </div>

    </div>

  );

}

export default Login;
