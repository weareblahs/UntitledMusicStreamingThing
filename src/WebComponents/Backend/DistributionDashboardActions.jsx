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
export const DeleteAlbum = async (albumID) => {
  const res = await ky
    .delete(`http://localhost:5000/albumManagement/deleteAlbum/${albumID}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("userToken")}`,
      },
    })
    .json();

  res.status ? alert(res.status) : alert(res.error);
  window.location.href = "/";
};

export const FinalizeUpload = async (body, aid) => {
  // /AcceptUploadedFiles
  const res = await ky
    .post(`http://localhost:5000/albumManagement/AcceptUploadedFiles/${aid}`, {
      body,
      headers: {
        Authorization: `Bearer ${Cookies.get("userToken")}`,
      },
    })
    .json();
  window.location.href = "/DistDashEndpoint/finalizeUpload";
};

export const FinalProperties = async (
  copyrightInfo,
  availableStatus,
  albumID
) => {
  // endpoints: POST /addCopyrightInfo/(id), /setAvailable/(id)/(true or false)
  console.log(copyrightInfo, availableStatus, albumID);
  const firstRes = await ky
    .post(`http://localhost:5000/albumManagement/addCopyrightInfo/${albumID}`, {
      json: copyrightInfo,
      headers: {
        Authorization: `Bearer ${Cookies.get("userToken")}`,
      },
    })
    .json();
  const secondRes = await ky
    .post(
      `http://localhost:5000/albumManagement/setAvailable/${albumID}/${availableStatus}`,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("userToken")}`,
        },
      }
    )
    .json();
  window.location.href = "/";
};
