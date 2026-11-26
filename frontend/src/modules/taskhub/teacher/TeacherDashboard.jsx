import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { School } from "lucide-react";
import TeacherClasses from "./TeacherClasses";
import {
    LayoutDashboard,
    ClipboardList,
    UsersRound,
    CalendarDays,
    GraduationCap,
    Menu,
    X,
    Plus,
    Search,
    Clock3,
    CheckCircle2,
    FileText,
    ArrowRight
} from "lucide-react";

import "./TeacherDashboard.css";

// ===================================
// SIDEBAR MENU
// ===================================

const menuItems = [
    {
        id: "overview",
        label: "Overview",
        icon: LayoutDashboard
    },
    {
        id: "classes",
        label: "Classes",
        icon: School
    },
    {
        id: "assignments",
        label: "Assignments",
        icon: ClipboardList
    },
    {
        id: "submissions",
        label: "Submissions",
        icon: UsersRound
    },
    {
        id: "deadlines",
        label: "Deadlines",
        icon: CalendarDays
    }
];

// ===================================
// DEMO ASSIGNMENTS
// ===================================

const sampleAssignments = [
    {
        id: 1,
        title: "Linked List Implementation",
        subject: "Data Structures",
        due: "2026-12-03",
        status: "Active",
        submitted: 18,
        total: 32
    },
    {
        id: 2,
        title: "SQL Fundamentals",
        subject: "Database Management",
        due: "2026-12-08",
        status: "Active",
        submitted: 24,
        total: 32
    },
    {
        id: 3,
        title: "Operating System Basics",
        subject: "Operating Systems",
        due: "2026-12-15",
        status: "Draft",
        submitted: 0,
        total: 32
    }
];

// ===================================
// DEMO SUBMISSIONS
// ===================================

const sampleSubmissions = [
    {
        id: 1,
        student: "Student 01",
        assignment: "Linked List Implementation",
        status: "To Review"
    },
    {
        id: 2,
        student: "Student 02",
        assignment: "SQL Fundamentals",
        status: "Reviewed"
    },
    {
        id: 3,
        student: "Student 03",
        assignment: "Linked List Implementation",
        status: "To Review"
    }
];

// ===================================
// DATE FORMAT
// ===================================

function formatDate(value) {
    return new Date(
        `${value}T00:00:00`
    ).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });
}

// ===================================
// TEACHER DASHBOARD
// ===================================

export default function TeacherDashboard() {


    const navigate = useNavigate();
    const location = useLocation();

    const validPages = [
        "overview",
        "classes",
        "assignments",
        "submissions",
        "deadlines"
    ];

    const currentPath = location.pathname
        .split("/")
        .filter(Boolean)[1];

    const activePage = validPages.includes(currentPath)
        ? currentPath
        : "overview";


    const [mobileMenu, setMobileMenu] = useState(false);

    const [assignments, setAssignments] = useState(
        sampleAssignments
    );

    const [search, setSearch] = useState("");

    const [showForm, setShowForm] = useState(false);

    const [newAssignment, setNewAssignment] = useState({
        title: "",
        subject: "",
        due: ""
    });

    // ===================================
    // LIVE CLOCK
    // ===================================

    const [currentTime, setCurrentTime] = useState(
        () => new Date()
    );

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const currentDate = currentTime.toLocaleDateString(
        "en-IN",
        {
            weekday: "long",
            day: "2-digit",
            month: "long",
            year: "numeric"
        }
    );

    const liveTime = currentTime.toLocaleTimeString(
        "en-IN",
        {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true
        }
    );

    // ===================================
    // NAVIGATION
    // ===================================


    const changePage = (page) => {
        const url = page === "overview"
            ? "/teacher"
            : `/teacher/${page}`;

        navigate(url);
        setMobileMenu(false);
    };


    // ===================================
    // SEARCH
    // ===================================

    const filteredAssignments = assignments.filter(
        (item) =>
            `${item.title} ${item.subject}`
                .toLowerCase()
                .includes(search.toLowerCase())
    );

    // ===================================
    // STATISTICS
    // ===================================

    const pendingReviews = sampleSubmissions.filter(
        (item) => item.status === "To Review"
    ).length;

    const activeAssignments = assignments.filter(
        (item) => item.status === "Active"
    );

    const stats = [
        {
            label: "Assignments",
            value: assignments.length,
            icon: ClipboardList,
            tone: "blue"
        },
        {
            label: "Active",
            value: activeAssignments.length,
            icon: CheckCircle2,
            tone: "green"
        },
        {
            label: "Submissions",
            value: sampleSubmissions.length,
            icon: FileText,
            tone: "purple"
        },
        {
            label: "To Review",
            value: pendingReviews,
            icon: Clock3,
            tone: "orange"
        }
    ];

    // ===================================
    // CREATE ASSIGNMENT
    // ===================================

    const createAssignment = (event) => {
        event.preventDefault();

        const assignment = {
            id: Date.now(),
            ...newAssignment,
            status: "Active",
            submitted: 0,
            total: 0
        };

        setAssignments((previous) => [
            assignment,
            ...previous
        ]);

        setNewAssignment({
            title: "",
            subject: "",
            due: ""
        });

        setShowForm(false);
        changePage("assignments");
    };

    // ===================================
    // ASSIGNMENT TABLE
    // ===================================

    const assignmentList = (items) => (
        <div className="td-table-wrap">

            <table className="td-table">
                <thead>
                <tr>
                    <th>Assignment</th>
                    <th>Deadline</th>
                    <th>Progress</th>
                    <th>Status</th>
                </tr>
                </thead>

                <tbody>
                {items.length === 0 ? (
                    <tr>
                        <td colSpan="4" className="td-empty">
                            No assignments found.
                        </td>
                    </tr>
                ) : (
                    items.map((item) => (
                        <tr key={item.id}>

                            <td>
                                <strong>{item.title}</strong>
                                <small>{item.subject}</small>
                            </td>

                            <td>{formatDate(item.due)}</td>

                            <td>
                                {item.total
                                    ? `${item.submitted}/${item.total}`
                                    : "—"}
                            </td>

                            <td>
                  <span
                      className={`td-status ${
                          item.status === "Active"
                              ? "td-active"
                              : "td-draft"
                      }`}
                  >
                    {item.status}
                  </span>
                            </td>

                        </tr>
                    ))
                )}
                </tbody>

            </table>
        </div>
    );

    // ===================================
    // MAIN INTERFACE
    // ===================================

    return (
        <div className="td-dashboard">

            {/* MOBILE OVERLAY */}
            {mobileMenu && (
                <button
                    type="button"
                    className="td-overlay"
                    aria-label="Close navigation"
                    onClick={() => setMobileMenu(false)}
                />
            )}

            {/* SIDEBAR */}
            <aside
                className={`td-sidebar ${
                    mobileMenu ? "td-sidebar-open" : ""
                }`}
            >

                <div className="td-sidebar-heading">

                    <div className="td-brand">
            <span className="td-brand-icon">
              <GraduationCap size={23} />
            </span>

                        <span>TaskHub</span>
                    </div>

                    <button
                        type="button"
                        className="td-close-menu"
                        onClick={() => setMobileMenu(false)}
                        aria-label="Close menu"
                    >
                        <X size={22} />
                    </button>

                </div>

                <div className="td-menu-label">
                    WORKSPACE
                </div>

                <nav
                    className="td-menu"
                    aria-label="Teacher dashboard"
                >
                    {menuItems.map(
                        ({ id, label, icon: Icon }) => (
                            <button
                                type="button"
                                key={id}
                                className={`td-menu-item ${
                                    activePage === id
                                        ? "td-menu-active"
                                        : ""
                                }`}
                                onClick={() => changePage(id)}
                            >
                                <Icon size={19} />
                                <span>{label}</span>
                            </button>
                        )
                    )}
                </nav>

                <div className="td-sidebar-bottom">
                    <div className="td-avatar">T</div>

                    <div>
                        <strong>Teacher Account</strong>
                        <small>Demo Workspace</small>
                    </div>
                </div>

            </aside>

            {/* MAIN DASHBOARD */}
            <main className="td-main">

                {/* TOP BAR */}
                <header className="td-topbar">

                    <div className="td-topbar-left">

                        <button
                            type="button"
                            className="td-mobile-menu"
                            onClick={() => setMobileMenu(true)}
                            aria-label="Open navigation"
                        >
                            <Menu size={23} />
                        </button>

                        <div>
              <span className="td-breadcrumb">
                Teacher Workspace
              </span>

                            <h1>
                                {
                                    menuItems.find(
                                        (item) => item.id === activePage
                                    )?.label
                                }
                            </h1>
                        </div>

                    </div>

                    <span className="td-demo-label">
            Demo Mode
          </span>

                </header>

                <div className="td-content">
                    {activePage === "classes" && <TeacherClasses />}
                    {/* OVERVIEW PAGE */}
                    {activePage === "overview" && (
                        <>

                            {/* WELCOME SECTION */}
                            <section className="td-welcome">

                                <div>
                  <span className="td-welcome-label">
                    WELCOME BACK
                  </span>

                                    <h2>
                                        Good to see you, Teacher!
                                    </h2>

                                    {/* LIVE DATE AND TIME */}
                                    <div className="td-live-clock">

                    <span className="td-clock-group">
                      <CalendarDays size={17} />
                        {currentDate}
                    </span>

                                        <span className="td-clock-group">
                      <Clock3 size={17} />
                      <time dateTime={currentTime.toISOString()}>
                        {liveTime}
                      </time>
                    </span>

                                    </div>
                                </div>

                                <button
                                    type="button"
                                    className="td-primary-button"
                                    onClick={() => setShowForm(true)}
                                >
                                    <Plus size={18} />
                                    Create Assignment
                                </button>

                            </section>

                            {/* STATS */}
                            <section className="td-stats">

                                {stats.map(
                                    ({ label, value, icon: Icon, tone }) => (

                                        <div className="td-stat" key={label}>

                      <span
                          className={`td-stat-icon td-tone-${tone}`}
                      >
                        <Icon size={22} />
                      </span>

                                            <strong>{value}</strong>
                                            <span>{label}</span>

                                        </div>
                                    )
                                )}

                            </section>

                            {/* RECENT ASSIGNMENTS */}
                            <section className="td-panel">

                                <div className="td-panel-heading">
                                    <div>
                                        <h2>Recent Assignments</h2>
                                        <p>Track your latest academic tasks.</p>
                                    </div>

                                    <button
                                        type="button"
                                        className="td-text-button"
                                        onClick={() => changePage("assignments")}
                                    >
                                        View All
                                        <ArrowRight size={16} />
                                    </button>
                                </div>

                                {assignmentList(assignments.slice(0, 3))}

                            </section>

                            {/* RECENT SUBMISSIONS */}
                            <section className="td-panel">

                                <div className="td-panel-heading">
                                    <div>
                                        <h2>Recent Submissions</h2>
                                        <p>Latest student activity.</p>
                                    </div>
                                </div>

                                <div className="td-submission-list">

                                    {sampleSubmissions.slice(0, 3).map(
                                        (item) => (

                                            <div
                                                className="td-submission"
                                                key={item.id}
                                            >
                                                <div className="td-student-icon">
                                                    <UsersRound size={19} />
                                                </div>

                                                <div className="td-submission-info">
                                                    <strong>{item.student}</strong>
                                                    <small>{item.assignment}</small>
                                                </div>

                                                <span
                                                    className={`td-status ${
                                                        item.status === "Reviewed"
                                                            ? "td-reviewed"
                                                            : "td-pending"
                                                    }`}
                                                >
                          {item.status}
                        </span>
                                            </div>
                                        )
                                    )}

                                </div>
                            </section>

                        </>
                    )}

                    {/* ASSIGNMENTS PAGE */}
                    {activePage === "assignments" && (
                        <section className="td-panel">

                            <div className="td-panel-heading">
                                <div>
                                    <h2>Manage Assignments</h2>
                                    <p>Create and organize assignments.</p>
                                </div>

                                <button
                                    type="button"
                                    className="td-primary-button"
                                    onClick={() => setShowForm(true)}
                                >
                                    <Plus size={18} />
                                    New Assignment
                                </button>
                            </div>

                            <label className="td-search">
                                <Search size={18} />

                                <input
                                    type="search"
                                    placeholder="Search assignments..."
                                    value={search}
                                    onChange={(event) =>
                                        setSearch(event.target.value)
                                    }
                                />
                            </label>

                            {assignmentList(filteredAssignments)}

                        </section>
                    )}

                    {/* SUBMISSIONS PAGE */}
                    {activePage === "submissions" && (
                        <section className="td-panel">

                            <div className="td-panel-heading">
                                <div>
                                    <h2>Student Submissions</h2>
                                    <p>Submission overview.</p>
                                </div>
                            </div>

                            <div className="td-submission-list">

                                {sampleSubmissions.map((item) => (

                                    <div
                                        className="td-submission"
                                        key={item.id}
                                    >
                                        <div className="td-student-icon">
                                            <UsersRound size={19} />
                                        </div>

                                        <div className="td-submission-info">
                                            <strong>{item.student}</strong>
                                            <small>{item.assignment}</small>
                                        </div>

                                        <span
                                            className={`td-status ${
                                                item.status === "Reviewed"
                                                    ? "td-reviewed"
                                                    : "td-pending"
                                            }`}
                                        >
                      {item.status}
                    </span>

                                    </div>
                                ))}

                            </div>
                        </section>
                    )}

                    {/* DEADLINES PAGE */}
                    {activePage === "deadlines" && (
                        <section className="td-panel">

                            <div className="td-panel-heading">
                                <div>
                                    <h2>Assignment Deadlines</h2>
                                    <p>Upcoming academic deadlines.</p>
                                </div>
                            </div>

                            <div className="td-deadline-list">

                                {[...assignments]
                                    .filter(
                                        (item) => item.status === "Active"
                                    )
                                    .sort(
                                        (a, b) => a.due.localeCompare(b.due)
                                    )
                                    .map((item) => (

                                        <div
                                            className="td-deadline"
                                            key={item.id}
                                        >

                      <span className="td-deadline-icon">
                        <CalendarDays size={20} />
                      </span>

                                            <div>
                                                <strong>{item.title}</strong>
                                                <small>{item.subject}</small>
                                            </div>

                                            <time dateTime={item.due}>
                                                {formatDate(item.due)}
                                            </time>

                                        </div>
                                    ))}

                            </div>
                        </section>
                    )}

                </div>
            </main>

            {/* CREATE ASSIGNMENT MODAL */}
            {showForm && (
                <div
                    className="td-modal-backdrop"
                    onClick={(event) => {
                        if (event.target === event.currentTarget) {
                            setShowForm(false);
                        }
                    }}
                >

                    <div
                        className="td-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="td-form-title"
                    >

                        <div className="td-modal-header">
                            <h2 id="td-form-title">
                                Create Assignment
                            </h2>

                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                aria-label="Close form"
                            >
                                <X size={21} />
                            </button>
                        </div>

                        <form onSubmit={createAssignment}>

                            <label>
                                Assignment Title

                                <input
                                    required
                                    maxLength={100}
                                    value={newAssignment.title}
                                    onChange={(event) =>
                                        setNewAssignment({
                                            ...newAssignment,
                                            title: event.target.value
                                        })
                                    }
                                    placeholder="Enter assignment title"
                                />
                            </label>

                            <label>
                                Subject

                                <input
                                    required
                                    maxLength={70}
                                    value={newAssignment.subject}
                                    onChange={(event) =>
                                        setNewAssignment({
                                            ...newAssignment,
                                            subject: event.target.value
                                        })
                                    }
                                    placeholder="Enter subject"
                                />
                            </label>

                            <label>
                                Due Date

                                <input
                                    required
                                    type="date"
                                    value={newAssignment.due}
                                    onChange={(event) =>
                                        setNewAssignment({
                                            ...newAssignment,
                                            due: event.target.value
                                        })
                                    }
                                />
                            </label>

                            <p className="td-form-note">
                                Demo only — assignments are not saved
                                to a database yet.
                            </p>

                            <button
                                type="submit"
                                className="td-primary-button"
                            >
                                Add Demo Assignment
                            </button>

                        </form>

                    </div>
                </div>
            )}

        </div>
    );
}
