import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <ul>
        <li>👥 Manage Students</li>
        <li>📊 Attendance Records</li>
        <li>🗂 Complaints</li>
        <li>🛡 STUDENT-Connection Monitor</li>
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

export default AdminDashboard;
