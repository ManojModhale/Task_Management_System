// src/components/RegisterForm.js
import React, { useState } from 'react';
import { motion } from "framer-motion";
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert
import taskManagerApi from '../api/taskManagerApi'; // Assuming this path is correct
import '../styles/RegisterForm.css'; // New CSS file for this component

const API_BASE_URL = "http://localhost:8282/api"; // Your API base URL

// FloatingInput Component
const FloatingInput = ({ id, label, type = "text", value, onChange, toggleVisibility }) => (
    <div className="floating-label-wrapper">
        <input
            id={id}
            type={type}
            placeholder=" " // Important for floating label to work with :placeholder-shown
            className="input-field-new"
            value={value}
            onChange={onChange}
            autoComplete={type === "password" ? "new-password" : "off"}
        />
        <label
            htmlFor={id}
            className="label-new"
        >
            {label}
        </label>
        {toggleVisibility && (
            <button
                type="button"
                className="toggle-visibility-button"
                onClick={toggleVisibility}
            >
                {type === "password" ? (
                    <i className="ri-eye-line"></i> // You might need to include Remixicon library or replace with simple eye/eye-off icons
                ) : (
                    <i className="ri-eye-off-line"></i>
                )}
            </button>
        )}
    </div>
);

// FloatingSelect Component
const FloatingSelect = ({ id, label, value, onChange }) => (
    <div className="floating-label-wrapper">
        <select
            id={id}
            value={value}
            onChange={onChange}
            className="input-field-new"
        >
            <option value="" disabled hidden /> {/* Empty option for placeholder effect */}
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
        </select>
        <label
            htmlFor={id}
            className="label-new"
        >
            {label}
        </label>
        <div className="select-arrow-new">
            <i className="ri-arrow-down-s-line" /> {/* You might need to include Remixicon library */}
        </div>
    </div>
);

const RegisterForm = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const toggleVisibility = (field) => {
        if (field === "password") setPasswordVisible(!passwordVisible);
        if (field === "confirmPassword")
            setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.id]: e.target.value,
        }));
        setErrors((prevErrors) => ({ ...prevErrors, [e.target.id]: "", nameFields: "" })); // Clear specific error on change, and also the combined nameFields error
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {};

        const isFirstNameEmpty = !formData.firstName.trim();
        const isLastNameEmpty = !formData.lastName.trim();

        if (isFirstNameEmpty && isLastNameEmpty) {
            newErrors.nameFields = "First Name & Last Name are required";
            valid = false;
        } else {
            if (isFirstNameEmpty) {
                newErrors.firstName = "First Name is required";
                valid = false;
            }
            if (isLastNameEmpty) {
                newErrors.lastName = "Last Name is required";
                valid = false;
            }
        }

        if (!formData.gender) {
            newErrors.gender = "Gender is required";
            valid = false;
        }
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
            valid = false;
        } else if (!/^\S+@\S+$/.test(formData.email)) {
            newErrors.email = "Invalid email format";
            valid = false;
        }
        if (!formData.username.trim()) {
            newErrors.username = "Username is required";
            valid = false;
        }
        if (!formData.password.trim()) {
            newErrors.password = "Password is required";
            valid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
            valid = false;
        } else if (!/(?=.*[a-z])/.test(formData.password)) {
            newErrors.password = "Password must contain at least one lowercase letter";
            valid = false;
        } else if (!/(?=.*[A-Z])/.test(formData.password)) {
            newErrors.password = "Password must contain at least one uppercase letter";
            valid = false;
        } else if (!/(?=.*\d)/.test(formData.password)) {
            newErrors.password = "Password must contain at least one number";
            valid = false;
        } else if (!/(?=.*[@$!%*?&])/.test(formData.password)) {
            newErrors.password = "Password must contain at least one symbol (@$!%*?&)";
            valid = false;
        }


        if (!formData.confirmPassword.trim()) {
            newErrors.confirmPassword = "Confirm Password is required";
            valid = false;
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {

            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    gender: formData.gender,
                    email: formData.email,
                    username: formData.username,
                    password: formData.password,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                Swal.fire({
                    title: "Success",
                    text: "Your account has been created successfully!",
                    icon: "success",
                    timer: 3000,
                    confirmButtonText: "Continue",
                }).then(() => {
                    navigate('/auth?form=login');
                });

                setFormData({
                    firstName: "",
                    lastName: "",
                    gender: "",
                    email: "",
                    username: "",
                    password: "",
                    confirmPassword: "",
                });
            } else {
                Swal.fire({
                    title: "Error",
                    text: data.message || "Registration failed.",
                    icon: "error",
                    timer: 3000,
                    confirmButtonText: "Try Again",
                });
                setErrors({ form: data.message || "Registration failed." });
            }

        } catch (error) {
            console.error("Signup Failed", error);
            Swal.fire({
                title: "Server Error",
                text: "An error occurred during Registration. Please try again later.",
                icon: "error",
                timer: 3000,
                confirmButtonText: "Try Again",
            });
            setErrors({ form: "An error occurred. Please try again later." });

        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="form-container-new" // Applying the new styles here
        >
            <div className="text-center">
                <h1 className="title-new">TaskFlow</h1>
                <p className="subtitle-new">
                    Create your secure task management account
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6"> {/* Keep space-y-6 for vertical spacing */}
                <h2 className="form-heading-new">
                    Create your account
                </h2>

                <div className="form-grid">
                    <FloatingInput
                        id="firstName"
                        label="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                    <FloatingInput
                        id="lastName"
                        label="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                </div>
                {/* Display combined error if both are empty */}
                {errors.nameFields && <p className="error-text col-span-2">{errors.nameFields}</p>}
                {/* Display individual errors only if the combined error is not present */}
                {!errors.nameFields && errors.firstName && <p className="error-text col-span-2">{errors.firstName}</p>}
                {!errors.nameFields && errors.lastName && <p className="error-text col-span-2">{errors.lastName}</p>}

                <FloatingSelect
                    id="gender"
                    label="Gender"
                    value={formData.gender}
                    onChange={handleChange}
                />
                {errors.gender && (
                    <p className="error-text">{errors.gender}</p>
                )}

                <FloatingInput
                    id="email"
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                {errors.email && (
                    <p className="error-text">{errors.email}</p>
                )}

                <FloatingInput
                    id="username"
                    label="Username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                />
                {errors.username && (
                    <p className="error-text">{errors.username}</p>
                )}

                <FloatingInput
                    id="password"
                    label="Password"
                    type={passwordVisible ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    toggleVisibility={() => toggleVisibility("password")}
                />
                {errors.password && (
                    <p className="error-text">{errors.password}</p>
                )}

                <FloatingInput
                    id="confirmPassword"
                    label="Confirm Password"
                    type={confirmPasswordVisible ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    toggleVisibility={() => toggleVisibility("confirmPassword")}
                />
                {errors.confirmPassword && (
                    <p className="error-text">{errors.confirmPassword}</p>
                )}
                {errors.form && (
                    <p className="error-text">{errors.form}</p>
                )}

                <button
                    type="submit"
                    className="submit-button-new"
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
                        "Create Account"
                    )}
                </button>
                <div className="text-center mt-6">
                    <p className="text-gray-600">
                        Don't have an account? <Link to="/auth?form=login"
                            onClick={() => {
                                setTimeout(() => {
                                    window.scrollTo(0, 0);
                                }, 800);
                            }}
                            className="text-primary font-medium link-hover">Login Here</Link>
                    </p>
                </div>
            </form>
        </motion.div>
    );
};
export default RegisterForm;