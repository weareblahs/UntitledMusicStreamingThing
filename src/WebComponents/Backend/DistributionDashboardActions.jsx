import ky from "ky";
import Cookies from "js-cookie";
export const AddAlbumInformation = async (body) => {
  // endpoint: POST /albumManagement/addAlbumInfo
  const res = await ky
    .post("http://localhost:5000/albumManagement/addAlbumInfo", {
      body,
      headers: {
        Authorization: `Bearer ${Cookies.get("userToken")}`,
      },
    })
    .json();
  return res;
};

export const SDAP = async () => {
  // endpoint: POST /albumManagement/addAlbumInfo
  const res = await ky
    .get("http://localhost:5000/albumManagement/sdap", {
      headers: {
        Authorization: `Bearer ${Cookies.get("userToken")}`,
      },
    })
    .json();
  return res;
};
