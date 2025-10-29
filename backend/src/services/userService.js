import User from "../models/User.model.js";

import bcrypt from "bcryptjs";
import generatePassword from "../utils/generatePassword.js";

const saveEmployeeDetails = async (userData) => {
  const { emailId, regId } = userData;
  
  const existingUser = await User.findOne({ emailId });
  if (existingUser) {
    return { isDuplicate: true, success: false, message: "Email already exists" };
  }

  const password = generatePassword(10);
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ ...userData, password: hashedPassword, userName: emailId });
  await user.save();

  return { isDuplicate: false, success: true, message: "User created successfully" };
};

export default { saveEmployeeDetails };
