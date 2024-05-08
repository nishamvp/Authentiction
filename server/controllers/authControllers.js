import { SALT_ROUNDS } from "../constants.js";
import { db } from "../db/connect.js";
import bcrypt from "bcrypt";

export const register = async (request, response) => {
  try {
    const { email, password } = request.body;
    // Check the email and password is provided
    if (!email || !password) {
      return response.status(400).json({
        status: "error",
        message: "Please provide email and password",
      });
    }
    // Checking if the user already exists
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser)
      return response
        .status(409)
        .json({ status: "error", message: "User Already Exist" });
    // Hashing the password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    // Saving new User to database
    const doc = await db
      .collection("users")
      .insertOne({ email: email, password: hashedPassword });
    return response
      .status(201)
      .json({ status: "success", message: "User created Successfully.." });
  } catch (error) {
    // Catching any errors presents above conditions
    return response
      .status(500)
      .json({ status: "error", message: "Internal server error" });
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

    // If passwords match, return success message
    if (validPassword) {
      return response.status(200).json({
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
    return response
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};
