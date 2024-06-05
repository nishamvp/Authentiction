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
        path: "/",
        httpOnly: true,
        sameSite: "Lax",
        secure: process.env.NODE_ENV === "production", // Set to true in production
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

export const loginWithGoogle = async (req, res) => {
  const GOOGLE_OAUTH_URL = process.env.GOOGLE_OAUTH_URL;
  const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  const GOOGLE_CALLBACK_URL = "http%3A//localhost:3000/auth/callback";
  const state = "called"
  const GOOGLE_OAUTH_SCOPES = [
    "https%3A//www.googleapis.com/auth/userinfo.email",
    "https%3A//www.googleapis.com/auth/userinfo.profile",
  ];
  try {
    const scopes = GOOGLE_OAUTH_SCOPES.join(" ");
    const GOOGLE_OAUTH_CONSENT_SCREEN_URL = `${GOOGLE_OAUTH_URL}?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_CALLBACK_URL}&access_type=offline&response_type=code&state=${state}&scope=${scopes}`;
    console.log('get call')
    res.redirect(GOOGLE_OAUTH_CONSENT_SCREEN_URL);
  } catch (error) {}
};
