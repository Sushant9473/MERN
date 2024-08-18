import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  // Set JWT as an HTTP-Only Cookie
  res.cookie("jwt", token, {
    httpOnly: true, // Prevents client-side access to the cookie
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    sameSite: "None", // Allow cross-site usage
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  return token;
};

export default generateToken;
