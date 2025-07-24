# KAP_FIT Backend

A simple, modular fitness tracking backend built with [NestJS](https://nestjs.com/). KAP_FIT allows users to record exercise reps, weights, routines, nutrition, and progress, making it easy to analyze workout progress over time.

---

## 1. Installation & Running the Project

### **Prerequisites**

- **Node.js** (v16+ recommended)
- **npm** (v8+ recommended)
- **MongoDB** (local or cloud instance)
- **Redis** (for token blacklisting and caching)

### **Environment Variables**

Create a `.env` file in the project root with the following variables:

```
MONGO_URI=mongodb://localhost:27017/kap_fit
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_USERNAME=
REDIS_PASSWORD=
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your_email@example.com
EMAIL_PASSWORD=your_email_password
EMAIL_FROM=KAP_FIT <noreply@kapfit.com>
```

### **Install Dependencies**

```bash
npm install
```

### **Run the Project**

```bash
# Development
npm run start:dev

# Production
npm run start:prod
```

### **Run Tests**

```bash
npm run test
```

---

## 2. Code Structure

```
src/
  ├── app.module.ts           # Main NestJS module
  ├── main.ts                 # Entry point
  ├── config/                 # Configuration files
  ├── auth/                   # Authentication (JWT, user, refresh tokens)
  ├── email-service/          # Email sending and templates
  ├── guards/                 # Custom guards (e.g., AuthGuard)
  ├── nutrition-log/          # Nutrition log CRUD
  ├── progress-log/           # Progress log CRUD
  ├── user-goal/              # User goal CRUD
  ├── user-routines/          # Workout routines CRUD
  ├── workout-sessions/       # Workout session CRUD
  ├── workout-analytics/      # (Planned) Analytics endpoints
  └── utils/                  # Utility functions (e.g., crypto)
test/
  └── app.e2e-spec.ts         # Example E2E test
```

- Each feature module contains its own `controller`, `service`, `models`, and `dto` folders for separation of concerns.

---

## 3. Features

- **User Authentication:** Register, login, JWT-based auth, refresh tokens, and token blacklisting (logout).
- **User Goals:** Set, view, and delete fitness goals.
- **Workout Routines:** Create, update, view, and delete custom workout routines.
- **Workout Sessions:** Log workout sessions with detailed exercise, sets, reps, and weights.
- **Progress Logs:** Track progress (e.g., body measurements, PRs) over time.
- **Nutrition Logs:** Record daily nutrition (calories, macros, notes).
- **Email Service:** (Pluggable) for notifications, OTP, and verification.
- **Security:** All endpoints (except auth) are protected by a custom JWT AuthGuard.
- **Validation:** DTO-based request validation.
- **Planned Analytics:** (Module stub) for workout and progress analytics.

---

## 4. TODOs

- [ ] Implement and document the Workout Analytics module.
- [ ] Add pagination and filtering to all list endpoints.
- [ ] Add password reset and email verification flows.
- [ ] Improve test coverage (unit and e2e).
- [ ] Add Swagger/OpenAPI documentation.
- [ ] Add user profile update endpoints.
- [ ] Add support for custom exercises and templates.
- [ ] Enhance error handling and logging.
- [ ] Add rate limiting to authentication endpoints.
- [ ] Add CI/CD pipeline and deployment scripts.

---

## 5. Contributing Guidelines

We welcome contributions! Please follow these steps:

1. **Fork the repository** and create your branch from `main`.
2. **Install dependencies** with `npm install`.
3. **Write clear, modular code** and add/modify tests as needed.
4. **Run linting and tests** before submitting:
   ```bash
   npm run lint
   npm run test
   ```
5. **Open a Pull Request** with a clear description of your changes.
6. For major changes, please open an issue first to discuss what you would like to change.

**Code Style:**

- Use Prettier and ESLint (config provided).
- Keep code modular and well-documented.
- Write meaningful commit messages.

---

**Questions?**  
Open an issue or contact the maintainer.

---
