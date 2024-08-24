import Cookies from "js-cookie";
import ky from "ky";

export const LocalPlayback = async (album, trackNo) => {
  Cookies.set("localPlaybackState", true);
  Cookies.set("spotifyPlaybackState", false);
  Cookies.set("playbackSource", `UMST`);
  if (Cookies.get("ndl")) {
    Cookies.set("ndl", parseInt(Cookies.get("ndl")) + 1);
  } else {
    Cookies.set("ndl", 1);
  }
  Cookies.set("localPlaybackLocation", `${album}/${trackNo}`);
  Cookies.set(
    "localPlaylist",
    `http://localhost:5000/audio/streamAudio/${album}/${trackNo}/flac.flac|null`
  );
  const res = await ky
    .get(`http://localhost:5000/search/singleTrack/${album}/${trackNo}`)
    .json();
  Cookies.set("currentLocalTrackName", res.trackName);
  Cookies.set("currentLocalTrackArtist", res.trackArtist);
  Cookies.set("currentLocalAlbumArt", res.relAlbumId.albumArt);
};

export const LocalAlbumPlayback = async (album) => {
  console.log(album);
  const albumData = await ky
    .get(`http://localhost:5000/search/albumDetails/${album}`)
    .json();
  console.log(albumData.tracks);
  let initialString = "";
  albumData.tracks.map((Track) => {
    initialString += `http://localhost:5000/audio/streamAudio/${album}/${Track.trackNo}/flac.flac|`;
  });
  initialString += "undefined";
  if (Cookies.get("ndl")) {
    Cookies.set("ndl", parseInt(Cookies.get("ndl")) + 1);
  } else {
    Cookies.set("ndl", 1);
  }
  Cookies.set("localPlaybackAlbumID", album);
  Cookies.set("localPlaylist", initialString);
  Cookies.set("currentLocalTrackName", albumData.tracks[0].trackName);
  Cookies.set("currentLocalTrackArtist", albumData.tracks[0].trackArtist);
  Cookies.set("currentLocalAlbumArt", albumData.search.albumArt);
};
