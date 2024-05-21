import { jwtDecode} from "jwt-decode";
import dayjs from "dayjs";


// const useFetch = () => {
//   const refreshToken = async () => {
//     const response = await fetch(`http://localhost:3000/auth/refresh`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       credentials: "include",
//     });
//     let json = await response.json();
//     console.log(json);
//     localStorage.setItem("accessToken", JSON.stringify(json));
//     return json;
//   };
//   const customFetcher = async () => {
//     let accessToken = localStorage.getItem("accessToken")
//       ? JSON.parse(localStorage.getItem("accessToken"))
//       : null;
//     const decode = jwtDecode(accessToken);
//     const isExpired = dayjs.unix(1716265547).diff(dayjs()) < 1;
//     console.log(isExpired);
//     if (isExpired) {
//       const NewaccessToken = await refreshToken();
//     }
//   };
//   customFetcher();
// };
export default useFetch;
