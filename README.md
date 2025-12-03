
# 🎯 **News Aggregator – Modern Full-Stack Application**

<p align="center">
  <img src="Frontend/public/logo.svg" width="140" />
</p>

<p align="center">
  <strong>Real-time news aggregation • React + Vite frontend • Spring Boot backend • MySQL database • Secure authentication</strong>
</p>

<p align="center">
  <a>
    <img src="https://img.shields.io/badge/Spring%20Boot-3.4.5-brightgreen" />
  </a>
  <a>
    <img src="https://img.shields.io/badge/React-19.0.0-blue" />
  </a>
  <a>
    <img src="https://img.shields.io/badge/Vite-6.2.0-purple" />
  </a>
  <a>
    <img src="https://img.shields.io/badge/MySQL-8.0-orange" />
  </a>
</p>

---

## 🚀 **Live Demo**

🔗 **Frontend (Deployed on Vercel):**
**[https://newsaggregator.slayercore.me/](https://newsaggregator.slayercore.me/)**

⚠️ **Note:**
The backend is **not deployed**, therefore **authentication features** will not work in the live demo.
Only **news fetching** is functional.

---

## 📸 **Screenshots**

### 🖼️ Homepage

<p align="center">
  <img src="Frontend/public/screenshort1.png" width="750" />
</p>

---

## 📌 **Table of Contents**

* [Overview](#overview)
* [Features](#features)
* [Tech Stack](#tech-stack)
* [Project Structure](#project-structure)
* [Installation](#installation)
* [Backend Setup](#backend-setup)
* [Frontend Setup](#frontend-setup)
* [Environment Variables](#environment-variables)
* [Running the App](#running-the-app)
* [API Endpoints](#api-endpoints)
* [Architecture](#architecture)
* [Security Notes](#security-notes)
* [Deployment](#deployment)
* [Future Enhancements](#future-enhancements)
* [Troubleshooting](#troubleshooting)
* [License](#license)
* [Contact](#contact)

---

## 🧭 **Overview**

**News Aggregator** is a full-stack application that fetches real-time news from **NewsAPI** and categorizes it for easy browsing.
It includes:

* Frontend built with **React 19 + Vite**
* Backend built with **Spring Boot 3**
* Authentication system (Signup/Login)
* MySQL database for user management

The project is designed for the **Full Stack Application Development (FSAD)** course and follows a clean, scalable architecture.

---

## ✨ **Features**

### 📰 News & UI

* Real-time news fetching (via NewsAPI)
* Category-based filtering
* Responsive UI with Bootstrap 5
* Minimal and modern user interface

### 🔐 Authentication

* Signup & Login forms
* Backend validation
* Ready for JWT integration

### ⚙️ System

* REST API powered by Spring Boot
* Database integration (MySQL)
* Clean project architecture
* Vercel serverless function proxy for secure NewsAPI access

---

## 🛠️ **Technology Stack**

### **Frontend**

* React 19
* React Router DOM
* Vite
* Bootstrap 5
* ESLint
* Vercel Serverless API (for NewsAPI proxy)

### **Backend**

* Java 17
* Spring Boot 3.4.5
* Spring Data JPA
* MySQL 8
* Maven

### **External API**

* NewsAPI (Top Headlines)

---

## 📁 **Project Structure**

```
FSAD_PROJECT/
│
├── Backend/
│   └── backend.NewAggregator/
│       ├── src/main/java/com/backend/NewAggregator/
│       │   ├── controller/         # AuthController
│       │   ├── repository/         # UserRepository
│       │   ├── model/              # User entity
│       │   ├── service/            # Business logic layer
│       │   └── config/             # CORS settings
│       └── src/main/resources/
│           └── application.properties
│
├── Frontend/
│   ├── public/
│   │   ├── logo.svg                # App logo
│   │   ├── screenshort1.png        # Screenshot
│   ├── src/
│   │   ├── Components/             # UI components
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── api/news.js                 # Vercel Serverless function
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## 🔧 **Installation**

Clone the repo:

```bash
git clone https://github.com/sadikshaik01/News-Aggregator-project.git
cd FSAD_PROJECT
```

---

## 🗄️ **Backend Setup**

```bash
cd Backend/backend.NewAggregator
./mvnw spring-boot:run
```

Backend runs at:
**[http://localhost:2025](http://localhost:2025)**

---

## 💻 **Frontend Setup**

```bash
cd Frontend
npm install
npm run dev
```

Frontend runs at:
**[http://localhost:5173](http://localhost:5173)**

---

## 🔑 **Environment Variables**

### **Frontend (Development Only)**

Create `Frontend/.env.local`:

```env
NEWS_API_KEY=your_api_key_here
```

### **Vercel Environment Variable**

Set this in Dashboard → Project Settings → Environment Variables:

```
NEWS_API_KEY = your_api_key_here
```

This is used in:

```
Frontend/api/news.js
```

---

## ▶️ **Running the App**

### Start Backend:

```
./mvnw spring-boot:run
```

### Start Frontend:

```
npm run dev
```

Visit:
**[http://localhost:5173](http://localhost:5173)**

---

## 🌐 **API Endpoints**

### 🔐 Authentication

| Method | Endpoint      | Description       |
| ------ | ------------- | ----------------- |
| POST   | `/api/signup` | Register new user |
| POST   | `/api/login`  | Login user        |

---

## 🏗️ Architecture

### **Frontend**

* Component-driven UI
* React Router navigation
* Vercel Serverless Function for secure API calls
* Bootstrap responsive design

### **Backend**

* Controller → Service → Repository structure
* Spring Boot REST API
* MySQL via JPA

---

## 🔒 **Security Notes**

⚠️ Important:

* Password hashing not yet implemented
* JWT authentication recommended
* API keys must never be exposed in frontend code
* Good news: Your Vercel Serverless Function **hides** the NewsAPI key

---

## ☁️ **Deployment**

### Frontend Deployment (Vercel)

✔ Fully deployed
✔ Serverless proxy included
✔ Live at: **[https://newsaggregator.slayercore.me/](https://newsaggregator.slayercore.me/)**

### Backend Deployment

❌ Not hosted (runs locally only)

---

## 🚀 **Future Enhancements**

* [ ] JWT-based authentication
* [ ] Password hashing (BCrypt)
* [ ] News search feature
* [ ] Bookmark/save news
* [ ] Pagination for news results
* [ ] Multi-language support
* [ ] Full backend deployment

---

## 🛠️ **Troubleshooting**

### **News Fetch Failing on Deployment?**

* Ensure `NEWS_API_KEY` is present in Vercel environment variables
* Must **not** be exposed in the frontend
* Calls must go through `/api/news.js` serverless proxy

---

## 📄 **License**

Created by **Shaik Sadik** for FSAD course
Educational and academic use only.

---

## 📞 **Contact**

📧 **[shaiksadik2968@gmail.com](mailto:shaiksadik2968@gmail.com)**

---
