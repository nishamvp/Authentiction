import { db } from "../db/connect.js";

export const login = async (request, response) => {
  const { name, age } = request.body;
  try {
    const result = await db.collection("users").insertOne({ name, age });
    console.log("Inserted document with ID:", result.insertedId);
    return response.status(201).json("Created");
  } catch (err) {
    console.error("Error:", err);
    return response.status(500).json({ error: "Internal server error" });
  }
};
