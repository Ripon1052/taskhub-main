
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    Outlet
} from "react-router-dom";

import {
    ArrowRight,
    BookOpenCheck,
    CalendarDays,
    CheckCircle2,
    ClipboardCheck,
    GraduationCap,
    Mail,
    Phone,
    User,
    ShieldCheck,
    Sparkles
} from "lucide-react";

import TeacherDashboard from "./modules/taskhub/teacher/TeacherDashboard";
import StudentDashboard from "./modules/taskhub/student/StudentDashboard";

import "./App.css";

// ===================================
// HOMEPAGE FEATURES
// ===================================

const features = [
    {
        icon: ClipboardCheck,
        title: "Assignment Management",
        description: "Create, organize and track assignments."
    },
    {
        icon: CalendarDays,
        title: "Deadline Tracking",
        description: "Stay updated with upcoming deadlines."
    },
    {
        icon: GraduationCap,
        title: "Dedicated Portals",
        description: "Separate teacher and student workspaces."
    },
    {
        icon: ShieldCheck,
        title: "Secure Workspace",
        description: "Designed for role-based academic access."
    }
];

// ===================================
// HOME PAGE
// ===================================

function Home() {
    return (
        <main>
            {/* HERO SECTION */}
            <section className="th-hero">
                <div className="th-container th-hero-grid">

                    <div className="th-hero-copy">

                        <div className="th-eyebrow">
                            <Sparkles size={16} />
                            Smart Academic Workspace
                        </div>

                        <h1>
                            Manage assignments.
                            <span> Learn better.</span>
                        </h1>

                        <p className="th-hero-description">
                            A simple workspace for teachers and students.
                        </p>

                        <div className="th-hero-actions">
                            <Link
                                to="/student"
                                className="th-btn th-btn-primary"
                            >
                                Student Portal
                                <ArrowRight size={18} />
                            </Link>

                            <Link
                                to="/teacher"
                                className="th-btn th-btn-outline"
                            >
                                Teacher Portal
                            </Link>
                        </div>

                        <div className="th-hero-benefits">
              <span>
                <CheckCircle2 size={16} />
                Easy to use
              </span>

                            <span>
                <CheckCircle2 size={16} />
                Organized workflow
              </span>
                        </div>

                    </div>

                    {/* DASHBOARD PREVIEW */}
                    <div className="th-preview">

                        <div className="th-preview-top">
                            <div className="th-preview-dots">
                                <span />
                                <span />
                                <span />
                            </div>

                            <span>TaskHub / Dashboard</span>
                        </div>

                        <div className="th-preview-content">

                            <div className="th-preview-heading">
                                <div>
                                    <small>WORKSPACE OVERVIEW</small>
                                    <h3>My Dashboard</h3>
                                    <p>Academic overview</p>
                                </div>

                                <div className="th-preview-icon">
                                    <GraduationCap size={25} />
                                </div>
                            </div>

                            <div className="th-preview-stats">
                                <div className="th-stat-card">
                                    <BookOpenCheck size={20} />
                                    <strong>12</strong>
                                    <span>Assignments</span>
                                </div>

                                <div className="th-stat-card">
                                    <CheckCircle2 size={20} />
                                    <strong>08</strong>
                                    <span>Completed</span>
                                </div>

                                <div className="th-stat-card">
                                    <CalendarDays size={20} />
                                    <strong>04</strong>
                                    <span>Upcoming</span>
                                </div>
                            </div>

                            <div className="th-preview-list">
                                <h4>Recent Assignments</h4>

                                <div className="th-preview-item">
                  <span className="th-task-icon">
                    <BookOpenCheck size={18} />
                  </span>

                                    <div className="th-task-info">
                                        <strong>Data Structures</strong>
                                        <small>Linked List Assignment</small>
                                    </div>

                                    <span className="th-status th-status-open">
                    Pending
                  </span>
                                </div>

                                <div className="th-preview-item">
                  <span className="th-task-icon">
                    <ClipboardCheck size={18} />
                  </span>

                                    <div className="th-task-info">
                                        <strong>Database Management</strong>
                                        <small>SQL Fundamentals</small>
                                    </div>

                                    <span className="th-status th-status-done">
                    Done
                  </span>
                                </div>
                            </div>

                        </div>

                        <div className="th-preview-note">
                            Sample Dashboard Preview
                        </div>

                    </div>
                </div>
            </section>

            {/* FEATURES SECTION */}
            <section className="th-features" id="features">
                <div className="th-container">

                    <div className="th-section-heading">
                        <div className="th-section-label">
                            WHY TASKHUB
                        </div>

                        <h2>
                            Everything you need to stay organized
                        </h2>

                        <p>
                            One platform. Smarter academic management.
                        </p>
                    </div>

                    <div className="th-features-grid">
                        {features.map(
                            ({ icon: Icon, title, description }) => (
                                <article
                                    className="th-feature-card"
                                    key={title}
                                >
                                    <div className="th-feature-icon">
                                        <Icon size={23} />
                                    </div>

                                    <h3>{title}</h3>
                                    <p>{description}</p>
                                </article>
                            )
                        )}
                    </div>

                </div>
            </section>

            {/* PORTAL SELECTION */}
            <section className="th-portal-section">
                <div className="th-container">

                    <div className="th-section-heading">
                        <div className="th-section-label">
                            GET STARTED
                        </div>

                        <h2>Choose Your Workspace</h2>

                        <p>Select your portal to continue.</p>
                    </div>

                    <div className="th-portal-grid">

                        <Link
                            to="/teacher"
                            className="th-portal-card"
                        >
                            <div className="th-portal-icon">
                                <ClipboardCheck size={27} />
                            </div>

                            <h3>I'm a Teacher</h3>

                            <p>
                                Manage assignments and student submissions.
                            </p>

                            <span>
                Open Teacher Portal
                <ArrowRight size={18} />
              </span>
                        </Link>

                        <Link
                            to="/student"
                            className="th-portal-card"
                        >
                            <div className="th-portal-icon">
                                <GraduationCap size={27} />
                            </div>

                            <h3>I'm a Student</h3>

                            <p>
                                View assignments and track your progress.
                            </p>

                            <span>
                Open Student Portal
                <ArrowRight size={18} />
              </span>
                        </Link>

                    </div>
                </div>
            </section>
        </main>
    );
}

// ===================================
// HELP FOOTER
// ===================================

function Footer() {
    return (
        <footer className="th-footer">
            <div className="th-container th-footer-help">

                <div className="th-footer-heading">
                    <h3>Need Help?</h3>
                </div>

                <div className="th-help-grid">

                    <div className="th-help-item">
                        <User size={19} />
                        <span>Supriya Bag</span>
                    </div>

                    <div className="th-help-item">
                        <Mail size={19} />
                        <span>your-email@example.com</span>
                    </div>

                    <div className="th-help-item">
                        <Phone size={19} />
                        <span>+91 XXXXX XXXXX</span>
                    </div>

                </div>

                <div className="th-footer-bottom">
                    <span>TaskHub</span>
                    <span>Academic Management Platform</span>
                </div>

            </div>
        </footer>
    );
}

// ===================================
// PUBLIC LAYOUT
// Navbar and Footer only for public pages
// ===================================

function PublicLayout() {
    return (
        <>
            <header className="th-header">
                <div className="th-container th-navbar">

                    <Link to="/" className="th-logo">
            <span className="th-logo-mark">
              <GraduationCap size={23} />
            </span>

                        Task<span>Hub</span>
                    </Link>

                </div>
            </header>

            <Outlet />

            <Footer />
        </>
    );
}

// ===================================
// MAIN APP ROUTING
// ===================================

export default function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* PUBLIC PAGES */}
                <Route element={<PublicLayout />}>
                    <Route path="/" element={<Home />} />
                </Route>

                {/* TEACHER DASHBOARD */}
                <Route
                    path="/teacher/*"
                    element={<TeacherDashboard />}
                />

                {/* STUDENT DASHBOARD */}
                <Route
                    path="/student/*"
                    element={<StudentDashboard />}
                />

            </Routes>
        </BrowserRouter>
    );
}
