<div
  className="challenge-card"
  key={challenge.id}
>

  <div className="top-row">

    <div className="badge">
      {challenge.level}
    </div>

    <div className="coin-box">
      🪙 +10
    </div>

  </div>

  <h3>{challenge.subject}</h3>

  <p className="challenge-desc">
    Improve your technical skills by
    completing this weekly challenge.
  </p>

  <div className="status-box">

    {
      challenge.completed
      ? "✅ Completed"
      : "⏳ Pending"
    }

  </div>

  <div className="btn-group">

    <button
      onClick={()=>completeChallenge(
        challenge.id,
        challenge.subject
      )}
    >
      Complete
    </button>

    <button
      className="delete-btn"
      onClick={()=>deleteChallenge(
        challenge.id
      )}
    >
      Delete
    </button>

  </div>

</div>