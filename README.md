# Task_Management_System

## Overview

**Task_Management_System** is a robust and scalable task management platform developed using ReactJS, Spring Boot, and PostgreSQL. Designed to streamline personal task organization, it supports user registration, login, and comprehensive task management features.

This project follows a layered architecture and ensures modularity, scalability, and maintainability. The intuitive user interface enhances usability, making it ideal for managing daily tasks efficiently.

## Features

1.  **User Management**:
    * **User**:
        * Register, log in, and access a personalized dashboard.
        * View, add, edit, and delete personal tasks.
        * Logout functionality to redirect to the homepage.

2.  **Core Functionalities**:
    * **User Authentication**: Secure account creation and login.
    * **Dashboard**:
        * Add a new task.
        * View all tasks in a tabular format.
        * Edit existing tasks.
        * Delete specific tasks.
    * **Task Management**:
        * Efficient CRUD operations for tasks.

3.  **Project Highlights**:
    * **Scalable Architecture**: Follows a layered architecture for modularity and maintainability.
    * **Intuitive User Interface**: Built with React Bootstrap for a clean and responsive experience.
    * **Comprehensive Task Management**: End-to-end solutions for task creation, editing, deletion, and viewing.
    * **Responsive Design**: Optimized for various devices to ensure a consistent user experience.

---

## Frontend (ReactJS)

The frontend of Task_Management_System is built using ReactJS, ensuring a seamless and responsive user experience. The interface is designed for clarity, accessibility, and ease of use across various devices.

## Key Features

1.  **Components**:
    * Modular and reusable functional components.
    * State management using React Hooks for efficient data handling.

2.  **Routing**:
    * React Router for navigation between pages.
    * Protected routes to ensure secure access after login.

3.  **UI and Responsiveness**:
    * Styled using React Bootstrap for a clean, professional look.
    * Media queries for optimal viewing on different devices.

4.  **HTTP Requests**:
    * Axios for seamless interaction with backend APIs.

**Technologies and Tools**:
* ReactJS
* Axios for HTTP requests
* React Bootstrap for styling, responsiveness and layout
* VS Code
* Git and GitHub

---

## Backend (Spring Boot)

The backend of Task_Management_System is developed using Spring Boot, providing a robust foundation for secure data handling, business logic execution, and seamless API integration.

## Architecture and Flow:

1.  **Request Flow**:
    * The frontend sends HTTP requests to the controller layer.
    * The service layer implements core business logic.
    * The repository layer interacts with the database using JPA for data persistence.
    * DTO Class Objects are returned as Responses.
    * Responses are returned to the frontend via REST APIs.

2.  **User and Task Management**:
    * Handles CRUD operations for users and tasks.

3.  **Database Integration**:
    * PostgreSQL database with Spring Data JPA for efficient ORM.

**Key Features**:
* **Layered Architecture**: Ensures separation of concerns between controllers, services, Repository, and DTOs.
* **Annotations**: Used extensively for configuration and dependency injection.
* **pom.xml**: Manages dependencies and project configurations.

**Technologies and Tools**:
* Spring Boot
* Java
* Spring Data JPA for ORM
* Maven
* Spring Tool Suite 4
* Git and GitHub

---

## Database (PostgreSQL)

1.  **Schema**:
    * Tables for `users` and `tasks`.
    * **Relationships**:
        * **One-to-Many**: Users and Tasks (One user can have many tasks).

2.  **Stored Data**:
    * User details (username, email, password).
    * Task records (title, description, status, dueDate, createdAt, updatedAt).

---

## Installation

### Prerequisites

Before starting, ensure you have the following installed:

-   [Node.js](https://nodejs.org/) (which includes npm)
-   [Java JDK 17+](https://www.oracle.com/java/technologies/javase-jdk17-downloads.html) (or compatible with Spring Boot 3.x)
-   [Maven](https://maven.apache.org/)
-   [PostgreSQL](https://www.postgresql.org/download/)

### Technologies Used

#### Frontend
-   **React.js**: Component-based framework for building the user interface.
-   **React-Bootstrap**: Used for responsive components and styling.
-   **CSS**: Custom styling for components and pages, leveraging media queries for responsiveness.
-   **Axios**: For seamless HTTP requests to the backend.

#### Backend
-   **Spring Boot**: Framework for developing the backend with REST API.
-   **Spring Data JPA**: ORM tool for database interactions.
-   **Maven**: Build Tool and Dependency management.

#### Database
-   **PostgreSQL**: Relational database for storing application data.

#### Tools
-   **VS Code**: IDE for frontend development.
-   **Spring Tool Suite (STS) 4**: IDE for backend development.
-   **Postman**: API testing and debugging.
-   **Git**: Version control.

### Steps to Run the Application

#### 1. Setup Backend (Spring Boot)

1.  **Clone the repository (backend part):**
    ```bash
    git clone [https://github.com/your-username/task-management-backend.git](https://github.com/your-username/task-management-backend.git)
    cd task-management-backend
    ```
    (Replace `your-username/task-management-backend.git` with your actual backend repository URL)

2.  **Configure the database:**
    * Create a PostgreSQL database named `task_management`.
    * Update the database connection details in `src/main/resources/application.properties` (or `application.yml`):
        ```properties
        spring.datasource.url=jdbc:postgresql://localhost:5432/task_management
        spring.datasource.username=your-pg-username
        spring.datasource.password=your-pg-password
        spring.jpa.hibernate.ddl-auto=update
        spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
        ```
        (Replace `your-pg-username` and `your-pg-password` with your PostgreSQL credentials)

3.  **Build the project:**
    ```bash
    mvn clean install
    ```

4.  **Run the application:**
    ```bash
    mvn spring-boot:run
    ```
    The backend will typically be accessible at `http://localhost:8080` (or `8181` if configured as such).

#### 2. Setup Frontend (ReactJS)

1.  **Clone the repository (frontend part):**
    ```bash
    git clone [https://github.com/your-username/task-management-frontend.git](https://github.com/your-username/task-management-frontend.git)
    cd task-management-frontend
    ```
    (Replace `your-username/task-management-frontend.git` with your actual frontend repository URL)

2.  **Install the dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm start
    ```

4.  Open your browser and navigate to:
    ```
    http://localhost:3000
    ```
    The ReactJS frontend will be running and communicating with the backend.

---

## Folder Structure

```
Task_Management_System/
│   
├── .metadata/
│   └── plugins/
├── task-manager-backend-postgresql/  # Backend Code
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   ├── com\taskmanager\backend/
│   │   │   │   │   ├── TaskManagerBackendPostgresqlApplication.java
│   │   │   │   │   ├── ServletInitializer.java
│   │   │   │   │   ├── config/               # Security 
│   │   │   │   │   │   ├── SecurityConfig.java 			# Security Related logic bcrypt password and REST API Authentication
│   │   │   │   │   │   ├── WebConfig.java 				# Security Related CORS Authentication
│   │   │   │   │   ├── controller/               # REST controllers for API endpoints
│   │   │   │   │   │   ├── UserController.java 			
│   │   │   │   │   │   ├── TaskController.java 			
│   │   │   │   │   ├── dto/ 						# DTO classes for returning as Response
│   │   │   │   │   │   ├── AuthResponse.java
│   │   │   │   │   │   ├── TaskDto.java 	 	
│   │   │   │   │   ├── service/                  # Business logic and services
│   │   │   │   │   │   ├── AuthService.java 
│   │   │   │   │   │   ├── TaskService.java 
│   │   │   │   │   ├── repository/   			# interfaces JPA repositories for database operations
│   │   │   │   │   │   ├── TaskRepository.java  
│   │   │   │   │   │   ├── UserRepository.java 
│   │   │   │   │   ├── entity/ 					# Entity classes representing database tables
│   │   │   │   │   │   ├── Task.java   
│   │   │   │   │   │   ├── User.java 
│   │   │   │   ├── resources/
│   │   │   │   │   ├── application.properties
│   ├── target/
│   │   ├── classes/com/taskmanager/backend/
│   │   ├── task-manager-backend-postgresql-0.0.1-SNAPSHOT.jar
│   │   ├── task-manager-backend-postgresql-0.0.1-SNAPSHOT.jar.original
│   ├── .classpath
│   ├── .gitattributes
│   ├── .gitignore
│   ├── .project
│   ├── Dockerfile
│   ├── HELP.md
│   ├── mvnw
│   ├── mvnw.cmd
│   └── pom.xml
├── task-manager-frontend/     # Frontend Code
│   ├── public/                	  # Static files
│   │   ├── index.html              	  # Main HTML file
│   ├── src/                   	  
│   │   ├── components/              # Reusable components
│   │   │   ├── Loader.jsx
│   │   │   ├── Notification.jsx
│   │   │   ├── LoginForm.js
│   │   │   ├── RegisterForm.js
│   │   │   ├── TaskFormModal.jsx
│   │   ├── context/                 # app context
│   │   │   ├── AuthContext.js
│   │   ├── pages/                   # Page-specific components
│   │   │   ├── AuthPage.js
│   │   │   ├── HomePage.jsx
│   │   │   ├── NotFoundPage.jsx
│   │   │   ├── TasksDashboard.jsx
│   │   ├── styles/                  # styling
│   │   │   ├── AuthPage.css
│   │   │   ├── HomePage.css
│   │   │   ├── Loader.css
│   │   │   ├── LoginForm.css
│   │   │   ├── Modal.css
│   │   │   ├── RegisterForm.css
│   │   │   ├── TasksDashboard.css
│   │   ├── app.js              	# Main App component
│   │   ├── app.css            	# Main App styles
│   │   ├── index.js           	# React DOM entry point
│   │   ├── index.css          	# Global styles
│   ├── package-lock.json      
│   ├── package.json           
│   ├── .gitignore              
│   └── README.md  
├── .gitignore
└──  README.md 
```

---
## Folder Description

-   **task-management-frontend/public/assets/**: Contains static files such as images.
-   **task-management-frontend/src/components/**: Contains reusable functional components used across different pages.
-   **task-management-frontend/src/pages/**: Houses page-specific components like Login, Register, Dashboard, etc.
-   **task-management-frontend/src/api/**: Contains Axios configurations and functions for interacting with the backend API.
-   **task-management-frontend/src/context/**: Holds React Context API implementations for global state management (e.g., authentication status).
-   **task-management-frontend/src/styles/**: Contains all CSS files, including global styles and component-specific styles.
-   **task-management-backend/src/main/java/com/taskmanagement/backend/config/**: Contains configuration for security and CORS.
-   **task-management-backend/src/main/java/com/taskmanagement/backend/controller/**: Defines the REST API endpoints.
-   **task-management-backend/src/main/java/com/taskmanagement/backend/service/**: Implements the core business logic.
-   **task-management-backend/src/main/java/com/taskmanagement/backend/repository/**: Provides interfaces for database access using Spring Data JPA.
-   **task-management-backend/src/main/java/com/taskmanagement/backend/dto/**: Data Transfer Objects for efficient data exchange between layers.
-   **task-management-backend/src/main/java/com/taskmanagement/backend/model/**: JPA entities representing the database tables.

---

## Backend Communication

The ReactJS frontend communicates with the Spring Boot backend using `Axios`. All HTTP requests (GET, POST, PUT, DELETE) for user authentication, user data, and task management are directed to the backend API.

**Example API Endpoints**

-   `POST /api/auth/register`: Register a new user.
-   `POST /api/auth/login`: Authenticate a user and return a token.
-   `GET /api/tasks`: Retrieve all tasks for the logged-in user.
-   `POST /api/tasks`: Add a new task.
-   `PUT /api/tasks/{id}`: Update an existing task.
-   `DELETE /api/tasks/{id}`: Delete a task.

**CORS Configuration (Backend)**

Ensure that CORS is enabled in the Spring Boot backend to allow communication between your frontend application's origin (e.g., `http://localhost:3000` during development, or your deployed frontend URL) and the backend.

---

## Future Enhancements

-   Implement JWT-based authentication for enhanced security.
-   Add task categorization and filtering options.
-   Implement task due dates and reminders.
-   User profile management features.

---

## Contact

Maintainer: [Your Name]

-   GitHub: [Your GitHub Profile URL]
-   Email: [Your Email Address]

---

**2) README.md (in frontend directory)**

```markdown
# TaskTrack System Frontend

## Overview

**TaskTrack System Frontend** is a React.js-based application designed to streamline personal task management. The platform is fully responsive, user-friendly, and integrates seamlessly with the backend REST API to deliver a smooth and efficient user experience.

This project incorporates modern technologies like React Bootstrap for styling, React Router for navigation, and Axios for API communication. The system focuses on providing core task management functionalities to individual users.

## Features

1.  **User Authentication**:
    * Secure user registration and login forms.
    * Redirection to dashboard upon successful login.

2.  **Task Management**:
    * **Dashboard View**: Display all tasks in a clear, tabular format.
    * **Add Task**: Form to create new tasks.
    * **Edit Task**: Functionality to modify existing task details.
    * **Delete Task**: Option to remove tasks.

3.  **Navigation**:
    * Clear routing for login, registration, dashboard, and task-specific pages.
    * Logout feature redirects to the homepage.

4.  **UI/UX**:
    * Responsive design using React Bootstrap and custom media queries for optimal display on various devices.
    * Intuitive forms with input validation.

### Technologies and Tools

* **ReactJS**: Frontend JavaScript library for building user interfaces.
* **React Router DOM**: For declarative routing in React applications.
* **React Bootstrap**: Frontend framework for responsive and modern UI components.
* **Axios**: Promise-based HTTP client for making API requests.
* **VS Code**: Integrated Development Environment.
* **Git and GitHub**: Version control.

---

---

## Installation and Setup

### Prerequisites

* Node.js (LTS version recommended)
* npm (comes with Node.js)

### Steps to Run

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/task-management-frontend.git
    cd task-management-frontend
    ```
    (Replace `your-username/task-management-frontend.git` with your actual frontend repository URL)

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables (Optional but Recommended):**
    Create a `.env` file in the root of the frontend directory and add your backend API URL:
    ```
    REACT_APP_BACKEND_URL=http://localhost:8080
    ```
    (Adjust the URL if your backend runs on a different port or is deployed elsewhere.)

4.  **Start the development server:**
    ```bash
    npm start
    ```
    The application will open in your browser at `http://localhost:3000`. Ensure your backend server is running to allow API communication.

---

## Backend Communication

The frontend interacts with the Spring Boot backend through RESTful APIs using `Axios`. The API calls handle user authentication (login, registration) and all CRUD operations for tasks.

---

## Contact

Maintainer: [Your Name]

-   GitHub: [Your GitHub Profile URL]
-   Email: [Your Email Address]
3) README.md (in backend directory)

Markdown

# TaskTrack System Backend

## Overview

**TaskTrack** is a robust, secure, and feature-rich application developed using Spring Boot, aimed at simplifying personal task management. This backend provides seamless integration with a PostgreSQL database, secure authentication mechanisms, and RESTful APIs for efficient communication with the frontend.

As a Full Stack Developer, I took charge of all major roles, including frontend and backend development, ensuring a client-centric approach while maintaining a balance between design and functionality. The application follows a layered architecture comprising controllers, services, repository, and models at the backend to ensure modularity, scalability, and maintainability.

## Features

1.  **User Authentication**:
    * Secure user registration.
    * User login with password encryption.

2.  **Task Management**:
    * CRUD (Create, Read, Update, Delete) operations for tasks.
    * Tasks are associated with individual users.

3.  **Data Persistence**:
    * Integrates with PostgreSQL database using Spring Data JPA for efficient ORM.

### Technologies and Tools

* **Spring Boot**: Framework for rapidly building robust, production-ready Spring applications.
* **Java**: Core programming language.
* **Spring Data JPA**: Simplifies data access and persistence with JPA and Hibernate.
* **PostgreSQL**: Relational database.
* **Maven**: Build automation tool and dependency management.
* **Spring Tool Suite (STS) 4**: Integrated Development Environment.
* **Git and GitHub**: Version control.

---

## Architecture and Flow:

1.  **Request Flow**:
    * The frontend sends HTTP requests to the **Controller Layer**.
    * The **Controller Layer** processes requests and delegates business logic to the **Service Layer**.
    * The **Service Layer** implements core business logic and interacts with the **Repository Layer**.
    * The **Repository Layer** (JPA repositories) handles database operations.
    * Data Transfer Objects (DTOs) are used for request/response payloads to ensure data consistency and reduce exposure of internal models.
    * Responses (often as DTOs) are returned to the frontend via REST APIs.

2.  **Layered Architecture**:
    * **Controller**: Handles incoming HTTP requests and prepares responses.
    * **Service**: Contains the core business logic.
    * **Repository**: Interfaces for data access operations.
    * **Model (Entity)**: Represents the database schema.
    * **DTO**: Data Transfer Objects for API communication.

---

---

## REST API Endpoints

### Authentication
* **POST /api/auth/register**: Register a new user.
    * Request Body: `{ username, email, password, confirmPassword }`
    * Response: User registration status.
* **POST /api/auth/login**: Authenticate a user.
    * Request Body: `{ email, password }`
    * Response: Authentication token (e.g., JWT) and user details.

### Tasks
* **GET /api/tasks**: Retrieve all tasks for the authenticated user.
    * Response: List of task objects.
* **POST /api/tasks**: Add a new task.
    * Request Body: `{ title, description, dueDate, status }` (example fields)
    * Response: Created task object.
* **PUT /api/tasks/{id}**: Update an existing task.
    * URL Parameter: `id` (ID of the task to update)
    * Request Body: `{ title, description, dueDate, status }` (updated fields)
    * Response: Updated task object.
* **DELETE /api/tasks/{id}**: Delete a task.
    * URL Parameter: `id` (ID of the task to delete)
    * Response: Confirmation message or status.

---

## Installation and Setup

### Prerequisites

* Java Development Kit (JDK 17 or higher)
* Apache Maven
* PostgreSQL database server

### Steps to Set Up the Backend

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/task-management-backend.git
    cd task-management-backend
    ```
    (Replace `your-username/task-management-backend.git` with your actual backend repository URL)

2.  **Configure the database:**
    * Create a PostgreSQL database (e.g., `task_management`).
    * Update the database connection details in `src/main/resources/application.properties` (or `application.yml`):
        ```properties
        spring.datasource.url=jdbc:postgresql://localhost:5432/task_management
        spring.datasource.username=your-pg-username
        spring.datasource.password=your-pg-password
        spring.jpa.hibernate.ddl-auto=update
        spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
        ```
        (Replace `your-pg-username` and `your-pg-password` with your PostgreSQL credentials)

3.  **Build the project:**
    ```bash
    mvn clean install
    ```

4.  **Run the application:**
    ```bash
    mvn spring-boot:run
    ```
    The backend server will typically start on port `8080` (or the port specified in `application.properties`).

---

## Contact

Maintainer: Manoj Modhale

- GitHub: [https://github.com/ManojModhale](https://github.com/ManojModhale)
- Email: [manojmodhale2001@gmail.com](mailto:manojmodhale2001@gmail.com)

---
