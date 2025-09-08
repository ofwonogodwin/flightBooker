const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Sample flights data (hard-coded Uganda routes)
const flights = [
  {
    id: 1,
    flightNumber: "UG101",
    airline: "Uganda Airlines",
    origin: "Entebbe",
    destination: "Kampala",
    departureTime: "08:00",
    arrivalTime: "08:45",
    price: 150,
    duration: "45 min",
    date: "2025-09-15"
  },
  {
    id: 2,
    flightNumber: "UG102",
    airline: "Uganda Airlines",
    origin: "Entebbe",
    destination: "Kampala",
    departureTime: "14:30",
    arrivalTime: "15:15",
    price: 180,
    duration: "45 min",
    date: "2025-09-15"
  },
  {
    id: 3,
    flightNumber: "UG201",
    airline: "Uganda Airlines",
    origin: "Entebbe",
    destination: "Nairobi",
    departureTime: "09:15",
    arrivalTime: "11:30",
    price: 350,
    duration: "2h 15min",
    date: "2025-09-15"
  },
  {
    id: 4,
    flightNumber: "KQ301",
    airline: "Kenya Airways",
    origin: "Entebbe",
    destination: "Nairobi",
    departureTime: "16:45",
    arrivalTime: "19:00",
    price: 420,
    duration: "2h 15min",
    date: "2025-09-15"
  },
  {
    id: 5,
    flightNumber: "UG103",
    airline: "Uganda Airlines",
    origin: "Kampala",
    destination: "Entebbe",
    departureTime: "10:00",
    arrivalTime: "10:45",
    price: 150,
    duration: "45 min",
    date: "2025-09-15"
  },
  {
    id: 6,
    flightNumber: "KQ302",
    airline: "Kenya Airways",
    origin: "Nairobi",
    destination: "Entebbe",
    departureTime: "12:30",
    arrivalTime: "14:45",
    price: 420,
    duration: "2h 15min",
    date: "2025-09-15"
  }
];

// In-memory storage for bookings
let bookings = [];
let bookingIdCounter = 1000;

// Helper function to generate booking ID
const generateBookingId = () => {
  return `UG${String(bookingIdCounter++).padStart(6, '0')}`;
};

// Routes

// Get all flights or search flights
app.get('/api/flights', (req, res) => {
  const { origin, destination, date } = req.query;
  
  let filteredFlights = flights;
  
  if (origin) {
    filteredFlights = filteredFlights.filter(flight => 
      flight.origin.toLowerCase().includes(origin.toLowerCase())
    );
  }
  
  if (destination) {
    filteredFlights = filteredFlights.filter(flight => 
      flight.destination.toLowerCase().includes(destination.toLowerCase())
    );
  }
  
  if (date) {
    // For demo purposes, return flights for any date
    filteredFlights = filteredFlights.map(flight => ({
      ...flight,
      date: date
    }));
  }
  
  res.json({
    success: true,
    data: filteredFlights,
    count: filteredFlights.length
  });
});

// Get specific flight by ID
app.get('/api/flights/:id', (req, res) => {
  const flightId = parseInt(req.params.id);
  const flight = flights.find(f => f.id === flightId);
  
  if (!flight) {
    return res.status(404).json({
      success: false,
      message: 'Flight not found'
    });
  }
  
  res.json({
    success: true,
    data: flight
  });
});

// Create a new booking
app.post('/api/bookings', (req, res) => {
  const { flightId, passengerName, email, phone, passengers } = req.body;
  
  // Validate required fields
  if (!flightId || !passengerName || !email || !phone) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields: flightId, passengerName, email, phone'
    });
  }
  
  // Find the flight
  const flight = flights.find(f => f.id === parseInt(flightId));
  if (!flight) {
    return res.status(404).json({
      success: false,
      message: 'Flight not found'
    });
  }
  
  // Create booking
  const booking = {
    bookingId: generateBookingId(),
    flightId: parseInt(flightId),
    flight: flight,
    passengerName,
    email,
    phone,
    passengers: passengers || 1,
    totalPrice: flight.price * (passengers || 1),
    bookingDate: new Date().toISOString(),
    status: 'confirmed'
  };
  
  bookings.push(booking);
  
  res.status(201).json({
    success: true,
    message: 'Booking created successfully',
    data: booking
  });
});

// Get all bookings
app.get('/api/bookings', (req, res) => {
  res.json({
    success: true,
    data: bookings,
    count: bookings.length
  });
});

// Get booking by ID
app.get('/api/bookings/:bookingId', (req, res) => {
  const bookingId = req.params.bookingId;
  const booking = bookings.find(b => b.bookingId === bookingId);
  
  if (!booking) {
    return res.status(404).json({
      success: false,
      message: 'Booking not found'
    });
  }
  
  res.json({
    success: true,
    data: booking
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Flight Booking API is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

// Handle 404
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Flight Booking Backend Server running on port ${PORT}`);
  console.log(`📡 API Health Check: http://localhost:${PORT}/api/health`);
  console.log(`✈️  Flights API: http://localhost:${PORT}/api/flights`);
  console.log(`📋 Bookings API: http://localhost:${PORT}/api/bookings`);
});

module.exports = app;
