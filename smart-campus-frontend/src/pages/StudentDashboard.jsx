import { useNavigate } from "react-router-dom";

function StudentDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedUser"));

  return (
    <div>
      <h2>Welcome {user?.name}</h2>

      <ul>
        <li>📍 Smart Attendance</li>
        <li>📝 Complaint Portal</li>
        <li>🤝 STUDENT-Connection</li>
      </ul>

      <button onClick={() => {
        localStorage.removeItem("loggedUser");
        navigate("/");
      }}>
        Logout
      </button>
    </div>
  );
}

export default StudentDashboard;
