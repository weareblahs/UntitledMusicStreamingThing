import ky from "ky";

export const searchLocalAlbum = async (q) => {
  const res = await ky.get(`http://localhost:5000/search/album/${q}`).json();
  return res;
};
export const searchLocalTrack = async (q) => {
  const res = await ky.get(`http://localhost:5000/search/track/${q}`).json();
  return res;
};
export const GetLocalAlbum = async (q) => {
  const res = await ky
    .get(`http://localhost:5000/search/albumDetails/${q}`)
    .json();
  return res;
};
