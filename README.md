# Public Infrastructure Issue Reporting System

**(B12-A11_category-06)**

A full-stack web application that enables citizens to report public infrastructure issues and allows government authorities to manage, track, and resolve those issues efficiently.

---

## 🌐 Live Website

🔗 **Live Site URL:** https://sdp-piirs.web.app

---

## 🔐 Admin Credentials (For Testing)

- **Admin Email:** admin@gmail.com
- **Admin Password:** 123456

---

## 👥 Demo User Credentials

### 🧑‍🔧 Staff

- **Email:** rakib@gmail.com
- **Password:** 123456
  > This staff already has assigned issues and is actively working on them.

### 🧑 Citizen

- **Email:** nusrat@gmail.com
- **Password:** 123456
  > This user is **premium** and has already reported **6 issues**.

---

## 📌 Project Description

Municipal services often suffer from delayed responses, lack of transparency, and poor tracking systems.  
The **Public Infrastructure Issue Reporting System** provides a centralized digital solution where:

- Citizens can report real-world public issues
- Admins can manage and assign issues
- Staff can update progress and resolve problems
- Everyone can track issue status transparently

---

## 🚀 Key Features

- Citizens can report issues with title, description, image, and location
- Role-based system with **Admin**, **Citizen**, and **Staff**
- Issue lifecycle tracking: **Pending → In-Progress → Resolved → Closed**
- Real-time issue status updates with timeline history
- Upvote system to highlight important public issues
- Boost issue priority through secure payment
- Premium subscription for unlimited issue reporting
- Admin dashboard with analytics, charts, and reports
- Staff dashboard for assigned issue management only
- Secure authentication (Email/Password + Google Login)
- Fully responsive design (Mobile, Tablet, Desktop)

---

## 🏠 Home Page Features

- Responsive Navbar with user profile dropdown
- Attractive banner/slider section
- Latest resolved issues section (minimum 6)
- Feature highlights & how-it-works section
- Additional custom sections
- Footer with relevant links
- Custom 404 Not Found page

---

## 📋 All Issues Page

- Card-based issue listing
- Displays image, title, category, status, priority, location
- Upvote button with live count
- View details button
- Server-side pagination
- Server-side search & filtering (category, status, priority)
- Boosted issues appear above normal issues

---

## 🔍 Issue Details Page (Private Route)

- Full issue information with rich UI
- Edit/Delete issue (only for owner & pending status)
- Boost issue priority with payment (100 TK)
- Assigned staff details (if available)
- Complete **read-only timeline** of issue lifecycle
- Vertical timeline UI with colored status badges

---

## 🧭 Issue Timeline & Tracking

Each important action creates a timeline entry:

- Issue creation
- Staff assignment
- Status updates
- Boost payment
- Issue resolution
- Issue closure

Timeline shows:

- Status
- Message
- Updated by (Admin / Staff / Citizen)
- Date & time

---

## 👤 Citizen Dashboard (Private)

- Dashboard overview with stats & charts
- My Issues page with filters
- Report Issue form
- Edit/Delete pending issues
- Free users: max **3 issues**
- Premium users: **unlimited issues**
- Profile page with subscription & warning if blocked

---

## 🧑‍🔧 Staff Dashboard (Private)

- Assigned issues only
- Status update workflow
- Priority-based issue ordering
- Progress tracking
- Profile management

---

## 🛠 Admin Dashboard (Private)

- System overview with analytics
- Manage all issues
- Assign staff (one-time assignment only)
- Reject pending issues
- Manage citizens (block/unblock)
- Manage staff (add/update/delete)
- View all payments
- Downloadable invoice PDF
- Admin profile management

---

## 🔐 Authentication & Security

- Firebase Authentication
- JWT-based token verification
- Role-based route protection
- Private routes persist after page refresh
- Environment variables used for Firebase & MongoDB secrets

---

## 🎯 Optional Features Implemented

- Axios interceptors
- Animations using Framer Motion

---

## 🛠 Technologies Used

### Client

- React
- Tailwind CSS / DaisyUI
- TanStack Query
- Axios
- Firebase Authentication
- React Hook Form
- Framer Motion
- React PDF

### Server

- Node.js
- Express.js
- MongoDB
- JWT
- Stripe Payment Gateway

---

## 📦 GitHub Repositories

- **Client Repo:** https://github.com/SuvraDebPaul/Public-Infrastructure-Issue-Reporting-System---Frontend
- **Server Repo:** https://github.com/SuvraDebPaul/Public-Infrastructure-Issue-Reporting-System---Backend

---

## 📌 Additional Notes

- Images hosted on external image hosting services
- No Lorem Ipsum text used
- Sweet Alert / Toast notifications used for all actions
- Deployed client and server separately
- Fully responsive dashboards

---

✨ **Thank you for reviewing this project!**  
This system was built with a strong focus on usability, transparency, and real-world problem-solving.
