const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./connection'); // Import the db connection file
const UserRoutes = require('./routes/UserRoutes').route;
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;  // Port 8000 to match the frontend request

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// Connect to the database
connectDB();  // Call the database connection function

// Use Routes
app.use('/user', UserRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
