import { Button } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { FaAngleLeft, FaArrowLeft, FaPlay, FaShuffle } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import {
  PlayAllLikedSongs,
  viewLikedSongs,
} from "../Backend/SpotifyAPIActions";
import { PlaySpotifyMusic } from "../Backend/SpotifyAPIActions";
import { msToMS } from "../Backend/ExtraCode";
import Cookies from "js-cookie";
export const ViewSpotifyLikedTracks = ({ setPage }) => {
  const navigate = useNavigate();
  const [likedSongs, setLiked] = useState([]);
  const [limit, setLimit] = useState(50);
  useEffect(() => {
    async function get() {
      const res = await viewLikedSongs(limit);
      setLiked(res.items);
    }
    get(limit);
  }, []);
  return (
    <div className="ms-auto me-auto" style={{ width: "80%" }}>
      <Button onClick={() => setPage("home")}>
        <FaAngleLeft />
        Back
      </Button>
      <div className="grid grid-cols-12">
        <h1 className="text-6xl mt-2 col-span-6">Liked songs</h1>
        <div className="col-span-6 mt-auto ms-auto">
          <Button onClick={() => PlayAllLikedSongs(Cookies.get("did"))}>
            <FaShuffle />
            Shuffle Play
          </Button>
        </div>
      </div>
      <div>
        {likedSongs.map((Track) => {
          return (
            <>
              <div
                className="flex hover:bg-slate-500 transition fade-in-out rounded-3xl px-4 py-2 cursor-pointer"
                onClick={() => {
                  PlaySpotifyMusic(Track.track.uri, Cookies.get("did"));
                }}
              >
                <div className="flex transition fade-in-out col-span-10">
                  <div className="col-span-1 text-xs mt-auto mb-auto me-4 text-md">
                    <FaPlay />
                  </div>
                  <div className="col-span-1 mt-auto mb-auto me-4">
                    <img src={Track.track.album.images[2].url} width={40} />
                  </div>
                  <div className="block">
                    <div className="me-2 text-md mt-auto mb-auto">
                      {Track.track.name}
                      {
                        /* explicit tag stuff */
                        Track.track.explicit ? (
                          <Chip className="rounded-md ms-2">E</Chip>
                        ) : null
                      }
                    </div>
                    <div className="text-sm">{Track.track.artists[0].name}</div>
                  </div>
                </div>
                <div className="col-span-2 ms-auto text-sm mt-auto mb-auto text-center">
                  <div className="block">
                    {msToMS(Track.track.duration_ms)}
                    <br />
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};
