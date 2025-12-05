# Warmnest 🌿
**Mental Health Appointment & Therapy Platform**

Warmnest is an industry-grade web application built with **Next.js (App Router) + TypeScript + MongoDB + NextAuth**, supporting:
- Google OAuth
- Email/Password authentication (hashed with bcrypt)
- User database
- Profile picture upload (Cloudinary)
- Responsive UI with branding
- Secure authentication & session handling
- Ready foundation for Booking, Payments, Admin panel

---

## 🚀 Tech Stack
- **Frontend:** Next.js 16, React, TypeScript, CSS Modules, Chakra UI (Navbar)
- **Backend:** Next.js API routes
- **Auth:** NextAuth.js
- **Database:** MongoDB Atlas + Mongoose
- **Password hashing:** bcryptjs
- **Image upload:** Cloudinary
- **Hosting-ready:** Vercel supported

---

## 📂 Folder Structure
```
app/
 ├── api/
 │   ├── auth/
 │   │   ├── [...nextauth]/route.ts   # Google + Credentials auth
 │   │   ├── register/route.ts        # Email registration
 │   ├── upload/route.ts              # Image upload to Cloudinary
 ├── login/page.tsx
 ├── register/page.tsx
 ├── user/page.tsx
 ├── components/Navbar.tsx
 ├── globals.css
 ├── providers.tsx
lib/
 ├── db.ts                            # MongoDB connect
models/
 ├── User.ts                          # User schema
public/
 ├── logo.png
```

---

## 🔐 Authentication Features

### Google Login
- OAuth via Google provider
- Saves user to DB on first sign-in

### Email + Password Login
- Registration API with bcrypt hashing
- Credentials authentication using NextAuth
- Login validates against MongoDB

### User Storage
MongoDB User Schema:
```
name
email
password (hashed)
image
provider
createdAt
updatedAt
```

---

## ✅ Environment Variables

Create `.env.local`:

```
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key

MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/warmnest

CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx
```

---

## ⚙️ Setup Instructions

### 1. Install Dependencies
```
npm install
npm install mongoose bcryptjs next-auth cloudinary
```

### 2. Run Server
```
npm run dev
```

### 3. MongoDB Setup
- Go to MongoDB Atlas
- Allow IP access (0.0.0.0/0)
- Create database user
- Collections auto-create on insert

---

## 🧪 Test Flow

### Register User:
```
/register
```
➡ Saves user in MongoDB with hashed password

### Login
```
/login
```
✅ Google login  
✅ Email/password login

### User page
```
/user
```
- Shows profile
- Navbar displays username & avatar
- Protected route

---

## 🧠 Notable Implementation

### Password hashing (register API)
```ts
const hashed = await bcrypt.hash(password, 10);
```

### Credentials verification
```ts
const valid = await bcrypt.compare(password, user.password);
```

### First-time Google insert
```ts
if (!exists) User.create({...})
```

---

## 🚧 Planned Features
- Appointment Booking system
- Payment gateway (Razorpay / Stripe)
- Admin dashboard
- Email notifications
- User profile editing
- Forgot password

---

## 💚 Author
Built with care by Warmnest (Harini Rajam)

---

## 🎯 License
Free for personal & educational use.
# Warmnest
