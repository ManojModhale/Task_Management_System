// src/pages/TasksDashboard.jsx
import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Table, Tab, Tabs } from 'react-bootstrap';
import Swal from "sweetalert2";
import TaskFormModal from '../components/TaskFormModal'; // Assuming this path
import Loader from "../components/Loader"; // Assuming this path
import Notification from "../components/Notification"; // Assuming this path
import '../styles/TasksDashboard.css'; // New CSS file
import { AuthContext } from '../context/AuthContext';

const API_BASE_URL = "http://localhost:8282/api"; // Your API base URL

const TasksDashboard = () => {
    const { authState, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isTaskFormModalOpen, setIsTaskFormModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null); // Null means adding, object means editing
    const [activeTab, setActiveTab] = useState('all'); // 'all', 'PENDING', 'COMPLETED', 'OVERDUE'
    const [hasShownWelcomeAlert, setHasShownWelcomeAlert] = useState(false); // New state to control welcome alert

    // Filter states
    const [searchString, setSearchString] = useState('');
    const [filterDueDate, setFilterDueDate] = useState('');

    // useCallback to memoize fetchTasks to prevent unnecessary re-renders in useEffect
    const fetchTasks = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const username = sessionStorage.getItem("username"); // Assuming username is in session storage
            if (!username) {
                throw new Error("User not logged in. Please log in to view tasks.");
            }
            const response = await fetch(`${API_BASE_URL}/task/allTasks/${username}`);
            if (!response.ok) {
                const errorText = await response.text();
                try {
                    const errorData = JSON.parse(errorText);
                    throw new Error(errorData.message || "Failed to fetch tasks.");
                } catch (jsonError) {
                    throw new Error(errorText || "Failed to fetch tasks. Server responded with an error.");
                }
            }
            const data = await response.json();
            setTasks(data);
        } catch (err) {
            console.error('Error fetching tasks:', err);
            setError(err.message || 'Failed to fetch tasks.');
        } finally {
            setLoading(false);
        }
    }, []); // No dependencies, runs once on mount

    // // Effect to fetch tasks on component mount and when activeTab changes
    // useEffect(() => {
    //     fetchTasks();
    // }, [fetchTasks]); // Dependency on fetchTasks memoized function

    // Effect to check authentication and fetch tasks
    useEffect(() => {
        if (!authState.isAuthenticated || !authState.username) {
            Swal.fire({
                icon: 'warning',
                title: 'Authentication Required',
                text: 'You need to log in to access this page.',
                showConfirmButton: false,
                timer: 2000
            }).then(() => {
                navigate('/auth'); // Redirect to login if not authenticated
            });
            return;
        }

        // Show welcome alert only once after successful authentication and on initial load
        if (authState.isAuthenticated && authState.username && !hasShownWelcomeAlert) {
            Swal.fire({
                icon: 'success',
                title: `Welcome, ${authState.username}!`,
                text: 'You are now on your task dashboard.',
                showConfirmButton: false,
                timer: 2000
            });
            setHasShownWelcomeAlert(true); // Mark alert as shown
        }

        fetchTasks();
    }, [authState.isAuthenticated, authState.username, navigate, fetchTasks, hasShownWelcomeAlert]); // Depend on authState, navigate, and fetchTasks

    const handleSaveTask = useCallback(async (taskToSave) => {
        setLoading(true);
        try {
            const username = sessionStorage.getItem("username");
            if (!username) {
                throw new Error("User not logged in. Please log in.");
            }

            let endpoint = '';
            let method = '';

            if (editingTask) { // Editing an existing task
                endpoint = `${API_BASE_URL}/task/update-Task/${taskToSave.id}/${username}`;
                method = 'PUT';
            } else { // Adding a new task
                endpoint = `${API_BASE_URL}/task/add-Task/${username}`;
                method = 'POST';
            }

            const response = await fetch(endpoint, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(taskToSave),
            });

            if (!response.ok) {
                let errorBody;
                try {
                    errorBody = await response.json();
                } catch (e) {
                    errorBody = await response.text();
                }
                const errorMessage = typeof errorBody === 'object' && errorBody !== null && errorBody.message
                    ? errorBody.message
                    : `Server error: ${response.status} ${response.statusText} - ${errorBody}`;
                throw new Error(errorMessage);
            }

            const savedTask = await response.json();

            Swal.fire({
                title: "Success",
                text: `Task ${editingTask ? 'updated' : 'added'} successfully!`,
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
            }).then(() => {
                fetchTasks(); // Re-fetch all tasks to ensure data consistency
                setIsTaskFormModalOpen(false);
                setEditingTask(null);
            });

        } catch (error) {
            console.error('Error adding/updating task:', error);
            Swal.fire({
                title: "Error",
                text: error.message || "An unexpected error occurred.",
                icon: "error",
                confirmButtonText: "Try Again",
            });
        } finally {
            setLoading(false);
        }
    }, [editingTask, fetchTasks]);


    const handleDeleteTask = useCallback(async (taskId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you really want to delete this task?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc3545",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                setLoading(true);
                try {
                    const username = sessionStorage.getItem("username");
                    if (!username) {
                        throw new Error("User not logged in. Please log in.");
                    }
                    const response = await fetch(`${API_BASE_URL}/task/delete-Task/${taskId}/${username}`, {
                        method: 'DELETE',
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.message || "Failed to delete task.");
                    }

                    Swal.fire(
                        'Deleted!',
                        'Your task has been deleted.',
                        'success'
                    );
                    fetchTasks(); // Re-fetch to update the list
                } catch (error) {
                    console.error('Error deleting task:', error);
                    Swal.fire(
                        'Error!',
                        error.message || 'Failed to delete task.',
                        'error'
                    );
                } finally {
                    setLoading(false);
                }
            }
        });
    }, [fetchTasks]);

    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will be logged out of the application!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, logout!"
        }).then((result) => {
            if (!result.isConfirmed) return;

            logout();
            Swal.fire("Logged Out!", "You have been logged out.", "success").then(
                () => {
                    navigate("/"); // Redirect to login page
                }
            );
        });
    };

    // Filtering logic for the table
    const applyFilters = () => {
        let filtered = tasks;

        // Filter by tab status first
        if (activeTab !== 'all') {
            filtered = filtered.filter(task => task.status === activeTab);
        }

        // Apply search string filter (title and description)
        if (searchString) {
            filtered = filtered.filter(task =>
                task.title.toLowerCase().includes(searchString.toLowerCase()) ||
                (task.description && task.description.toLowerCase().includes(searchString.toLowerCase()))
            );
        }

        // Apply due date filter
        if (filterDueDate) {
            filtered = filtered.filter(task =>
                task.dueDate && task.dueDate.startsWith(filterDueDate) // Compare YYYY-MM-DD parts
            );
        }

        return filtered;
    };

    const displayedTasks = applyFilters();

    const handleClearFilters = () => {
        setSearchString('');
        setFilterDueDate('');
    };

    const renderStatus = (status) => {
        let statusClass = '';
        switch (status) {
            case 'PENDING':
                statusClass = 'status-pending';
                break;
            case 'COMPLETED':
                statusClass = 'status-completed';
                break;
            case 'OVERDUE':
                statusClass = 'status-overdue';
                break;
            default:
                statusClass = '';
        }
        return <span className={`task-status ${statusClass}`}>{status}</span>;
    };

    if (loading) {
        return <Loader message="Loading your tasks..." />;
    }

    if (error) {
        return <Notification message={error} type="error" onClose={() => setError(null)} />;
    }

    return (
        <div className="dashboard-page-layout">
            <header className="dashboard-header">
                <div className="dashboard-header-content container">
                    <h1>Welcome, {authState.username}!</h1>
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                </div>
            </header>
            <div className="tasks-dashboard-container">

                {/* Quick Actions and Filters Section */}
                <div className="tasks-controls-section">
                    <Button variant="primary" onClick={() => { setIsTaskFormModalOpen(true); setEditingTask(null); }} className="add-new-task-btn">
                        Add New Task
                    </Button>

                    <div className="filter-group">
                        <Form.Control
                            type="text"
                            placeholder="Search by title or description"
                            value={searchString}
                            onChange={(e) => setSearchString(e.target.value)}
                            className="filter-input"
                        />
                        <Form.Label htmlFor="filterDueDate" className="date-label">Due Date:</Form.Label>
                        <Form.Control
                            id="filterDueDate"
                            type="date"
                            value={filterDueDate}
                            onChange={(e) => setFilterDueDate(e.target.value)}
                            className="filter-date-input"
                        />
                        <Button variant="outline-secondary" onClick={handleClearFilters} className="clear-filters-btn">
                            Clear Filters
                        </Button>
                    </div>
                </div>

                {/* Tabs for status filtering */}
                <Tabs
                    id="task-status-tabs"
                    activeKey={activeTab}
                    onSelect={(k) => setActiveTab(k)}
                    className="mb-3 custom-tabs"
                >
                    <Tab eventKey="all" title={`All Tasks (${tasks.length})`}>
                        {/* Content will be displayed by the table below */}
                    </Tab>
                    <Tab eventKey="PENDING" title={`Pending (${tasks.filter(t => t.status === 'PENDING').length})`}>
                        {/* Content will be displayed by the table below */}
                    </Tab>
                    <Tab eventKey="COMPLETED" title={`Completed (${tasks.filter(t => t.status === 'COMPLETED').length})`}>
                        {/* Content will be displayed by the table below */}
                    </Tab>
                    <Tab eventKey="OVERDUE" title={`Overdue (${tasks.filter(t => t.status === 'OVERDUE').length})`}>
                        {/* Content will be displayed by the table below */}
                    </Tab>
                </Tabs>

                {displayedTasks.length === 0 ? (
                    <p className="no-tasks-message">No {activeTab === 'all' ? '' : activeTab.toLowerCase()} tasks found.</p>
                ) : (
                    <div className="table-responsive">
                        <Table striped bordered hover className="tasks-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Created at</th>
                                    <th>Updated at</th>
                                    <th>Due Date</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayedTasks.map((task) => (
                                    <tr key={task.id}>
                                        <td>{task.id}</td>
                                        <td>{task.title}</td>
                                        <td>{task.description || 'N/A'}</td>
                                        <td>
                                            {task.createdAt ?
                                                (() => {
                                                    const date = new Date(task.createdAt);
                                                    // Check if the date is valid before formatting
                                                    if (isNaN(date.getTime())) { // Using getTime() is a reliable way to check for Invalid Date
                                                        return 'Invalid Date';
                                                    }
                                                    const day = String(date.getDate()).padStart(2, '0');
                                                    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
                                                    const year = date.getFullYear();
                                                    const hours = String(date.getHours()).padStart(2, '0');
                                                    const minutes = String(date.getMinutes()).padStart(2, '0');
                                                    return `${day}-${month}-${year} ${hours}:${minutes}`;
                                                })()
                                                : 'N/A'}
                                        </td>
                                        <td>
                                            {task.updatedAt ?
                                                (() => {
                                                    const date = new Date(task.updatedAt);
                                                    // Check if the date is valid before formatting
                                                    if (isNaN(date.getTime())) { // Using getTime() is a reliable way to check for Invalid Date
                                                        return 'Invalid Date';
                                                    }
                                                    const day = String(date.getDate()).padStart(2, '0');
                                                    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
                                                    const year = date.getFullYear();
                                                    const hours = String(date.getHours()).padStart(2, '0');
                                                    const minutes = String(date.getMinutes()).padStart(2, '0');
                                                    return `${day}-${month}-${year} ${hours}:${minutes}`;
                                                })()
                                                : 'N/A'}
                                        </td>
                                        <td>
                                            {task.dueDate ?
                                                (() => {
                                                    const date = new Date(task.dueDate);
                                                    // Check if the date is valid before formatting
                                                    if (isNaN(date.getTime())) { // Using getTime() is a reliable way to check for Invalid Date
                                                        return 'Invalid Date';
                                                    }
                                                    const day = String(date.getDate()).padStart(2, '0');
                                                    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
                                                    const year = date.getFullYear();
                                                    const hours = String(date.getHours()).padStart(2, '0');
                                                    const minutes = String(date.getMinutes()).padStart(2, '0');
                                                    return `${day}-${month}-${year} ${hours}:${minutes}`;
                                                })()
                                                : 'N/A'}
                                        </td>
                                        <td>{renderStatus(task.status)}</td>
                                        <td className="task-actions-cell">
                                            <Button
                                                variant="info"
                                                size="sm"
                                                onClick={() => { setIsTaskFormModalOpen(true); setEditingTask(task); }}
                                                disabled={task.status === 'COMPLETED'} // Disable edit if completed
                                                className="action-btn edit-btn"
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => handleDeleteTask(task.id)}
                                                disabled={task.status === 'COMPLETED'} // Disable delete if completed
                                                className="action-btn delete-btn"
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                )}

                <TaskFormModal
                    isOpen={isTaskFormModalOpen}
                    onClose={() => {
                        setIsTaskFormModalOpen(false);
                        setEditingTask(null); // Clear editing task when modal closes
                    }}
                    onSubmit={handleSaveTask}
                    initialData={editingTask}
                    title={editingTask ? "Edit Task" : "Add New Task"}
                />
            </div>
        </div>
    );
};

export default TasksDashboard;