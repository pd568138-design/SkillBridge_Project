import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

function Learners() {
  // =========================================================
  // STORAGE KEYS
  // =========================================================

  const LEARNERS_KEY = "skillbridge_learners";
  const MENTORS_KEY = "skillbridge_mentors";

  // =========================================================
  // DEFAULT LEARNERS
  // These will appear when there is no saved data
  // =========================================================

  const defaultLearners = [
    {
      id: "learner-1",
      name: "John",
      email: "john@123",
      skill: "Python",
      connectedMentors: [],
    },
    {
      id: "learner-2",
      name: "Anu",
      email: "anu@123",
      skill: "DSA",
      connectedMentors: [],
    },
    {
      id: "learner-3",
      name: "karthick",
      email: "kar@333",
      skill: "Node JS",
      connectedMentors: [],
    },
  ];

  // =========================================================
  // DEFAULT MENTORS
  // =========================================================

  const defaultMentors = [
    {
      id: "mentor-1",
      name: "Priya",
      email: "priya@123",
      skill: "Python",
      experience: "2 Years",
      learners: [],
    },
    {
      id: "mentor-2",
      name: "Rahul",
      email: "rahul@123",
      skill: "DSA",
      experience: "3 Years",
      learners: [],
    },
    {
      id: "mentor-3",
      name: "Arun",
      email: "arun@123",
      skill: "Node JS",
      experience: "2 Years",
      learners: [],
    },
    {
      id: "mentor-4",
      name: "Meena",
      email: "meena@123",
      skill: "DBMS",
      experience: "4 Years",
      learners: [],
    },
    {
      id: "mentor-5",
      name: "Kavin",
      email: "kavin@123",
      skill: "Java",
      experience: "3 Years",
      learners: [],
    },
    {
      id: "mentor-6",
      name: "Divya",
      email: "divya@123",
      skill: "React",
      experience: "2 Years",
      learners: [],
    },
  ];

  // =========================================================
  // GET DATA FROM LOCAL STORAGE
  // =========================================================

  const getStoredData = (key, defaultData) => {
    try {
      const saved = localStorage.getItem(key);

      if (saved) {
        return JSON.parse(saved);
      }

      localStorage.setItem(
        key,
        JSON.stringify(defaultData)
      );

      return defaultData;
    } catch (error) {
      console.log("Storage error:", error);
      return defaultData;
    }
  };

  // =========================================================
  // STATES
  // =========================================================

  const [learner, setLearner] = useState({
    name: "",
    email: "",
    skill: "",
  });

  const [learners, setLearners] = useState([]);

  const [mentors, setMentors] = useState([]);

  const [matchedMentors, setMatchedMentors] = useState([]);

  const [searched, setSearched] = useState(false);

  const [editId, setEditId] = useState(null);

  const [searchText, setSearchText] = useState("");

  // =========================================================
  // LOAD DATA
  // =========================================================

  useEffect(() => {
    const storedLearners = getStoredData(
      LEARNERS_KEY,
      defaultLearners
    );

    const storedMentors = getStoredData(
      MENTORS_KEY,
      defaultMentors
    );

    setLearners(storedLearners);
    setMentors(storedMentors);
  }, []);

  // =========================================================
  // SAVE LEARNERS
  // =========================================================

  const saveLearners = (data) => {
    setLearners(data);

    localStorage.setItem(
      LEARNERS_KEY,
      JSON.stringify(data)
    );
  };

  // =========================================================
  // SAVE MENTORS
  // =========================================================

  const saveMentors = (data) => {
    setMentors(data);

    localStorage.setItem(
      MENTORS_KEY,
      JSON.stringify(data)
    );
  };

  // =========================================================
  // INPUT CHANGE
  // =========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLearner((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =========================================================
  // ADD / UPDATE LEARNER
  // =========================================================

  const addLearnerHandler = () => {
    if (!learner.name.trim()) {
      alert("Please enter learner name");
      return;
    }

    if (!learner.email.trim()) {
      alert("Please enter email");
      return;
    }

    if (!learner.skill) {
      alert("Please select a skill");
      return;
    }

    // =======================================================
    // UPDATE
    // =======================================================

    if (editId) {
      const updatedLearners = learners.map((item) => {
        if (item.id === editId) {
          return {
            ...item,
            name: learner.name,
            email: learner.email,
            skill: learner.skill,
          };
        }

        return item;
      });

      saveLearners(updatedLearners);

      alert("Learner Updated");

      setEditId(null);

      setLearner({
        name: "",
        email: "",
        skill: "",
      });

      return;
    }

    // =======================================================
    // ADD NEW LEARNER
    // =======================================================

    const newLearner = {
      id:
        "learner-" +
        Date.now() +
        "-" +
        Math.floor(Math.random() * 1000),

      name: learner.name,

      email: learner.email,

      skill: learner.skill,

      connectedMentors: [],
    };

    const updatedLearners = [
      ...learners,
      newLearner,
    ];

    saveLearners(updatedLearners);

    alert("Learner Added");

    setLearner({
      name: "",
      email: "",
      skill: "",
    });
  };

  // =========================================================
  // EDIT LEARNER
  // =========================================================

  const editLearner = (item) => {
    setLearner({
      name: item.name,
      email: item.email,
      skill: item.skill,
    });

    setEditId(item.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================================================
  // CANCEL EDIT
  // =========================================================

  const cancelEdit = () => {
    setEditId(null);

    setLearner({
      name: "",
      email: "",
      skill: "",
    });
  };

  // =========================================================
  // DELETE LEARNER
  // =========================================================

  const deleteLearnerHandler = (id) => {
    const selectedLearner = learners.find(
      (item) => item.id === id
    );

    if (!selectedLearner) {
      return;
    }

    const confirmDelete = window.confirm(
      `Delete ${selectedLearner.name}?`
    );

    if (!confirmDelete) {
      return;
    }

    const updatedLearners = learners.filter(
      (item) => item.id !== id
    );

    saveLearners(updatedLearners);

    // Remove learner from mentor lists
    const updatedMentors = mentors.map(
      (mentor) => ({
        ...mentor,

        learners:
          mentor.learners?.filter(
            (name) =>
              name !== selectedLearner.name
          ) || [],
      })
    );

    saveMentors(updatedMentors);

    alert("Learner Deleted");

    if (editId === id) {
      cancelEdit();
    }
  };

  // =========================================================
  // SEARCH MENTORS
  // =========================================================

  const searchMentors = (
    skill,
    learnerId
  ) => {
    const result = mentors.filter(
      (mentor) =>
        mentor.skill.toLowerCase() ===
        skill.toLowerCase()
    );

    const formattedResult = result.map(
      (mentor) => ({
        ...mentor,
        learnerId,
      })
    );

    setMatchedMentors(formattedResult);

    setSearched(true);
  };

  // =========================================================
  // CONNECT MENTOR
  // =========================================================

  const connectMentor = (
    learnerId,
    mentor
  ) => {
    const selectedLearner =
      learners.find(
        (item) =>
          item.id === learnerId
      );

    if (!selectedLearner) {
      return;
    }

    // =======================================================
    // CHECK WHETHER ALREADY CONNECTED
    // =======================================================

    if (
      selectedLearner.connectedMentors?.includes(
        mentor.name
      )
    ) {
      alert(
        `${mentor.name} is already connected`
      );

      return;
    }

    // =======================================================
    // UPDATE LEARNER
    // =======================================================

    const updatedLearners =
      learners.map((item) => {
        if (item.id === learnerId) {
          return {
            ...item,

            connectedMentors: [
              ...(item.connectedMentors || []),

              mentor.name,
            ],
          };
        }

        return item;
      });

    saveLearners(updatedLearners);

    // =======================================================
    // UPDATE MENTOR
    // =======================================================

    const updatedMentors =
      mentors.map((item) => {
        if (item.id === mentor.id) {
          return {
            ...item,

            learners: [
              ...(item.learners || []),

              selectedLearner.name,
            ],
          };
        }

        return item;
      });

    saveMentors(updatedMentors);

    alert(
      `${mentor.name} Connected`
    );

    // Refresh matching list
    searchMentors(
      selectedLearner.skill,
      selectedLearner.id
    );
  };

  // =========================================================
  // REMOVE CONNECTED MENTOR
  // =========================================================

  const removeMentorConnection = (
    learnerId,
    mentorName
  ) => {
    const selectedLearner =
      learners.find(
        (item) =>
          item.id === learnerId
      );

    if (!selectedLearner) {
      return;
    }

    const updatedLearners =
      learners.map((item) => {
        if (item.id === learnerId) {
          return {
            ...item,

            connectedMentors:
              item.connectedMentors?.filter(
                (name) =>
                  name !== mentorName
              ) || [],
          };
        }

        return item;
      });

    saveLearners(updatedLearners);

    const updatedMentors =
      mentors.map((mentor) => {
        if (
          mentor.name === mentorName
        ) {
          return {
            ...mentor,

            learners:
              mentor.learners?.filter(
                (name) =>
                  name !==
                  selectedLearner.name
              ) || [],
          };
        }

        return mentor;
      });

    saveMentors(updatedMentors);

    alert("Mentor connection removed");
  };

  // =========================================================
  // SEARCH LEARNERS
  // =========================================================

  const filteredLearners =
    learners.filter((item) => {
      const search =
        searchText.toLowerCase();

      return (
        item.name
          .toLowerCase()
          .includes(search) ||
        item.email
          .toLowerCase()
          .includes(search) ||
        item.skill
          .toLowerCase()
          .includes(search)
      );
    });

  // =========================================================
  // RESET ALL DATA
  // =========================================================

  const resetDemoData = () => {
    const confirmReset =
      window.confirm(
        "Reset all learner and mentor data?"
      );

    if (!confirmReset) {
      return;
    }

    localStorage.setItem(
      LEARNERS_KEY,
      JSON.stringify(defaultLearners)
    );

    localStorage.setItem(
      MENTORS_KEY,
      JSON.stringify(defaultMentors)
    );

    setLearners(defaultLearners);

    setMentors(defaultMentors);

    setMatchedMentors([]);

    setSearched(false);

    setEditId(null);

    setLearner({
      name: "",
      email: "",
      skill: "",
    });

    alert("Demo data restored");
  };

  // =========================================================
  // RETURN
  // =========================================================

  return (
    <div className="main-container">

      {/* ===================================================
          SIDEBAR
      =================================================== */}

      <Sidebar />

      {/* ===================================================
          MAIN CONTENT
      =================================================== */}

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
            FORM
        ================================================= */}

        <div className="mentor-form">

          <input
            type="text"
            name="name"
            placeholder="Learner Name"
            value={learner.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
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

            <option value="Python">
              Python
            </option>

            <option value="DSA">
              DSA
            </option>

            <option value="Node JS">
              Node JS
            </option>

            <option value="DBMS">
              DBMS
            </option>

            <option value="Java">
              Java
            </option>

            <option value="React">
              React
            </option>

          </select>

          <button
            className="save-btn"
            onClick={
              addLearnerHandler
            }
          >

            {editId
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
            SEARCH
        ================================================= */}

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "20px",
          }}
        >

          <input
            type="text"
            placeholder="Search learners..."
            value={searchText}
            onChange={(e) =>
              setSearchText(
                e.target.value
              )
            }
            style={{
              flex: 1,
              padding: "12px 15px",
              borderRadius: "10px",
              border:
                "1px solid #ddd",
              outline: "none",
            }}
          />

          <button
            className="small-btn"
            onClick={() =>
              setSearchText("")
            }
          >
            Clear
          </button>

        </div>

        {/* =================================================
            LEARNER COUNT
        ================================================= */}

        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >

          <h2>
            Learners
          </h2>

          <span>
            Total:{" "}
            {filteredLearners.length}
          </span>

        </div>

        {/* =================================================
            LEARNER CARDS
        ================================================= */}

        <div className="challenge-grid">

          {filteredLearners.length === 0 ? (

            <div
              className="challenge-card"
              style={{
                width: "100%",
                textAlign: "center",
              }}
            >

              <h3>
                No learners found
              </h3>

              <p>
                Add a learner using
                the form above.
              </p>

            </div>

          ) : (

            filteredLearners.map(
              (item) => (

                <div
                  className="challenge-card"
                  key={item.id}
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
                    {
                      item
                        .connectedMentors
                        ?.length || 0
                    }
                  </p>

                  {/* ACTION BUTTONS */}

                  <div
                    className="mentor-actions"
                  >

                    <button
                      className="small-btn connect-btn"
                      onClick={() =>
                        searchMentors(
                          item.skill,
                          item.id
                        )
                      }
                    >
                      🔍 Search
                    </button>

                    <button
                      className="small-btn"
                      onClick={() =>
                        editLearner(
                          item
                        )
                      }
                    >
                      ✏ Edit
                    </button>

                    <button
                      className="small-btn delete-btn"
                      onClick={() =>
                        deleteLearnerHandler(
                          item.id
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

                  {item
                    .connectedMentors
                    ?.length > 0 ? (

                    item.connectedMentors.map(
                      (
                        mentorName,
                        index
                      ) => (

                        <div
                          key={index}
                          style={{
                            display:
                              "flex",
                            justifyContent:
                              "space-between",
                            alignItems:
                              "center",
                            marginBottom:
                              "5px",
                          }}
                        >

                          <p
                            style={{
                              margin: 0,
                            }}
                          >
                            👨‍🏫{" "}
                            {mentorName}
                          </p>

                          <button
                            onClick={() =>
                              removeMentorConnection(
                                item.id,
                                mentorName
                              )
                            }
                            style={{
                              border:
                                "none",
                              background:
                                "transparent",
                              cursor:
                                "pointer",
                              fontSize:
                                "14px",
                            }}
                            title="Remove mentor"
                          >
                            ❌
                          </button>

                        </div>

                      )
                    )

                  ) : (

                    <p
                      style={{
                        color:
                          "#999",
                        fontSize:
                          "13px",
                      }}
                    >
                      No mentors connected
                    </p>

                  )}

                </div>

              )
            )

          )}

        </div>

        {/* =================================================
            MATCHING MENTORS
        ================================================= */}

        {searched && (

          <div
            style={{
              marginTop: "35px",
            }}
          >

            <div
              style={{
                display:
                  "flex",
                justifyContent:
                  "space-between",
                alignItems:
                  "center",
              }}
            >

              <h2>
                Matching Mentors
              </h2>

              <button
                className="small-btn"
                onClick={() => {
                  setSearched(
                    false
                  );

                  setMatchedMentors(
                    []
                  );
                }}
              >
                Close
              </button>

            </div>

            {matchedMentors.length ===
            0 ? (

              <div
                className="challenge-card"
                style={{
                  textAlign:
                    "center",
                  marginTop:
                    "15px",
                }}
              >

                <h3>
                  No matching mentors
                </h3>

                <p>
                  No mentor is available
                  for this skill.
                </p>

              </div>

            ) : (

              <div
                className="challenge-grid"
              >

                {matchedMentors.map(
                  (mentor) => {

                    const selectedLearner =
                      learners.find(
                        (item) =>
                          item.id ===
                          mentor.learnerId
                      );

                    const alreadyConnected =
                      selectedLearner
                        ?.connectedMentors
                        ?.includes(
                          mentor.name
                        );

                    return (

                      <div
                        className="challenge-card"
                        key={
                          mentor.id
                        }
                      >

                        {/* BADGE */}

                        <div className="badge">
                          {mentor.skill}
                        </div>

                        {/* NAME */}

                        <h3>
                          {mentor.name}
                        </h3>

                        {/* EMAIL */}

                        <p>
                          📧{" "}
                          {mentor.email}
                        </p>

                        {/* EXPERIENCE */}

                        <p>
                          💼{" "}
                          {mentor.experience}
                        </p>

                        {/* LEARNER COUNT */}

                        <p>
                          👨‍🎓 Learners:{" "}
                          {
                            mentor
                              .learners
                              ?.length ||
                            0
                          }
                        </p>

                        {/* CONNECT */}

                        <button
                          className="connect-btn"
                          disabled={
                            alreadyConnected
                          }
                          onClick={() =>
                            connectMentor(
                              mentor.learnerId,
                              mentor
                            )
                          }
                          style={{
                            opacity:
                              alreadyConnected
                                ? 0.6
                                : 1,
                            cursor:
                              alreadyConnected
                                ? "not-allowed"
                                : "pointer",
                          }}
                        >

                          {alreadyConnected
                            ? "✓ Connected"
                            : "🤝 Connect"}

                        </button>

                      </div>

                    );
                  }
                )}

              </div>

            )}

          </div>

        )}

        {/* =================================================
            ALL MENTORS
        ================================================= */}

        <div
          style={{
            marginTop: "40px",
          }}
        >

          <h2>
            Available Mentors
          </h2>

          <p
            style={{
              color:
                "#777",
              marginBottom:
                "15px",
            }}
          >
            Browse mentors based
            on their skills.
          </p>

          <div className="challenge-grid">

            {mentors.map(
              (mentor) => (

                <div
                  className="challenge-card"
                  key={mentor.id}
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

                  <p>
                    👨‍🎓 Learners:{" "}
                    {
                      mentor
                        .learners
                        ?.length || 0
                    }
                  </p>

                  <button
                    className="small-btn connect-btn"
                    onClick={() => {
                      const matchingLearner =
                        learners.find(
                          (item) =>
                            item.skill
                              .toLowerCase() ===
                            mentor.skill
                              .toLowerCase()
                        );

                      if (
                        matchingLearner
                      ) {
                        connectMentor(
                          matchingLearner.id,
                          mentor
                        );
                      } else {
                        alert(
                          `Add a learner with ${mentor.skill} skill first`
                        );
                      }
                    }}
                  >
                    🤝 Connect
                  </button>

                </div>

              )
            )}

          </div>

        </div>

        {/* =================================================
            DEMO RESET
        ================================================= */}

        <div
          style={{
            marginTop: "40px",
            marginBottom: "30px",
            textAlign:
              "center",
          }}
        >

          <button
            onClick={
              resetDemoData
            }
            style={{
              padding:
                "10px 18px",
              borderRadius:
                "8px",
              border:
                "1px solid #ddd",
              background:
                "#fff",
              cursor:
                "pointer",
            }}
          >
            🔄 Reset Demo Data
          </button>

        </div>

      </div>

    </div>
  );
}

export default Learners;
