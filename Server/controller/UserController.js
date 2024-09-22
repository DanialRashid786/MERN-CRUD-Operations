const User = require('../model/UserModel'); // Ensure the correct import

const handelPostSaveUser = async (req, res) => {
  try {
    const { email, first_name, last_name, address, gender, job_title } = req.body;

    if (!email || !first_name || !last_name) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({
      first_name,
      last_name,
      email,
      address,
      gender,
      job_title,
    });

    const saveData = await newUser.save();
    return res.status(201).json(saveData);
  } catch (error) {
    console.error("Error saving user:", error);
    return res.status(500).json({ errorMessage: error.message });
  }
};

const handelGetUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // Use singular 'User'
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const handelGetAllUsers = async (req, res) => {
  try {
    const alldbUsers = await User.find({});
    res.status(200).json(alldbUsers);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

const handelUpdateUserById = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { last_name: "changed" },  // Change last_name as an example
      { new: true }  // Return updated user
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({ status: "success", updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const handelDeleteUserById = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({ status: "success", message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  handelPostSaveUser,
  handelGetAllUsers,
  handelGetUserById,
  handelUpdateUserById,
  handelDeleteUserById,
};
