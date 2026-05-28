import { useState } from "react";

function ChallengeForm({ addChallenge }) {

  const [subject,setSubject] = useState("");
  const [level,setLevel] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    if(subject==="" || level===""){

      alert("Please fill all fields");

      return;
    }

    const newChallenge = {

      id:Date.now(),
      subject,
      level

    };

    addChallenge(newChallenge);

    setSubject("");
    setLevel("");

  };

  return(

    <form
      onSubmit={handleSubmit}
      className="challenge-form"
    >

      <input
        type="text"
        placeholder="Enter Subject"
        value={subject}
        onChange={(e)=>setSubject(e.target.value)}
      />

      <select
        value={level}
        onChange={(e)=>setLevel(e.target.value)}
      >

        <option value="">Difficulty</option>
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>

      </select>

      <button type="submit">
        Add Challenge
      </button>

    </form>

  );
}

export default ChallengeForm;