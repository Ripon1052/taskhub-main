import { useSearchParams } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
    ArrowLeft,
    ArrowRight,
    BookOpen,
    Check,
    ClipboardCopy,
    GraduationCap,
    Plus,
    Users,
    X
} from "lucide-react";

import "./TeacherClasses.css";

// Only demo data. Real data will come from API.
const DEMO_CLASSES = [
    {
        id: "demo-math",
        name: "Mathematics",
        subject: "Mathematics",
        section: "A",
        code: "MATH-7F3K9P",
        students: [
            { id: "s1", name: "Student 01" },
            { id: "s2", name: "Student 02" }
        ],
        requests: [
            {
                id: "r1",
                name: "Demo Student 03",
                registration: "DEMO-003"
            },
            {
                id: "r2",
                name: "Demo Student 04",
                registration: "DEMO-004"
            }
        ]
    },
    {
        id: "demo-dsa",
        name: "Data Structures",
        subject: "Computer Science",
        section: "B",
        code: "DSA-4R8N2Q",
        students: [
            { id: "s3", name: "Student 05" }
        ],
        requests: []
    }
];

const STORAGE_KEY = "taskhub-teacher-classes-demo-v1";

function loadClasses() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (saved) {
            const data = JSON.parse(saved);

            if (Array.isArray(data)) {
                return data;
            }
        }
    } catch {
        // Fallback to demo classes.
    }

    return DEMO_CLASSES;
}

function generateClassCode(subject) {
    const prefix =
        subject
            .replace(/[^a-z0-9]/gi, "")
            .slice(0, 4)
            .toUpperCase() || "CLAS";

    const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    const values = new Uint8Array(6);

    crypto.getRandomValues(values);

    const suffix = Array.from(
        values,
        (value) => characters[value % characters.length]
    ).join("");

    return `${prefix}-${suffix}`;
}

export default function TeacherClasses() {
    const [classes, setClasses] = useState(loadClasses);

    const [searchParams, setSearchParams] = useSearchParams();

    const selectedId = searchParams.get("class");

    const [showForm, setShowForm] = useState(false);
    const [copyMessage, setCopyMessage] = useState("");

    const [form, setForm] = useState({
        name: "",
        subject: "",
        section: ""
    });

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(classes));
        } catch {
            // Demo remains usable without storage.
        }
    }, [classes]);

    const selectedClass = classes.find(
        (item) => item.id === selectedId
    );

    function createClass(event) {
        event.preventDefault();

        let code;

        do {
            code = generateClassCode(form.subject);
        } while (classes.some((item) => item.code === code));

        const newClass = {
            id: crypto.randomUUID(),
            name: form.name.trim(),
            subject: form.subject.trim(),
            section: form.section.trim(),
            code,
            students: [],
            requests: []
        };

        setClasses((previous) => [newClass, ...previous]);
        setSearchParams({ class: newClass.id });

        setForm({
            name: "",
            subject: "",
            section: ""
        });

        setShowForm(false);
    }

    async function copyCode(code) {
        try {
            await navigator.clipboard.writeText(code);
            setCopyMessage("Code copied!");
        } catch {
            setCopyMessage("Please select and copy the code.");
        }
    }

    function handleRequest(requestId, approve) {
        setClasses((previous) =>
            previous.map((item) => {
                if (item.id !== selectedId) return item;

                const request = item.requests.find(
                    (entry) => entry.id === requestId
                );

                if (!request) return item;

                return {
                    ...item,
                    requests: item.requests.filter(
                        (entry) => entry.id !== requestId
                    ),
                    students: approve
                        ? [
                            ...item.students,
                            {
                                id: request.id,
                                name: request.name
                            }
                        ]
                        : item.students
                };
            })
        );
    }

    function deleteClass(classId) {
        const targetClass = classes.find(
            (item) => item.id === classId
        );

        if (!targetClass) return;

        const confirmed = window.confirm(
            `Are you sure you want to delete "${targetClass.name}"?\n\n` +
            "This action cannot be undone."
        );

        if (!confirmed) return;

        setClasses((previous) =>
            previous.filter((item) => item.id !== classId)
        );

        // Return to class list if current class is deleted
        if (selectedId === classId) {
            setSearchParams({});
        }

        setCopyMessage("");
    }

    return (
        <div className="tc-root">
            {!selectedClass ? (
                <>
                    <div className="tc-heading">
                        <div>
                            <h2>My Classes</h2>
                            <p>Manage your academic classes.</p>
                        </div>

                        <button
                            type="button"
                            className="tc-button"
                            onClick={() => setShowForm(true)}
                        >
                            <Plus size={18} />
                            Create Class
                        </button>
                    </div>

                    <div className="tc-class-grid">
                        {classes.map((item) => (
                            <article className="tc-class-card" key={item.id}>
                                <div className="tc-class-icon">
                                    <BookOpen size={23} />
                                </div>

                                <h3>{item.name}</h3>
                                <p>
                                    {item.subject}
                                    {item.section && ` · Section ${item.section}`}
                                </p>

                                <div className="tc-class-meta">
                  <span>
                    <Users size={16} />
                      {item.students.length} Students
                  </span>

                                    <span>
                    {item.requests.length} Requests
                  </span>
                                </div>

                                <div className="tc-code-box">
                                    <code>{item.code}</code>

                                    <button
                                        type="button"
                                        aria-label={`Copy ${item.name} class code`}
                                        onClick={() => copyCode(item.code)}
                                    >
                                        <ClipboardCopy size={17} />
                                    </button>
                                </div>


                                <div className="tc-card-actions">

                                    <button
                                        type="button"
                                        className="tc-open-button"
                                        onClick={() => {
                                            setSearchParams({ class: item.id });
                                            setCopyMessage("");
                                        }}
                                    >
                                        Open Class
                                        <ArrowRight size={17} />
                                    </button>

                                    <button
                                        type="button"
                                        className="tc-delete-button"
                                        onClick={() => deleteClass(item.id)}
                                    >
                                        <Trash2 size={16} />
                                        Delete
                                    </button>

                                </div>

                            </article>
                        ))}
                    </div>

                    {classes.length === 0 && (
                        <div className="tc-empty">
                            No classes created yet.
                        </div>
                    )}
                </>
            ) : (
                <>
                    <button
                        type="button"
                        className="tc-back-button"
                        onClick={() => {
                            setSearchParams({});
                            setCopyMessage("");
                        }}
                    >
                        <ArrowLeft size={17} />
                        All Classes
                    </button>

                    <div className="tc-class-detail">
                        <div className="tc-detail-heading">
              <span className="tc-class-icon">
                <GraduationCap size={26} />
              </span>

                            <div>
                                <h2>{selectedClass.name}</h2>
                                <p>
                                    {selectedClass.subject}
                                    {selectedClass.section &&
                                        ` · Section ${selectedClass.section}`}
                                </p>
                            </div>
                        </div>

                        <div className="tc-share-section">
                            <span>Class Join Code</span>

                            <div className="tc-share-row">
                                <code>{selectedClass.code}</code>

                                <button
                                    type="button"
                                    className="tc-button"
                                    onClick={() => copyCode(selectedClass.code)}
                                >
                                    <ClipboardCopy size={16} />
                                    Copy Code
                                </button>
                            </div>

                            <p className="tc-copy-message" role="status">
                                {copyMessage}
                            </p>
                        </div>
                    </div>

                    <div className="tc-details-grid">
                        <section className="tc-panel">
                            <div className="tc-panel-header">
                                <h3>Join Requests</h3>
                                <span>{selectedClass.requests.length} Pending</span>
                            </div>

                            {selectedClass.requests.length === 0 ? (
                                <p className="tc-empty">
                                    No pending join requests.
                                </p>
                            ) : (
                                selectedClass.requests.map((request) => (
                                    <div className="tc-person-row" key={request.id}>
                                        <div className="tc-person-info">
                                            <strong>{request.name}</strong>
                                            <small>{request.registration}</small>
                                        </div>

                                        <div className="tc-request-actions">
                                            <button
                                                type="button"
                                                className="tc-approve"
                                                title="Approve"
                                                aria-label={`Approve ${request.name}`}
                                                onClick={() =>
                                                    handleRequest(request.id, true)
                                                }
                                            >
                                                <Check size={18} />
                                            </button>

                                            <button
                                                type="button"
                                                className="tc-reject"
                                                title="Reject"
                                                aria-label={`Reject ${request.name}`}
                                                onClick={() =>
                                                    handleRequest(request.id, false)
                                                }
                                            >
                                                <X size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </section>

                        <section className="tc-panel">
                            <div className="tc-panel-header">
                                <h3>Class Students</h3>
                                <span>{selectedClass.students.length} Members</span>
                            </div>

                            {selectedClass.students.length === 0 ? (
                                <p className="tc-empty">
                                    No students have joined yet.
                                </p>
                            ) : (
                                selectedClass.students.map((student) => (
                                    <div className="tc-person-row" key={student.id}>
                                        <div className="tc-student-avatar">
                                            <Users size={17} />
                                        </div>

                                        <div className="tc-person-info">
                                            <strong>{student.name}</strong>
                                            <small>Class Member</small>
                                        </div>

                                        <span className="tc-member-badge">
                      Active
                    </span>
                                    </div>
                                ))
                            )}
                        </section>
                    </div>
                </>
            )}

            {copyMessage && !selectedClass && (
                <p className="tc-copy-message" role="status">
                    {copyMessage}
                </p>
            )}

            {showForm && (
                <div
                    className="tc-modal-backdrop"
                    onClick={(event) => {
                        if (event.target === event.currentTarget) {
                            setShowForm(false);
                        }
                    }}
                >
                    <section
                        className="tc-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="tc-create-title"
                    >
                        <div className="tc-modal-header">
                            <h2 id="tc-create-title">Create Class</h2>

                            <button
                                type="button"
                                aria-label="Close form"
                                onClick={() => setShowForm(false)}
                            >
                                <X size={21} />
                            </button>
                        </div>

                        <form onSubmit={createClass}>
                            <label>
                                Class Name
                                <input
                                    required
                                    maxLength={80}
                                    placeholder="e.g. Mathematics"
                                    value={form.name}
                                    onChange={(event) =>
                                        setForm({
                                            ...form,
                                            name: event.target.value
                                        })
                                    }
                                />
                            </label>

                            <label>
                                Subject
                                <input
                                    required
                                    maxLength={80}
                                    placeholder="e.g. Mathematics"
                                    value={form.subject}
                                    onChange={(event) =>
                                        setForm({
                                            ...form,
                                            subject: event.target.value
                                        })
                                    }
                                />
                            </label>

                            <label>
                                Section (Optional)
                                <input
                                    maxLength={20}
                                    placeholder="e.g. A"
                                    value={form.section}
                                    onChange={(event) =>
                                        setForm({
                                            ...form,
                                            section: event.target.value
                                        })
                                    }
                                />
                            </label>

                            <button type="submit" className="tc-button">
                                <Plus size={17} />
                                Create Class
                            </button>
                        </form>

                        <p className="tc-demo-note">
                            Demo mode: Classes are saved only in this browser.
                        </p>
                    </section>
                </div>
            )}
        </div>
    );
}
