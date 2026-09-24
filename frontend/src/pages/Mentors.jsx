          <input
            name="email"
            type="email"
            placeholder="Email"
            value={mentor.email}
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

          <button
            className="save-btn"
            onClick={saveMentor}
          >
            {editId ? "Update Mentor" : "Add Mentor"}
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

        {/* ================= MENTOR LIST ================= */}
        <div className="challenge-grid">

          {mentors.length === 0 ? (
            <p>No mentors found.</p>
          ) : (
            mentors.map((item) => (
              <div
                className="challenge-card"
                key={item._id}
              >

                <div className="badge">
                  {item.skill}
                </div>

                <h3>{item.name}</h3>

                <p>📧 {item.email}</p>

                <p>📚 Skill: {item.skill}</p>

                <p>
                  👥 Learners:{" "}
                  {item.learners?.length || 0}
                </p>

                <div className="mentor-actions">

                  <button
                    className="small-btn"
                    onClick={() => editMentor(item)}
                  >
                    ✏ Edit
                  </button>

                  <button
                    className="small-btn delete-btn"
                    onClick={() => deleteMentor(item._id)}
                  >
                    🗑 Delete
                  </button>

                </div>

                <h4>Connected Learners</h4>

                {item.learners?.length > 0 ? (
                  <ul>
                    {item.learners.map((learner, index) => (
                      <li key={index}>{learner}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No learners connected.</p>
                )}

              </div>
            ))
          )}

        </div>

      </div>
    </div>
  );
}

export default Mentors;
