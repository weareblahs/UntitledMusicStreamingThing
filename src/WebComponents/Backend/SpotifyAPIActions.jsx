import ky from "ky";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { AuthURL } from "./AuthURLBuilder";

export const ConnectToDevice = (did) => {
  ky.put(`https://api.spotify.com/v1/me/player`, {
    json: {
      device_ids: [did],
    },
    headers: {
      Authorization: Cookies.get("spotifyAccessHeader"),
    },
  });
};

export const GetPlaybackState = async () => {
  const [data, set] = useState([]);
  ky.get(`https://api.spotify.com/v1/me/player`, {
    headers: {
      Authorization: Cookies.get("spotifyAccessHeader"),
    },
  }).then((json) => {
    console.log(json.body);
  });
};

export const SearchAlbum = async (q) => {
  // 'https://api.spotify.com/v1/search?q=albname&type=album&limit=20'
  const data = await ky
    .get(`https://api.spotify.com/v1/search?q=${q}&type=album`, {
      headers: {
        Authorization: Cookies.get("spotifyAccessHeader"),
      },
    })
    .json();
  return data;
};

export const SearchSongs = async (q) => {
  // 'https://api.spotify.com/v1/search?q=albname&type=album&limit=20'
  const data = await ky
    .get(`https://api.spotify.com/v1/search?q=${q}&type=track&limit=50`, {
      headers: {
        Authorization: Cookies.get("spotifyAccessHeader"),
      },
    })
    .json();
  return data;
};

export const PlaySpotifyMusic = async (uri, did) => {
  ky.put(`https://api.spotify.com/v1/me/player/play?device_id=${did}`, {
    json: {
      uris: [uri],
    },
    headers: {
      Authorization: Cookies.get("spotifyAccessHeader"),
    },
  });
};
export const PlaySpotifyAlbum = async (uri, did) => {
  ky.put(`https://api.spotify.com/v1/me/player/play?device_id=${did}`, {
    json: {
      context_uri: uri,
    },
    headers: {
      Authorization: Cookies.get("spotifyAccessHeader"),
    },
  });
};
export const GetAlbum = async (q) => {
  // 'https://api.spotify.com/v1/search?q=albname&type=album&limit=20'
  const data = await ky
    .get(`https://api.spotify.com/v1/albums/${q}`, {
      headers: {
        Authorization: Cookies.get("spotifyAccessHeader"),
      },
    })
    .json();
  return data;
};
