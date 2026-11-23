
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import StudentDashboard from './modules/student/StudentDashboard';
import './App.css';

function Home() {
  return (
    <div className="page">
      <h1>Welcome to TaskHub</h1>
      <p>Smart Assignment Management System</p>

      <div className="buttons">
        <Link to="/teacher">Teacher Portal</Link>
        <Link to="/student">Student Portal</Link>
      </div>
    </div>
  );
}

function TeacherDashboard() {
  return (
    <div className="page">
      <h1>Teacher Dashboard</h1>
      <p>Welcome to the TaskHub Teacher Portal.</p>
      <h2>Manage Assignments</h2>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <header className="navbar">
        <Link to="/" className="brand">TaskHub</Link>

        <nav>
          <Link to="/">Home</Link>
          <Link to="/teacher">Teacher</Link>
          <Link to="/student">Student</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/student" element={<StudentDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
