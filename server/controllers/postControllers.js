import { db } from "../db/connect.js";

export const createPost = async (request, response) => {
  const { post, location } = request.body;
  try {
    // Check if post and location are provided
    if (!post || !location) {
      return response.status(400).json({
        success: false,
        message: "Please provide post and location",
      });
    }
    const postData = await db.collection("post").insertOne({ post, location });
    return response
      .status(201)
      .json({ success: true, message: "Post created successfully.." });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
