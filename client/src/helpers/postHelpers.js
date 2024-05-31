import { POST_BASE_URL } from "../constants";


export const CreatePost = async (postData) => {
  try {
    const response = await fetch(`${POST_BASE_URL}create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Access-token": localStorage.getItem('Access-token')
      },
      body: JSON.stringify(postData),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Error:", error);
    return { error: error.message };
  }
};
