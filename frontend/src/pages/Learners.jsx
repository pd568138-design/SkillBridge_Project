import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";

function Learners() {

  // ================= USER =================

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // New JWT login gives "id"
  // Old login may have given "_id"
  const userId = user?.id || user?._id;


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

  const [matchedMentors, setMatchedMentors] =
    useState([]);


  // ================= SEARCH STATUS =================

  const [searched, setSearched] =
    useState(false);


  // ================= EDIT =================

  const [editId, setEditId] =
    useState(null);


  // ================= RENDER BACKEND =================

  const API =
    "https://skillbridge-project-3.onrender.com/api/learners";

  const MENTOR_API =
    "https://skillbridge-project-3.onrender.com/api/mentors";


  // ================= LOAD DATA =================

  useEffect(() => {

    if (userId) {

      loadLearners();

      loadMentors();

    }

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

      console.log(
        "Loading learners for user:",
        userId
      );

      const res = await axios.get(
        `${API}/${userId}`
      );

      console.log(
        "Learners received:",
        res.data
      );

      setLearners(
        Array.isArray(res.data)
          ? res.data
          : []
      );

    } catch (err) {

      console.log(
        "LOAD LEARNERS ERROR:",
        err.response?.data ||
        err.message
      );

    }

  };


  // =====================================================
  // LOAD MENTORS
  // =====================================================

  const loadMentors = async () => {

    try {

      if (!userId) {
        console.log("User ID not found");
        return;
      }

      const res = await axios.get(
        `${MENTOR_API}/${userId}`
      );

      console.log(
        "Mentors received:",
        res.data
      );

      setMentors(
        Array.isArray(res.data)
          ? res.data
          : []
      );

    } catch (err) {

      console.log(
        "LOAD MENTORS ERROR:",
        err.response?.data ||
        err.message
      );

    }

  };


  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {

    setLearner({

      ...learner,

      [e.target.name]:
        e.target.value

    });

  };


  // =====================================================
  // ADD / UPDATE LEARNER
  // =====================================================

  const addLearnerHandler =
    async () => {

    if (
      !learner.name ||
      !learner.email ||
      !learner.skill
    ) {

      alert("Fill all fields");

      return;

    }


    if (!userId) {

      alert(
        "User session not found. Please login again."
      );

      return;

    }


    try {

      // ================= UPDATE =================

      if (editId) {

        await axios.put(

          `${API}/${editId}`,

          {

            ...learner,

            userId: userId

          }

        );

        alert(
          "Learner Updated"
        );

        setEditId(null);

      }


      // ================= ADD =================

      else {

        const response =
          await axios.post(

            API,

            {

              name:
                learner.name,

              email:
                learner.email,

              skill:
                learner.skill,

              connectedMentors: [],

              userId:
                userId

            }

          );


        console.log(
          "Learner added:",
          response.data
        );


        alert(
          "Learner Added"
        );

      }


      // ================= CLEAR FORM =================

      setLearner({

        name: "",
        email: "",
        skill: ""

      });


      // ================= RELOAD =================

      await loadLearners();

    } catch (err) {

      console.log(
        "ADD / UPDATE LEARNER ERROR:",
        err.response?.data ||
        err.message
      );

      alert(
        err.response?.data?.message ||
        "Something went wrong"
      );

    }

  };


  // =====================================================
  // EDIT LEARNER
  // =====================================================

  const editLearnerHandler =
    (item) => {

    setLearner({

      name:
        item.name || "",

      email:
        item.email || "",

      skill:
        item.skill || ""

    });

    setEditId(
      item._id
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  };


  // =====================================================
  // SEARCH MENTORS
  // =====================================================

  const searchMentors = (
    skill,
    learnerId
  ) => {

    const result =
      mentors.filter(

        (m) =>

          m.skill
            ?.toLowerCase()
            .includes(
              skill.toLowerCase()
            )

      );


    setMatchedMentors(

      result.map(

        (mentor) => ({

          ...mentor,

          learnerId

        })

      )

    );


    setSearched(true);

  };


  // =====================================================
  // CONNECT MENTOR
  // =====================================================

  const connectMentor =
    async (
      learnerId,
      mentor
    ) => {

    try {

      const learnerObj =
        learners.find(

          (l) =>
            l._id === learnerId

        );


      if (!learnerObj) {

        alert(
          "Learner not found"
        );

        return;

      }


      // ================= LEARNER MENTORS =================

      const updatedMentors = [

        ...(learnerObj.connectedMentors || []),

        mentor.name

      ];


      // ================= UPDATE LEARNER =================

      await axios.put(

        `${API}/${learnerId}`,

        {

          ...learnerObj,

          connectedMentors:
            updatedMentors,

          userId:
            userId

        }

      );


      // ================= MENTOR LEARNERS =================

      const updatedLearners = [

        ...(mentor.learners || []),

        learnerObj.name

      ];


      // ================= UPDATE MENTOR =================

      await axios.put(

        `${MENTOR_API}/${mentor._id}`,

        {

          ...mentor,

          learners:
            updatedLearners

        }

      );


      alert(
        `${mentor.name} Connected`
      );


      // ================= RELOAD =================

      await loadLearners();

      await loadMentors();

      setSearched(false);

    } catch (err) {

      console.log(
        "CONNECT ERROR:",
        err.response?.data ||
        err.message
      );

      alert(
        err.response?.data?.message ||
        "Unable to connect mentor"
      );

    }

  };


  // =====================================================
  // DELETE LEARNER
  // =====================================================

  const deleteLearnerHandler =
    async (id) => {

    try {

      await axios.delete(

        `${API}/${id}`

      );


      alert(
        "Learner Deleted"
      );


      await loadLearners();

    } catch (err) {

      console.log(
        "DELETE ERROR:",
        err.response?.data ||
        err.message
      );

      alert(
        err.response?.data?.message ||
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
  // UI
  // =====================================================

  return (

    <div className="main-container">

      <Sidebar />


      <div className="content">


        {/* ================= TOP ================= */}

        <div className="top-section">

          <h1>
            Learner Hub 🎓
          </h1>

          <p>
            Manage learners
          </p>

        </div>



        {/* ================= FORM ================= */}

        <div className="mentor-form">


          <input

            name="name"

            placeholder="Learner Name"

            value={
              learner.name
            }

            onChange={
              handleChange
            }

          />


          <input

            name="email"

            type="email"

            placeholder="Email"

            value={
              learner.email
            }

            onChange={
              handleChange
            }

          />


          <select

            name="skill"

            value={
              learner.skill
            }

            onChange={
              handleChange
            }

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


          {editId && (

            <button

              className="small-btn"

              onClick={
                cancelEdit
              }

            >

              Cancel

            </button>

          )}


        </div>



        {/* ================= LEARNER LIST ================= */}

        <div className="challenge-grid">


          {learners.length === 0 ? (

            <p>
              No learners found.
            </p>

          ) : (

            learners.map(

              (item) => (

                <div

                  className="challenge-card"

                  key={
                    item._id
                  }

                >


                  {/* SKILL */}

                  <div className="badge">

                    {
                      item.skill
                    }

                  </div>


                  {/* NAME */}

                  <h3>

                    {
                      item.name
                    }

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

                    🤝 Mentors:

                    {" "}

                    {
                      item
                        .connectedMentors
                        ?.length || 0
                    }

                  </p>


                  {/* ACTIONS */}

                  <div
                    className="mentor-actions"
                  >


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


                  {

                    item
                      .connectedMentors
                      ?.length > 0 ? (

                      item
                        .connectedMentors
                        .map(

                          (m, i) => (

                            <p key={i}>

                              👨‍🏫 {m}

                            </p>

                          )

                        )

                    ) : (

                      <p>

                        No mentors connected

                      </p>

                    )

                  }


                </div>

              )

            )

          )}


        </div>



        {/* ================= MATCHED MENTORS ================= */}

        {

          searched && (

            <>

              <h2>

                Matching Mentors

              </h2>


              <div className="challenge-grid">


                {

                  matchedMentors.length === 0 ? (

                    <p>

                      No matching mentors found.

                    </p>

                  ) : (

                    matchedMentors.map(

                      (mentor) => (

                        <div

                          className="challenge-card"

                          key={
                            mentor._id
                          }

                        >


                          <div className="badge">

                            {
                              mentor.skill
                            }

                          </div>


                          <h3>

                            {
                              mentor.name
                            }

                          </h3>


                          <p>

                            📧 {
                              mentor.email
                            }

                          </p>


                          <p>

                            💼 {
                              mentor.experience
                            }

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

                      )

                    )

                  )

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
