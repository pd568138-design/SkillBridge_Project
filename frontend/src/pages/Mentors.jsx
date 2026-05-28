import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";

function Mentors() {

  const user = JSON.parse(localStorage.getItem("user"));

  const [mentor, setMentor] = useState({
    name: "",
    email: "",
    contact: "",
    skill: "",
    experience: ""
  });

  const [mentors, setMentors] = useState([]);
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [searchSkill, setSearchSkill] = useState("");
  const [editId, setEditId] = useState(null);

  const API = "http://localhost:5000/api/mentors";

  // LOAD
  useEffect(() => {
    loadMentors();
  }, []);

  const loadMentors = async () => {
    try {
      const res = await axios.get(`${API}/${user._id}`);

      setMentors(res.data);
      setFilteredMentors(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  // INPUT
  const handleChange = (e) => {
    setMentor({
      ...mentor,
      [e.target.name]: e.target.value
    });
  };

  // ADD / UPDATE
  const saveMentor = async () => {

    if (!mentor.name || !mentor.skill) {
      alert("Fill all fields");
      return;
    }

    try {

      // UPDATE
      if (editId) {

        await axios.put(`${API}/${editId}`, mentor);

        alert("Mentor Updated");
        setEditId(null);

      }

      // ADD
      else {

        await axios.post(API, {
          ...mentor,
          learners: [],
          userId: user._id
        });

        alert("Mentor Added");
      }

      setMentor({
        name: "",
        email: "",
        contact: "",
        skill: "",
        experience: ""
      });

      loadMentors();

    } catch (err) {
      console.log(err);
    }
  };

  // SEARCH
  const searchMentors = () => {

    if (!searchSkill) {
      setFilteredMentors(mentors);
      return;
    }

    const result = mentors.filter((m) =>
      m.skill.toLowerCase().includes(searchSkill.toLowerCase())
    );

    setFilteredMentors(result);
  };

  // CONNECT (ONLY UI LIKE LEARNERS)
  const connectMentor = (m) => {
    alert(`${m.name} Connected`);
  };

  // DELETE
  const deleteMentorHandler = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      loadMentors();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="main-container">

      <Sidebar />

      <div className="content">

        {/* HEADER */}
        <div className="top-section">
          <h1>Mentor Hub 👨‍🏫</h1>
          <p>Manage Mentors</p>
        </div>

        {/* FORM */}
        <div className="mentor-form">

          <input
            name="name"
            placeholder="Mentor Name"
            value={mentor.name}
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email"
            value={mentor.email}
            onChange={handleChange}
          />

          <input
            name="contact"
            placeholder="Contact"
            value={mentor.contact}
            onChange={handleChange}
          />

          <select
            name="skill"
            value={mentor.skill}
            onChange={handleChange}
          >
            <option value="">Select Skill</option>
            <option>React</option>
            <option>Node JS</option>
            <option>DSA</option>
            <option>DBMS</option>
            <option>Java</option>
            <option>Python</option>
          </select>

          <input
            name="experience"
            placeholder="Experience"
            value={mentor.experience}
            onChange={handleChange}
          />

          <button className="save-btn" onClick={saveMentor}>
            {editId ? "Update Mentor" : "Add Mentor"}
          </button>

        </div>

        {/* SEARCH */}
        <div className="search-box">

          <input
            placeholder="Search Skill"
            value={searchSkill}
            onChange={(e) => setSearchSkill(e.target.value)}
          />

          <button onClick={searchMentors}>
            Search
          </button>

        </div>

        {/* LIST */}
        <div className="challenge-grid">

          {filteredMentors.map((m) => (

            <div className="challenge-card" key={m._id}>

              <div className="badge">{m.skill}</div>

              <h3>{m.name}</h3>

              <p>📧 {m.email}</p>
              <p>📞 {m.contact}</p>
              <p>💼 {m.experience}</p>

              <p>👨‍🎓 Learners: {m.learners?.length || 0}</p>

              <div className="mentor-actions">

                <button
                  className="small-btn connect-btn"
                  onClick={() => connectMentor(m)}
                >
                  🤝 Connect
                </button>

                <button
                  className="small-btn"
                  onClick={() => {
                    setMentor(m);
                    setEditId(m._id);
                  }}
                >
                  ✏ Edit
                </button>

                <button
                  className="small-btn delete-btn"
                  onClick={() => deleteMentorHandler(m._id)}
                >
                  🗑 Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Mentors;