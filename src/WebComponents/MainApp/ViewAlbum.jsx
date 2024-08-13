import { useEffect, useState } from "react";
import {
  GetAlbum,
  PlaySpotifyAlbum,
  PlaySpotifyMusic,
  SearchAlbum,
} from "../Backend/SpotifyAPIActions";
import { Button, Chip } from "@nextui-org/react";
import { FaAngleLeft, FaPlay } from "react-icons/fa";
import { msToMS } from "../Backend/ExtraCode";
import Cookies from "js-cookie";
export const ViewAlbum = ({ setPage }) => {
  const [ad, setad] = useState([]);
  const aid = localStorage.getItem("tempalbumid");
  useEffect(() => {
    async function get() {
      const td = await GetAlbum(aid);
      setad(td);
    }
    get();
  }, []);

  console.log(ad);
  return (
    <div className="ms-auto me-auto" style={{ width: "80%" }}>
      <div className="ms-auto me-auto flex sticky mb-4 top-0">
        <Button className="me-2" onClick={() => setPage("search")}>
          <FaAngleLeft /> Back
        </Button>
      </div>
      {/* top album info */}
      <div className="ms-auto me-auto flex">
        <div className="max-w-[200px]">
          <img src={ad?.images?.[0].url} style={{ height: "" }} />
        </div>
        <div className="ms-4 mt-auto mb-auto">
          <h1 className="text-6xl">{ad?.name}</h1>
          <h1 className="text-3xl">{ad?.artists?.[0].name}</h1>
          <p>{`${ad?.label} / ${ad?.release_date}`}</p>
          <div className="pt-2">
            {!ad ? null : (
              <Button
                onClick={() => PlaySpotifyAlbum(ad?.uri, Cookies.get("did"))}
              >
                <FaPlay />
                Play album
              </Button>
            )}
            <Chip className="text-black bg-green-500 ms-4">
              Album from Spotify
            </Chip>
          </div>
        </div>
      </div>
      {/* tracklist */}
      <div className="ms-auto me-auto pt-2">
        {ad?.tracks?.items?.map((Track) => {
          return (
            <div
              className="grid grid-cols-12 mt-1 mb-1 px-3 py-2 rounded-2xl hover:bg-slate-800 cursor-pointer transition fade-in-out"
              onClick={() => PlaySpotifyMusic(Track.uri, Cookies.get("did"))}
            >
              <div className="col-span-1 text-md mt-auto me-2 mb-auto trackText">
                {Track.track_number.toString().length == 1 ? (
                  <span>&nbsp;{Track.track_number}</span>
                ) : (
                  Track.track_number
                )}
              </div>
              <div className="ms-4 col-span-6 mt-auto mb-auto text-xl">
                {Track.name}{" "}
                <span>
                  {Track.explicit ? (
                    <Chip className="rounded-md ms-2">E</Chip>
                  ) : null}
                </span>
              </div>
              <div className="ms-4 col-span-4 mt-auto mb-auto text-sm">
                {Track.artists.map((Artist, i, row) => {
                  if (i + 1 === row.length) {
                    return `${Artist.name}`;
                  } else {
                    return `${Artist.name}, `;
                  }
                })}
              </div>
              <div className="ms-4 col-span-1 mt-auto mb-auto text-sm text-end trackText">
                {msToMS(Track.duration_ms)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
