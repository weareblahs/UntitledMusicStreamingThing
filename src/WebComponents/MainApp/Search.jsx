import {
  Button,
  Input,
  Card,
  Image,
  CardBody,
  CardHeader,
  CardFooter,
  Chip,
} from "@nextui-org/react";
import { FaAngleLeft, FaPlay } from "react-icons/fa";
import debounce from "debounce";
import {
  PlaySpotifyMusic,
  SearchAlbum,
  SearchSongs,
} from "../Backend/SpotifyAPIActions";
import { useState } from "react";
import { msToMS } from "../Backend/ExtraCode";
import Cookies from "js-cookie";

import { searchLocalAlbum, searchLocalTrack } from "../Backend/LocalSearch";
import { LocalPlayback } from "../Backend/LocalPlayback";
import { AuthURL } from "../Backend/AuthURLBuilder";
export const Search = ({ setPage }) => {
  const [sd, setsd] = useState([]);
  const [spotifyAlbum, setSpotifyAlbum] = useState();
  const [spotifyTrack, setSpotifyTrack] = useState();
  const [placeholderStatus, setPS] = useState("");
  const SearchAll = async (q) => {
    await setPS("Searching...");
    const albumData = await SearchAlbum(q);
    const trackData = await SearchSongs(q);
    const localAlbumData = await searchLocalAlbum(q);
    const localTrackData = await searchLocalTrack(q);
    setsd({
      spotifyAlbum: albumData,
      spotifyTrack: trackData,
      localAlbum: localAlbumData,
      localTrack: localTrackData,
    });
    setPS("");
  };
  const SearchLocal = async (q) => {
    const localAlbumData = await searchLocalAlbum(q);
    const localTrackData = await searchLocalTrack(q);
    setsd({
      localAlbum: localAlbumData,
      localTrack: localTrackData,
    });
  };
  const DebouncedSearch = debounce((e) => SearchAll(e.target.value), 500);
  const DebouncedLocalOnlySearch = debounce(
    (e) => SearchLocal(e.target.value),
    500
  );
  console.log(sd);
  if (Cookies.get("linkedToSpotify")) {
    return (
      <>
        <div
          style={{ maxWidth: "80%" }}
          className="ms-auto me-auto flex sticky top-0"
        >
          <Button className="me-2" onClick={() => setPage("home")}>
            <FaAngleLeft /> Back
          </Button>
          <Input
            className=""
            placeholder="Search for songs, artists and albums across sources"
            onChange={(e) => DebouncedSearch(e)}
          ></Input>
        </div>
        <center className="mt-2 mb-2">
          <h1>{placeholderStatus}</h1>
        </center>
        {/* create top artist and more page */}

        {sd.localAlbum ? (
          <>
            <div className="ms-auto me-auto" style={{ width: "80%" }}>
              {Cookies.get("linkedToSpotify") ? null : (
                <center>
                  <div className="py-2 mt-2 bg-green-500 rounded-full text-black">
                    <p>
                      <i className="">
                        Search results limited. To view results from Spotify,{" "}
                        <span
                          onClick={() => {
                            window.location.href = AuthURL();
                          }}
                          className="underline cursor-pointer"
                        >
                          link to your Spotify account
                        </span>
                      </i>
                    </p>
                  </div>
                </center>
              )}
              <div className="block pt-2 text-2xl">
                <h1>Albums</h1>
              </div>
              <div className="overflow-x-scroll flex ms-auto me-auto pt-2 scrollbar-thin scrollbar-track-black scrollbar-corner-sky-500 scrollbar-thumb-slate-700">
                {sd.localAlbum.map((Album) => {
                  return (
                    <Card className="flex-shrink-0 me-4 max-w-[200px] cursor-pointer hover:bg-blue-600 transition fade-in-out">
                      <CardBody
                        onClick={() => {
                          localStorage.setItem("tempalbumid", Album._id);
                          setPage("viewLocalAlbum");
                        }}
                      >
                        <img
                          src={`http://localhost:5000/img/${Album.albumArt}/600`}
                          width={200}
                        />
                        <div className="block">
                          <h1 className="text-xl overflow-hidden truncate font-bold">
                            {Album.albumName}
                          </h1>
                          <h4 className="overflow-hidden truncate">
                            {Album.mainArtist}
                          </h4>
                          <h6>
                            {Album?.releaseYear ? Album?.releaseYear : "-"}
                            <Chip className="ms-2 bg-gray-800 text-white">
                              UMST
                            </Chip>
                          </h6>
                        </div>
                      </CardBody>
                    </Card>
                  );
                })}
                {/* spotify album */}
                {Cookies.get("linkedToSpotify")
                  ? sd.spotifyAlbum.albums.items.map((Album) => {
                      return (
                        <Card className="flex-shrink-0 me-4 max-w-[200px] cursor-pointer hover:bg-blue-600 transition fade-in-out">
                          <CardBody
                            onClick={() => {
                              localStorage.setItem("tempalbumid", Album.id);
                              setPage("viewAlbum");
                            }}
                          >
                            <img src={`${Album.images[0].url}`} width={200} />
                            <div className="block">
                              <h1 className="text-xl overflow-hidden truncate font-bold">
                                {Album.name}
                              </h1>
                              <h4 className="overflow-hidden truncate">
                                {Album.artists[0].name}
                              </h4>
                              <h6>
                                {Album.release_date.slice(0, 4)}
                                <Chip className="ms-2 bg-green-600 text-black">
                                  Spotify
                                </Chip>
                              </h6>
                            </div>
                          </CardBody>
                        </Card>
                      );
                    })
                  : null}
              </div>
            </div>
            <div className="ms-auto me-auto" style={{ width: "80%" }}>
              <div className="block pt-2 text-2xl">
                <h1>Songs</h1>
                <div className="row-span-12">
                  {sd.localTrack.map((Track) => {
                    return (
                      <>
                        <div
                          className="flex hover:bg-slate-500 transition fade-in-out rounded-3xl px-4 py-2 cursor-pointer"
                          onClick={() => {
                            LocalPlayback(Track.relAlbumId._id, Track.trackNo);
                          }}
                        >
                          <div className="flex transition fade-in-out col-span-10">
                            <div className="col-span-1 text-xs mt-auto mb-auto me-4 text-md">
                              <FaPlay />
                            </div>
                            <div className="col-span-1 mt-auto mb-auto me-4">
                              <img
                                src={
                                  Track?.relAlbumId?.albumArt
                                    ? `http://localhost:5000/img/${Track?.relAlbumId?.albumArt}/64`
                                    : `http://localhost:5000/img/undefined/400`
                                }
                                width={40}
                              />
                            </div>
                            <div className="block">
                              <div className="me-2 text-md mt-auto mb-auto">
                                {Track.trackName}
                                {
                                  /* explicit tag stuff */
                                  Track?.explicit ? (
                                    <Chip className="rounded-md ms-2">E</Chip>
                                  ) : null
                                }
                              </div>
                              <div className="text-sm">{Track.trackArtist}</div>
                            </div>
                          </div>
                          <div className="col-span-2 ms-auto text-sm mt-auto mb-auto text-center">
                            <div className="block">
                              {/* {msToMS(Track.duration_ms)} */}
                              <br />
                              <Chip className="text-xs bg-gray-800 text-white">
                                UMST
                              </Chip>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                  {/* spotify tracks */}
                  {Cookies.get("linkedToSpotify")
                    ? sd.spotifyTrack.tracks.items.map((Track) => {
                        return (
                          <>
                            <div
                              className="flex hover:bg-slate-500 transition fade-in-out rounded-3xl px-4 py-2 cursor-pointer"
                              onClick={() => {
                                PlaySpotifyMusic(Track.uri, Cookies.get("did"));
                              }}
                            >
                              <div className="flex transition fade-in-out col-span-10">
                                <div className="col-span-1 text-xs mt-auto mb-auto me-4 text-md">
                                  <FaPlay />
                                </div>
                                <div className="col-span-1 mt-auto mb-auto me-4">
                                  <img
                                    src={Track.album.images[2].url}
                                    width={40}
                                  />
                                </div>
                                <div className="block">
                                  <div className="me-2 text-md mt-auto mb-auto">
                                    {Track.name}
                                    {
                                      /* explicit tag stuff */
                                      Track.explicit ? (
                                        <Chip className="rounded-md ms-2">
                                          E
                                        </Chip>
                                      ) : null
                                    }
                                  </div>
                                  <div className="text-sm">
                                    {Track.artists[0].name}
                                  </div>
                                </div>
                              </div>
                              <div className="col-span-2 ms-auto text-sm mt-auto mb-auto text-center">
                                <div className="block">
                                  {msToMS(Track.duration_ms)}
                                  <br />
                                  <Chip className="text-xs bg-green-600 text-black">
                                    Spotify
                                  </Chip>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })
                    : null}
                </div>
              </div>
            </div>
          </>
        ) : null}
      </>
    );
  } else {
    return (
      <>
        <div
          style={{ maxWidth: "80%" }}
          className="ms-auto me-auto flex sticky top-0"
        >
          <Button className="me-2" onClick={() => setPage("home")}>
            <FaAngleLeft /> Back
          </Button>
          <Input
            className=""
            placeholder="Search for songs, artists and albums across sources"
            onChange={(e) => DebouncedLocalOnlySearch(e)}
          ></Input>
        </div>
        {/* create top artist and more page */}

        {sd.localAlbum ? (
          <>
            <div className="ms-auto me-auto" style={{ width: "80%" }}>
              <div className="block pt-2 ">
                <center>
                  <div className="py-2 mt-2 bg-green-500 rounded-full text-black">
                    <p className="text-md">
                      <i>
                        Search results limited. To view results from Spotify,{" "}
                        <span
                          onClick={() => {
                            window.location.href = AuthURL();
                          }}
                          className="underline cursor-pointer"
                        >
                          link to your Spotify account
                        </span>
                      </i>
                    </p>
                  </div>
                </center>
                <h1>Albums</h1>
                {sd.localAlbum.map((Album) => {
                  return (
                    <Card className="flex-shrink-0 me-4 max-w-[200px] cursor-pointer hover:bg-blue-600 transition fade-in-out">
                      <CardBody
                        onClick={() => {
                          localStorage.setItem("tempalbumid", Album._id);
                          setPage("viewLocalAlbum");
                        }}
                      >
                        <img
                          src={`http://localhost:5000/img/${Album.albumArt}/600`}
                          width={200}
                        />
                        <div className="block">
                          <h1 className="text-xl overflow-hidden truncate font-bold">
                            {Album.albumName}
                          </h1>
                          <h4 className="overflow-hidden truncate">
                            {Album.mainArtist}
                          </h4>
                          <h6>
                            {Album?.releaseYear ? Album?.releaseYear : "-"}
                            <Chip className="ms-2 bg-gray-800 text-white">
                              UMST
                            </Chip>
                          </h6>
                        </div>
                      </CardBody>
                    </Card>
                  );
                })}
              </div>
              <div className="overflow-x-scroll flex ms-auto me-auto pt-2 scrollbar-thin scrollbar-track-black scrollbar-corner-sky-500 scrollbar-thumb-slate-700"></div>
            </div>
            <div className="ms-auto me-auto" style={{ width: "80%" }}>
              <div className="block pt-2 text-2xl">
                <h1>Songs</h1>
                <div className="row-span-12">
                  {sd.localTrack.map((Track) => {
                    return (
                      <>
                        <div
                          className="flex hover:bg-slate-500 transition fade-in-out rounded-3xl px-4 py-2 cursor-pointer"
                          onClick={() => {
                            LocalPlayback(Track.relAlbumId._id, Track.trackNo);
                          }}
                        >
                          <div className="flex transition fade-in-out col-span-10">
                            <div className="col-span-1 text-xs mt-auto mb-auto me-4 text-md">
                              <FaPlay />
                            </div>
                            <div className="col-span-1 mt-auto mb-auto me-4">
                              <img
                                src={
                                  Track?.relAlbumId?.albumArt
                                    ? `http://localhost:5000/img/${Track?.relAlbumId?.albumArt}/64`
                                    : `http://localhost:5000/img/undefined/400`
                                }
                                width={40}
                              />
                            </div>
                            <div className="block">
                              <div className="me-2 text-md mt-auto mb-auto">
                                {Track.trackName}
                                {
                                  /* explicit tag stuff */
                                  Track?.explicit ? (
                                    <Chip className="rounded-md ms-2">E</Chip>
                                  ) : null
                                }
                              </div>
                              <div className="text-sm">{Track.trackArtist}</div>
                            </div>
                          </div>
                          <div className="col-span-2 ms-auto text-sm mt-auto mb-auto text-center">
                            <div className="block">
                              {/* {msToMS(Track.duration_ms)} */}
                              <br />
                              <Chip className="text-xs bg-gray-800 text-white">
                                UMST
                              </Chip>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        ) : null}
      </>
    );
  }
};
