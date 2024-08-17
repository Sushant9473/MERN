import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

console.log(process.env.JWT_SECRET);
const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  // Set JWT as an HTTP-Only Cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "production", // Use secure cookies in production
    sameSite: "none", // Changed from 'strict' to 'none' to allow cross-site cookie
    maxAge: 30 * 24 * 60 * 60 * 1000,
    domain: process.env.COOKIE_DOMAIN, // Add this line
  });

  return token;
};

export default generateToken;
