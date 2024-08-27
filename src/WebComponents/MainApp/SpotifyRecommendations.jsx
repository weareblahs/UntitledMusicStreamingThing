import { FaClock, FaHeart, FaList, FaTimes } from "react-icons/fa";
import { viewLikedSongs, viewPlaylists } from "../Backend/SpotifyAPIActions";
import { useState, useEffect } from "react";

export const SpotifyRecommendations = ({ setPage }) => {
  const [likedSongsPreview, setLikedSongsPreview] = useState([]);
  const [playlistPreview, setPlaylistPreview] = useState("");
  useEffect(() => {
    async function get() {
      const likedSongsPreview = await viewLikedSongs(2);
      const lspArray = [];
      likedSongsPreview?.items?.map((Artist) => {
        lspArray.push(Artist.track.artists[0].name);
      });
      setLikedSongsPreview(lspArray);
      const playlistPreview = await viewPlaylists(1);
      setPlaylistPreview(`featuring ${playlistPreview.items[0].name}`);
    }
    get();
  }, []);
  console.log(playlistPreview);
  return (
    <>
      <div>
        <div className="flex ms-auto me-auto" style={{ width: "80%" }}>
          <div className="pb-2 mt-auto mb-auto text-end">
            <h1 className="text-2xl px-6 font-bold">Your Spotify library</h1>
          </div>
          <div className="bg-blue-500 grid grid-cols-12 w-80 gap-4 ms-auto me-4 pt-3 pb-3 rounded-2xl hover:bg-green-700 transition fade-in-out cursor-pointer">
            <div className="mt-auto mb-auto text-2xl col-span-3 text-center">
              <FaHeart className="ms-4" />
            </div>
            <div
              className="mt-auto mb-auto text-2xl col-span-9 px-2"
              onClick={() => setPage("viewSpotifyLikedTracks")}
            >
              Liked Songs
              <p className="text-lg leading-5 italic">{`${
                likedSongsPreview[0] ? likedSongsPreview[0] + ", " : ""
              }${
                likedSongsPreview[1] ? likedSongsPreview[1] + ", etc" : ""
              }`}</p>
            </div>
          </div>
          <div className="bg-blue-500 grid grid-cols-12 w-80 gap-4 ms-auto me-4 pt-3 pb-3 rounded-2xl hover:bg-green-700 transition fade-in-out cursor-pointer">
            <div className="mt-auto mb-auto text-2xl col-span-3 text-center">
              <FaList className="ms-4" />
            </div>
            <div className="mt-auto mb-auto text-2xl col-span-9 px-2">
              Playlists
              <p className="text-lg leading-5 italic truncate hover:text-ellipsis">
                {playlistPreview}
              </p>
            </div>
          </div>
          <div className="bg-blue-500 grid grid-cols-12 w-80 gap-4 ms-auto me-4 pt-3 pb-3 rounded-2xl hover:bg-green-700 transition fade-in-out cursor-pointer">
            <div className="mt-auto mb-auto text-2xl col-span-3 text-center">
              <FaClock className="ms-4" />
            </div>
            <div className="mt-auto mb-auto text-2xl col-span-9 px-2">
              Listening History
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
