import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";

function Learners() {
  // ================= USER =================

  const user = JSON.parse(localStorage.getItem("user") || "null");

  // New login gives id
  // Old login may have _id
  const userId = user?.id || user?._id;

  // ================= API =================

  const API =
    "https://skillbridge-project-3.onrender.com/api/learners";

  const MENTOR_API =
    "https://skillbridge-project-3.onrender.com/api/mentors";

  // ================= LEARNER FORM =================

  const [learner, setLearner] = useState({
    name: "",
    email: "",
    skill: ""
  });

  // ================= LEARNERS =================

  const [learners, setLearners] = useState([]);

  // ================= MENTORS =================

  const [mentors, setMentors] = useState([]);

  // ================= MATCHED MENTORS =================

  const [matchedMentors, setMatchedMentors] = useState([]);

  // ================= SEARCH =================

  const [searched, setSearched] = useState(false);

  // ================= EDIT =================

  const [editId, setEditId] = useState(null);

  // ================= LOADING =================

  const [loading, setLoading] = useState(false);

  // =====================================================
  // LOAD DATA WHEN PAGE OPENS
  // =====================================================

  useEffect(() => {
    if (!userId) {
      console.log("No logged-in user found");
      return;
    }

    loadLearners();
    loadMentors();
  }, [userId]);

  // =====================================================
  // LOAD LEARNERS
  // =====================================================

  const loadLearners = async () => {
    try {
      if (!userId) {
        console.log("User ID not found");
        return;
      }

      console.log("Loading learners for:", userId);

      const response = await axios.get(
        `${API}/${userId}`
      );

      console.log("Learners API response:", response.data);

      // Handle array response
      if (Array.isArray(response.data)) {
        setLearners(response.data);
        return;
      }

      // Handle object response
      if (Array.isArray(response.data.learners)) {
        setLearners(response.data.learners);
        return;
      }

      setLearners([]);

    } catch (error) {
      console.error(
        "LOAD LEARNERS ERROR:",
        error.response?.data || error.message
      );

      setLearners([]);
    }
  };

  // =====================================================
  // LOAD MENTORS
  // =====================================================

  const loadMentors = async () => {
    try {
      if (!userId) {
        return;
      }

      const response = await axios.get(
        `${MENTOR_API}/${userId}`
      );

      console.log("Mentors API response:", response.data);

      if (Array.isArray(response.data)) {
        setMentors(response.data);
        return;
      }

      if (Array.isArray(response.data.mentors)) {
        setMentors(response.data.mentors);
        return;
      }

      setMentors([]);

    } catch (error) {
      console.error(
        "LOAD MENTORS ERROR:",
        error.response?.data || error.message
      );

      setMentors([]);
    }
  };

  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    setLearner({
      ...learner,
      [e.target.name]: e.target.value
    });
  };

  // =====================================================
  // ADD / UPDATE LEARNER
  // =====================================================

  const addLearnerHandler = async () => {
    // Validation

    if (
      !learner.name.trim() ||
      !learner.email.trim() ||
      !learner.skill.trim()
    ) {
      alert("Please fill all fields");
      return;
    }

    if (!userId) {
      alert("User session not found. Please login again.");
      return;
    }

    try {
      setLoading(true);

      // =================================================
      // UPDATE
      // =================================================

      if (editId) {
        console.log("Updating learner:", editId);

        const response = await axios.put(
          `${API}/${editId}`,
          {
            name: learner.name.trim(),
            email: learner.email.trim(),
            skill: learner.skill,
            userId: userId
          }
        );

        console.log(
          "Learner updated:",
          response.data
        );

        alert("Learner Updated Successfully");

        setEditId(null);
      }

      // =================================================
      // ADD
      // =================================================

      else {
        console.log("Adding learner:", learner);

        const response = await axios.post(
          API,
          {
            name: learner.name.trim(),
            email: learner.email.trim(),
            skill: learner.skill,
            connectedMentors: [],
            userId: userId
          }
        );

        console.log(
          "Learner added successfully:",
          response.data
        );

        alert("Learner Added Successfully");
      }

      // =================================================
      // CLEAR FORM
      // =================================================

      setLearner({
        name: "",
        email: "",
        skill: ""
      });

      // =================================================
      // LOAD UPDATED LIST
      // =================================================

      await loadLearners();

    } catch (error) {
      console.error(
        "ADD / UPDATE LEARNER ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
        "Unable to save learner"
      );

    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // EDIT LEARNER
  // =====================================================

  const editLearnerHandler = (item) => {
    setLearner({
      name: item.name || "",
      email: item.email || "",
      skill: item.skill || ""
    });

    setEditId(item._id);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  // =====================================================
  // DELETE LEARNER
  // =====================================================

  const deleteLearnerHandler = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this learner?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await axios.delete(
        `${API}/${id}`
      );

      alert("Learner Deleted Successfully");

      await loadLearners();

    } catch (error) {
      console.error(
        "DELETE LEARNER ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
        "Unable to delete learner"
      );
    }
  };

  // =====================================================
  // CANCEL EDIT
  // =====================================================

  const cancelEdit = () => {
    setLearner({
      name: "",
      email: "",
      skill: ""
    });

    setEditId(null);
  };

  // =====================================================
  // SEARCH MENTORS
  // =====================================================

  const searchMentors = (skill, learnerId) => {
    const searchSkill = skill.toLowerCase();

    const result = mentors.filter((mentor) =>
      mentor.skill
        ?.toLowerCase()
        .includes(searchSkill)
    );

    setMatchedMentors(
      result.map((mentor) => ({
        ...mentor,
        learnerId: learnerId
      }))
    );

    setSearched(true);
  };

  // =====================================================
  // CONNECT MENTOR
  // =====================================================

  const connectMentor = async (
    learnerId,
    mentor
  ) => {
    try {
      const learnerObj = learners.find(
        (item) => item._id === learnerId
      );

      if (!learnerObj) {
        alert("Learner not found");
        return;
      }

      // ================================================
      // UPDATE LEARNER'S CONNECTED MENTORS
      // ================================================

      const oldMentors =
        learnerObj.connectedMentors || [];

      const alreadyConnected =
        oldMentors.includes(mentor.name);

      const updatedMentors =
        alreadyConnected
          ? oldMentors
          : [...oldMentors, mentor.name];

      await axios.put(
        `${API}/${learnerId}`,
        {
          name: learnerObj.name,
          email: learnerObj.email,
          skill: learnerObj.skill,
          connectedMentors: updatedMentors,
          userId: userId
        }
      );

      // ================================================
      // UPDATE MENTOR'S LEARNERS
      // ================================================

      const oldLearners =
        mentor.learners || [];

      const alreadyAdded =
        oldLearners.includes(learnerObj.name);

      const updatedLearners =
        alreadyAdded
          ? oldLearners
          : [...oldLearners, learnerObj.name];

      await axios.put(
        `${MENTOR_API}/${mentor._id}`,
        {
          ...mentor,
          learners: updatedLearners
        }
      );

      alert(
        `${mentor.name} Connected Successfully`
      );

      // Reload both

      await loadLearners();
      await loadMentors();

      setSearched(false);

    } catch (error) {
      console.error(
        "CONNECT MENTOR ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
        "Unable to connect mentor"
      );
    }
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="main-container">

      <Sidebar />

      <div className="content">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="top-section">

          <h1>
            Learner Hub 🎓
          </h1>

          <p>
            Manage learners
          </p>

        </div>

        {/* =================================================
            ADD / UPDATE FORM
        ================================================= */}

        <div className="mentor-form">

          <input
            name="name"
            placeholder="Learner Name"
            value={learner.name}
            onChange={handleChange}
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={learner.email}
            onChange={handleChange}
          />

          <select
            name="skill"
            value={learner.skill}
            onChange={handleChange}
          >

            <option value="">
              Select Skill
            </option>

            <option value="React">
              React
            </option>

            <option value="Node JS">
              Node JS
            </option>

            <option value="DSA">
              DSA
            </option>

            <option value="DBMS">
              DBMS
            </option>

            <option value="Java">
              Java
            </option>

            <option value="Python">
              Python
            </option>

          </select>

          <button
            className="save-btn"
            onClick={addLearnerHandler}
            disabled={loading}
          >

            {loading
              ? "Saving..."
              : editId
              ? "Update Learner"
              : "Add Learner"}

          </button>

          {editId && (
            <button
              className="small-btn"
              onClick={cancelEdit}
            >
              Cancel
            </button>
          )}

        </div>

        {/* =================================================
            LEARNER CARDS
        ================================================= */}

        <div className="challenge-grid">

          {learners.length === 0 ? (

            <p>
              No learners found.
            </p>

          ) : (

            learners.map((item) => (

              <div
                className="challenge-card"
                key={item._id}
              >

                {/* SKILL */}

                <div className="badge">
                  {item.skill}
                </div>

                {/* NAME */}

                <h3>
                  {item.name}
                </h3>

                {/* EMAIL */}

                <p>
                  📧 {item.email}
                </p>

                {/* SKILL */}

                <p>
                  📚 {item.skill}
                </p>

                {/* MENTOR COUNT */}

                <p>
                  🤝 Mentors:{" "}
                  {item.connectedMentors?.length || 0}
                </p>

                {/* ACTION BUTTONS */}

                <div className="mentor-actions">

                  <button
                    className="small-btn connect-btn"
                    onClick={() =>
                      searchMentors(
                        item.skill,
                        item._id
                      )
                    }
                  >
                    🔍 Search
                  </button>

                  <button
                    className="small-btn"
                    onClick={() =>
                      editLearnerHandler(item)
                    }
                  >
                    ✏ Edit
                  </button>

                  <button
                    className="small-btn delete-btn"
                    onClick={() =>
                      deleteLearnerHandler(
                        item._id
                      )
                    }
                  >
                    🗑 Delete
                  </button>

                </div>

                {/* CONNECTED MENTORS */}

                <h4>
                  Connected Mentors
                </h4>

                {item.connectedMentors?.length > 0 ? (

                  item.connectedMentors.map(
                    (mentorName, index) => (

                      <p key={index}>
                        👨‍🏫 {mentorName}
                      </p>

                    )
                  )

                ) : (

                  <p>
                    No mentors connected
                  </p>

                )}

              </div>

            ))

          )}

        </div>

        {/* =================================================
            MATCHING MENTORS
        ================================================= */}

        {searched && (

          <>

            <h2>
              Matching Mentors
            </h2>

            <div className="challenge-grid">

              {matchedMentors.length === 0 ? (

                <p>
                  No matching mentors found.
                </p>

              ) : (

                matchedMentors.map((mentor) => (

                  <div
                    className="challenge-card"
                    key={mentor._id}
                  >

                    <div className="badge">
                      {mentor.skill}
                    </div>

                    <h3>
                      {mentor.name}
                    </h3>

                    <p>
                      📧 {mentor.email}
                    </p>

                    <p>
                      💼 {mentor.experience}
                    </p>

                    <button
                      className="connect-btn"
                      onClick={() =>
                        connectMentor(
                          mentor.learnerId,
                          mentor
                        )
                      }
                    >
                      🤝 Connect
                    </button>

                  </div>

                ))

              )}

            </div>

          </>

        )}

      </div>

    </div>
  );
}

export default Learners;
