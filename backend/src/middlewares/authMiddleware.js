import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export const protect = (req, res, next) => {
  let token = req.header("Authorization");

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};



dotenv.config();
export const authenticateUser = (req, res, next) => {
  // Get the token from headers
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Access Denied. No Token Provided." });
  }

  const token = authHeader.split(" ")[1]; // Extract token

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user details to request object
    next(); // Proceed to the next middleware/route
  } catch (error) {
    res.status(403).json({ success: false, message: "Invalid or Expired Token" });
  }
};


//export default protect;
