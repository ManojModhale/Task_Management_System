// src/components/LoginForm.js
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Keep Link for now, though we'll convert some to span
import Swal from 'sweetalert2';
import { motion } from "framer-motion"; // Add framer-motion for animations
import taskManagerApi from '../api/taskManagerApi';
import { AuthContext } from '../context/AuthContext';
import '../styles/LoginForm.css'; // Updated CSS import

const API_BASE_URL = "https://task-management-system-oeph.onrender.com/api"; // Your API base URL

// Reusable FloatingInput Component (similar to RegisterForm for consistency)
const FloatingInput = ({ id, label, type = "text", value, onChange, toggleVisibility, error }) => {
    const inputType = type === "password" && toggleVisibility ? (value ? "password" : "text") : type;

    return (
        <div className="floating-label-wrapper">
            <input
                id={id}
                type={type} // Keep original type for password field to let browser handle auto-fill correctly before JavaScript
                placeholder=" " // Important for floating label to work with :placeholder-shown
                className={`input-field-new ${error ? 'input-error' : ''}`}
                value={value}
                onChange={onChange}
                autoComplete={type === "password" ? "current-password" : "off"} // Hint browser for auto-fill
            />
            <label
                htmlFor={id}
                className="label-new"
            >
                {label}
            </label>
            {type === "password" && (
                <button
                    type="button"
                    className="toggle-visibility-button"
                    onClick={toggleVisibility}
                >
                    {value ? ( // Only show icon if there's a value
                        type === "password" ? (
                            <i className="ri-eye-line"></i> // You might need to include Remixicon library or replace with simple eye/eye-off icons
                        ) : (
                            <i className="ri-eye-off-line"></i>
                        )
                    ) : null}
                </button>
            )}
            {error && <p className="error-text">{error}</p>}
        </div>
    );
};

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loading, setLoading] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const isValidUsername = (inputUsername) => inputUsername.trim() !== '';

    const validatePassword = (inputPassword) => {
        let newError = "";
        let valid = true;

        if (!inputPassword.trim()) {
            newError = "Password is required";
            valid = false;
        } else if (inputPassword.length < 6) {
            newError = "Password must be at least 6 characters";
            valid = false;
        } else if (!/(?=.*[a-z])/.test(inputPassword)) {
            newError = "Password must contain at least one lowercase letter";
            valid = false;
        } else if (!/(?=.*[A-Z])/.test(inputPassword)) {
            newError = "Password must contain at least one uppercase letter";
            valid = false;
        } else if (!/(?=.*\d)/.test(inputPassword)) {
            newError = "Password must contain at least one number";
            valid = false;
        } else if (!/(?=.*[@$!%*?&])/.test(inputPassword)) {
            newError = "Password must contain at least one symbol (@$!%*?&)";
            valid = false;
        }
        return { valid, error: newError };
    };

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        if (usernameError) setUsernameError(''); // Clear error on change
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (passwordError) setPasswordError(''); // Clear error on change
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setUsernameError('');
        setPasswordError('');

        let formValid = true;

        if (!isValidUsername(username)) {
            setUsernameError('Username is required.');
            formValid = false;
        }

        const passwordValidationResult = validatePassword(password);
        if (!passwordValidationResult.valid) {
            setPasswordError(passwordValidationResult.error);
            formValid = false;
        }

        if (!formValid) {
            return;
        }

        setLoading(true);
        try {
            //const response = await taskManagerApi.post('/auth/login', { username, password });
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            const { userId, username: loggedInUsername, message } = data;
            //const { userId, username: loggedInUsername, message } = response.data;
            console.log('Backend Response Data:', data); // Keep this for debugging
            console.log('Extracted userId:', userId);
            console.log('Extracted username:', loggedInUsername);

            if (userId && loggedInUsername) {
                login(userId, loggedInUsername);
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: 'Welcome back!',
                    timer: 2000,
                    showConfirmButton: false,
                }).then(() => {
                    navigate('/dashboard');
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: message || 'Login successful, but user data is incomplete.',
                    timer: 3000,
                    showConfirmButton: false,
                });
            }

        } catch (err) {
            console.error('Login error:', err);
            const errorMessage = (err.response && err.response.data && err.response.data.message)
                ? err.response.data.message
                : 'Login failed. Please check your credentials.';
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: errorMessage,
                timer: 3000,
                showConfirmButton: false,
            });
            // Set a general error or specific errors if backend provides them
            if (err.response?.data?.message?.includes('username')) {
                setUsernameError(errorMessage);
            } else if (err.response?.data?.message?.includes('password')) {
                setPasswordError(errorMessage);
            } else {
                // Handle general form error if neither specific
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: errorMessage,
                    timer: 3000,
                    showConfirmButton: false,
                });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="form-container-new login-form-container" // Reusing form-container-new and adding specific class
        >
            <div className="text-center">
                <h1 className="title-new">TaskFlow</h1>
                <p className="subtitle-new">
                    Welcome back to your task management portal
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="form-heading-new">
                    Sign in to your workspace
                </h2>

                <FloatingInput
                    id="username"
                    label="Username"
                    type="text"
                    value={username}
                    onChange={handleUsernameChange}
                    error={usernameError}
                />

                <FloatingInput
                    id="password"
                    label="Password"
                    type={passwordVisible ? "text" : "password"}
                    value={password}
                    onChange={handlePasswordChange}
                    toggleVisibility={togglePasswordVisibility}
                    error={passwordError}
                />

                <div className="flex items-center justify-end">
                    <Link to="/forgot-password" className="text-primary font-medium link-hover">Forgot password?</Link>
                </div>

                <button
                    type="submit"
                    className="submit-button-new" // Using the same button style as RegisterForm
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <svg
                                className="animate-spin h-5 w-5 mr-3 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            Processing...
                        </>
                    ) : (
                        "Sign in"
                    )}
                </button>

                <div className="text-center mt-6">
                    <p className="text-gray-600">
                        Don't have an account? <Link to="/auth?form=register"
                            // onClick={() => {
                            //     setTimeout(() => {
                            //         window.scrollTo(0, 0);
                            //     }, 1000);
                            // }}
                            className="text-primary font-medium link-hover">Register Here</Link>
                    </p>
                </div>
            </form>
        </motion.div>
    );
};
export default LoginForm;