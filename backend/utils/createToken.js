import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  // Set JWT as an HTTP-Only Cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", // Use secure cookies in production and testing
    sameSite: "None", // Required for cross-site usage
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    path: "/", // Ensure the cookie is accessible for all paths
  });

  return token;
};

export default generateToken;
