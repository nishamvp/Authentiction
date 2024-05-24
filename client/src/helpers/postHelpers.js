import { POST_BASE_URL } from "../constants";


export const CreatePost = async (postData) => {
    try {
      const response = await fetch(POST_BASE_URL+"create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          "Authorization": localStorage.getItem('Authorization')
        },
        body: JSON.stringify(postData),
        credentials:"include",
      });
      const json = await response.json();
      console.log(json)
      return json;
    } catch (error) {
      console.error("error" + error);
    }
  };