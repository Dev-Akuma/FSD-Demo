# Secure MERN Stack Authentication with OAuth 2.0, PKCE, and JWT Refresh Tokens

A production-grade authentication system built using the **MERN Stack (MongoDB, Express.js, React, Node.js)** that implements modern, secure best‑practices including **Google OAuth 2.0**, **PKCE**, **JWT-based session management**, **CSRF protection**, **rate limiting**, and **role-based access control (RBAC)**. This project is ideal as a starter template for building secure web applications.

---

## Features Overview

### **1. Google OAuth 2.0 with PKCE (Authorization Code Flow)**

Implements the industry-standard PKCE flow for SPAs:

* Secure code challenge & verifier
* State parameter to prevent Login CSRF
* Nonce validation to prevent replay attacks
* Manual implementation of the PKCE steps for complete control

### **2. JWT Authentication (Access + Refresh Tokens)**

**Access Token**

* Short-lived (15 minutes)
* Stored in React in-memory state

**Refresh Token**

* Long-lived (7 days)
* Stored in **httpOnly, secure cookies**
* Never exposed to JavaScript

### **3. Automatic Silent Token Refresh**

* Axios interceptors detect expired access tokens
* Transparently refresh using `/auth/refresh`
* Retries failed requests without user interaction

### **4. Advanced Security**

* CSRF Protection using `csurf`
* Rate limiting using `express-rate-limit`
* Input validation using `express-validator`
* Secure cookie configuration
* In-memory access-token storage

### **5. Role-Based Access Control (RBAC)**

* Default `user` role
* `admin` role with privileged routes
* Backend middleware for authorization
* Frontend gating using protected components

### **6. Production-Ready Server Design**

* Structured logging with `morgan`
* Clean modular architecture
* Protected admin dashboard
* Dedicated login callback page

---

## Project Architecture

```
client/    → React frontend (PKCE, login, interceptors, routing)
server/    → Express backend (OAuth, JWT, CSRF, RBAC)
models/    → Mongoose schemas (User)
hooks/     → Custom Axios hooks
auth/      → Middlewares
```

---

## Tech Stack

### **Frontend**

* React.js
* React Router
* Axios
* Material UI (MUI)

### **Backend**

* Node.js
* Express.js
* MongoDB + Mongoose
* JSON Web Tokens (JWT)
* csurf
* express-rate-limit
* morgan
* axios

---

## OAuth 2.0 + PKCE Flow (Simplified)

1. User clicks **Login with Google**.
2. React generates:

   * `code_verifier`
   * `code_challenge`
   * `state`
   * `nonce`
3. User is redirected to Google.
4. Google redirects back with `code` + `state`.
5. React verifies `state`.
6. React sends `code`, `code_verifier`, `nonce` → backend.
7. Backend exchanges code for tokens.
8. Backend validates nonce.
9. Backend creates:

   * `accessToken` (15m)
   * `refreshToken` (7d, httpOnly cookie)
10. React stores access token in memory and logs user in.

---

## Database Schema (MongoDB)

### **User Model**

```js
User = {
  email: String,
  name: String,
  role: 'user' | 'admin',
  providers: {
    googleId: String,
  }
}
```

### Why this structure?

* Supports multi-provider login
* Flexible RBAC
* Clean identity mapping

---

## Security Highlights

### PKCE protects against authorization code interception

### State protects against Login CSRF

### Nonce protects against replay attacks

### Refresh token is stored in httpOnly cookie (XSS-safe)

### Access token never touches localStorage or sessionStorage

### CSRF protection guards state-changing routes

### Rate limiting blocks brute force and script abuse

---

## Screens Included

* Login Page
* Profile Page (User)
* Profile Page (Admin)
* Admin Dashboard
* Unauthorized access screen
* Server logs output

---

## Installation & Setup

### **1. Clone the Repository**

```bash
git clone https://github.com/Dev-Akuma/FSD-Demo.git
cd FSD-Demo
```

### **2. Install Server Dependencies**

```bash
cd server
npm install
```

### **3. Install Client Dependencies**

```bash
cd ../client
npm install
```

### **4. Environment Variables**

Create a `.env` file inside `server/`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_ACCESS_EXPIRATION=15m
JWT_REFRESH_EXPIRATION=7d
```

Create a `.env` file inside `client/`:

```env
REACT_APP_GOOGLE_CLIENT_ID=your_client_id
REACT_APP_API_BASE_URL=http://localhost:5000
```

### **5. Start the Project**

```bash
// Terminal 1
cd server
npm start

// Terminal 2
cd client
npm start
```

---

## API Routes Summary

### **Auth Routes**

| Method | Route           | Description                   |
| ------ | --------------- | ----------------------------- |
| POST   | `/auth/google`  | Exchange code → create tokens |
| POST   | `/auth/refresh` | Refresh access token          |
| POST   | `/auth/logout`  | Clear refresh cookie          |

### **User Routes**

| Method | Route          | Description                   |
| ------ | -------------- | ----------------------------- |
| GET    | `/api/user/me` | Get user profile + CSRF token |

### **Admin Routes**

| Method | Route              | Description                 |
| ------ | ------------------ | --------------------------- |
| GET    | `/api/admin/users` | List all users (admin only) |

---

## Testing the Flow

* Start client and server
* Visit `http://localhost:3000`
* Click **Continue with Google**
* Test:

  * Dashboard access
  * Admin route
  * Token refresh
  * Logout

---

## Limitations

* No email/password login
* Access token stored in memory resets on page refresh
* Basic admin panel (read-only)

---

## Future Enhancements

* Add username/password authentication
* Add profile editing + photo syncing
* Expand admin dashboard (edit/delete users, analytics)
* Web app deployment (Vercel + Render)

---

## References

* Google OAuth 2.0 Docs
* OAuth 2.0 RFC 6749 / PKCE RFC 7636
* JWT.io
* Express.js, React.js, Axios, MUI

---

## Conclusion

This project demonstrates a **fully secure, modern authentication architecture** suitable for professional MERN applications. It combines real-world concepts like PKCE, JWT, CSRF tokens, and RBAC to deliver a production-ready auth flow.

Feel free to fork, extend, and use this as your project foundation!

---

## ⭐ Contributors

* **Mayengbam Devasis Singh**
* **Nikunj Jain**
