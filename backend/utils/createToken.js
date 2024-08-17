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
    secure: true, // Use secure cookies
    sameSite: "none", // Required for cross-site usage
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  return token;
};

export default generateToken;
