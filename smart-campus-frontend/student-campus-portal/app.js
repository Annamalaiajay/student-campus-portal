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

        <div className="card">📝 Complaint Box</div>
        <div className="card">🤝 STUDENT-Connection</div>
        <div className="card">📅 Online College Events</div>
      </div>

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

    const already = all.find(
      r => r.email === user.email && r.date === today
    );
    if (already) setMarked(true);
  }, []);

  function markAttendance() {
    const all = JSON.parse(localStorage.getItem("attendance")) || [];

    const newRecord = {
      name: user.name,
      email: user.email,
      date: today,
      time: new Date().toLocaleTimeString(),
      status: "Present"
    };

    all.push(newRecord);
    localStorage.setItem("attendance", JSON.stringify(all));

    setRecords(all);
    setMarked(true);
    alert("Attendance marked successfully");
  }

  return (
    <div className="glass-box" style={{ width: "600px" }}>
      <div className="title">Hostel Attendance</div>
      <div className="subtitle">{today}</div>

      {!marked ? (
        <button onClick={markAttendance}>Mark Attendance</button>
      ) : (
        <p style={{ textAlign: "center", color: "#cce7ff" }}>
          Attendance already marked for today
        </p>
      )}

      <h3 style={{ marginTop: "20px" }}>Attendance History</h3>

      <ul>
        {records
          .filter(r => r.email === user.email)
          .map((r, i) => (
            <li key={i}>
              {r.date} – {r.time} – {r.status}
            </li>
          ))}
      </ul>

      <button onClick={() => setPage("dashboard")}>
        Back to Dashboard
      </button>
    </div>
  );
}

/* ---------- RENDER ---------- */
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
