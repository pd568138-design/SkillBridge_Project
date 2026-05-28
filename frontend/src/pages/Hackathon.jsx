import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

function Hackathon() {

  const [skill, setSkill] = useState("");
  const [learners, setLearners] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [team, setTeam] = useState([]);
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("learners")) || [];
    setLearners(data);
  }, []);

  // 🔍 SEARCH BY SKILL
  const search = () => {

    const res = learners.filter(l =>
      l.skill.toLowerCase().includes(skill.toLowerCase())
    );

    setSuggestions(res.slice(0, 5)); // 👉 ONLY 5 MEMBERS
  };

  // ➕ ADD TO TEAM
  const addToTeam = (person) => {

    if (team.length >= 5) {
      alert("Team limit reached (5 members)");
      return;
    }

    if (!team.find(t => t.id === person.id)) {
      setTeam([...team, person]);
    }
  };

  // ❌ REMOVE
  const remove = (id) => {
    setTeam(team.filter(t => t.id !== id));
  };

  // 💬 CHAT
  const sendMsg = () => {
    if (!msg.trim()) return;

    setChat([
      ...chat,
      { text: msg, time: new Date().toLocaleTimeString() }
    ]);

    setMsg("");
  };

  return (
    <div className="main-container">
      <Sidebar />

      <div className="content">

        <h1>🚀 Hackathon Team Builder</h1>

        {/* SEARCH SKILL */}
        <div className="profile-form">

          <select
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
          >
            <option value="">Select Required Skill</option>
            <option>React</option>
            <option>DSA</option>
            <option>Java</option>
            <option>Python</option>
            <option>Node JS</option>
            <option>DBMS</option>
          </select>

          <button
            className="save-btn"
            onClick={search}
          >
            Find 5 Members
          </button>

        </div>

        <div style={{ display: "flex", gap: "20px" }}>

          {/* LEFT SIDE - SUGGESTIONS */}
          <div style={{ flex: 1 }}>

            <h3>👥 Suggested Members</h3>

            {suggestions.length === 0 ? (
              <p>No members found</p>
            ) : (
              suggestions.map(l => (
                <div
                  key={l.id}
                  className="challenge-card"
                  style={{
                    border: "1px solid #ddd",
                    marginBottom: "10px"
                  }}
                >

                  <h3>{l.name}</h3>
                  <p>📚 {l.skill}</p>

                  <button
                    onClick={() => addToTeam(l)}
                    style={{
                      background: "#22c55e",
                      color: "white",
                      padding: "8px",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer"
                    }}
                  >
                    ➕ Add to Team
                  </button>

                </div>
              ))
            )}

          </div>

          {/* RIGHT SIDE - TEAM + CHAT */}
          <div style={{ flex: 1 }}>

            <h3>🔥 Your Team (Max 5)</h3>

            {team.map(t => (
              <div
                key={t.id}
                className="challenge-card"
                style={{ background: "#ecfdf5" }}
              >

                <p><b>{t.name}</b></p>
                <p>{t.skill}</p>

                <button
                  className="delete-btn"
                  onClick={() => remove(t.id)}
                >
                  Remove
                </button>

              </div>
            ))}

            {/* CHAT BOX */}
            <div style={{
              marginTop: "20px",
              padding: "15px",
              borderRadius: "10px",
              background: "#f8fafc"
            }}>

              <h3>💬 Group Discussion</h3>

              <div style={{ maxHeight: "150px", overflowY: "auto" }}>
                {chat.map((c, i) => (
                  <p key={i}>
                    🗨️ {c.text} <small>({c.time})</small>
                  </p>
                ))}
              </div>

              <div style={{ display: "flex", gap: "10px" }}>

                <input
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  placeholder="Type message..."
                  style={{
                    flex: 1,
                    padding: "8px",
                    borderRadius: "8px"
                  }}
                />

                <button
                  onClick={sendMsg}
                  style={{
                    background: "#1e3a8a",
                    color: "white",
                    padding: "8px 12px",
                    border: "none",
                    borderRadius: "8px"
                  }}
                >
                  Send
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Hackathon;