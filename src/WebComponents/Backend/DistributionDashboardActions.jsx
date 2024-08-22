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

export const GetSingleAlbum = async (id) => {
  // endpoint: POST /albumManagement/addAlbumInfo
  const res = await ky
    .get(`http://localhost:5000/albumManagement/singleAlbum/${id}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("userToken")}`,
      },
    })
    .json();
  return res;
};

export const AddTrackInfo = async (id, data) => {
  console.log({ data });
  const res = await ky
    .post(`http://localhost:5000/albumManagement/addTrackInfo`, {
      json: data,
      headers: {
        Authorization: `Bearer ${Cookies.get("userToken")}`,
      },
    })
    .json();
  return res;
};
export const AddTracksToAlbum = async (albumID) => {
  const res = await ky
    .get(`http://localhost:5000/albumManagement/getAlbumTrack/${albumID}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("userToken")}`,
      },
    })
    .json();
  const trackIDArray = [];
  res.map((Track) => {
    trackIDArray.push(Track._id);
  });
  const datapush = await ky
    .post(
      `http://localhost:5000/albumManagement/addAlbumTrackInfo/${albumID}`,
      {
        json: { tracks: trackIDArray },
        headers: {
          Authorization: `Bearer ${Cookies.get("userToken")}`,
        },
      }
    )
    .json();
  console.log(datapush);
};
