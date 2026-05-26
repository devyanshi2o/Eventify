const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db.js');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/users', require('./routes/userRoutes'));

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Eventify API' });
});
// server.js

const contactRoutes = require(
  "./routes/contactRoutes"
);

// ADD BELOW OTHER ROUTES
app.use(
  "/api/contact",
  contactRoutes
);
// server.js

const eventRoutes = require(
  "./routes/eventRoutes"
);

// ADD BELOW OTHER ROUTES
app.use(
  "/api/events",
  eventRoutes
);
const adminRoutes =
  require("./routes/adminRoutes");

app.use(
  "/api/admin",
  adminRoutes
);
// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
