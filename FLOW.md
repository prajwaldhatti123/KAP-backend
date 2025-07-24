# KAP_FIT Application Flow

This document outlines the user flow and core feature interactions within the KAP_FIT application.

---

## 1. Authentication

The user journey begins with authentication. All endpoints, except for registration and login, are protected and require a valid JSON Web Token (JWT).

### **Flow:**

1.  **User Registration (`/auth/register`):** A new user provides an email and password to create an account.
2.  **User Login (`/auth/login`):** The user logs in with their credentials.
3.  **Token Issuance:** Upon successful login, the API returns an `access_token` and a `refresh_token`.
    - `access_token`: A short-lived token used to access protected endpoints.
    - `refresh_token`: A long-lived token used to get a new `access_token` when it expires.
4.  **Accessing Endpoints:** The user must include the `access_token` in the `Authorization` header for all subsequent requests (e.g., `Authorization: Bearer <token>`).
5.  **Logout (`/auth/logout`):** The user's `access_token` is blacklisted, preventing further use.

---

## 2. Core Features

Once authenticated, users can interact with the core features of the app. The general flow is to create routines, log workout sessions based on those routines, and then track progress and nutrition.

### **A. Setting Goals (`/goals`)**

- **Purpose:** Users can set high-level fitness goals.
- **Flow:**
  1.  **Create Goal:** A user defines a new goal (e.g., "Lose 10kg," "Build muscle").
  2.  **View Goals:** Users can see a list of their active goals.
  3.  **Delete Goal:** A goal can be removed once completed or no longer relevant.

### **B. Creating Routines (`/routines`)**

- **Purpose:** Users create reusable workout templates.
- **Flow:**
  1.  **Create Routine:** A user names a routine (e.g., "Chest Day") and adds a list of exercises, including details like sets, reps, and weight.
  2.  **View/Update Routines:** Users can list, view, and modify their routines at any time.

### **C. Logging Workouts (`/workout-sessions`)**

- **Purpose:** Users log their daily workout activity.
- **Flow:**
  1.  **Start a Session:** A user selects a routine to start a workout session.
  2.  **Log Sets:** For each exercise, the user records the actual weight and reps for each set.
  3.  **Save Session:** The completed session is saved with a date and associated user/routine.

### **D. Tracking Progress (`/progress-logs`)**

- **Purpose:** Users can log body measurements or other progress markers.
- **Flow:**
  1.  **Create Log:** A user creates a new log entry with metrics like body weight, body fat percentage, or photos.
  2.  **View History:** Users can view their progress over time.

### **E. Logging Nutrition (`/nutrition-logs`)**

- **Purpose:** Users track their daily food intake.
- **Flow:**
  1.  **Create Log:** A user logs a meal, including calories and macronutrient details (protein, carbs, fat).
  2.  **View History:** Users can see their nutrition history to analyze their diet.

---

## 3. Analytics (Future)

The `workout-analytics` module is planned to provide insights based on user data.

### **Potential Flow:**

1.  **Request Analytics:** A user requests an analysis (e.g., "Show my bench press progress over the last 3 months").
2.  **Data Aggregation:** The backend will process workout session and progress log data.
3.  **Return Insights:** The API will return structured data that can be visualized on the frontend (e.g., graphs of strength gains, weight loss trends).
