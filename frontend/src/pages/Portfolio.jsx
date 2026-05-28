
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

function Portfolio(){

  const [profile,setProfile] = useState({

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

  const [saved,setSaved] = useState(false);

  const tasks =
    JSON.parse(
      localStorage.getItem("tasks")
    ) || [];

  const completedTasks =
    tasks.filter(
      (item)=>item.completed
    );

  const coins =
    localStorage.getItem("coins") || 0;

  /* LOAD SAVED PROFILE */

  useEffect(()=>{

    const savedProfile =
      JSON.parse(
        localStorage.getItem("profileData")
      );

    if(savedProfile){

      setProfile(savedProfile);

    }

  },[]);

  /* HANDLE INPUT */

  const handleChange = (e) => {

    setProfile({

      ...profile,
      [e.target.name]:e.target.value

    });

  };

  /* SAVE PROFILE */

  const saveProfile = () => {

    localStorage.setItem(
      "profileData",
      JSON.stringify(profile)
    );

    setSaved(true);

    setTimeout(()=>{

      setSaved(false);

    },2000);

  };

  return(

    <div className="main-container">

      <Sidebar />

      <div className="content">

        {/* FORM */}

        <div className="top-section">

          <h1>
            Portfolio Generator 🚀
          </h1>

          <p>
            Create your professional student portfolio.
          </p>

        </div>

        <div className="profile-form">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={profile.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={profile.email}
            onChange={handleChange}
          />

          <input
            type="text"
            name="contact"
            placeholder="Contact Number"
            value={profile.contact}
            onChange={handleChange}
          />

          <input
            type="text"
            name="college"
            placeholder="College Name"
            value={profile.college}
            onChange={handleChange}
          />

          <input
            type="text"
            name="skills"
            placeholder="Skills"
            value={profile.skills}
            onChange={handleChange}
          />

          <input
            type="text"
            name="project"
            placeholder="Hackathon Project"
            value={profile.project}
            onChange={handleChange}
          />

          <input
            type="text"
            name="certificate"
            placeholder="Certificates"
            value={profile.certificate}
            onChange={handleChange}
          />

          <input
            type="text"
            name="course"
            placeholder="Completed Courses"
            value={profile.course}
            onChange={handleChange}
          />

          <textarea
            name="about"
            placeholder="About You"
            value={profile.about}
            onChange={handleChange}
          />

          <button onClick={saveProfile}>

            Save Portfolio

          </button>

          {
            saved &&
            <p className="save-msg">
              ✅ Portfolio Saved Successfully
            </p>
          }

        </div>

        {/* LIVE PORTFOLIO PREVIEW */}

        <div className="portfolio-hero">

          <div className="profile-circle">

            {
              profile.name
              ? profile.name.charAt(0)
              : "S"
            }

          </div>

          <h1>
            {profile.name || "Student Name"}
          </h1>

          <p>
            {profile.college || "College Name"}
          </p>

        </div>

        <div className="portfolio-stats">

          <div className="portfolio-mini">

            <h3>🪙 Coins</h3>

            <p>{coins}</p>

          </div>

          <div className="portfolio-mini">

            <h3>🏆 Completed</h3>

            <p>{completedTasks.length}</p>

          </div>

          <div className="portfolio-mini">

            <h3>🔥 Rank</h3>

            <p>Gold</p>

          </div>

        </div>

        <div className="portfolio-card">

          <div className="portfolio-section">

            <h2>About</h2>

            <p>{profile.about}</p>

          </div>

          <div className="portfolio-section">

            <h2>Contact</h2>

            <p>{profile.contact}</p>
            <p>{profile.email}</p>

          </div>

          <div className="portfolio-section">

            <h2>Skills</h2>

            <div className="skills">

              {
                profile.skills
                .split(",")
                .map((skill,index)=>(

                  <span key={index}>
                    {skill}
                  </span>

                ))
              }

            </div>

          </div>

          <div className="portfolio-section">

            <h2>Hackathon Project</h2>

            <p>{profile.project}</p>

          </div>

          <div className="portfolio-section">

            <h2>Certificates</h2>

            <p>{profile.certificate}</p>

          </div>

          <div className="portfolio-section">

            <h2>Completed Courses</h2>

            <p>{profile.course}</p>

          </div>

          <div className="portfolio-section">

            <h2>Completed Weekly Challenges</h2>

            <ul>

              {
                completedTasks.map((item)=>(

                  <li key={item.id}>

                    🚀 {item.text}
                    ({item.difficulty})

                  </li>

                ))
              }

            </ul>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Portfolio;