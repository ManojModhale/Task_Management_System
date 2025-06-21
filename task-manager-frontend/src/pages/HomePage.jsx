// src/pages/HomePage.jsx
import React from 'react';
import { Navbar, Nav, Button, Container, Row, Col, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Assuming you have react-router-dom for navigation
import { FaTasks, FaCheckCircle, FaUsers, FaChartLine, FaQuoteLeft, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa'; // Using react-icons for simple icons
import '../styles/HomePage.css'; // Link to the new CSS file

const HomePage = () => {
    return (
        <div className="task-landing-page" id="top">
            {/* Navbar Section */}
            <Navbar expand="lg" variant="dark" className="task-navbar">
                <Container>
                    <Navbar.Brand as={Link} to="/" className="navbar-brand-custom">
                        <FaTasks className="brand-icon me-2" /> TaskFlow
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link href="#features" className="nav-link-custom">Features</Nav.Link>
                            <Nav.Link href="#how-it-works" className="nav-link-custom">How It Works</Nav.Link>
                            <Nav.Link href="#contact-us" className="nav-link-custom">Contact Us</Nav.Link>
                            <Nav.Link as={Link} to="/auth?form=login" className="nav-link-custom">Login</Nav.Link>
                            <Button as={Link} to="/auth?form=register" variant="light" className="ms-lg-3 signup-button">
                                Sign Up Free
                            </Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Hero Section */}
            <section className="hero-section text-center d-flex align-items-center justify-content-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={9}>
                            <h1 className="hero-title">Organize Your Work, Conquer Your Goals</h1>
                            <p className="hero-subtitle lead">
                                TaskFlow helps you manage tasks, projects, and teams efficiently.
                                Get started today and boost your productivity!
                            </p>
                            {/* About Us Info */}
                            <div className="about-us-info my-5">
                                <h3 className="about-us-title">About TaskFlow</h3>
                                <p className="about-us-text">
                                    TaskFlow is a powerful yet intuitive task management system designed to streamline your workflow and enhance collaboration.
                                    From individual tasks to complex team projects, we provide the tools you need to stay on track, meet deadlines, and achieve your objectives effortlessly.
                                    Our mission is to simplify productivity, allowing you to focus on what truly matters.
                                </p>
                            </div>
                            <Button as={Link} to="/auth?form=register"
                                onClick={() => {
                                    setTimeout(() => {
                                        window.scrollTo(0, 0);
                                    }, 800);
                                }}
                                variant="primary" size="lg" className="hero-cta-button me-3">
                                Start Managing Tasks
                            </Button>
                            <Button as={Link} to="/learn-more" variant="outline-light" size="lg" className="hero-learn-more-button">
                                Learn More
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Features Section */}
            <section id="features" className="features-section py-5">
                <Container>
                    <h2 className="section-title text-center mb-5">Powerful Features for Every Team</h2>
                    <Row className="g-4">
                        <Col md={4}>
                            <Card className="feature-card">
                                <Card.Body className="text-center">
                                    <FaCheckCircle className="feature-icon mb-3" />
                                    <Card.Title className="feature-title">Intuitive & Easy Task Management</Card.Title>
                                    <Card.Text className="feature-text">
                                        Easily create, assign, and track tasks with a simple and clean interface, ensuring effortless project oversight.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="feature-card">
                                <Card.Body className="text-center">
                                    <FaUsers className="feature-icon mb-3" />
                                    <Card.Title className="feature-title">User Authentication & Roles</Card.Title>
                                    <Card.Text className="feature-text">
                                        Secure user authentication and robust role management to control access and ensure data integrity within your team.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="feature-card">
                                <Card.Body className="text-center">
                                    <FaChartLine className="feature-icon mb-3" />
                                    <Card.Title className="feature-title">Task Editing and Deletion</Card.Title>
                                    <Card.Text className="feature-text">
                                        Full control over your tasks, allowing easy modifications and removal as your projects and priorities evolve.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="how-it-works-section py-5">
                <Container>
                    <h2 className="section-title text-center mb-5">How TaskFlow Works</h2>
                    <Row className="justify-content-center g-4">
                        <Col md={4}>
                            <Card className="step-card">
                                <Card.Body className="text-center">
                                    <div className="step-icon-container">1</div>
                                    <Card.Title className="step-title">Create Account</Card.Title>
                                    <Card.Text>
                                        Sign up in seconds and set up your personal or team workspace.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="step-card">
                                <Card.Body className="text-center">
                                    <div className="step-icon-container">2</div>
                                    <Card.Title className="step-title">Add Tasks & Projects</Card.Title>
                                    <Card.Text>
                                        Easily add all your tasks, set deadlines, and organize them into projects.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="step-card">
                                <Card.Body className="text-center">
                                    <div className="step-icon-container">3</div>
                                    <Card.Title className="step-title">Collaborate & Track</Card.Title>
                                    <Card.Text>
                                        Work with your team, assign roles, and monitor progress in real-time.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Testimonials/Quote Section (Simplified) */}
            <section className="quote-section py-5 text-center">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={8}>
                            <FaQuoteLeft className="quote-icon mb-4" />
                            <p className="quote-text lead">
                                "TaskFlow transformed how our team works. We're more organized and productive than ever before!"
                            </p>
                            <p className="quote-author">- Happy User, Tech Startup</p>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Contact Us Section */}
            <section id="contact-us" className="contact-us-section py-5">
                <Container>
                    <h2 className="section-title text-center mb-5">Get in Touch</h2>
                    <Row className="justify-content-center">
                        <Col lg={8}>
                            <p className="lead text-center mb-5 contact-intro-text">
                                Have questions, feedback, or need support? We're here to help! Reach out to us using the form below or through our contact details.
                            </p>
                            <Row className="mb-5 text-center contact-details">
                                <Col md={4}>
                                    <FaEnvelope className="contact-detail-icon mb-2" />
                                    <h5 className="contact-detail-title">Email Us</h5>
                                    <p className="contact-detail-text">support@taskflow.com</p>
                                </Col>
                                <Col md={4}>
                                    <FaPhoneAlt className="contact-detail-icon mb-2" />
                                    <h5 className="contact-detail-title">Call Us</h5>
                                    <p className="contact-detail-text">+91 9087564321</p>
                                </Col>
                                <Col md={4}>
                                    <FaMapMarkerAlt className="contact-detail-icon mb-2" />
                                    <h5 className="contact-detail-title">Visit Us</h5>
                                    <p className="contact-detail-text"> Katraj, Pune City, MH 411037</p>
                                </Col>
                            </Row>
                            <div className="contact-form-container p-4 p-md-5">
                                <h3 className="text-center mb-4">Send Us a Message</h3>
                                <Form>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="formGridName">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control type="text" placeholder="Enter your name" />
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridEmail">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" placeholder="Enter your email" />
                                        </Form.Group>
                                    </Row>

                                    <Form.Group className="mb-3" controlId="formGridSubject">
                                        <Form.Label>Subject</Form.Label>
                                        <Form.Control type="text" placeholder="Subject of your inquiry" />
                                    </Form.Group>

                                    <Form.Group className="mb-4" controlId="formGridMessage">
                                        <Form.Label>Message</Form.Label>
                                        <Form.Control as="textarea" rows={5} placeholder="Your message..." />
                                    </Form.Group>

                                    <Button variant="primary" type="submit" className="w-100 send-message-button">
                                        Send Message
                                    </Button>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Footer Section */}
            <footer className="task-footer py-4">
                <Container>
                    <Row className="align-items-center">
                        <Col md={6} className="text-md-start text-center mb-2 mb-md-0">
                            <span className="footer-brand">TaskFlow</span> &copy; {new Date().getFullYear()} All rights reserved.
                        </Col>
                        <Col md={6} className="text-md-end text-center">
                            <Nav className="justify-content-md-end justify-content-center">
                                <Nav.Link href="#top" className="footer-link">Home</Nav.Link>
                                <Nav.Link href="#features" className="footer-link">Features</Nav.Link>
                                <Nav.Link href="#how-it-works" className="footer-link">How It Works</Nav.Link>
                                <Nav.Link href="#contact-us" className="footer-link">Contact Us</Nav.Link>
                            </Nav>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </div>
    );
};
export default HomePage;