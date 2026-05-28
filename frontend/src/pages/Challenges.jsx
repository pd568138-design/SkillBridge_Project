import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

function Challenges() {

  const navigate = useNavigate();
  const [learners, setLearners] = useState([]);

  const [form, setForm] = useState({
    name: "",
    skill: ""
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchChallenges();
  }, []);

  const fetchChallenges = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/challenges");
      const data = await res.json();
      setLearners(data);
    } catch (err) {
      console.log(err);
    }
  };

  const addLearner = async () => {

    if (!form.name || !form.skill) {
      alert("Fill all fields");
      return;
    }

    try {

      if (editId) {

        await fetch(`http://localhost:5000/api/challenges/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form)
        });

        alert("Updated Successfully");
        setEditId(null);

      } else {

        await fetch("http://localhost:5000/api/challenges", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            coins: 0,
            status: "pending"
          })
        });

        alert("Added Successfully");
      }

      setForm({ name: "", skill: "" });
      fetchChallenges();

    } catch (err) {
      console.log(err);
    }
  };

  const deleteLearner = async (id) => {
    await fetch(`http://localhost:5000/api/challenges/${id}`, {
      method: "DELETE"
    });

    fetchChallenges();
  };

  return (
    <div className="main-container">

      <Sidebar />

      <div className="content">

        <h1>🎯 Challenges</h1>

        <div className="mentor-form">

          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <select
            value={form.skill}
            onChange={(e) => setForm({ ...form, skill: e.target.value })}
          >
            <option value="">Select Skill</option>
            <option>DSA</option>
            <option>React</option>
            <option>Java</option>
            <option>Python</option>
          </select>

          <button onClick={addLearner}>
            {editId ? "Update" : "Add"}
          </button>

        </div>

        <div className="challenge-grid">

          {learners.map((l) => (
            <div key={l._id} className="challenge-card">

              <h3>{l.name}</h3>
              <p>{l.skill}</p>
              <p>🪙 {l.coins}</p>
              <p>{l.status}</p>

              <button
                onClick={() => {
                  localStorage.setItem("activeLearner", JSON.stringify(l));
                  navigate("/quiz");
                }}
              >
                ▶ Continue
              </button>

              <button onClick={() => deleteLearner(l._id)}>
                Delete
              </button>

              <button onClick={() => {
                setForm({ name: l.name, skill: l.skill });
                setEditId(l._id);
              }}>
                Edit
              </button>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default Challenges;