
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from 'react-router-dom';

import TeacherDashboard from './modules/taskhub/teacher/TeacherDashboard';
import StudentDashboard from './modules/taskhub/student/StudentDashboard';

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

export default function App() {
  return (
    <BrowserRouter>
      <header className="navbar">
        <Link to="/" className="brand">
          TaskHub
        </Link>

        <nav>
          <Link to="/">Home</Link>
          <Link to="/teacher">Teacher</Link>
          <Link to="/student">Student</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/teacher"
          element={<TeacherDashboard />}
        />
        <Route
          path="/student"
          element={<StudentDashboard />}
        />
      </Routes>
    </BrowserRouter>
  );
}
