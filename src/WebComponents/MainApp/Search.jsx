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
import { SearchTopArtist } from "../Backend/SpotifyAPIActions";
export const Search = ({ setPage }) => {
  const [sd, setsd] = useState([]);
  const SearchAll = async (q) => {
    const albumData = await SearchAlbum(q);
    const trackData = await SearchSongs(q);
    const topArtistData = await SearchTopArtist(q);
    setsd({
      spotifyAlbum: albumData,
      spotifyTrack: trackData,
      spotifyArtistTopMatch: topArtistData,
    });
  };
  const DebouncedSearch = debounce((e) => SearchAll(e.target.value), 500);
  console.log(sd);
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
      {/* create top artist and more page */}

      {sd.spotifyAlbum ? (
        <>
          <div className="ms-auto me-auto" style={{ width: "80%" }}>
            <div className="block pt-2 text-2xl">
              <h1>Albums</h1>
            </div>

            <div className="overflow-x-scroll flex ms-auto me-auto pt-2 scrollbar-thin scrollbar-track-black scrollbar-corner-sky-500 scrollbar-thumb-slate-700">
              {sd.spotifyAlbum.albums.items.map((Album) => {
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
              })}
            </div>
          </div>
          <div className="ms-auto me-auto" style={{ width: "80%" }}>
            <div className="block pt-2 text-2xl">
              <h1>Songs</h1>
              <div className="row-span-12">
                {sd.spotifyTrack.tracks.items.map((Track) => {
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
                            <img src={Track.album.images[2].url} width={40} />
                          </div>
                          <div className="block">
                            <div className="me-2 text-md mt-auto mb-auto">
                              {Track.name}
                              {
                                /* explicit tag stuff */
                                Track.explicit ? (
                                  <Chip className="rounded-md ms-2">E</Chip>
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
                })}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};
