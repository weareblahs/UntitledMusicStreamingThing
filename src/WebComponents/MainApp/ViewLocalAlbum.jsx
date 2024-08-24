import { useEffect, useState } from "react";
import { Button, Chip } from "@nextui-org/react";
import { FaAngleLeft, FaPlay } from "react-icons/fa";
import { msToMS } from "../Backend/ExtraCode";
import { GetLocalAlbum } from "../Backend/LocalSearch";
import Cookies from "js-cookie";
import { LocalAlbumPlayback, LocalPlayback } from "../Backend/LocalPlayback";
export const ViewLocalAlbum = ({ setPage }) => {
  const [ad, setad] = useState([]);
  const aid = localStorage.getItem("tempalbumid");
  useEffect(() => {
    async function get() {
      const td = await GetLocalAlbum(aid);
      setad(td);
    }
    get();
  }, []);
  console.log(ad);
  return (
    <div className="ms-auto me-auto pb-40" style={{ width: "80%" }}>
      <div className="ms-auto me-auto flex sticky mb-4 top-4">
        <Button className="me-2" onClick={() => setPage("search")}>
          <FaAngleLeft /> Back
        </Button>
      </div>
      {/* top album info */}
      <div className="ms-auto me-auto flex">
        <div className="max-w-[200px]">
          <img
            src={`http://localhost:5000/img/${ad?.search?.albumArt}/600`}
            style={{ height: "" }}
          />
        </div>
        <div className="ms-4 mt-auto mb-auto">
          <h1 className="text-6xl">{ad?.search?.albumName}</h1>
          <h1 className="text-3xl">{ad?.search?.mainArtist}</h1>
          <p>{`${ad?.search?.label} / ${
            ad?.search?.releaseYear ? ad?.search?.releaseYear : "unknown year"
          } / ${ad?.search?.albumType}`}</p>
          <div className="pt-2">
            {!ad ? null : (
              <Button onClick={() => LocalAlbumPlayback(ad?.search?._id)}>
                <FaPlay />
                Play album
              </Button>
            )}
            <Chip className="text-white bg-gray-800 ms-4">Album from UMST</Chip>
          </div>
        </div>
      </div>
      {/* tracklist */}
      <div className="ms-auto me-auto pt-2">
        {ad?.tracks?.map((Track) => {
          return (
            <div
              className="grid grid-cols-12 mt-1 mb-1 px-3 py-2 rounded-2xl hover:bg-slate-800 cursor-pointer transition fade-in-out"
              onClick={() => LocalPlayback(Track.relAlbumId, Track.trackNo)}
            >
              <div className="col-span-1 text-md mt-auto me-2 mb-auto trackText">
                {Track.trackNo.toString().length == 1 ? (
                  <span>&nbsp;{Track.trackNo}</span>
                ) : (
                  Track.trackNo
                )}
              </div>
              <div className="ms-4 col-span-6 mt-auto mb-auto text-xl">
                {Track.trackName}
              </div>
              <div className="ms-4 col-span-4 mt-auto mb-auto text-sm">
                {Track.trackArtist}
              </div>
              <div className="ms-4 col-span-1 mt-auto mb-auto text-sm text-end trackText"></div>
            </div>
          );
        })}
        {/* copyright text */}
        <div>
          {ad?.copyright}
          <br />
          {ad?.phonoCopyright}
        </div>
      </div>
    </div>
  );
};
