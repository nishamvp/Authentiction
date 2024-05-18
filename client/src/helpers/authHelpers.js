import { AUTH_BASE_URL } from "../constants";

export const RegisterUser = async (registerData) => {
  try {
    const response = await fetch(AUTH_BASE_URL + "register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
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
      body: JSON.stringify(loginData),
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error("error" + error);
  }
};
