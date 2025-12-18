const { useState, useEffect } = React;

function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(null);

  function login(email, password) {
    const data = JSON.parse(localStorage.getItem(email) || "null");
    if (data && data.password === password) {
      setUser(data);
      setPage(data.role === "admin" ? "adminDashboard" : "dashboard");
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
    <div className="container">
      {page === "login" && <Login login={login} setPage={setPage} />}
      {page === "register" && <Register register={register} setPage={setPage} />}
      {page === "dashboard" && <Dashboard user={user} setPage={setPage} logout={logout} />}
      {page === "adminDashboard" && <AdminDashboard user={user} setPage={setPage} logout={logout} />}
      {page === "attendance" && <Attendance user={user} setPage={setPage} />}
      {page === "complaints" && <Complaints user={user} setPage={setPage} />}
      {page === "network" && <Network user={user} setPage={setPage} />}
      {page === "adminComplaints" && <AdminComplaints setPage={setPage} />}
      {page === "adminAttendance" && <AdminAttendance setPage={setPage} />}
    </div>
  );
}

function Login({ login, setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="glass-box">
      <div className="title">Smart Campus Management</div>
      <div className="subtitle">Student Portal Login</div>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={() => login(email, password)}>Login</button>
      <div className="link" onClick={() => setPage("register")}>New user? Register</div>
    </div>
  );
}

function Register({ register, setPage }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  function handleRegister() {
    if (name && email && password) {
      register({ name, email, password, role });
    }
  }

  return (
    <div className="glass-box">
      <div className="title">Smart Campus Management</div>
      <div className="subtitle">Student Registration</div>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <select value={role} onChange={e => setRole(e.target.value)}>
        <option value="student">Student</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={handleRegister}>Register</button>
      <div className="link" onClick={() => setPage("login")}>Already have account? Login</div>
    </div>
  );
}

function Dashboard({ user, setPage, logout }) {
  return (
    <div className="glass-box">
      <div className="nav">
        <button onClick={() => setPage("dashboard")}>Dashboard</button>
        <button onClick={() => setPage("attendance")}>Attendance</button>
        <button onClick={() => setPage("complaints")}>Complaints</button>
        <button onClick={() => setPage("network")}>Network</button>
        <button onClick={logout} style={{float: 'right'}}>Logout</button>
      </div>
      
      <div className="title">Welcome {user.name}</div>
      <div className="subtitle">Student Dashboard</div>
      
      <div className="dashboard">
        <div className="card" onClick={() => setPage("attendance")}>
          📍 Smart Attendance<br/>
          <small>Mark daily attendance</small>
        </div>
        <div className="card" onClick={() => setPage("complaints")}>
          📝 Complaint Management<br/>
          <small>Submit & track complaints</small>
        </div>
        <div className="card" onClick={() => setPage("network")}>
          🤝 Student Network<br/>
          <small>Connect with peers</small>
        </div>
      </div>
    </div>
  );
}

function AdminDashboard({ user, setPage, logout }) {
  return (
    <div className="glass-box">
      <div className="nav">
        <button onClick={() => setPage("adminDashboard")}>Dashboard</button>
        <button onClick={() => setPage("adminAttendance")}>Attendance</button>
        <button onClick={() => setPage("adminComplaints")}>Complaints</button>
        <button onClick={() => setPage("network")}>Network</button>
        <button onClick={logout} style={{float: 'right'}}>Logout</button>
      </div>
      
      <div className="title">Admin Panel</div>
      <div className="subtitle">Welcome {user.name}</div>
      
      <div className="dashboard">
        <div className="card" onClick={() => setPage("adminAttendance")}>
          📊 View All Attendance<br/>
          <small>Monitor student attendance</small>
        </div>
        <div className="card" onClick={() => setPage("adminComplaints")}>
          🛠️ Manage Complaints<br/>
          <small>Update complaint status</small>
        </div>
        <div className="card" onClick={() => setPage("network")}>
          👥 Monitor Network<br/>
          <small>Oversee student posts</small>
        </div>
      </div>
    </div>
  );
}

function Attendance({ user, setPage }) {
  const [records, setRecords] = useState([]);
  const [marked, setMarked] = useState(false);
  const today = new Date().toLocaleDateString();

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("attendance") || "[]");
    const userRecords = all.filter(r => r.email === user.email);
    setRecords(userRecords);
    setMarked(all.some(r => r.email === user.email && r.date === today));
  }, []);

  function markAttendance(type) {
    const all = JSON.parse(localStorage.getItem("attendance") || "[]");
    const newRecord = {
      name: user.name,
      email: user.email,
      date: today,
      time: new Date().toLocaleTimeString(),
      type: type,
      status: "Present"
    };
    all.push(newRecord);
    localStorage.setItem("attendance", JSON.stringify(all));
    setRecords([...records, newRecord]);
    setMarked(true);
    alert("Attendance marked successfully!");
  }

  return (
    <div className="glass-box">
      <div className="nav">
        <button onClick={() => setPage("dashboard")}>Dashboard</button>
        <button onClick={() => setPage("attendance")}>Attendance</button>
        <button onClick={() => setPage("complaints")}>Complaints</button>
        <button onClick={() => setPage("network")}>Network</button>
      </div>
      
      <div className="title">Smart Attendance</div>
      <div className="subtitle">{today}</div>

      {!marked ? (
        <div>
          <button onClick={() => markAttendance("biometric")}>📱 Mark via Biometric</button>
          <button onClick={() => markAttendance("gps")}>📍 Mark via GPS</button>
        </div>
      ) : (
        <div style={{textAlign: 'center', color: '#4caf50', margin: '20px 0'}}>
          ✅ Attendance already marked for today
        </div>
      )}

      <h3 style={{color: 'white', marginTop: '20px'}}>Your Attendance History</h3>
      {records.map((record, i) => (
        <div key={i} className="record">
          {record.date} - {record.time} - {record.type} - {record.status}
        </div>
      ))}
    </div>
  );
}

function AdminAttendance({ setPage }) {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("attendance") || "[]");
    setRecords(all);
  }, []);

  return (
    <div className="glass-box">
      <div className="nav">
        <button onClick={() => setPage("adminDashboard")}>Dashboard</button>
        <button onClick={() => setPage("adminAttendance")}>Attendance</button>
        <button onClick={() => setPage("adminComplaints")}>Complaints</button>
      </div>
      
      <div className="title">All Attendance Records</div>
      
      {records.map((record, i) => (
        <div key={i} className="record">
          <strong>{record.name}</strong> ({record.email})<br/>
          {record.date} - {record.time} - {record.type} - {record.status}
        </div>
      ))}
    </div>
  );
}

function Complaints({ user, setPage }) {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("complaints") || "[]");
    setComplaints(all.filter(c => c.email === user.email));
  }, []);

  function submitComplaint() {
    if (!category || !description) return;
    
    const all = JSON.parse(localStorage.getItem("complaints") || "[]");
    const newComplaint = {
      id: Date.now(),
      name: user.name,
      email: user.email,
      category,
      description,
      status: "pending",
      date: new Date().toLocaleString()
    };
    all.push(newComplaint);
    localStorage.setItem("complaints", JSON.stringify(all));
    setComplaints([...complaints, newComplaint]);
    setCategory("");
    setDescription("");
    alert("Complaint submitted successfully!");
  }

  return (
    <div className="glass-box">
      <div className="nav">
        <button onClick={() => setPage("dashboard")}>Dashboard</button>
        <button onClick={() => setPage("attendance")}>Attendance</button>
        <button onClick={() => setPage("complaints")}>Complaints</button>
        <button onClick={() => setPage("network")}>Network</button>
      </div>
      
      <div className="title">Complaint Management</div>
      
      <h3 style={{color: 'white'}}>Submit New Complaint</h3>
      <select value={category} onChange={e => setCategory(e.target.value)}>
        <option value="">Select Category</option>
        <option value="academic">Academic</option>
        <option value="hostel">Hostel</option>
        <option value="infrastructure">Infrastructure</option>
        <option value="food">Food Services</option>
        <option value="other">Other</option>
      </select>
      <textarea 
        placeholder="Describe your complaint..." 
        value={description}
        onChange={e => setDescription(e.target.value)}
        rows="4"
      />
      <button onClick={submitComplaint}>Submit Complaint</button>

      <h3 style={{color: 'white', marginTop: '30px'}}>Your Complaints</h3>
      {complaints.map(complaint => (
        <div key={complaint.id} className="record">
          <strong>#{complaint.id}</strong> - {complaint.category}<br/>
          {complaint.description}<br/>
          <span className={`status-${complaint.status}`}>Status: {complaint.status}</span><br/>
          <small>{complaint.date}</small>
        </div>
      ))}
    </div>
  );
}

function AdminComplaints({ setPage }) {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("complaints") || "[]");
    setComplaints(all);
  }, []);

  function updateStatus(id, newStatus) {
    const all = JSON.parse(localStorage.getItem("complaints") || "[]");
    const updated = all.map(c => c.id === id ? {...c, status: newStatus} : c);
    localStorage.setItem("complaints", JSON.stringify(updated));
    setComplaints(updated);
  }

  return (
    <div className="glass-box">
      <div className="nav">
        <button onClick={() => setPage("adminDashboard")}>Dashboard</button>
        <button onClick={() => setPage("adminAttendance")}>Attendance</button>
        <button onClick={() => setPage("adminComplaints")}>Complaints</button>
      </div>
      
      <div className="title">Manage All Complaints</div>
      
      {complaints.map(complaint => (
        <div key={complaint.id} className="record">
          <strong>#{complaint.id}</strong> - {complaint.name} ({complaint.email})<br/>
          <strong>{complaint.category}</strong>: {complaint.description}<br/>
          Status: <select 
            value={complaint.status} 
            onChange={e => updateStatus(complaint.id, e.target.value)}
            style={{margin: '5px 0'}}
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select><br/>
          <small>{complaint.date}</small>
        </div>
      ))}
    </div>
  );
}

function Network({ user, setPage }) {
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("posts") || "[]");
    setPosts(all);
  }, []);

  function createPost() {
    if (!content) return;
    
    const all = JSON.parse(localStorage.getItem("posts") || "[]");
    const newPost = {
      id: Date.now(),
      name: user.name,
      email: user.email,
      content,
      date: new Date().toLocaleString()
    };
    all.unshift(newPost);
    localStorage.setItem("posts", JSON.stringify(all));
    setPosts(all);
    setContent("");
    alert("Post created successfully!");
  }

  return (
    <div className="glass-box">
      <div className="nav">
        <button onClick={() => setPage(user.role === "admin" ? "adminDashboard" : "dashboard")}>Dashboard</button>
        <button onClick={() => setPage("attendance")}>Attendance</button>
        <button onClick={() => setPage("complaints")}>Complaints</button>
        <button onClick={() => setPage("network")}>Network</button>
      </div>
      
      <div className="title">Student Network</div>
      
      {user.role === "student" && (
        <div>
          <h3 style={{color: 'white'}}>Create New Post</h3>
          <textarea 
            placeholder="What's on your mind? Share projects, achievements, or connect with peers..."
            value={content}
            onChange={e => setContent(e.target.value)}
            rows="3"
          />
          <button onClick={createPost}>Create Post</button>
        </div>
      )}

      <h3 style={{color: 'white', marginTop: '30px'}}>Recent Posts</h3>
      {posts.map(post => (
        <div key={post.id} className="post">
          <strong>{post.name}</strong> <small>({post.date})</small><br/>
          {post.content}
          {user.role === "admin" && (
            <div style={{marginTop: '10px', fontSize: '12px', color: '#ffeb3b'}}>
              Admin can monitor this post
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);