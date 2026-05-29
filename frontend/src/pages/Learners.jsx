import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";

function Learners() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [learner, setLearner] = useState({
    name: "",
    email: "",
    skill: ""
  });

  const [learners, setLearners] = useState([]);

  const [mentors, setMentors] = useState([]);

  const [matchedMentors, setMatchedMentors] =
    useState([]);

  const [searched, setSearched] =
    useState(false);

  const [editId, setEditId] =
    useState(null);

  const API =
    "https://skillbridge-project-2.onrender.com/api/learners";

  // LOAD
  useEffect(() => {

    loadLearners();

    loadMentors();

  }, []);

  // LOAD LEARNERS
  const loadLearners = async () => {

    try {

      const res = await axios.get(
        `${API}/${user._id}`
      );

      setLearners(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  // LOAD MENTORS
  const loadMentors = async () => {

    try {

      const res = await axios.get(
        `https://skillbridge-project-2.onrender.com/api/mentors/${user._id}`
      );

      setMentors(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  // INPUT
  const handleChange = (e) => {

    setLearner({

      ...learner,

      [e.target.name]:
      e.target.value

    });

  };

  // SAVE
  const addLearnerHandler =
    async () => {

    if (
      !learner.name ||
      !learner.skill
    ) {

      alert("Fill all fields");

      return;

    }

    try {

      // UPDATE
      if(editId){

        await axios.put(

          `${API}/${editId}`,

          learner

        );

        alert(
          "Learner Updated"
        );

        setEditId(null);

      } else {

        // ADD
        await axios.post(
          API,
          {

            ...learner,

            connectedMentors: [],

            userId: user._id

          }
        );

        alert(
          "Learner Added"
        );

      }

      setLearner({

        name: "",
        email: "",
        skill: ""

      });

      loadLearners();

    } catch (err) {

      console.log(err);

    }

  };

  // SEARCH MENTORS
  const searchMentors = (
    skill,
    learnerId
  ) => {

    const result =
      mentors.filter((m) =>
        m.skill
          .toLowerCase()
          .includes(
            skill.toLowerCase()
          )
      );

    setMatchedMentors(

      result.map((mentor)=>({

        ...mentor,

        learnerId

      }))

    );

    setSearched(true);

  };

  // CONNECT
  const connectMentor =
    async (
      learnerId,
      mentor
    ) => {

    try {

      const learnerObj =
        learners.find(
          (l)=>
            l._id === learnerId
        );

      const updatedMentors = [

        ...(learnerObj
          .connectedMentors || []),

        mentor.name

      ];

      // UPDATE LEARNER
      await axios.put(

        `${API}/${learnerId}`,

        {

          ...learnerObj,

          connectedMentors:
            updatedMentors

        }

      );

      // UPDATE MENTOR COUNT
      const updatedLearners = [

        ...(mentor.learners || []),

        learnerObj.name

      ];

      await axios.put(

        `https://skillbridge-project-2.onrender.com/api/mentors/${mentor._id}`,

        {

          ...mentor,

          learners:
            updatedLearners

        }

      );

      alert(
        `${mentor.name} Connected`
      );

      loadLearners();

      loadMentors();

    } catch (err) {

      console.log(err);

    }

  };

  // DELETE
  const deleteLearnerHandler =
    async (id) => {

    try {

      await axios.delete(
        `${API}/${id}`
      );

      loadLearners();

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <div className="main-container">

      <Sidebar />

      <div className="content">

        <div className="top-section">

          <h1>
            Learner Hub 🎓
          </h1>

          <p>
            Manage learners
          </p>

        </div>

        {/* FORM */}
        <div className="mentor-form">

          <input
            name="name"
            placeholder="Learner Name"
            value={learner.name}
            onChange={handleChange}
          />

          <input
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

            <option>
              React
            </option>

            <option>
              Node JS
            </option>

            <option>
              DSA
            </option>

            <option>
              DBMS
            </option>

            <option>
              Java
            </option>

            <option>
              Python
            </option>

          </select>

          <button
            className="save-btn"
            onClick={
              addLearnerHandler
            }
          >

            {
              editId
              ? "Update Learner"
              : "Add Learner"
            }

          </button>

        </div>

        {/* LIST */}
        <div className="challenge-grid">

          {
            learners.map((item)=>(

              <div
                className="challenge-card"
                key={item._id}
              >

                <div className="badge">
                  {item.skill}
                </div>

                <h3>
                  {item.name}
                </h3>

                <p>
                  📧 {item.email}
                </p>

                <p>
                  📚 {item.skill}
                </p>

                <p>
                  🤝 Mentors:
                  {
                    item
                    .connectedMentors
                    ?.length || 0
                  }
                </p>

                <div
                  className="mentor-actions"
                >

                  <button
                    className="small-btn connect-btn"
                    onClick={()=>
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
                    onClick={()=>{

                      setLearner(item);

                      setEditId(
                        item._id
                      );

                    }}
                  >
                    ✏ Edit
                  </button>

                  <button
                    className="small-btn delete-btn"
                    onClick={()=>
                      deleteLearnerHandler(
                        item._id
                      )
                    }
                  >
                    🗑 Delete
                  </button>

                </div>

                <h4>
                  Connected Mentors
                </h4>

                {
                  item
                  .connectedMentors
                  ?.map((m,i)=>(

                    <p key={i}>
                      👨‍🏫 {m}
                    </p>

                  ))
                }

              </div>

            ))
          }

        </div>

        {/* MATCHED */}
        {
          searched && (

            <>

              <h2>
                Matching Mentors
              </h2>

              <div className="challenge-grid">

                {
                  matchedMentors.map(
                    (mentor)=>(

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
                        onClick={()=>

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
                }

              </div>

            </>

          )
        }

      </div>

    </div>

  );

}

export default Learners;
