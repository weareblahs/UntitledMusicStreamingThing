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
  Cookies.set("playbackSource", "spotify");
  Cookies.set("localPlaybackState", false);
  if (Cookies.get("ndl")) {
    Cookies.set("ndl", parseInt(Cookies.get("ndl")) + 1);
  } else {
    Cookies.set("ndl", 1);
  }
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
  Cookies.set("playbackSource", "spotify");
  Cookies.set("localPlaybackState", false);
  if (Cookies.get("ndl")) {
    Cookies.set("ndl", parseInt(Cookies.get("ndl")) + 1);
  } else {
    Cookies.set("ndl", 1);
  }
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

export const GetRecentlyPlayed = async (q) => {
  const data = await ky
    .get(`https://api.spotify.com/v1/me/player/recently-played?limit=10`, {
      headers: {
        Authorization: Cookies.get("spotifyAccessHeader"),
      },
    })
    .json();
  return data;
};
export const SearchTopArtist = async (q) => {
  // 'https://api.spotify.com/v1/search?q=albname&type=album&limit=20'
  const data = await ky
    .get(`https://api.spotify.com/v1/search?q=${q}&type=artist&limit=1`, {
      headers: {
        Authorization: Cookies.get("spotifyAccessHeader"),
      },
    })
    .json();
  return data;
};

export const viewLikedSongs = async (q) => {
  const data = await ky
    .get(`https://api.spotify.com/v1/me/tracks?limit=${q}`, {
      headers: {
        Authorization: Cookies.get("spotifyAccessHeader"),
      },
    })
    .json();
  return data;
};

export const viewPlaylists = async (q) => {
  const data = await ky
    .get(`https://api.spotify.com/v1/me/playlists?limit=${q}`, {
      headers: {
        Authorization: Cookies.get("spotifyAccessHeader"),
      },
    })
    .json();
  return data;
};
export const PlayAllLikedSongs = async (did) => {
  Cookies.set("playbackSource", "spotify");
  Cookies.set("localPlaybackState", false);
  if (Cookies.get("ndl")) {
    Cookies.set("ndl", parseInt(Cookies.get("ndl")) + 1);
  } else {
    Cookies.set("ndl", 1);
  }
  const data = await ky
    .get(`https://api.spotify.com/v1/me/`, {
      headers: {
        Authorization: Cookies.get("spotifyAccessHeader"),
      },
    })
    .json();
  ky.put(`https://api.spotify.com/v1/me/player/play?device_id=${did}`, {
    json: {
      context_uri: `spotify:user:${data.id}:collection`,
    },
    headers: {
      Authorization: Cookies.get("spotifyAccessHeader"),
    },
  });
};
