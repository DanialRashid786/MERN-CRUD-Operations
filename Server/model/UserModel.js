const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true
    },
    last_name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    address: {
      type: String,
      required: true
    },
    gender: String,
    job_title: String
  },
  { timestamps: true }  // Corrected to handle createdAt and updatedAt
);

const User = mongoose.model('User', userSchema);

module.exports = User;
