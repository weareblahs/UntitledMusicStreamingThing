import { spotifyProperties } from "./SpotifyClientData";

export const AuthURL = () => {
  const clientID = spotifyProperties("clientID");
  const baseURL = "https://accounts.spotify.com/authorize";
  const responseType = "token";
  const redirectURL = "http://localhost:5173/loginAuth";
  const scopes =
    "streaming app-remote-control user-read-email user-read-private user-modify-playback-state user-read-playback-state";
  return `${baseURL}?client_id=${clientID}&scope=${scopes}&redirect_uri=${redirectURL}&response_type=${responseType}`;
};
