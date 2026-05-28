import { useState } from "react";
import Sidebar from "../components/Sidebar";

function ProfileForm(){

  const [formData,setFormData] = useState({

    name:"",
    email:"",
    contact:"",
    college:"",
    skills:"",
    project:"",
    certificate:"",
    course:"",
    about:""

  });

  const handleChange = (e) => {

    setFormData({

      ...formData,
      [e.target.name]:e.target.value

    });

  };

  const saveProfile = () => {

    localStorage.setItem(
      "profileData",
      JSON.stringify(formData)
    );

    alert("Profile Saved");

  };

  return(

    <div className="main-container">

      <Sidebar />

      <div className="content">

        <div className="top-section">

          <h1>Profile Generator 🚀</h1>

          <p>
            Build your student portfolio profile.
          </p>

        </div>

        <div className="profile-form">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />

          <input
            type="text"
            name="contact"
            placeholder="Contact Number"
            onChange={handleChange}
          />

          <input
            type="text"
            name="college"
            placeholder="College Name"
            onChange={handleChange}
          />

          <input
            type="text"
            name="skills"
            placeholder="Skills"
            onChange={handleChange}
          />

          <input
            type="text"
            name="project"
            placeholder="Hackathon Project"
            onChange={handleChange}
          />

          <input
            type="text"
            name="certificate"
            placeholder="Certificates"
            onChange={handleChange}
          />

          <input
            type="text"
            name="course"
            placeholder="Completed Courses"
            onChange={handleChange}
          />

          <textarea
            name="about"
            placeholder="About You"
            onChange={handleChange}
          />

          <button onClick={saveProfile}>

            Save Portfolio

          </button>

        </div>

      </div>

    </div>

  );
}

export default ProfileForm;