# Task_Management_System

## Overview

**Task_Management_System** is a robust and scalable task management platform developed using ReactJS, Spring Boot, and PostgreSQL. Designed to streamline personal task organization, it supports user registration, login, and comprehensive task management features.

This project follows a layered architecture and ensures modularity, scalability, and maintainability. The intuitive user interface enhances usability, making it ideal for managing daily tasks efficiently.

## Deployment
This full-stack **Task_Management_System** project has been successfully deployed using the **Render** platform.

   *Frontend (ReactJS Web Service):
      *Link: https://task-management-system-app.onrender.com/
   
   *Backend (Spring Boot Web Service with Docker):
      *Link: https://task-management-system-oeph.onrender.com/
      
   *Database (PostgreSQL):
      *The PostgreSQL database is also hosted on Render, utilizing its internal database service.

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

5.  **Task Management**:
    * **Dashboard View**: Display all tasks in a clear, tabular format.
    * **Add Task**: Form to create new tasks.
    * **Edit Task**: Functionality to modify existing task details.
    * **Delete Task**: Option to remove tasks.

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

3.  **Database Integration**:
    * PostgreSQL database with Spring Data JPA for efficient ORM.

4.  **User and Task Management**:
    * Handles CRUD operations for users and tasks.
      

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
-   **ReactJs**: Component-based framework for building the user interface.
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
    git clone https://github.com/ManojModhale/Task_Management_System.git
    cd task-manager-backend-postgresql
    ```

2.  **Configure the database:**
    * Create a PostgreSQL database named `task_management`.
    * Update the database connection details in `src/main/resources/application.properties`:
        ```properties
        server.port=8282
        
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
    The backend will typically be accessible at `http://localhost:8282`.

#### 2. Setup Frontend (ReactJS)

1.  **Clone the repository (frontend part):**
    ```bash
    git clone https://github.com/ManojModhale/Task_Management_System.git
    cd task-manager-frontend
    ```

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
│   ├── build/                	  # build files
│   │   ├── static/
│   │   ├── asset-manifest.json             	  
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

-   **task-management-frontend/public/**: Contains static files such as images.
-   **task-management-frontend/src/components/**: Contains reusable functional components used across different pages.
-   **task-management-frontend/src/pages/**: Houses page-specific components like Auth, Home, Dashboard, etc.
-   **task-management-frontend/src/context/**: Holds React Context API implementations for global state management (e.g., authentication status).
-   **task-management-frontend/src/styles/**: Contains all CSS files, including global styles and component-specific styles.
-   **task-management-backend-postgresql/src/main/java/com/taskmanager/backend/config/**: Contains configuration for security and CORS.
-   **task-management-backend-postgresql/src/main/java/com/taskmanager/backend/controller/**: Defines the REST API endpoints.
-   **task-management-backend-postgresql/src/main/java/com/taskmanager/backend/service/**: Implements the core business logic.
-   **task-management-backend-postgresql/src/main/java/com/taskmanager/backend/repository/**: Provides interfaces for database access using Spring Data JPA.
-   **task-management-backend-postgresql/src/main/java/com/taskmanager/backend/dto/**: Data Transfer Objects for efficient data exchange between layers.
-   **task-management-backend-postgresql/src/main/java/com/taskmanager/backend/entity/**: JPA entities representing the database tables.

---

## Backend Communication

The ReactJS frontend communicates with the Spring Boot backend using `Axios`. All HTTP requests (GET, POST, PUT, DELETE) for user authentication, user data, and task management are directed to the backend API.

**REST API Endpoints**

-   `POST /api/auth/register`: Register a new user.
-   `POST /api/auth/login`: Authenticate a user.
-   `GET /api/task/allTasks/{username}`: Retrieve all tasks for the logged-in user.
-   `POST /api/task/add-Task/{username}`: Add a new task.
-   `PUT /api/task/update-Task/{id}/{username}`: Update an existing task.
-   `DELETE /api/task/delete-Task/{id}/{username}`: Delete a task.

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

Maintainer: Manoj Modhale

- GitHub: [https://github.com/ManojModhale](https://github.com/ManojModhale)
- Email: [manojmodhale2001@gmail.com](mailto:manojmodhale2001@gmail.com)

---
