console.log("APP JS LOADED");

const { useState, useEffect } = React;

function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(null);

  function login(email, password) {
    const data = JSON.parse(localStorage.getItem(email));
    if (data && data.password === password) {
      setUser(data);
      setPage("dashboard");
    } else {
      alert("Invalid credentials");
    }
  }

  function register(data) {
    localStorage.setItem(data.email, JSON.stringify(data));
    alert("Registration successful");
    setPage("login");
  }

  function logout() {
    setUser(null);
    setPage("login");
  }

  return (
    <>
      {page === "login" && <Login login={login} setPage={setPage} />}
      {page === "register" && <Register register={register} />}
      {page === "dashboard" && (
        <Dashboard user={user} setPage={setPage} logout={logout} />
      )}
      {page === "attendance" && (
        <HostelAttendance user={user} setPage={setPage} />
      )}
      {page === "complaint" && (
        <Complaint user={user} setPage={setPage} />
      )}
      {page === "adminComplaints" && (
        <AdminComplaints setPage={setPage} />
      )}
    </>
  );
}

/* ---------- LOGIN ---------- */
function Login({ login, setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="glass-box">
      <div className="title">Sathyabama University</div>
      <div className="subtitle">Student Portal Login</div>

      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password"
             onChange={e => setPassword(e.target.value)} />

      <button onClick={() => login(email, password)}>Login</button>

      <div className="link" onClick={() => setPage("register")}>
        New user? Register
      </div>
    </div>
  );
}

/* ---------- REGISTER ---------- */
function Register({ register }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="glass-box">
      <div className="title">Sathyabama University</div>
      <div className="subtitle">Student Registration</div>

      <input placeholder="Name" onChange={e => setName(e.target.value)} />
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password"
             onChange={e => setPassword(e.target.value)} />

      <button onClick={() => register({ name, email, password })}>
        Register
      </button>
    </div>
  );
}

/* ---------- DASHBOARD ---------- */
function Dashboard({ user, setPage, logout }) {
  return (
    <div>
      <div className="title" style={{ color: "white", marginBottom: "20px" }}>
        Welcome {user.name}
      </div>

      <div className="dashboard">
        <div className="card">🏨 Hostel Management</div>

        <div className="card" onClick={() => setPage("attendance")}>
          📍 Hostel Attendance
        </div>

        <div className="card" onClick={() => setPage("complaint")}>
          📝 Complaint Box
        </div>

        <div className="card">🤝 STUDENT-Connection</div>
        <div className="card">📅 Online College Events</div>
      </div>

      {user.email === "admin@sathyabama.com" && (
        <button
          className="logout-btn"
          onClick={() => setPage("adminComplaints")}
        >
          View All Complaints (Admin)
        </button>
      )}

      <button className="logout-btn" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

/* ---------- HOSTEL ATTENDANCE ---------- */
function HostelAttendance({ user, setPage }) {
  const [marked, setMarked] = useState(false);
  const [records, setRecords] = useState([]);
  const today = new Date().toLocaleDateString();

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("attendance")) || [];
    setRecords(all);
    if (all.find(r => r.email === user.email && r.date === today)) {
      setMarked(true);
    }
  }, []);

  function markAttendance() {
    const all = JSON.parse(localStorage.getItem("attendance")) || [];
    all.push({
      name: user.name,
      email: user.email,
      date: today,
      time: new Date().toLocaleTimeString(),
      status: "Present"
    });
    localStorage.setItem("attendance", JSON.stringify(all));
    setMarked(true);
    setRecords(all);
  }

  return (
    <div className="glass-box" style={{ width: "600px" }}>
      <div className="title">Hostel Attendance</div>

      {!marked ? (
        <button onClick={markAttendance}>Mark Attendance</button>
      ) : (
        <p style={{ textAlign: "center" }}>Attendance already marked</p>
      )}

      <ul>
        {records
          .filter(r => r.email === user.email)
          .map((r, i) => (
            <li key={i}>{r.date} - {r.status}</li>
          ))}
      </ul>

      <button onClick={() => setPage("dashboard")}>Back</button>
    </div>
  );
}

/* ---------- COMPLAINT MODULE ---------- */
function Complaint({ user, setPage }) {
  const [category, setCategory] = useState("");
  const [text, setText] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("complaints")) || [];
    setList(all.filter(c => c.email === user.email));
  }, []);

  function submitComplaint() {
    const all = JSON.parse(localStorage.getItem("complaints")) || [];
    all.push({
      name: user.name,
      email: user.email,
      category,
      text,
      date: new Date().toLocaleString(),
      status: "Pending"
    });
    localStorage.setItem("complaints", JSON.stringify(all));
    setCategory("");
    setText("");
    setList(all.filter(c => c.email === user.email));
    alert("Complaint submitted");
  }

  return (
    <div className="glass-box" style={{ width: "600px" }}>
      <div className="title">Complaint Box</div>

      <select value={category} onChange={e => setCategory(e.target.value)}>
        <option value="">Select Category</option>
        <option>Hostel</option>
        <option>Mess</option>
        <option>Maintenance</option>
        <option>Security</option>
      </select>

      <textarea
        style={{ width: "100%", height: "80px", marginTop: "10px" }}
        placeholder="Write your complaint..."
        value={text}
        onChange={e => setText(e.target.value)}
      />

      <button onClick={submitComplaint}>Submit Complaint</button>

      <h3>Your Complaints</h3>
      <ul>
        {list.map((c, i) => (
          <li key={i}>
            [{c.category}] {c.text} – <b>{c.status}</b>
          </li>
        ))}
      </ul>

      <button onClick={() => setPage("dashboard")}>Back</button>
    </div>
  );
}

/* ---------- ADMIN VIEW ---------- */
function AdminComplaints({ setPage }) {
  const [all, setAll] = useState([]);

  useEffect(() => {
    setAll(JSON.parse(localStorage.getItem("complaints")) || []);
  }, []);

  return (
    <div className="glass-box" style={{ width: "700px" }}>
      <div className="title">All Complaints (Admin)</div>

      <ul>
        {all.map((c, i) => (
          <li key={i}>
            <b>{c.name}</b> ({c.email})<br />
            [{c.category}] {c.text}<br />
            Status: {c.status}
          </li>
        ))}
      </ul>

      <button onClick={() => setPage("dashboard")}>Back</button>
    </div>
  );
}

/* ---------- RENDER ---------- */
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
