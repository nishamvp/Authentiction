import { AUTH_BASE_URL } from "../constants";

export const RegisterUser = async (registerData) => {
  try {
    const response = await fetch(AUTH_BASE_URL + "register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      credentials: "include", 
      body: JSON.stringify(registerData),
    });
    const json = await response.json();

    return json;
  } catch (error) {
    console.error("error" + error);
  }
};

export const LoginUser = async (loginData) => {
  try {
    const response = await fetch(AUTH_BASE_URL + "login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      credentials: "include",
      body: JSON.stringify(loginData),
    });
    const json = await response.json();
    localStorage.setItem("Access-token", JSON.stringify(json.accessToken));
    return json;
  } catch (error) {
    console.error("error" + error);
  }
};

export const GoogleSignIn = async ()=>{
  try {
    const response = await fetch(AUTH_BASE_URL + "consentScreen");
    const json = await response.json();
    return json;
  } catch (error) {
    console.error("error" + error);
  }
}