# News Aggregator - Full Stack Application

A modern, full-stack news aggregator application that allows users to browse the latest news across different categories with user authentication features.

![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.4.5-brightgreen)
![React](https://img.shields.io/badge/React-19.0.0-blue)
![MySQL](https://img.shields.io/badge/MySQL-8.0-orange)
![Vite](https://img.shields.io/badge/Vite-6.2.0-purple)

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)

## 🎯 Overview

This is a full-stack web application that aggregates news from various sources using the NewsAPI. Users can register, log in, and browse news articles across multiple categories including general, business, entertainment, health, science, sports, and technology.

## ✨ Features

- **User Authentication**: Secure signup and login functionality
- **News Aggregation**: Real-time news fetching from NewsAPI
- **Category Filtering**: Browse news by different categories
- **Responsive Design**: Mobile-friendly interface using Bootstrap
- **RESTful API**: Spring Boot backend with REST endpoints
- **Database Integration**: MySQL database for user management
- **Modern UI**: React-based frontend with Vite for fast development
- **CORS Support**: Cross-origin resource sharing configured for seamless frontend-backend communication

## 🛠️ Technology Stack

### Backend
- **Java 17**: Primary programming language
- **Spring Boot 3.4.5**: Framework for building the REST API
  - Spring Web: RESTful web services
  - Spring Data JPA: Data persistence layer
  - Spring DevTools: Development utilities
- **MySQL 8**: Relational database
- **Maven**: Dependency management and build tool
- **Hibernate**: ORM for database operations

### Frontend
- **React 19.0.0**: JavaScript library for building user interfaces
- **React Router DOM 7.5.0**: Client-side routing
- **Vite 6.2.0**: Build tool and development server
- **Bootstrap 5.3.3**: CSS framework for responsive design
- **PropTypes**: Runtime type checking for React props
- **ESLint**: Code linting and quality checking

### External APIs
- **NewsAPI**: News data aggregation service

## 📁 Project Structure

```
FSAD_PROJECT/
│
├── Backend/
│   └── backend.NewAggregator/
│       ├── src/
│       │   ├── main/
│       │   │   ├── java/com/backend/
│       │   │   │   ├── NewAggregator/
│       │   │   │   │   └── Application.java          # Main Spring Boot application
│       │   │   │   ├── config/
│       │   │   │   │   └── WebConfig.java           # CORS configuration
│       │   │   │   ├── controller/
│       │   │   │   │   └── AuthController.java      # Authentication endpoints
│       │   │   │   ├── model/
│       │   │   │   │   └── User.java                # User entity
│       │   │   │   ├── repository/
│       │   │   │   │   └── UserRepository.java      # User data access layer
│       │   │   │   └── service/                     # Service layer (future expansion)
│       │   │   └── resources/
│       │   │       └── application.properties        # Application configuration
│       │   └── test/                                 # Test files
│       ├── target/                                   # Compiled classes and build artifacts
│       ├── pom.xml                                   # Maven configuration
│       ├── mvnw                                      # Maven wrapper (Unix)
│       └── mvnw.cmd                                  # Maven wrapper (Windows)
│
├── Frontend/
│   ├── src/
│   │   ├── Components/
│   │   │   ├── AuthModal.jsx                        # Authentication modal
│   │   │   ├── AuthModal.css                        # Modal styling
│   │   │   ├── LoginPage.jsx                        # Login component
│   │   │   ├── LoginPage.css                        # Login styling
│   │   │   ├── SigninPage.jsx                       # Signup component
│   │   │   ├── Navbar.jsx                           # Navigation bar
│   │   │   ├── NewsBoard.jsx                        # News display component
│   │   │   └── NewsItem.jsx                         # Individual news card
│   │   ├── assets/                                  # Static assets
│   │   ├── App.jsx                                  # Main React component
│   │   ├── App.css                                  # App-level styles
│   │   ├── main.jsx                                 # React entry point
│   │   └── index.css                                # Global styles
│   ├── public/                                      # Public static files
│   ├── package.json                                 # Node.js dependencies
│   ├── vite.config.js                               # Vite configuration
│   ├── eslint.config.js                             # ESLint configuration
│   ├── vercel.json                                  # Vercel deployment config
│   ├── index.html                                   # HTML template
│   └── README.md                                    # Frontend documentation
│
└── README.md                                        # This file
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Java Development Kit (JDK) 17** or higher
  - Download from: https://www.oracle.com/java/technologies/downloads/
- **Node.js 18.x** or higher and **npm**
  - Download from: https://nodejs.org/
- **MySQL 8.0** or higher
  - Download from: https://dev.mysql.com/downloads/mysql/
- **Maven 3.6+** (included via Maven wrapper)
- **Git** (for cloning the repository)
  - Download from: https://git-scm.com/downloads

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd FSAD_PROJECT
```

### 2. Database Setup

1. Start your MySQL server
2. Create a new database:

```sql
CREATE DATABASE ndb;
```

3. Update the database credentials in `Backend/backend.NewAggregator/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/ndb
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD_HERE
```

### 3. Backend Setup

Navigate to the backend directory:

```bash
cd Backend/backend.NewAggregator
```

#### For Windows (PowerShell):
```powershell
.\mvnw.cmd clean install
```

#### For macOS/Linux:
```bash
./mvnw clean install
```

### 4. Frontend Setup

Navigate to the frontend directory:

```bash
cd ../../Frontend
```

Install dependencies:

```bash
npm install
```

### 5. Configure NewsAPI

1. Sign up for a free API key at [NewsAPI.org](https://newsapi.org/)
2. Create a `.env.local` file in the `Frontend` directory:

```env
NEWS_API_KEY=your_newsapi_key_here
```

**For Vercel Deployment**: See the [Vercel Deployment Guide](Frontend/VERCEL_DEPLOYMENT_FIX.md) for instructions on setting up environment variables in Vercel.

## ⚙️ Configuration

### Backend Configuration (`application.properties`)

```properties
# Application Name
spring.application.name=backend.NewAggregator

# Server Configuration
server.port=2025

# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/ndb
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
```

### Frontend Configuration

The frontend is configured to connect to the backend at `http://localhost:2025`. If you change the backend port, update the API calls in the frontend components accordingly.

## ▶️ Running the Application

### Start the Backend

Navigate to the backend directory and run:

#### Windows (PowerShell):
```powershell
cd Backend\backend.NewAggregator
.\mvnw.cmd spring-boot:run
```

#### macOS/Linux:
```bash
cd Backend/backend.NewAggregator
./mvnw spring-boot:run
```

The backend server will start at: `http://localhost:2025`

### Start the Frontend

In a new terminal, navigate to the frontend directory and run:

```bash
cd Frontend
npm run dev
```

The frontend will start at: `http://localhost:5173`

### Access the Application

Open your browser and navigate to: **http://localhost:5173**

## 🔌 API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| POST | `/api/signup` | Register a new user | `{"fullName": "string", "email": "string", "password": "string"}` |
| POST | `/api/login` | Login existing user | `{"email": "string", "password": "string"}` |

### Example API Requests

**Signup:**
```bash
POST http://localhost:2025/api/signup
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Login:**
```bash
POST http://localhost:2025/api/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

## 🌍 Environment Variables

### Frontend (.env) - For Local Development

```env
NEWS_API_KEY=your_newsapi_key_here
```

**Note**: When deploying to Vercel, set `NEWS_API_KEY` in Vercel Dashboard > Settings > Environment Variables instead of using a `.env` file.

### Backend (application.properties)

Already configured in the `application.properties` file.

## 🏗️ Architecture

### Backend Architecture
- **Controller Layer**: Handles HTTP requests and responses
- **Service Layer**: Business logic (ready for expansion)
- **Repository Layer**: Data access using Spring Data JPA
- **Model Layer**: Entity classes representing database tables
- **Config Layer**: Application configurations (CORS, etc.)

### Frontend Architecture
- **Component-Based**: Reusable React components
- **State Management**: React hooks (useState, useEffect)
- **Routing**: React Router for navigation
- **API Integration**: Fetch API for backend communication
- **Serverless Functions**: Vercel serverless function (`/api/news.js`) acts as a secure proxy to NewsAPI, preventing client-side API key exposure

## 🔒 Security Considerations

> **⚠️ Important Security Notes:**
> - Passwords are currently stored in plain text. For production, implement password hashing (BCrypt).
> - Add JWT or session-based authentication for secure API endpoints.
> - Never commit `.env` or `.env.local` files to version control (already in `.gitignore`).
> - NewsAPI key is now securely stored server-side via Vercel serverless function.
> - Update CORS configuration for production environments.

## ☁️ Deployment

### Vercel Deployment (Frontend + Serverless Functions)

The frontend is configured for deployment on Vercel with a serverless function that securely handles NewsAPI requests.

**Quick Deploy:**
1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Add `NEWS_API_KEY` environment variable in Vercel Settings
4. Deploy!

📖 **Detailed Guide**: See [VERCEL_DEPLOYMENT_FIX.md](Frontend/VERCEL_DEPLOYMENT_FIX.md) for complete deployment instructions and troubleshooting.

## 📝 Future Enhancements

- [ ] Implement password hashing (BCrypt)
- [ ] Add JWT authentication
- [ ] Implement refresh tokens
- [ ] Add user profile management
- [ ] Implement favorites/bookmarks feature
- [ ] Add search functionality
- [ ] Implement pagination for news articles
- [ ] Add unit and integration tests
- [ ] Deploy to cloud platforms (AWS, Azure, Heroku)

## 🐛 Troubleshooting

### Backend Issues

1. **Port already in use:**
   - Change the port in `application.properties`: `server.port=8080`

2. **Database connection error:**
   - Verify MySQL is running
   - Check database credentials
   - Ensure database `ndb` exists

3. **Maven build fails:**
   - Ensure JDK 17 is installed: `java -version`
   - Clean and rebuild: `./mvnw clean install`

### Frontend Issues

1. **Port 5173 already in use:**
   - Kill the process or change the port in `vite.config.js`

2. **API calls failing:**
   - Verify backend is running on port 2025
   - Check CORS configuration in `WebConfig.java`

3. **NewsAPI errors:**
   - Verify your API key is valid
   - Check if you've exceeded the free tier limits

## 📄 License

This project is for educational purposes as part of the Full Stack Application Development (FSAD) course.

## 👥 Contributors

- Your Name/Team Name

## 📞 Contact

For questions or support, please contact: [your-email@example.com]

---

**Happy Coding! 🚀**
