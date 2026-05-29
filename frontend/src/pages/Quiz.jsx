import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

function Quiz() {
  const navigate = useNavigate();

  const [learner, setLearner] = useState(null);
  const [index, setIndex] = useState(0);
  const [msg, setMsg] = useState("");
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("activeLearner"));
    setLearner(data);
  }, []);

  // ✅ 10 QUESTIONS EACH SKILL
  const questions = {
    DSA: [
      { q: "Stack follows?", options: ["FIFO", "LIFO", "Both", "None"], a: "LIFO" },
      { q: "Queue follows?", options: ["FIFO", "LIFO", "Tree", "Graph"], a: "FIFO" },
      { q: "Binary search complexity?", options: ["O(n)", "O(log n)", "O(n2)", "O(1)"], a: "O(log n)" },
      { q: "Array index starts?", options: ["0", "1", "2", "None"], a: "0" },
      { q: "Linked list uses?", options: ["Nodes", "Tables", "Rows", "Cols"], a: "Nodes" },
      { q: "Tree traversal?", options: ["DFS", "BFS", "Both", "None"], a: "Both" },
      { q: "Graph uses?", options: ["Nodes+Edges", "Tables", "Rows", "Stack"], a: "Nodes+Edges" },
      { q: "Stack overflow means?", options: ["Full", "Empty", "Crash", "None"], a: "Full" },
      { q: "Heap used for?", options: ["Priority", "Sort", "Queue", "List"], a: "Priority" },
      { q: "Searching best case?", options: ["O(1)", "O(n)", "O(log n)", "O(n2)"], a: "O(1)" }
    ],

    Java: [
      { q: "Java is?", options: ["OOP", "Procedural", "Markup", "None"], a: "OOP" },
      { q: "JVM stands for?", options: ["Java Virtual Machine", "Java Variable", "JS VM", "None"], a: "Java Virtual Machine" },
      { q: "File extension?", options: [".java", ".js", ".py", ".c"], a: ".java" },
      { q: "Constructor name same as?", options: ["Class", "Method", "Object", "None"], a: "Class" },
      { q: "Inheritance keyword?", options: ["extends", "inherit", "import", "use"], a: "extends" },
      { q: "Compile command?", options: ["javac", "java", "run", "compile"], a: "javac" },
      { q: "Main method?", options: ["public static void main", "start()", "run()", "init()"], a: "public static void main" },
      { q: "Exception handling?", options: ["try-catch", "if", "loop", "switch"], a: "try-catch" },
      { q: "Java memory?", options: ["Heap", "Stack", "Both", "None"], a: "Both" },
      { q: "Platform?", options: ["Independent", "Dependent", "Both", "None"], a: "Independent" }
    ],

    Python: [
      { q: "Python is?", options: ["Language", "DB", "OS", "Hardware"], a: "Language" },
      { q: "File extension?", options: [".py", ".java", ".c", ".js"], a: ".py" },
      { q: "Keyword for function?", options: ["def", "function", "fun", "method"], a: "def" },
      { q: "Indentation is?", options: ["Important", "Optional", "None", "Error"], a: "Important" },
      { q: "List is?", options: ["Mutable", "Immutable", "None", "Fixed"], a: "Mutable" },
      { q: "Print function?", options: ["print()", "echo()", "log()", "write()"], a: "print()" },
      { q: "Loop type?", options: ["for", "repeat", "loop", "none"], a: "for" },
      { q: "Python creator?", options: ["Guido", "James", "Dennis", "Elon"], a: "Guido" },
      { q: "Dictionary uses?", options: ["Key-Value", "Array", "List", "Tree"], a: "Key-Value" },
      { q: "Python type?", options: ["Interpreted", "Compiled", "Both", "None"], a: "Interpreted" }
    ],

    NodeJS: [
      { q: "NodeJS is?", options: ["Runtime", "DB", "Language", "OS"], a: "Runtime" },
      { q: "Uses engine?", options: ["V8", "Spider", "Java", "None"], a: "V8" },
      { q: "Package manager?", options: ["npm", "pip", "gem", "apt"], a: "npm" },
      { q: "File extension?", options: [".js", ".py", ".java", ".c"], a: ".js" },
      { q: "Runs on?", options: ["Server", "Browser", "Mobile", "None"], a: "Server" },
      { q: "Async model?", options: ["Event-driven", "Blocking", "Sync", "None"], a: "Event-driven" },
      { q: "Module system?", options: ["CommonJS", "Java", "Python", "None"], a: "CommonJS" },
      { q: "Backend use?", options: ["Yes", "No", "Maybe", "None"], a: "Yes" },
      { q: "Creator?", options: ["Ryan Dahl", "Guido", "James", "Dennis"], a: "Ryan Dahl" },
      { q: "Language?", options: ["JavaScript", "Java", "C", "Python"], a: "JavaScript" }
    ],

    DBMS: [
      { q: "DBMS full form?", options: ["Database Management System", "Data Basic", "None", "DB Model"], a: "Database Management System" },
      { q: "SQL is?", options: ["Query language", "DB", "OS", "App"], a: "Query language" },
      { q: "Primary key?", options: ["Unique", "Duplicate", "Null", "None"], a: "Unique" },
      { q: "Join used?", options: ["Combine tables", "Delete", "Insert", "None"], a: "Combine tables" },
      { q: "DB type?", options: ["Relational", "Graphic", "File", "None"], a: "Relational" },
      { q: "Table row?", options: ["Record", "Column", "Field", "None"], a: "Record" },
      { q: "Index used for?", options: ["Speed", "Delete", "Insert", "None"], a: "Speed" },
      { q: "Normal form?", options: ["Normalization", "Loop", "Sort", "None"], a: "Normalization" },
      { q: "DB server?", options: ["MySQL", "HTML", "JS", "None"], a: "MySQL" },
      { q: "Foreign key?", options: ["Link table", "Unique", "Index", "None"], a: "Link table" }
    ]
  };

  if (!learner) return <h2>Loading...</h2>;

  const q = questions[learner.skill][index];

  const handleAnswer = (opt) => {
    setSelected(opt);

    if (opt === q.a) {
      setMsg("correct");
      setScore(score + 10);
    } else {
      setMsg("wrong");
    }
  };

  const nextQuestion = () => {
    setMsg("");
    setSelected(null);

    if (index < questions[learner.skill].length - 1) {
      setIndex(index + 1);
    }
  };

  const submitQuiz = async () => {
    alert("Quiz Completed 🎉 Score: " + score);

    await fetch(`https://skillbridge-project-1-ck1y.onrender.com/api/challenges/${learner._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        coins: score,
        status: "completed"
      })
    });

    navigate("/dashboard");
  };

  return (
    <div className="main-container">
      <Sidebar />

      <div className="content">
        <h1>{learner.skill} Quiz</h1>
        <h3>{learner.name}</h3>

        <div className="quiz-card">

          <h2>{q.q}</h2>

          {q.options.map((o, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(o)}
              style={{
                background:
                  selected === o
                    ? o === q.a
                      ? "#22c55e"
                      : "#ef4444"
                    : "#eee"
              }}
            >
              {o}
            </button>
          ))}

          <p>Score: {score}</p>

          <div style={{ marginTop: "15px" }}>

            {/* NEXT BUTTON */}
            <button
              onClick={nextQuestion}
              style={{
                background: "#3b82f6",
                color: "white",
                marginRight: "10px",
                padding: "8px 12px"
              }}
            >
              Next
            </button>

            {/* SUBMIT BUTTON */}
            <button
              onClick={submitQuiz}
              style={{
                background: "#22c55e",
                color: "white",
                padding: "8px 12px"
              }}
            >
              Submit
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Quiz;
