# 🎬 COMPLETE BOOKING FLOW - VISUAL GUIDE

## Scenario 1: User Creates a Booking

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         USER'S PERSPECTIVE                              │
└─────────────────────────────────────────────────────────────────────────┘

  Step 1: User opens Venues page
  ┌──────────────────────────────────────────────────┐
  │  🏟️ VENUES PAGE                                  │
  ├──────────────────────────────────────────────────┤
  │ Search: [______________________]                 │
  │                                                  │
  │ [Venue 1]      [Venue 2]      [Venue 3]          │
  │  Champions     Green Valley   Elite Sports       │
  │  $45           $50            $60                │
  │ [Book Now] →   [Book Now]     [Book Now]         │
  └──────────────────────────────────────────────────┘
        ↓ Click "Book Now"

  Step 2: Modal appears with form
  ┌──────────────────────────────────────────────────┐
  │  📅 BOOKING MODAL                                │
  ├──────────────────────────────────────────────────┤
  │  Venue: Champions Arena                          │
  │                                                  │
  │  Date: [Feb 15, 2024        ]                   │
  │  Time: [18:00               ]                   │
  │  Players: [10               ]                   │
  │                                                  │
  │  Price: $45                                      │
  │                                                  │
  │  [Cancel]     [Confirm Booking]                 │
  └──────────────────────────────────────────────────┘
        ↓ Click "Confirm Booking"
        
  Step 3: Processing
  [Booking...] (button shows loading spinner)
  
  Step 4: Success
  ✅ "Booking request sent successfully!"
  (Modal closes)
  
  Step 5: User goes to Bookings page
  ┌──────────────────────────────────────────────────┐
  │  📋 MY BOOKINGS                                  │
  ├──────────────────────────────────────────────────┤
  │  Tabs: [All ▼] [Pending ▼] [Confirmed ▼]         │
  │                                                  │
  │  ┌─────────────────────────────────────────────┐│
  │  │ Champions Arena              [⚠️ PENDING] ││
  │  │ Football                                     ││
  │  │ 📅 Feb 15  🕐 18:00  👥 10  💰 $45         ││
  │  │ 📍 Downtown Sports Complex                   ││
  │  └─────────────────────────────────────────────┘│
  │                                                  │
  │  Status: PENDING (waiting for admin approval)   │
  └──────────────────────────────────────────────────┘
  
  USER WAITS FOR ADMIN APPROVAL...


┌─────────────────────────────────────────────────────────────────────────┐
│                         ADMIN'S PERSPECTIVE                             │
└─────────────────────────────────────────────────────────────────────────┘

  Step 1: Admin logs in
  (Admin has role: "admin" in JWT token)
  
  Step 2: Admin goes to Booking Management
  ┌──────────────────────────────────────────────────┐
  │  ⚙️  BOOKING MANAGEMENT                          │
  ├──────────────────────────────────────────────────┤
  │  Filters: [All] [Pending ▼] [Confirmed] [Declined]
  │                                                  │
  │  ┌─────────────────────────────────────────────┐│
  │  │ Champions Arena   Booked by: john_doe       ││
  │  │ Football                  [⚠️ PENDING]      ││
  │  │                                              ││
  │  │ 📅 Feb 15  🕐 18:00  👥 10  💰 $45         ││
  │  │ 📍 Downtown Sports Complex                   ││
  │  │                                              ││
  │  │ [✅ APPROVE]        [❌ DECLINE]             ││
  │  └─────────────────────────────────────────────┘│
  └──────────────────────────────────────────────────┘
  
  Step 3: Admin clicks "APPROVE"
  [✅ Approving...]
  
  Step 4: Success
  ✅ "Booking Confirmed!"
  
  Step 5: Booking card updates
  ┌──────────────────────────────────────────────────┐
  │  ⚙️  BOOKING MANAGEMENT                          │
  ├──────────────────────────────────────────────────┤
  │  Filters: [All] [Pending] [Confirmed ▼] [Declined]
  │                                                  │
  │  ┌─────────────────────────────────────────────┐│
  │  │ Champions Arena   Booked by: john_doe       ││
  │  │ Football                  [✅ CONFIRMED]    ││
  │  │                                              ││
  │  │ 📅 Feb 15  🕐 18:00  👥 10  💰 $45         ││
  │  │ 📍 Downtown Sports Complex                   ││
  │  │                                              ││
  │  │ (No action buttons - already confirmed)      ││
  │  └─────────────────────────────────────────────┘│
  └──────────────────────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────────────┐
│                    USER SEES UPDATE IN REAL-TIME                        │
└─────────────────────────────────────────────────────────────────────────┘

  User's Bookings page (if still open, or refreshes when visited):
  
  BEFORE APPROVAL:
  ┌─────────────────────────────────────────────────┐
  │ Champions Arena              [⚠️ PENDING]       │
  │ 📅 Feb 15  🕐 18:00  👥 10  💰 $45            │
  │ 📍 Downtown Sports Complex                      │
  └─────────────────────────────────────────────────┘
  
  AFTER APPROVAL:
  ┌─────────────────────────────────────────────────┐
  │ Champions Arena              [✅ CONFIRMED]     │
  │ 📅 Feb 15  🕐 18:00  👥 10  💰 $45            │
  │ 📍 Downtown Sports Complex                      │
  └─────────────────────────────────────────────────┘

  ✅ Booking is now CONFIRMED!
```

---

## Backend Process Flow

```
┌──────────────────────────────────────────────────────────────────────────┐
│                         BACKEND FLOW                                     │
└──────────────────────────────────────────────────────────────────────────┘

CLIENT REQUEST (Frontend)
│
├─ POST /api/booking
│  Headers: Authorization: Bearer <jwt_token>
│  Body: { venueId, venueName, date, time, players, ... }
│
↓

BACKEND RECEIVES REQUEST
│
├─ Express Route: router.post("/booking", authGuard, bookingController.create)
│
├─ authGuard Middleware
│  ├─ Extract token from header: "Bearer xxx"
│  ├─ Verify JWT signature with JWT_SECRET
│  ├─ Decode token → req.user = { id, username, email, role }
│  ├─ If fails → Return 401 Unauthorized
│  └─ If success → Continue to next middleware
│
├─ bookingController.createBooking()
│  ├─ Get data from req.body: { venueId, venueName, date, time, players, ... }
│  ├─ Get userId from req.user.id (from decoded token)
│  ├─ Get username with fallback:
│  │  └─ req.user.username || req.user.email || "Guest User"
│  ├─ Create database record: Booking.create({
│  │  ├─ userId,
│  │  ├─ userName,
│  │  ├─ venueId,
│  │  ├─ venueName,
│  │  ├─ date,
│  │  ├─ time,
│  │  ├─ players,
│  │  ├─ status: "Pending" (default)
│  │  └─ ... other fields
│  │})
│  ├─ Save to PostgreSQL database
│  └─ Return 201 { success: true, booking: {...} }
│
↓

DATABASE (PostgreSQL)
│
├─ INSERT INTO Bookings (userId, userName, venueId, ...)
│  VALUES (5, "john_doe", 1, ...)
│
├─ Auto-generated columns:
│  ├─ id: 42
│  ├─ status: "Pending"
│  ├─ createdAt: 2024-01-28 10:30:00
│  └─ updatedAt: 2024-01-28 10:30:00
│
└─ Record saved ✅

CLIENT RECEIVES RESPONSE
│
├─ Status: 201
├─ Body: { success: true, booking: { id: 42, userId: 5, ... } }
│
└─ Frontend shows toast: "Booking request sent successfully!"
```

---

## Admin Approval Flow

```
┌──────────────────────────────────────────────────────────────────────────┐
│                    ADMIN APPROVAL FLOW                                   │
└──────────────────────────────────────────────────────────────────────────┘

INITIAL STATE: Admin loads Booking Management
│
├─ GET /api/booking
│  Headers: Authorization: Bearer <admin_jwt_token>
│
↓

BACKEND PROCESSES ADMIN REQUEST
│
├─ authGuard Middleware
│  ├─ Verify token
│  ├─ Decode → req.user = { id: 1, username: "admin_user", role: "admin" }
│  └─ Continue to next middleware
│
├─ isAdmin Middleware
│  ├─ Check req.user.role === "admin"
│  ├─ If not admin → Return 403 Forbidden
│  └─ If admin → Continue to controller
│
├─ bookingController.getAllBookings()
│  ├─ Query database: SELECT * FROM Bookings ORDER BY createdAt DESC
│  ├─ Return: { success: true, bookings: [...] }
│  └─ Frontend displays all bookings
│
↓

ADMIN CLICKS "APPROVE"
│
├─ PUT /api/booking/42/status
│  Headers: Authorization: Bearer <admin_jwt_token>
│  Body: { status: "Confirmed" }
│
↓

BACKEND PROCESSES STATUS UPDATE
│
├─ authGuard Middleware (verify admin is authenticated)
├─ isAdmin Middleware (verify admin role)
│
├─ bookingController.updateBookingStatus()
│  ├─ Extract booking id: 42
│  ├─ Extract new status: "Confirmed"
│  ├─ Update database:
│  │  └─ UPDATE Bookings SET status = "Confirmed", updatedAt = NOW()
│  │     WHERE id = 42
│  ├─ Return: { success: true, message: "Booking Confirmed" }
│
↓

DATABASE UPDATES
│
├─ Previous State:
│  ├─ id: 42
│  ├─ userId: 5
│  ├─ venueName: "Champions Arena"
│  └─ status: "Pending"
│
├─ New State:
│  ├─ id: 42
│  ├─ userId: 5
│  ├─ venueName: "Champions Arena"
│  ├─ status: "Confirmed"  ← CHANGED
│  └─ updatedAt: 2024-01-28 10:45:00  ← UPDATED
│
└─ Database saves ✅

CLIENT SEES UPDATE
│
├─ Frontend gets success response
├─ Toast: "Booking Confirmed!"
├─ Updates local state
├─ Booking card changes:
│  ├─ Status badge: "⚠️ PENDING" → "✅ CONFIRMED"
│  ├─ Buttons: [APPROVE] [DECLINE] → (removed)
│  └─ Card color updates
│
└─ UI refreshed ✅

USER SEES CHANGE
│
├─ User's Bookings page (when visited/refreshed)
├─ Calls GET /api/booking/user
│  ├─ Backend queries: SELECT * FROM Bookings WHERE userId = 5
│  ├─ Returns updated bookings
│  └─ Includes booking with status "Confirmed"
│
├─ User sees:
│  ├─ Status changed from "Pending" → "Confirmed"
│  └─ Date/time are locked in for the booking
│
└─ Complete! ✅
```

---

## Error Scenario Example

```
USER TRIES TO BOOK WITHOUT JWT TOKEN
│
├─ POST /api/booking
│  Headers: (no Authorization header)
│  Body: { venueId, venueName, date, time, ... }
│
↓

BACKEND
│
├─ authGuard Middleware
│  ├─ Check authHeader: req.headers.authorization
│  ├─ If not found → Return 401
│  └─ Response: { success: false, message: "Authorization token missing" }
│
↓

FRONTEND
│
├─ Catch error in createBooking()
├─ Get error response: 401
├─ Toast Error: "Authorization token missing"
├─ Modal stays open
└─ User can try again with login

SOLUTION: User must login first to get JWT token
```

---

## Data Transformation Example

```
FRONTEND SENDS:
{
  "date": "2024-02-15",
  "time": "18:00",
  "players": 10,
  "venueId": 1,
  "venueName": "Champions Arena",
  "location": "Downtown Sports Complex",
  "type": "Football",
  "price": "$45"
}

↓ BACKEND RECEIVES & ADDS FROM TOKEN:

{
  "date": "2024-02-15",
  "time": "18:00",
  "players": 10,
  "venueId": 1,
  "venueName": "Champions Arena",
  "location": "Downtown Sports Complex",
  "type": "Football",
  "price": "$45",
  "userId": 5,              ← FROM TOKEN
  "userName": "john_doe",   ← FROM TOKEN (or fallback)
  "status": "Pending"       ← DEFAULT VALUE
}

↓ SAVED TO DATABASE:

{
  "id": 42,                                      ← AUTO-GENERATED
  "date": "2024-02-15",
  "time": "18:00",
  "players": 10,
  "venueId": 1,
  "venueName": "Champions Arena",
  "location": "Downtown Sports Complex",
  "type": "Football",
  "price": "$45",
  "userId": 5,
  "userName": "john_doe",
  "status": "Pending",
  "createdAt": "2024-01-28T10:30:00.000Z",     ← AUTO-GENERATED
  "updatedAt": "2024-01-28T10:30:00.000Z"      ← AUTO-GENERATED
}
```

---

## Token Journey

```
LOGIN RESPONSE (From Backend)
│
├─ User provides email + password
├─ Backend verifies credentials
├─ Creates JWT token:
│  {
│    "id": 5,
│    "username": "john_doe",
│    "email": "john@example.com",
│    "role": "user"
│  }
│
└─ Returns token to frontend

FRONTEND STORES TOKEN
│
└─ localStorage.setItem('token', response.data.token)

EVERY API REQUEST
│
├─ Axios Interceptor runs
├─ Gets token: const token = localStorage.getItem('token')
├─ Adds to headers: Authorization: Bearer <token>
│
└─ Request sent with auth header

BACKEND RECEIVES REQUEST
│
├─ authGuard middleware extracts token
├─ Verifies JWT signature: jwt.verify(token, JWT_SECRET)
├─ Decodes token → req.user populated
│
└─ Controller accesses req.user data

EXAMPLE: createBooking
│
└─ Uses req.user.id to attach userId to booking
   (User cannot spoof another user's ID)
```

---

**FLOW COMPLETE! The system handles:**
- ✅ Creating bookings
- ✅ Viewing user bookings
- ✅ Admin viewing all bookings
- ✅ Admin approving/declining
- ✅ Real-time updates
- ✅ Error handling
- ✅ Security with JWT

**Everything is fully integrated!** 🎉
