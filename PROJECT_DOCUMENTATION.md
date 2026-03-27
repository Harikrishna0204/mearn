# 🎬 SubTracker - Subscription Management App
## Complete Project Documentation

---

## 📋 **PROJECT OVERVIEW**

**SubTracker** is a full-stack subscription management application that helps users track their streaming service subscriptions, manage renewal dates, and quickly access platforms with a single click.

### **Technology Stack**
- **Frontend**: React.js, Axios
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JWT (JSON Web Tokens), bcryptjs
- **Database**: MongoDB (Atlas or Local)

---

## 🎯 **KEY FEATURES**

### ✅ **1. User Authentication**
- **Register**: Create new account with name, email, password
- **Login**: Secure JWT-based authentication
- **Logout**: Clear session and return to login
- Password hashing with bcryptjs
- Input validation on both frontend and backend

### ✅ **2. Subscription Management**
- **Add Subscriptions**: Select platforms and renewal dates
- **View All Subscriptions**: Grid display with cards
- **Delete Subscriptions**: Remove with confirmation
- **Track Renewal**: Shows days until renewal with color coding
  - 🟢 Green: More than 3 days
  - 🟠 Orange: 1-3 days left
  - 🟡 Yellow: Today
  - 🔴 Red: Expired

### ✅ **3. Platform Integration**
- **One-Click Access**: Click any subscription card to open platform
- **8 Pre-loaded Platforms**:
  - Netflix (https://www.netflix.com)
  - Spotify (https://www.spotify.com)
  - Amazon Prime Video (https://www.primevideo.com)
  - Disney+ Hotstar (https://www.hotstar.com)
  - Apple Music (https://music.apple.com)
  - HBO Max (https://www.hbomax.com)
  - YouTube Premium (https://www.youtube.com/premium)
  - Microsoft Game Pass (https://gamepass.com)

### ✅ **4. User Interface**
- **Responsive Design**: Works on desktop and tablet
- **Beautiful Dark Theme**: Animated gradient background
- **Smooth Animations**: Hover effects on cards
- **Sidebar Navigation**: Easy page switching
- **Loading States**: Visual feedback during operations

---

## 🗂️ **PROJECT STRUCTURE**

```
subscription-app/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Login/Register logic
│   │   └── subscriptionController.js # Subscription CRUD
│   ├── middleware/
│   │   └── auth.js               # JWT verification
│   ├── models/
│   │   ├── User.js               # User schema
│   │   └── Subscription.js       # Subscription schema
│   ├── routes/
│   │   ├── authRoutes.js         # Auth endpoints
│   │   └── subscriptionRoutes.js # Subscription endpoints
│   ├── server.js                 # Main server file
│   ├── package.json
│   └── .env                      # Environment variables
│
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.js          # Login page
│   │   │   ├── Login.css
│   │   │   ├── Register.js       # Register page
│   │   │   ├── Dashboard.js      # Dashboard page
│   │   │   ├── Dashboard.css
│   │   │   └── Subscriptions.js  # Subscriptions page
│   │   ├── App.js                # Main routing
│   │   ├── App.css
│   │   ├── index.js              # React entry point
│   │   ├── index.css
│   │   └── reportWebVitals.js
│   ├── package.json
│   └── .env                      # Frontend config
│
└── PROJECT_DOCUMENTATION.md

```

---

## 🚀 **HOW TO RUN THE PROJECT**

### **STEP 1: Start Backend Server**
```bash
cd backend
npm start
# Server runs on http://localhost:5000
```

### **STEP 2: Start Frontend Server**
```bash
cd frontend
npm start
# App runs on http://localhost:3000
```

### **STEP 3: Access the App**
- Open browser: `http://localhost:3000`
- Register a new account
- Login with your credentials

---

## 📡 **API ENDPOINTS**

### **Authentication Routes** (`/api/auth`)
```
POST /register
  Body: { name, email, password }
  Response: { message: "User registered successfully" }

POST /login
  Body: { email, password }
  Response: { token, user: { id, name, email } }
```

### **Subscription Routes** (`/api/subscriptions`)
```
GET /
  Response: [{ _id, name, price, url, image, renewalDate, ... }]

POST /
  Body: { name, price, url, image, renewalDate, planType }
  Response: { _id, name, price, url, ... }

DELETE /:id
  Response: { message: "Deleted" }
```

---

## 🗄️ **DATABASE SCHEMA**

### **User Model**
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date
}
```

### **Subscription Model**
```javascript
{
  name: String,              // Netflix, Spotify, etc.
  price: Number,             // Monthly price
  planType: String,          // Standard, Premium, etc.
  renewalDate: Date,         // When subscription renews
  image: String,             // Platform logo URL
  url: String,               // Platform website URL
  createdAt: Date
}
```

---

## 🔑 **ENVIRONMENT VARIABLES**

### **Backend (.env)**
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/subtracker
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

### **Frontend (.env)**
```
REACT_APP_API_URL=http://localhost:5000
```

---

## 🧪 **TEST WORKFLOW**

### **1. Register New Account**
- Go to `/register`
- Fill in: Name, Email, Password (min 6 chars)
- Click Register
- Redirected to Login page

### **2. Login**
- Enter Email and Password
- Click Login
- Redirected to Dashboard

### **3. Add Subscription**
- Go to Subscriptions page
- Select Platform (Netflix, Spotify, etc.)
- Choose Renewal Date
- Click Add
- Card appears in grid

### **4. Click Subscription Card**
- Click on any subscription card
- Platform opens in new tab 🌐
- Netflix, Spotify, etc. loaded in browser

### **5. Delete Subscription**
- Click Delete button on card
- Confirmation dialog appears
- Subscription removed from list

### **6. Logout**
- Click Logout in sidebar
- Session cleared
- Redirected to Login page

---

## 💡 **KEY IMPLEMENTATION DETAILS**

### **Token Storage**
- JWT token stored in localStorage
- Persists across page refreshes
- Auto-logout if token expires

### **Platform URLs**
- No URLs lost when page refreshes
- Stored in MongoDB
- Fallback mechanism (search platform list)
- Error handling if URL missing

### **Click Handling**
- Card click opens platform
- Delete button uses `event.stopPropagation()`
- Prevents card click when deleting

### **Date Calculation**
- Shows days until renewal
- Color-coded status display
- Handles expired subscriptions

---

## 🎨 **UI/UX FEATURES**

### **Color Scheme**
- Primary: #6c63ff (Purple)
- Background: Dark gradient
- Accent: Green/Orange/Red for status

### **Animations**
- Card hover: Scale + Glow effect
- Button hover: Scale + Shadow effect
- Smooth transitions (0.3s)

### **Responsive Design**
- Desktop: Full sidebar + content
- Tablet: Adjusted grid
- Mobile: Simplified layout

---

## 🔒 **SECURITY FEATURES**

- ✅ Password hashing with bcryptjs (10 salt rounds)
- ✅ JWT authentication on protected routes
- ✅ CORS protection enabled
- ✅ Email validation and unique constraint
- ✅ Input sanitization (.trim())
- ✅ Error messages don't expose sensitive info

---

## 🐛 **DEBUGGING TIPS**

### **Check Browser Console (F12)**
- Look for debug logs like:
  ```
  📤 Sending subscription data: {...}
  ✅ Backend response: {...}
  🖱️ CARD CLICKED! URL: https://www.netflix.com
  ```

### **Check Backend Logs**
- MongoDB connection status
- API request logs
- Error messages

### **Common Issues**
1. **Register not working**: Check `/register` route exists in App.js
2. **Platform not opening**: Check URL field in database
3. **Login fails**: Verify credentials are correct
4. **Subscriptions don't load**: Check MongoDB connection

---

## 📊 **FEATURE CHECKLIST**

- ✅ User Registration
- ✅ User Login/Logout
- ✅ JWT Authentication
- ✅ Add Subscriptions
- ✅ View All Subscriptions
- ✅ Delete Subscriptions
- ✅ Days Until Renewal
- ✅ One-Click Platform Access
- ✅ Beautiful UI with Animations
- ✅ Responsive Design
- ✅ Error Handling
- ✅ Input Validation
- ✅ Debug Logging

---

## 🎯 **PROJECT STATUS: ✅ COMPLETE & RUNNING**

All core features implemented and tested!

- Backend: ✅ Running on Port 5000
- Frontend: ✅ Running on Port 3000
- Database: ✅ Connected
- Authentication: ✅ Working
- Subscriptions: ✅ Working
- Platform Opening: ✅ Working

---

## 📝 **NOTES**

- Default price for subscriptions: ₹100/month
- Default plan type: Standard
- All timestamps stored in UTC
- Database indexed by email (for faster user lookup)

---

## 🚀 **FUTURE ENHANCEMENTS**

- 💡 Add to mobile app view
- 💡 Send expiry reminders (email/SMS)
- 💡 Monthly spending chart
- 💡 Subscription sharing between users
- 💡 Edit subscription details
- 💡 Calendar view of renewals
- 💡 Payment integration
- 💡 Export subscription list

---

**Created**: March 24, 2026  
**Version**: 1.0.0  
**Status**: Production Ready ✅
