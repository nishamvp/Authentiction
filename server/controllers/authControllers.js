import { SALT_ROUNDS } from "../constants.js";
import { db } from "../db/connect.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (request, response) => {
  try {
    const { email, password } = request.body;

    // Check if email and password are provided
    if (!email || !password) {
      return response.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    // Check if the user already exists
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return response.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Save new user to the database
    await db.collection("users").insertOne({ email, password: hashedPassword });

    // Return success message
    return response.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    // Log the error for debugging
    console.error("Error:", error);

    // Return error message
    return response.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const login = async (request, response) => {
  const { email, password } = request.body;

  try {
    // Check if the user email is already registered
    const userDoc = await db.collection("users").findOne({ email });

    // If userDoc is null, return a generic error message
    if (!userDoc) {
      return response
        .status(401)
        .json({ success: false, error: "Invalid email or password" });
    }

    // Compare the provided password with the hashed password from the database
    const validPassword = await bcrypt.compare(password, userDoc.password);

    // If passwords match, sign jwt accesstoken and refreshtoken and return success message
    if (validPassword) {
      const accessToken = jwt.sign(
        { email: userDoc.email },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRATION,
        }
      );
      const refreshToken = jwt.sign(
        {
          email: userDoc.email,
        },
        process.env.JWT_REFRESH_TOKEN_SECRET,
        {
          expiresIn: process.env.JWT_REFRESH_EXPIRATION,
        }
      );
      response.cookie("jwt", refreshToken, {
        path:'/',
        httpOnly: true,
        sameSite: "none",
        secure: process.env.NODE_ENV === 'production', // Set to true in production
        maxAge: 72 * 60 * 60 * 1000, // 72 hours
      });
      return response.status(200).json({
        accessToken,
        success: true,
        message: "Login successful",
      });
    } else {
      // If passwords don't match, return a generic error message
      return response
        .status(401)
        .json({ success: false, error: "Invalid email or password" });
    }
  } catch (err) {
    // Handle unexpected errors
    console.error("Error:", err);
    return response.status(500).json({ error: "Internal server error" });
  }
};

export const refreshToken = async (request, response) => {
  const token = request.cookies.jwt;
  console.log(token)
  if (!token) {
    return response
      .status(401)
      .json({ error: "Access denied.No refresh token provided" });
  }
  try {
    // Get the token from cookies
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET);
    if (!decoded) return response.status(406).json({ error: "Unauthorized" });

    const accessToken = jwt.sign(
      { email: decoded.email },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRATION,
      }
    );
    return response.header("Authorization", accessToken).send(decoded.email);
  } catch (error) {
    return response.status(400).send("Invalid refresh token.");
  }
};
