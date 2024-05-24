import { POST_BASE_URL } from "../constants";


export const CreatePost = async (postData) => {
    try {
      const response = await fetch(POST_BASE_URL + "create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "access-token": localStorage.getItem('accessToken')
        },
        body: JSON.stringify(postData),
      });
      const json = await response.json();
      return json;
    } catch (error) {
      console.error("error" + error);
    }
  };