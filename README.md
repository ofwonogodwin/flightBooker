# Flight Booking System

This is a complete flight booking website built with React frontend and Node.js/Express backend, featuring Uganda and East Africa routes.

## Features

### Simple GuideLine
- **Homepage**: Search form for flights with origin, destination, date, and passenger count
- **Search Results**: Display available flights with details and pricing
- **Booking Page**: Passenger information form and booking confirmation
- **Confirmation Page**: Complete booking details and printable confirmation
- **Responsive Design**: Clean, modern UI that works on all devices

### Backend (Node.js + Express)
- **Flight API**: Search and retrieve flight information
- **Booking API**: Create and manage flight bookings
- **Sample Data**: Pre-loaded Uganda routes (Entebbe-Kampala, Entebbe-Nairobi)
- **In-Memory Storage**: Temporary booking storage for demo purposes
## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation & Setup

1. **Clone or navigate to the project directory:**
   ```bash
   cd /home/godwin-ofwono/Desktop/flightSystem
   ```

2. **Set up the Backend:**
   ```bash
   cd backend
   npm install
   npm start
   ```
   
   The backend server will start on `http://localhost:5000`

3. **Set up the Frontend (in a new terminal):**
   ```bash
   cd frontend
   npm install
   npm start
   ```
   
   The frontend will start on `http://localhost:3000`

### Usage

1. **Homepage**: Visit `http://localhost:3000` to access the flight search form
2. **Search Flights**: Select origin, destination, date, and number of passengers
3. **View Results**: Browse available flights with prices and details
4. **Book Flight**: Click "Book Now" and fill in passenger information
5. **Confirmation**: Receive booking confirmation with unique booking ID

## API Endpoints

### Backend API (`http://localhost:5000/api`)

- `GET /flights` - Get all flights or search with query parameters
- `GET /flights/:id` - Get specific flight by ID
- `POST /bookings` - Create a new booking
- `GET /bookings` - Get all bookings
- `GET /bookings/:bookingId` - Get specific booking by ID
- `GET /health` - Health check endpoint

### Sample API Usage

**Search flights:**
```
GET /api/flights?origin=Entebbe&destination=Kampala&date=2025-09-15
```

**Create booking:**
```
POST /api/bookings
Content-Type: application/json

{
  "flightId": 1,
  "passengerName": "John Doe",
  "email": "john@example.com",
  "phone": "+256123456789",
  "passengers": 2
}
```

## Sample Data

The system includes pre-loaded flight data for Uganda routes:

- **Entebbe to Kampala**: Multiple daily flights (45 minutes, $150-180)
- **Entebbe to Nairobi**: Daily flights (2h 15min, $350-420)
- **Return routes**: Kampala to Entebbe, Nairobi to Entebbe

Airlines included:
- Uganda Airlines
- Kenya Airways

## Technologies Used

### Frontend
- **React 18**: Modern React with hooks
- **React Router DOM**: Client-side routing
- **Axios**: HTTP client for API calls
- **TailwindCSS**: Utility-first CSS framework
- **JavaScript ES6+**: Modern JavaScript features

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **CORS**: Cross-origin resource sharing
- **Body Parser**: Request parsing middleware

## Development

### Running in Development Mode

**Backend with auto-restart:**
```bash
cd backend
npm install -g nodemon  # Install globally if not already installed
npm run dev             # Uses nodemon for auto-restart
```

**Frontend with hot reload:**
```bash
cd frontend
npm start  # Automatically reloads on file changes
```

### Building for Production

**Frontend build:**
```bash
cd frontend
npm run build
```

## Features Implemented

✅ **Homepage with search form**
✅ **Flight search results display**
✅ **Flight booking with passenger details**
✅ **Booking confirmation page**
✅ **Responsive design with TailwindCSS**
✅ **REST API for flights and bookings**
✅ **Sample Uganda flight routes**
✅ **Booking ID generation**
✅ **In-memory data storage**
✅ **Error handling and loading states**
✅ **Form validation**
✅ **Clean, modern UI/UX**

## Demo Data

The system comes with 6 pre-loaded flights covering popular Uganda and East Africa routes. All bookings are stored in memory and will reset when the backend server is restarted.

## Troubleshooting

**Common Issues:**

1. **Backend not starting**: Ensure Node.js is installed and port 5000 is available
2. **Frontend API errors**: Verify backend is running on port 5000
3. **TailwindCSS not loading**: Check if postcss.config.js and tailwind.config.js are properly configured
4. **CORS errors**: Backend includes CORS middleware to handle cross-origin requests

**Port Conflicts:**
If ports 3000 or 5000 are in use, you can change them:
- Frontend: Set `PORT=3001` before `npm start`
- Backend: Set `PORT=5001` in server.js or environment variable

## License

This project is for educational and demonstration purposes.

## Author
Godwin Ofwono
