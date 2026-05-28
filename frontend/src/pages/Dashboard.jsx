import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

function Dashboard() {

  const [learners, setLearners] = useState([]);

  // USER
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // PROFILE
  const profile = (() => {
    try {
      return JSON.parse(
        localStorage.getItem("profileData") || "{}"
      );
    } catch {
      return {};
    }
  })();

  // COINS
  const coins = Number(
    localStorage.getItem("coins") || 0
  );

  // LOAD DATA
  useEffect(() => {

    const loadData = async () => {

      try {

        const res = await fetch(
          "http://localhost:5000/api/challenges"
        );

        if(!res.ok){

          setLearners([]);
          return;

        }

        const data = await res.json();

        setLearners(data || []);

      } catch(err){

        console.log(err);

        setLearners([]);

      }

    };

    loadData();

  }, []);

  // STATS
  const completed =
    learners.filter(
      (l)=>l.status === "completed"
    ).length;

  const inProgress =
    learners.length - completed;

  return(

    <div className="main-container">

      <Sidebar />

      <div className="content">

        {/* HEADER */}
        <div
          style={{
            display:"flex",
            justifyContent:"space-between",
            alignItems:"center",
            padding:"20px",
            background:"#eef2ff",
            borderRadius:"12px",
            marginBottom:"20px"
          }}
        >

          <h2 style={{color:"#1e3a8a"}}>

            Hello {user?.name} 👋

          </h2>

          <div
            style={{
              background:"#1e3a8a",
              color:"white",
              padding:"10px 16px",
              borderRadius:"10px"
            }}
          >

            🪙 {coins}

          </div>

        </div>

        {/* STATS */}
        <div className="stats-row">

          <div className="mini-card">

            <h3>Total Learners</h3>

            <p>{learners.length}</p>

          </div>

          <div className="mini-card">

            <h3>Completed</h3>

            <p>{completed}</p>

          </div>

          <div className="mini-card">

            <h3>In Progress</h3>

            <p>{inProgress}</p>

          </div>

        </div>

        {/* SKILLS */}
        <div className="dashboard-card-large">

          <h2>Skills Overview</h2>

          <div className="skills">

            {
              ["React","DSA","Java","Python"]
              .map((s)=>(

                <span key={s}>
                  {s}
                </span>

              ))
            }

          </div>

        </div>

        {/* ACTIVITY */}
        <div className="dashboard-card-large">

          <h2>Recent Activity</h2>

          {
            learners.length === 0 ? (

              <p>No activity yet</p>

            ) : (

              learners
              .slice(-5)
              .reverse()
              .map((l,i)=>(

                <div
                  key={i}
                  style={{
                    padding:"10px",
                    margin:"8px 0",
                    borderLeft:"4px solid #1e3a8a",
                    background:"#f8fafc",
                    borderRadius:"8px"
                  }}
                >

                  <b>{l.name}</b>

                  {" "}completed{" "}

                  <b>{l.skill}</b>

                  <p>

                    🪙 Coins:
                    {" "}
                    {l.coins || 0}

                    {" | "}

                    Status:
                    {" "}
                    {l.status || "pending"}

                  </p>

                </div>

              ))

            )
          }

        </div>

      </div>

    </div>

  );

}

export default Dashboard;