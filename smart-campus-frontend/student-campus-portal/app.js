const { useState, useEffect } = React;

function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(null);

  function login(email, password) {
    if (email === "admin123" && password === "admin123") {
      const adminUser = { name: "Admin", email: email, role: "admin" };
      setUser(adminUser);
      setPage("adminDashboard");
      return;
    }
    
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
      {page === "profile" && <Profile user={user} setPage={setPage} />}
      {page === "about" && <About setPage={setPage} />}
      {page === "adminComplaints" && <AdminComplaints setPage={setPage} />}
      {page === "adminAttendance" && <AdminAttendance setPage={setPage} />}
    </div>
  );
}

function Login({ login, setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginAs, setLoginAs] = useState("student");

  function handleLogin() {
    if (loginAs === "admin") {
      if (email === "admin123" && password === "admin123") {
        login(email, password);
      } else {
        alert("Admin credentials: admin123 / admin123");
      }
    } else {
      login(email, password);
    }
  }

  return (
    <>
      <div className="video-background">
        <video autoPlay muted loop playsInline>
          <source src="intro1.mp4" type="video/mp4" />
          <source src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" type="video/mp4" />
        </video>
        <iframe 
          src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&loop=1&playlist=dQw4w9WgXcQ&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1
          }}
        />
      </div>
      <div className="video-overlay"></div>
      
      <div className="login-box">
        <div className="title">SATHYABAMA UNIVERSITY</div>
        <div className="subtitle">Student Portal</div>
      
        <div className="role-selector">
          <div 
            className={`role-option ${loginAs === "student" ? "active" : ""}`}
            onClick={() => setLoginAs("student")}
          >
            STUDENT
          </div>
          <div 
            className={`role-option ${loginAs === "admin" ? "active" : ""}`}
            onClick={() => setLoginAs("admin")}
          >
            ADMIN
          </div>
        </div>

        <input 
          placeholder={loginAs === "admin" ? "Admin Email" : "Student Email"} 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
        />
        
        {loginAs === "admin" && (
          <div style={{color: '#666', fontSize: '14px', textAlign: 'center', margin: '10px 0'}}>
            Demo: admin123 / admin123
          </div>
        )}
        
        <button onClick={handleLogin}>LOGIN</button>
        <div className="link" onClick={() => setPage("register")}>New user? Register here</div>
        <div className="link" onClick={() => setPage("about")}>About University</div>
      </div>
    </>
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
    <div className="login-box">
      <div className="title">SATHYABAMA UNIVERSITY</div>
      <div className="subtitle">Student Registration</div>
      
      <input placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      
      <div className="role-selector">
        <div 
          className={`role-option ${role === "student" ? "active" : ""}`}
          onClick={() => setRole("student")}
        >
          STUDENT
        </div>
        <div 
          className={`role-option ${role === "admin" ? "active" : ""}`}
          onClick={() => setRole("admin")}
        >
          ADMIN
        </div>
      </div>
      
      <button onClick={handleRegister}>REGISTER</button>
      <div className="link" onClick={() => setPage("login")}>Already have account? Login here</div>
    </div>
  );
}

function About({ setPage }) {
  return (
    <div className="glass-box">
      <div className="title" style={{color: '#1e3c72', marginBottom: '30px'}}>SATHYABAMA UNIVERSITY</div>
      
      <div style={{textAlign: 'center', marginBottom: '30px'}}>
        <h2 style={{color: '#1e3c72', marginBottom: '20px'}}>About Our Institution</h2>
        <p style={{fontSize: '16px', lineHeight: '1.6', color: '#666', marginBottom: '20px'}}>
          Sathyabama Institute of Science and Technology is a premier educational institution 
          committed to excellence in engineering, technology, and research. Established with 
          the vision of providing world-class education and fostering innovation.
        </p>
        
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', margin: '30px 0'}}>
          <div className="card">
            <div className="card-icon">
              <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%231e3c72' viewBox='0 0 24 24'%3E%3Cpath d='M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z'/%3E%3C/svg%3E" alt="Academic" />
            </div>
            <h3>Academic Excellence</h3>
            <p>Top-tier programs in Engineering, Technology, and Sciences</p>
          </div>
          <div className="card">
            <div className="card-icon">
              <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%231e3c72' viewBox='0 0 24 24'%3E%3Cpath d='M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z'/%3E%3C/svg%3E" alt="Research" />
            </div>
            <h3>Research & Innovation</h3>
            <p>State-of-the-art research facilities and industry partnerships</p>
          </div>
          <div className="card">
            <div className="card-icon">
              <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%231e3c72' viewBox='0 0 24 24'%3E%3Cpath d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'/%3E%3C/svg%3E" alt="Campus" />
            </div>
            <h3>Campus Life</h3>
            <p>Modern infrastructure with comprehensive student facilities</p>
          </div>
        </div>
        
        <div style={{backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', margin: '20px 0'}}>
          <h3 style={{color: '#1e3c72', marginBottom: '15px'}}>Contact Information</h3>
          <p><strong>Address:</strong> Jeppiaar Nagar, Rajiv Gandhi Salai, Chennai - 600119</p>
          <p><strong>Phone:</strong> +91-44-2450 3000</p>
          <p><strong>Email:</strong> info@sathyabama.ac.in</p>
        </div>
      </div>
      
      <button onClick={() => setPage("login")} style={{maxWidth: '200px', margin: '0 auto'}}>
        Back to Login
      </button>
    </div>
  );
}

function Dashboard({ user, setPage, logout }) {
  return (
    <div className="glass-box">
      <div className="nav">
        <div className="user-info">Welcome, {user.name}</div>
        <div>
          <button onClick={() => setPage("dashboard")}>Dashboard</button>
          <button onClick={() => setPage("attendance")}>Attendance</button>
          <button onClick={() => setPage("complaints")}>Complaints</button>
          <button onClick={() => setPage("network")}>Network</button>
          <button onClick={() => setPage("profile")}>Profile</button>
          <button onClick={logout}>Logout</button>
        </div>
      </div>
      
      <div className="title" style={{color: '#1e3c72'}}>Student Dashboard</div>
      <div className="subtitle">SATHYABAMA UNIVERSITY</div>
      
      <div className="dashboard">
        <div className="card" onClick={() => setPage("attendance")}>
          <div className="card-icon">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%231e3c72' viewBox='0 0 24 24'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'/%3E%3C/svg%3E" alt="Attendance" />
          </div>
          <h3>Smart Attendance</h3>
          <p>Mark daily attendance via biometric or GPS verification</p>
        </div>
        <div className="card" onClick={() => setPage("complaints")}>
          <div className="card-icon">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%231e3c72' viewBox='0 0 24 24'%3E%3Cpath d='M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z'/%3E%3C/svg%3E" alt="Complaints" />
          </div>
          <h3>Complaint Management</h3>
          <p>Submit and track your complaints efficiently</p>
        </div>
        <div className="card" onClick={() => setPage("network")}>
          <div className="card-icon">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%231e3c72' viewBox='0 0 24 24'%3E%3Cpath d='M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H16c-.8 0-1.54.37-2.01 1l-2.54 3.51c-.48.66-.67 1.49-.49 2.28L12.5 18H9.5l1.54-3.21c.18-.79-.01-1.62-.49-2.28L8.01 9C7.54 8.37 6.8 8 6 8H3.46c-.81 0-1.54.5-1.85 1.26L.07 12.37A1 1 0 0 0 1 14h2.5v6c0 1.1.9 2 2 2s2-.9 2-2v-6h2v6c0 1.1.9 2 2 2s2-.9 2-2z'/%3E%3C/svg%3E" alt="Network" />
          </div>
          <h3>Student Network</h3>
          <p>Connect with peers and share achievements</p>
        </div>
        <div className="card" onClick={() => setPage("profile")}>
          <div className="card-icon">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%231e3c72' viewBox='0 0 24 24'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E" alt="Profile" />
          </div>
          <h3>My Profile</h3>
          <p>Update your personal information and details</p>
        </div>
      </div>
    </div>
  );
}

function Profile({ user, setPage }) {
  const [profile, setProfile] = useState({
    name: user.name,
    email: user.email,
    regNo: "",
    mobile: "",
    department: "",
    year: "",
    address: ""
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(`profile_${user.email}`) || "{}");
    setProfile({...profile, ...saved});
  }, []);

  function updateProfile() {
    localStorage.setItem(`profile_${user.email}`, JSON.stringify(profile));
    alert("Profile updated successfully!");
  }

  return (
    <div className="glass-box">
      <div className="nav">
        <div className="user-info">Profile Settings</div>
        <div>
          <button onClick={() => setPage("dashboard")}>Dashboard</button>
          <button onClick={() => setPage("profile")}>Profile</button>
        </div>
      </div>
      
      <div className="profile-section">
        <div className="profile-pic">
          {user.name.charAt(0).toUpperCase()}
        </div>
        
        <div className="title" style={{color: '#1e3c72', textAlign: 'center', marginBottom: '30px'}}>
          My Profile
        </div>
        
        <div className="form-row">
          <div>
            <label style={{fontWeight: '600', color: '#333', marginBottom: '5px', display: 'block'}}>Full Name</label>
            <input 
              value={profile.name} 
              onChange={e => setProfile({...profile, name: e.target.value})}
            />
          </div>
          <div>
            <label style={{fontWeight: '600', color: '#333', marginBottom: '5px', display: 'block'}}>Registration Number</label>
            <input 
              placeholder="Enter Reg No" 
              value={profile.regNo} 
              onChange={e => setProfile({...profile, regNo: e.target.value})}
            />
          </div>
        </div>
        
        <div className="form-row">
          <div>
            <label style={{fontWeight: '600', color: '#333', marginBottom: '5px', display: 'block'}}>Email</label>
            <input 
              value={profile.email} 
              disabled
              style={{backgroundColor: '#f8f9fa'}}
            />
          </div>
          <div>
            <label style={{fontWeight: '600', color: '#333', marginBottom: '5px', display: 'block'}}>Mobile Number</label>
            <input 
              placeholder="Enter Mobile No" 
              value={profile.mobile} 
              onChange={e => setProfile({...profile, mobile: e.target.value})}
            />
          </div>
        </div>
        
        <div className="form-row">
          <div>
            <label style={{fontWeight: '600', color: '#333', marginBottom: '5px', display: 'block'}}>Department</label>
            <select 
              value={profile.department} 
              onChange={e => setProfile({...profile, department: e.target.value})}
            >
              <option value="">Select Department</option>
              <option value="CSE">Computer Science Engineering</option>
              <option value="ECE">Electronics & Communication</option>
              <option value="EEE">Electrical & Electronics</option>
              <option value="MECH">Mechanical Engineering</option>
              <option value="CIVIL">Civil Engineering</option>
            </select>
          </div>
          <div>
            <label style={{fontWeight: '600', color: '#333', marginBottom: '5px', display: 'block'}}>Year of Study</label>
            <select 
              value={profile.year} 
              onChange={e => setProfile({...profile, year: e.target.value})}
            >
              <option value="">Select Year</option>
              <option value="1">First Year</option>
              <option value="2">Second Year</option>
              <option value="3">Third Year</option>
              <option value="4">Fourth Year</option>
            </select>
          </div>
        </div>
        
        <div>
          <label style={{fontWeight: '600', color: '#333', marginBottom: '5px', display: 'block'}}>Address</label>
          <textarea 
            placeholder="Enter your address" 
            value={profile.address} 
            onChange={e => setProfile({...profile, address: e.target.value})}
            rows="3"
          />
        </div>
        
        <button onClick={updateProfile} style={{marginTop: '20px'}}>
          UPDATE PROFILE
        </button>
      </div>
    </div>
  );
}

function AdminDashboard({ user, setPage, logout }) {
  return (
    <div className="glass-box">
      <div className="nav">
        <div className="user-info">Admin Panel</div>
        <div>
          <button onClick={() => setPage("adminDashboard")}>Dashboard</button>
          <button onClick={() => setPage("adminAttendance")}>Attendance</button>
          <button onClick={() => setPage("adminComplaints")}>Complaints</button>
          <button onClick={() => setPage("network")}>Network</button>
          <button onClick={logout}>Logout</button>
        </div>
      </div>
      
      <div className="title" style={{color: '#1e3c72'}}>Admin Dashboard</div>
      <div className="subtitle">SATHYABAMA UNIVERSITY</div>
      
      <div className="dashboard">
        <div className="card" onClick={() => setPage("adminAttendance")}>
          <div className="card-icon">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%231e3c72' viewBox='0 0 24 24'%3E%3Cpath d='M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm6 12H6v-1c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1z'/%3E%3C/svg%3E" alt="Attendance" />
          </div>
          <h3>View All Attendance</h3>
          <p>Monitor student attendance records</p>
        </div>
        <div className="card" onClick={() => setPage("adminComplaints")}>
          <div className="card-icon">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%231e3c72' viewBox='0 0 24 24'%3E%3Cpath d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'/%3E%3C/svg%3E" alt="Manage" />
          </div>
          <h3>Manage Complaints</h3>
          <p>Update complaint status and resolve issues</p>
        </div>
        <div className="card" onClick={() => setPage("network")}>
          <div className="card-icon">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%231e3c72' viewBox='0 0 24 24'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z'/%3E%3C/svg%3E" alt="Monitor" />
          </div>
          <h3>Monitor Network</h3>
          <p>Oversee student posts and activities</p>
        </div>
      </div>
    </div>
  );
}

function Attendance({ user, setPage }) {
  const [records, setRecords] = useState([]);
  const [marked, setMarked] = useState(false);
  const [showBiometric, setShowBiometric] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState(null);
  const today = new Date().toLocaleDateString();

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("attendance") || "[]");
    const userRecords = all.filter(r => r.email === user.email);
    setRecords(userRecords);
    setMarked(all.some(r => r.email === user.email && r.date === today));
  }, []);

  function openBiometricOptions() {
    if (marked) return;
    setShowBiometric(true);
  }

  function openCamera() {
    setShowBiometric(false);
    setShowCamera(true);
    
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(mediaStream => {
        setStream(mediaStream);
        const video = document.getElementById('cameraVideo');
        if (video) {
          video.srcObject = mediaStream;
        }
      })
      .catch(err => {
        alert('Camera access denied or not available');
        setShowCamera(false);
      });
  }

  function closeCamera() {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setShowCamera(false);
  }

  function markAttendance(type) {
    if (marked) return;
    
    const all = JSON.parse(localStorage.getItem("attendance") || "[]");
    const typeText = type === "fingerprint" ? "Biometric (Fingerprint)" :
                    type === "camera" ? "Biometric (Camera)" :
                    "GPS Location";
    const newRecord = {
      name: user.name,
      email: user.email,
      date: today,
      time: new Date().toLocaleTimeString(),
      type: typeText,
      status: "Present"
    };
    all.push(newRecord);
    localStorage.setItem("attendance", JSON.stringify(all));
    setRecords([...records, newRecord]);
    setMarked(true);
    
    // Close modals
    setShowBiometric(false);
    closeCamera();
    
    alert(`Attendance marked successfully via ${typeText}!`);
  }

  return (
    <div className="glass-box">
      <div className="nav">
        <div className="user-info">Smart Attendance</div>
        <div>
          <button onClick={() => setPage("dashboard")}>Dashboard</button>
          <button onClick={() => setPage("attendance")}>Attendance</button>
        </div>
      </div>
      
      <div className="title" style={{color: '#1e3c72'}}>Smart Attendance System</div>
      <div className="subtitle">{today}</div>

      <div className="note-box">
        <span className="note-icon">📝</span>
        <span className="note-text">Note: Phone should be connected with Hostel WiFi for attendance marking</span>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', margin: '20px 0'}}>
        <div className="card" onClick={openBiometricOptions} style={{margin: 0, opacity: marked ? 0.5 : 1, cursor: marked ? 'not-allowed' : 'pointer'}}>
          <div className="card-icon">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%231e3c72' viewBox='0 0 24 24'%3E%3Cpath d='M17.81 4.47c-.08 0-.16-.02-.23-.06C15.66 3.42 14 3 12.01 3c-1.98 0-3.86.47-5.57 1.41-.24.13-.54.04-.68-.2-.13-.24-.04-.55.2-.68C7.82 2.52 9.86 2 12.01 2c2.13 0 3.99.47 6.03 1.52.25.13.34.43.21.67-.09.18-.26.28-.44.28z'/%3E%3C/svg%3E" alt="Biometric" />
          </div>
          <h3>Biometric</h3>
          <p>Fingerprint or Face verification</p>
        </div>
        <div className="card" onClick={() => !marked && markAttendance("gps")} style={{margin: 0, opacity: marked ? 0.5 : 1, cursor: marked ? 'not-allowed' : 'pointer'}}>
          <div className="card-icon">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%231e3c72' viewBox='0 0 24 24'%3E%3Cpath d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'/%3E%3C/svg%3E" alt="GPS" />
          </div>
          <h3>GPS Location</h3>
          <p>Location-based verification</p>
        </div>
      </div>

      {marked && (
        <div style={{textAlign: 'center', color: '#27ae60', margin: '20px 0', fontWeight: '600', padding: '20px', background: '#f8f9fa', borderRadius: '8px'}}>
          ✓ Attendance already marked for today
        </div>
      )}

      {/* Biometric Options Modal */}
      {showBiometric && (
        <div className="modal">
          <div className="modal-content">
            <h3 style={{color: '#1e3c72', marginBottom: '20px'}}>Select Biometric Method</h3>
            <div className="biometric-options">
              <div className="card" onClick={() => markAttendance("fingerprint")} style={{margin: 0}}>
                <div className="card-icon">
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%231e3c72' viewBox='0 0 24 24'%3E%3Cpath d='M17.81 4.47c-.08 0-.16-.02-.23-.06C15.66 3.42 14 3 12.01 3c-1.98 0-3.86.47-5.57 1.41-.24.13-.54.04-.68-.2-.13-.24-.04-.55.2-.68C7.82 2.52 9.86 2 12.01 2c2.13 0 3.99.47 6.03 1.52.25.13.34.43.21.67-.09.18-.26.28-.44.28z'/%3E%3C/svg%3E" alt="Fingerprint" />
                </div>
                <h3>Fingerprint</h3>
                <p>Touch sensor</p>
              </div>
              <div className="card" onClick={openCamera} style={{margin: 0}}>
                <div className="card-icon">
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%231e3c72' viewBox='0 0 24 24'%3E%3Cpath d='M12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zM9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z'/%3E%3C/svg%3E" alt="Camera" />
                </div>
                <h3>Camera</h3>
                <p>Face recognition</p>
              </div>
            </div>
            <button onClick={() => setShowBiometric(false)} style={{marginTop: '20px', background: '#666'}}>Cancel</button>
          </div>
        </div>
      )}

      {/* Camera Modal */}
      {showCamera && (
        <div className="modal">
          <div className="modal-content">
            <h3 style={{color: '#1e3c72', marginBottom: '20px'}}>Face Recognition</h3>
            <div className="camera-container">
              <video id="cameraVideo" className="camera-video" autoPlay playsInline></video>
            </div>
            <div style={{display: 'flex', gap: '10px', justifyContent: 'center'}}>
              <button onClick={() => markAttendance("camera")} style={{flex: 1}}>Capture & Mark Attendance</button>
              <button onClick={closeCamera} style={{flex: 1, background: '#666'}}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <h3 style={{color: '#1e3c72', marginTop: '30px'}}>Your Attendance History</h3>
      {records.map((record, i) => (
        <div key={i} className="record">
          <strong>{record.date}</strong> - {record.time} - {record.type} - {record.status}
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
        <div className="user-info">All Attendance Records</div>
        <div>
          <button onClick={() => setPage("adminDashboard")}>Dashboard</button>
          <button onClick={() => setPage("adminAttendance")}>Attendance</button>
        </div>
      </div>
      
      <div className="title" style={{color: '#1e3c72'}}>All Attendance Records</div>
      
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
        <div className="user-info">Complaint Management</div>
        <div>
          <button onClick={() => setPage("dashboard")}>Dashboard</button>
          <button onClick={() => setPage("complaints")}>Complaints</button>
        </div>
      </div>
      
      <div className="title" style={{color: '#1e3c72'}}>Complaint Management</div>
      
      <div className="profile-section">
        <h3 style={{color: '#1e3c72'}}>Submit New Complaint</h3>
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
        <button onClick={submitComplaint}>SUBMIT COMPLAINT</button>
      </div>

      <h3 style={{color: '#1e3c72', marginTop: '30px'}}>Your Complaints</h3>
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
        <div className="user-info">Manage All Complaints</div>
        <div>
          <button onClick={() => setPage("adminDashboard")}>Dashboard</button>
          <button onClick={() => setPage("adminComplaints")}>Complaints</button>
        </div>
      </div>
      
      <div className="title" style={{color: '#1e3c72'}}>Manage All Complaints</div>
      
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
        <div className="user-info">Student Network</div>
        <div>
          <button onClick={() => setPage(user.role === "admin" ? "adminDashboard" : "dashboard")}>Dashboard</button>
          <button onClick={() => setPage("network")}>Network</button>
        </div>
      </div>
      
      <div className="title" style={{color: '#1e3c72'}}>Student Network</div>
      
      {user.role === "student" && (
        <div className="profile-section">
          <h3 style={{color: '#1e3c72'}}>Create New Post</h3>
          <textarea 
            placeholder="What's on your mind? Share projects, achievements, or connect with peers..."
            value={content}
            onChange={e => setContent(e.target.value)}
            rows="3"
          />
          <button onClick={createPost}>CREATE POST</button>
        </div>
      )}

      <h3 style={{color: '#1e3c72', marginTop: '30px'}}>Recent Posts</h3>
      {posts.map(post => (
        <div key={post.id} className="record">
          <strong>{post.name}</strong> <small>({post.date})</small><br/>
          {post.content}
          {user.role === "admin" && (
            <div style={{marginTop: '10px', fontSize: '12px', color: '#f39c12', fontWeight: '600'}}>
              Admin Monitoring
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);