import User from "../models/User.model.js"
import userService from "../services/userService.js";
import bcrypt from "bcryptjs"; // Ensure bcrypt is installed
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Create User
export const createUser = async (req, res) => {
  try {
    const result = await userService.saveEmployeeDetails(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error: error.message });
  }
};

// Get All Users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};

// Get User by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error: error.message });
  }
};

// Get User by Email
export const getUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ emailId: req.params.email });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error: error.message });
  }
};

// Update User
export const updateUser = async (req, res) => {
  try {
    // Prevent updating _id and regId
    const { _id, regId, ...updateFields } = req.body;

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updateFields, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating user", error: error.message });
  }
};



// Delete User
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
};

// Activate/Deactivate User
export const changeUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.gnStatus = req.body.gnStatus; // 1 - Active, 0 - Inactive
    await user.save();
    res.status(200).json({ message: `User status changed to ${req.body.gnStatus === 1 ? "Active" : "Inactive"}` });
  } catch (error) {
    res.status(500).json({ message: "Error updating status", error: error.message });
  }
};

// export const loginUser = async (req, res) => {
//   try {
//     const { emailId, password } = req.body;
//     const user = await User.findOne({ emailId });

//     if (!user) {
//       return res.status(401).json({ success: false, message: "Invalid email or password" });
//     }

//     // Compare entered password with stored hashed password
//     //const isPasswordValid = await bcrypt.compare(password, user.password);
//     const isPasswordValid = (password===user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ success: false, message: "Invalid email or password" });
//     }

//     res.status(200).json({ success: true, message: "Login successful", user });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Error logging in", error: error.message });
//   }
// };


//User login
dotenv.config(); 

export const loginUser = async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // Check if password matches
    //const isPasswordValid = await bcrypt.compare(password, user.password);
    const isPasswordValid = (password===user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // Generate JWT Token
    const token = jwt.sign({ userId: user._id, emailId: user.emailId, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token expires in 1 hour
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token, // Send token to the client
      user: {
        _id: user._id,
        emailId: user.emailId,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error logging in", error: error.message });
  }
};

