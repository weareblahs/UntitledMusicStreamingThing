import ky from "ky";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
export const registerUser = async (data, comparePassword) => {
  console.log(data);
  if (comparePassword == data.password) {
    const res = await ky
      .post(`http://localhost:5000/users/register`, {
        json: data,
      })
      .json();
    return res;
  } else {
    return "Password does not match";
  }
};

export const loginUser = async (data) => {
  console.log(data);
  const res = await ky
    .post(`http://localhost:5000/users/login`, {
      json: data,
    })
    .json();
  if (res) {
    Cookies.set("userToken", res.token);
    Cookies.set("tokenExpiry", jwtDecode(res.token).exp);
    window.location.href = "/";
  } else {
    null;
  }
};
