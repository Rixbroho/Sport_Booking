# Sport Venue Booking System - Quick Reference

## ✅ Complete System Implementation Checklist

### Backend Files (All ✅ Ready)

#### 1. **Database Model** - `Backend/models/bookingModel.js`
- ✅ User ID, Name tracking
- ✅ Venue ID, Name, Location, Type tracking
- ✅ Date, Time, Players tracking
- ✅ Price and Status ENUM (Pending, Confirmed, Declined)
- ✅ Timestamps auto-included

#### 2. **Controller** - `Backend/controllers/bookingController.js`
- ✅ `createBooking` - Creates booking with fallback username logic
- ✅ `getUserBookings` - Fetches user's own bookings
- ✅ `getAllBookings` - Admin endpoint for all bookings
- ✅ `updateBookingStatus` - Admin approval/decline

#### 3. **Routes** - `Backend/routes/bookingRoute.js`
- ✅ POST `/booking` - User creates booking (auth required)
- ✅ GET `/booking/user` - User views own bookings (auth required)
- ✅ GET `/booking` - Admin views all bookings (auth + admin required)
- ✅ PUT `/booking/:id/status` - Admin updates status (auth + admin required)

#### 4. **Server Setup** - `Backend/index.js`
- ✅ Booking route registered: `app.use("/api", bookingRoutes)`
- ✅ CORS configured for frontend
- ✅ Database sync on startup

#### 5. **Middleware** - `Backend/helpers/`
- ✅ `authguagrd.js` - JWT token verification (creates req.user)
- ✅ `isAdmin.js` - Role-based access control

---

### Frontend Files (All ✅ Ready)

#### 1. **API Service** - `frontend/src/services/api.js`
- ✅ Base URL: `http://localhost:3000/api`
- ✅ JWT interceptor for all requests
- ✅ `createBooking(data)` - POST /booking
- ✅ `getUserBookings()` - GET /booking/user
- ✅ `getAllBookings()` - GET /booking
- ✅ `updateBookingStatus(id, status)` - PUT /booking/:id/status

#### 2. **Venues Page** - `frontend/src/pages/users/Venues.jsx`
- ✅ Venue listing with search
- ✅ Booking modal with form
- ✅ Date/Time/Players input fields
- ✅ Form validation
- ✅ Success/Error toast notifications
- ✅ Loading states

#### 3. **User Bookings Page** - `frontend/src/pages/users/Bookings.jsx`
- ✅ Fetch user bookings on load
- ✅ Tab filtering (All, Pending, Confirmed)
- ✅ Status indicators with icons
- ✅ Booking details display
- ✅ Responsive card layout
- ✅ Empty state handling

#### 4. **Admin Booking Management** - `frontend/src/pages/admin/UserBookingSetting.jsx`
- ✅ Fetch all bookings on load
- ✅ Filter tabs (All, Pending, Confirmed, Declined)
- ✅ Approve/Decline buttons for pending
- ✅ Real-time status updates
- ✅ Loading/disabled states during updates
- ✅ User info display
- ✅ Responsive card layout

---

## 🚀 How to Test the Complete System

### Step 1: Start the Backend
```bash
cd "C:\Users\aiden\Desktop\sport booking app final\Sport_Booking\Backend"
npm start
```
Expected output:
```
PostgreSQL connected successfully.
Server is running on port 3000
```

### Step 2: Start the Frontend
```bash
cd "C:\Users\aiden\Desktop\sport booking app final\Sport_Booking\frontend"
npm run dev
```
Expected output:
```
VITE v... ready in ... ms
➜  Local:   http://localhost:5173/
```

### Step 3: Test User Booking Flow
1. **Login as User** (not admin)
2. **Go to Venues Page**
3. **Click "Book Now"** on any venue
4. **Fill the Modal:**
   - Select Date: Any future date
   - Select Time: Any time
   - Enter Players: 5-20
   - Click "Confirm Booking"
5. **Expected Result:**
   - Toast: "Booking request sent successfully!"
   - Modal closes
   - Booking appears as "Pending" in Bookings page

### Step 4: Test Admin Approval Flow
1. **Login as Admin** (role: 'admin')
2. **Go to Booking Management** (UserBookingSetting)
3. **See the pending booking** from Step 3
4. **Click "Approve"** button
5. **Expected Result:**
   - Toast: "Booking Confirmed!"
   - Status changes to "Confirmed"
   - Approve/Decline buttons disappear
6. **Go back to user account** and check Bookings page
7. **Booking should show as "Confirmed"**

---

## 📋 Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    USER WORKFLOW                             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Venues.jsx ─→ Modal Form ─→ API (createBooking)           │
│                                ↓                             │
│                        Backend POST /booking                 │
│                        (saves to DB)                         │
│                                ↓                             │
│  Bookings.jsx ←──── API (getUserBookings) ←── DB Query     │
│  (shows as Pending)                                          │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                   ADMIN WORKFLOW                             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  UserBookingSetting.jsx ← API (getAllBookings)             │
│       (shows pending)           ↓                            │
│           ↓                Backend GET /booking              │
│         Click Approve/Decline    ↓                           │
│           ↓             DB Query for all                    │
│    API (updateBookingStatus)                               │
│           ↓                                                  │
│  Backend PUT /booking/:id/status                            │
│           ↓                                                  │
│      Updates DB (status)                                    │
│           ↓                                                  │
│      Refreshes Component ← Status Changed                  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔐 Authentication Flow

```
Login Page
    ↓
localStorage.setItem('token', response.data.token)
    ↓
API Interceptor adds: Authorization: Bearer <token>
    ↓
Backend authGuard middleware:
  - Extracts token from header
  - Verifies JWT signature
  - Decodes and attaches to req.user
    ↓
isAdmin middleware (for admin routes):
  - Checks if req.user.role === 'admin'
  - Returns 403 if not admin
```

---

## 📊 Database Schema

```
Bookings Table:
├── id (INTEGER, PRIMARY KEY)
├── userId (INTEGER, NOT NULL)
├── userName (STRING, NOT NULL)
├── venueId (INTEGER, NOT NULL)
├── venueName (STRING, NOT NULL)
├── location (STRING)
├── type (STRING)
├── date (STRING, NOT NULL)
├── time (STRING, NOT NULL)
├── players (INTEGER)
├── price (STRING)
├── status (ENUM: Pending, Confirmed, Declined)
├── createdAt (TIMESTAMP)
└── updatedAt (TIMESTAMP)
```

---

## 🛠️ API Endpoints Reference

| Method | Endpoint | Auth | Admin | Purpose |
|--------|----------|------|-------|---------|
| POST | /api/booking | ✅ | ❌ | Create booking |
| GET | /api/booking/user | ✅ | ❌ | Get user's bookings |
| GET | /api/booking | ✅ | ✅ | Get all bookings |
| PUT | /api/booking/:id/status | ✅ | ✅ | Update status |

---

## ⚠️ Common Issues & Solutions

### Issue: "Booking shows as 'Guest User'"
**Cause:** JWT token doesn't contain `username`
**Solution:** Ensure login returns username in token payload

### Issue: "Cannot see approve button"
**Cause:** Not logged in as admin
**Solution:** User must have `role: 'admin'` in JWT token

### Issue: "404 Not Found on /booking endpoints"
**Cause:** Routes not registered in index.js
**Solution:** Check that `app.use("/api", bookingRoutes)` exists

### Issue: "CORS errors"
**Cause:** Frontend URL not in CORS whitelist
**Solution:** Check Backend/index.js cors origin includes `http://localhost:5173`

---

## 📝 Component Props

### Venues.jsx
```javascript
Props: {
  user: { id, username, email, role },
  onLogout: function,
  setCurrentPage: function
}
```

### Bookings.jsx
```javascript
Props: {
  user: { id, username, email, role },
  onLogout: function,
  setCurrentPage: function
}
```

### UserBookingSetting.jsx
```javascript
Props: {
  user: { id, username, email, role },
  onLogout: function,
  setCurrentPage: function
}
```

---

## ✨ Features Implemented

- ✅ User can create booking requests
- ✅ Users can view their own bookings only
- ✅ Admin can view all bookings
- ✅ Admin can approve/decline pending bookings
- ✅ Real-time status updates
- ✅ Form validation
- ✅ Toast notifications
- ✅ Loading states
- ✅ Responsive design
- ✅ Filter/Search functionality
- ✅ JWT authentication
- ✅ Role-based access control
- ✅ Error handling

---

**Ready to deploy!** All files are complete and integrated. 🎉


