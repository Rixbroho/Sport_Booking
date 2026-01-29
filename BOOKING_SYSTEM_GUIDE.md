# Complete Sport Venue Booking System

## Project Structure

```
Backend/
├── models/
│   └── bookingModel.js
├── controllers/
│   └── bookingController.js
├── routes/
│   └── bookingRoute.js
└── index.js (with booking route registration)

Frontend/
├── src/
│   ├── services/
│   │   └── api.js (with booking endpoints)
│   └── pages/
│       ├── users/
│       │   ├── Venues.jsx (with booking modal)
│       │   └── Bookings.jsx (user booking view)
│       └── admin/
│           └── UserBookingSetting.jsx (admin booking management)
```

## Backend Implementation

### 1. Booking Model (bookingModel.js)
```javascript
const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/db"); 

const Booking = sequelize.define("Booking", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  userName: { type: DataTypes.STRING, allowNull: false },
  venueId: { type: DataTypes.INTEGER, allowNull: false },
  venueName: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING },
  type: { type: DataTypes.STRING }, 
  date: { type: DataTypes.STRING, allowNull: false },
  time: { type: DataTypes.STRING, allowNull: false },
  players: { type: DataTypes.INTEGER },
  price: { type: DataTypes.STRING },
  status: { 
    type: DataTypes.ENUM("Pending", "Confirmed", "Declined"), 
    defaultValue: "Pending" 
  }
});

module.exports = Booking;
```

### 2. Booking Controller (bookingController.js)
```javascript
const Booking = require("../models/bookingModel");

exports.createBooking = async (req, res) => {
  try {
    console.log("Token Data:", req.user);
    const newBooking = await Booking.create({
      ...req.body,
      userId: req.user.id,
      userName: req.user.username || req.user.email || "Guest User",
      status: "Pending"
    });
    res.status(201).json({ success: true, booking: newBooking });
  } catch (error) {
    console.error("Booking Create Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({ order: [['createdAt', 'DESC']] });
    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({ 
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']]
    });
    res.json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    await Booking.update({ status }, { where: { id } });
    res.json({ success: true, message: `Booking ${status}` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
```

### 3. Booking Routes (bookingRoute.js)
```javascript
const router = require("express").Router();
const bookingController = require("../controllers/bookingController");
const authGuard = require("../helpers/authguagrd");
const isAdmin = require("../helpers/isAdmin");

// User routes
router.post("/booking", authGuard, bookingController.createBooking);
router.get("/booking/user", authGuard, bookingController.getUserBookings);

// Admin routes
router.get("/booking", authGuard, isAdmin, bookingController.getAllBookings);
router.put("/booking/:id/status", authGuard, isAdmin, bookingController.updateBookingStatus);

module.exports = router;
```

### 4. Backend Server Setup (index.js)
```javascript
const express = require('express');
const { sequelize, connectDB } = require('./database/db');
const app = express();
const port = 3000;
const bookingRoutes = require("./routes/bookingRoute");

const cors = require('cors');
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true
}));

app.use(express.json());
app.use('/api/user/', require('./routes/route'));
app.use('/api', require('./routes/venueRoute'));
app.use("/api", bookingRoutes);  // Booking routes at /api

app.get('/', (req, res) => {
    res.json({message: 'Welcome to the Home Page'});
});

const startServer = async () => {
    await connectDB();
    await sequelize.sync({ alter: true }); 
    
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

startServer();
```

## Frontend Implementation

### 1. API Service (api.js)
```javascript
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ... other API endpoints ...

// Booking API calls
export const createBooking = (bookingData) =>
  API.post("/booking", bookingData);

export const getUserBookings = () =>
  API.get("/booking/user");

export const getAllBookings = () =>
  API.get("/booking");

export const updateBookingStatus = (id, status) =>
  API.put(`/booking/${id}/status`, { status });

export default API;
```

### 2. Venues Component (Venues.jsx)
- Features:
  - Display list of venues
  - Search functionality
  - Booking modal with date, time, and player selection
  - Integrates with createBooking API
  - Loading and error states

### 3. User Bookings Component (Bookings.jsx)
- Features:
  - Display user's bookings
  - Filter by status (All, Pending, Confirmed)
  - Show booking details (date, time, players, location, price)
  - Status indicators with color coding
  - Responsive grid layout

### 4. Admin Booking Management (UserBookingSetting.jsx)
- Features:
  - Display all bookings for admin review
  - Filter by status (All, Pending, Confirmed, Declined)
  - Approve or Decline buttons for pending bookings
  - Real-time status updates
  - User information display
  - Responsive design

## API Endpoints Summary

### User Endpoints
- **POST** `/api/booking` - Create booking (requires auth)
- **GET** `/api/booking/user` - Get user's bookings (requires auth)

### Admin Endpoints
- **GET** `/api/booking` - Get all bookings (requires auth + admin)
- **PUT** `/api/booking/:id/status` - Update booking status (requires auth + admin)

## Key Features

✅ **User Features:**
- Browse venues with search
- Create booking with date, time, and player count
- View personal bookings
- Filter bookings by status
- Real-time status updates

✅ **Admin Features:**
- View all user bookings
- Approve or decline pending bookings
- Filter bookings by status
- See booking details and user information

✅ **Data Validation:**
- Required fields validation
- Status ENUM enforcement
- User authentication via JWT token
- Role-based access control

✅ **Error Handling:**
- Fallback username logic (if missing from token, uses email)
- Proper error messages
- Toast notifications for user feedback

## Testing the System

### 1. Start Backend
```bash
cd Backend
npm start
```

### 2. Start Frontend
```bash
cd frontend
npm run dev
```

### 3. Create a Test Booking
1. Navigate to Venues page
2. Click "Book Now" on any venue
3. Fill in date, time, and players
4. Click "Confirm Booking"
5. Check Bookings page - should show as "Pending"

### 4. Admin Approval
1. Login as admin
2. Go to Booking Management
3. Find the pending booking
4. Click "Approve" or "Decline"
5. Check user's bookings - status should update

## Important Notes

⚠️ **Sequelize Sync:**
- Database tables are auto-created with `sequelize.sync()`
- Use `force: true` if you need to reset tables (destructive)
- Use `alter: true` for safe migrations

⚠️ **Auth Middleware:**
- Filename is `authguagrd.js` (note the typo)
- Attaches decoded token to `req.user`
- Contains userId, username, email, role

⚠️ **Token Format:**
- Token stored in `localStorage.getItem('token')`
- Sent as `Authorization: Bearer <token>`
- Must include user ID and username in payload

## Troubleshooting

**Bookings show as empty:**
- Check if booking route is registered in `index.js`
- Verify auth token is in localStorage
- Check browser console for API errors

**Cannot approve/decline bookings:**
- Verify user is logged in as admin (role: 'admin')
- Check that isAdmin middleware is applied
- Check booking ID is correct

**Username shows as "Guest User":**
- Check JWT token structure contains `username` or `email`
- Verify authguard middleware decodes token correctly
