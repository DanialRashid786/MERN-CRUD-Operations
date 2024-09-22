const User = require('../model/UserModel'); // Import User model

/**
 * Create a new user and save to the database
 * @route POST /user
 * @access Public
 */
const handelPostSaveUser = async (req, res) => {
  try {
    const { email, first_name, last_name, address} = req.body;

    // Check for required fields
    if (!email || !first_name || !last_name) {
      return res.status(400).json({ message: "Email, first name, and last name are required" });
    }

    // Check if user already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    // Create a new user instance
    const newUser = new User({
      first_name,
      last_name,
      email,
      address
    });

    // Save the user data
    const savedUser = await newUser.save();

    return res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error saving user:", error);
    return res.status(500).json({ errorMessage: "An error occurred while saving the user" });
  }
};

/**
 * Get all users from the database
 * @route GET /user
 * @access Public
 */
const handelGetAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "An error occurred while fetching users" });
  }
};

/**
 * Get a single user by ID
 * @route GET /user/:id
 * @access Public
 */
const handelGetUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return res.status(500).json({ message: "An error occurred while fetching the user" });
  }
};

/**
 * Update user by ID
 * @route PUT /user/:id
 * @access Public
 */
const handelUpdateUserById = async (req, res) => {
  try {
    const { first_name, last_name, address } = req.body;

    // Find the user by ID and update the fields
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { first_name, last_name, address }, // Update all fields dynamically
      { new: true, runValidators: true }  // Return the updated user and run validation
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ status: "success", updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "An error occurred while updating the user" });
  }
};

/**
 * Delete user by ID
 * @route DELETE /user/:id
 * @access Public
 */
const handelDeleteUserById = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ status: "success", message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ message: "An error occurred while deleting the user" });
  }
};

module.exports = {
  handelPostSaveUser,
  handelGetAllUsers,
  handelGetUserById,
  handelUpdateUserById,
  handelDeleteUserById,
};
