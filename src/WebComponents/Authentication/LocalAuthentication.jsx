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
    const uai = await ky
      .post(`http://localhost:5000/userPermissions`, {
        json: {
          user: data.username,
          linkedToSpotify: false,
        },
      })
      .json();
    return { registerData: res, permissionData: uai };
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

// check if account is linked to spotify
// needs to get token via cookies
export const linkedToSpotify = async () => {
  const userToken = Cookies.get("userToken");
  const res = await ky
    .get(`http://localhost:5000/userPermissions`, {
      headers: { Authorization: `Bearer ${userToken}` },
    })
    .json();
};

export const updateSpotifyLinkStatus = async (status) => {
  // example: updateSpotifyLinkStatus(true). "status" must be boolean
  if (!status) {
    return `no status`;
  } else {
    const res = await ky
      .put(`http://localhost:5000/userPermissions/setlts/${status}`, {
        headers: { Authorization: `Bearer ${Cookies.get("userToken")}` },
      })
      .json();
    if (res.message) {
      return `success`;
    } else {
      return `failed`;
    }
  }
};

export const userProps = async () => {
  const userToken = Cookies.get("userToken");
  const res = await ky
    .get(`http://localhost:5000/users/userInfo`, {
      headers: { Authorization: `Bearer ${userToken}` },
    })
    .json();
  return res;
};
