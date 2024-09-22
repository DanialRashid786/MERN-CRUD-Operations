const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./connection'); // Import the db connection file
const UserRoutes = require('./routes/UserRoutes').route;

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;  // Add a default port

// Middleware
app.use(bodyParser.json());

// Use Routes
app.use('/user', UserRoutes);

// Connect to the database
connectDB();  // Call the database connection function

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
