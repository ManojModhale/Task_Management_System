// src/components/TaskFormModal.jsx
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import '../styles/Modal.css'; // Assuming you have a generic Modal.css

const TaskFormModal = ({ isOpen, onClose, onSubmit, initialData = null, title }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'PENDING',
        dueDate: '', // YYYY-MM-DDTHH:mm format for datetime-local
    });

    // State to track the ID of the task being edited to prevent unnecessary updates
    const [currentTaskId, setCurrentTaskId] = useState(null);

    useEffect(() => {
        // Determine the ID of the task we are potentially editing
        const newTaskId = initialData && initialData.id ? initialData.id : null;

        // Only update form data if the modal is open and
        // the task ID being edited has changed or if it's a new task (newTaskId is null).
        // This prevents re-setting form data on every render if initialData object reference changes but content is same.
        if (isOpen) {
            if (newTaskId !== currentTaskId) {
                if (initialData && initialData.id) { // Edit mode
                    const formattedDueDate = initialData.dueDate || '';
                    setFormData({
                        id: initialData.id,
                        title: initialData.title || '',
                        description: initialData.description || '',
                        status: initialData.status || 'PENDING',
                        dueDate: formattedDueDate,
                    });
                } else { // Add mode (initialData is null or empty)
                    setFormData({
                        title: '',
                        description: '',
                        status: 'PENDING',
                        dueDate: '',
                    });
                }
                setCurrentTaskId(newTaskId); // Update the tracked task ID
            }
        } else {
            // When modal closes, reset currentTaskId and form data to prepare for next open
            if (currentTaskId !== null) { // Only reset if it was previously set for a task
                setFormData({
                    title: '',
                    description: '',
                    status: 'PENDING',
                    dueDate: '',
                });
                setCurrentTaskId(null);
            }
        }
    }, [initialData, isOpen, currentTaskId]); // Dependencies: initialData, isOpen, and currentTaskId

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Ensure description and dueDate are null if empty strings, as per your backend requirement
        const dataToSend = {
            ...formData,
            description: formData.description === '' ? null : formData.description,
            dueDate: formData.dueDate === '' ? null : formData.dueDate
        };
        onSubmit(dataToSend);
    };

    if (!isOpen) return null;

    // Use ReactDOM.createPortal to render the modal outside the component's DOM hierarchy
    return ReactDOM.createPortal(
        <Modal show={isOpen} onHide={onClose} centered className="task-form-modal">
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="title">Title:</Form.Label>
                        <Form.Control
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="description">Description:</Form.Label>
                        <Form.Control
                            as="textarea"
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="3"
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="status">Status:</Form.Label>
                        <Form.Select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            required
                        >
                            <option value="PENDING">PENDING</option>
                            <option value="COMPLETED">COMPLETED</option>
                            <option value="OVERDUE">OVERDUE</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="dueDate">Due Date:</Form.Label>
                        <Form.Control
                            type="datetime-local"
                            id="dueDate"
                            name="dueDate"
                            value={formData.dueDate}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Save Task
                </Button>
            </Modal.Footer>
        </Modal>,
        document.getElementById('modal-root') || (() => {
            const el = document.createElement('div');
            el.setAttribute('id', 'modal-root');
            document.body.appendChild(el);
            return el;
        })()
    );
};

export default TaskFormModal;