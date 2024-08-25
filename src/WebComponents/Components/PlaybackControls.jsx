import { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";

import {
  WebPlaybackSDK,
  usePlaybackState,
  usePlayerDevice,
  useSpotifyPlayer,
} from "react-spotify-web-playback-sdk";
import { Button, Chip, Image } from "@nextui-org/react";
import {
  MdSkipPrevious,
  MdPlayArrow,
  MdPause,
  MdSkipNext,
} from "react-icons/md";
import { ConnectToDevice } from "../Backend/SpotifyAPIActions";
import { Seekbar } from "react-seekbar";
import { msToMS, stoMS } from "../Backend/ExtraCode";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import axios from "axios";
export const PlayWindow = () => {
  const getOAuthToken = useCallback((callback) => {
    const token = Cookies.get("spotifyAccessToken");
    callback(token);
  }, []);
  const [playbackSource, setSource] = useState(null);
  setInterval(() => {
    setSource(Cookies.get("playbackSource"));
  }, 1000);

  return (
    <WebPlaybackSDK
      initialDeviceName="Untitled Music Streaming Thing"
      getOAuthToken={getOAuthToken}
      volume={0.5}
      connectOnInitialized={true}
    >
      {playbackSource == "UMST" ? (
        <>
          <div style={{ visibility: "hidden" }}>
            <SpotifyPlayWindow style={{ visibility: "hidden" }} />
          </div>
          <div>
            <LocalPlayWindow />
          </div>
        </>
      ) : (
        <>
          <div>
            <SpotifyPlayWindow />
          </div>
          <div style={{ visibility: "hidden" }}>
            <LocalPlayWindow />
          </div>
        </>
      )}
    </WebPlaybackSDK>
  );

  // <LocalPlayWindow/>
};

const SpotifyPlayWindow = () => {
  const player = useSpotifyPlayer();
  const device = usePlayerDevice();
  const playbackState = usePlaybackState();
  const PlaybackSource = "Spotify";
  const [sps, setSPS] = useState("Spotify");
  useEffect(() => {
    if (!device?.device_id) return undefined;
    Cookies.set("did", device?.device_id);
    ConnectToDevice(device?.device_id);
  }, [device]);
  setInterval(() => {
    Cookies.get("playbackSource")
      ? setSPS(Cookies.get("playbackSource"))
      : Cookies.set("playbackSource", "spotify");
  }, 1000);
  useEffect(() => {
    sps == "Spotify" ? null : player?.pause();
  }, [sps]);

  if (!playbackState) return null;
  return (
    <>
      <div
        className="grid grid-cols-12 gap-4 ms-auto me-auto fixed-bottom mb-10  px-20 py-4 rounded-full bg-slate-500 bg-opacity-40 backdrop-filter backdrop-blur"
        style={{ width: "75%" }}
      >
        <div class="col-span-5 mt-auto mb-auto">
          <div className="grid grid-cols-6">
            <div className="col-span-6 flex">
              <img
                src={
                  playbackState.track_window?.current_track?.album.images[0].url
                }
                className="max-w-20 max-h-20 mt-auto mb-auto"
              ></img>
              <div className="block ms-4">
                <h6 className="text-xl">
                  <b>{playbackState.track_window?.current_track?.name}</b>
                </h6>
                <h6 className="text-sm">
                  {playbackState.track_window?.current_track?.artists?.[0].name}
                </h6>
                <h6 className="mt-1">
                  <span className="text-xs bg-green-500 text-black p-1 rounded-full px-3">
                    {PlaybackSource}
                  </span>{" "}
                  <span className="text-xs bg-green-500 text-black p-1 rounded-full px-3">
                    {PlaybackSource == "Spotify" ? "AAC 256kbps" : null}
                  </span>
                </h6>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-4 mt-auto mb-auto">
          <div>
            <center>
              <div>
                <button
                  onClick={() => player.previousTrack()}
                  className="text-white text-3xl ms-2 me-2 p-2 rounded-2xl "
                >
                  <MdSkipPrevious className="transition fade-in-out hover:text-green-500" />
                </button>
                <button
                  onClick={() => player.togglePlay()}
                  className="text-black bg-slate-200 transition fade-in-out hover:bg-green-500 motion-reduce:transition-none motion-reduce:hover:transform-none text-3xl ms-2 me-2 p-2 rounded-2xl"
                >
                  {playbackState ? (
                    playbackState?.paused ? (
                      <MdPlayArrow className="transition fade-in-out hover:text-white" />
                    ) : (
                      <MdPause className="transition fade-in-out hover:text-white" />
                    )
                  ) : null}
                </button>
                <button
                  onClick={() => player.nextTrack()}
                  className="text-white text-3xl ms-2 me-2 p-2 rounded-2xl"
                >
                  <MdSkipNext className="transition fade-in-out hover:text-green-500" />
                </button>
              </div>
            </center>
            <div className="d-flex ms-auto me-auto py-2">
              <div className="w-25 text-end me-4 py-0.5">
                {msToMS(playbackState?.position)}
              </div>
              <div className="py-1">
                <Seekbar
                  position={playbackState?.position}
                  duration={playbackState?.duration}
                  onSeek={(position) => player.seek(position)}
                  className="w-96"
                />
              </div>

              <div className="w-25 text-start ms-4 py-0.5">
                {msToMS(playbackState?.duration)}
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-3 mt-auto mb-auto">
          <div className="col-span-12"></div>
        </div>
      </div>
    </>
  );
};

const LocalPlayWindow = () => {
  const PlaybackSource = "UMST";
  const { load, togglePlayPause, playing, getPosition, duration, seek, stop } =
    useGlobalAudioPlayer();
  const [trackList, setTrackList] = useState([]);
  const [track, setTrack] = useState();
  const [tid, setTID] = useState(""); // track id
  const [lps, setLPS] = useState(false); // lost playback state? i forgot what did i just named
  const [pm, setPM] = useState("single"); // playback mode
  const [ps, setPS] = useState("UMST");
  const [song, index] = useState(0);
  const [url, setURL] = useState(["undefined"]);
  const [ndl, setNDL] = useState(0);
  const [aid, setAID] = useState("");
  useEffect(() => {
    Cookies.get("localPlaylist")
      ? setURL(Cookies.get("localPlaylist").split("|"))
      : null;
  }, []);
  setInterval(() => {
    Cookies.get("localPlaybackAlbumID")
      ? setAID(Cookies.get("localPlaybackAlbumID"))
      : null;
    Cookies.get("currentLocalTrack")
      ? setTrack(Cookies.get("currentLocalTrack"))
      : null;
    Cookies.get("localPlaybackLocation")
      ? setTID(Cookies.get("localPlaybackLocation"))
      : null;
    Cookies.get("localPlaybackLocation")
      ? setLPS(Cookies.get("localPlaybackLocation"))
      : null;
    Cookies.get("playbackSource") ? setPS(Cookies.get("playbackSource")) : null;
    Cookies.get("playbackMode") ? setPM(Cookies.get("playbackMode")) : null;
    Cookies.get("localPlaylist")
      ? setURL(Cookies.get("localPlaylist").split("|"))
      : null;
    Cookies.get("ndl") ? setNDL(Cookies.get("ndl")) : null;
  }, 1000);
  useEffect(() => {
    if (url) {
      console.log(url);
      load(url[song], {
        autoplay: ps == "UMST" ? true : false,
        onend: () => {
          index(song + 1);

          axios
            .get(`http://localhost:5000/search/singleTrack/${aid}/${song + 2}`)
            .then((res) => {
              console.log(res.data);
              Cookies.set("currentLocalTrackName", res.data.trackName);
              Cookies.set("currentLocalTrackArtist", res.data.trackArtist);
              Cookies.set("currentLocalAlbumArt", res.data.relAlbumID.albumArt);
            });
        },
      });
    } else {
    }
  }, [song, load, ndl, lps]);

  useEffect(() => {
    lps ? null : stop();
  }, [lps]);
  const [playbackState, setPlayback] = useState(true);

  return (
    <>
      {/* <ReactHowler src={url} playing={playbackState} /> */}

      <div
        className="grid grid-cols-12 gap-4 ms-auto me-auto fixed-bottom mb-10  px-20 py-4 rounded-full bg-slate-500 bg-opacity-40 backdrop-filter backdrop-blur"
        style={{ width: "75%" }}
      >
        <div class="col-span-5 mt-auto mb-auto">
          <div className="grid grid-cols-6">
            <div className="col-span-6 flex">
              <img
                src={`http://localhost:5000/img/${Cookies.get(
                  "currentLocalAlbumArt"
                )}/600`}
                className="max-w-20 max-h-20 mt-auto mb-auto"
              ></img>
              <div className="block ms-4">
                <h6 className="text-xl">
                  <b>
                    {Cookies.get("currentLocalTrackName") != "undefined"
                      ? Cookies.get("currentLocalTrackName")
                      : " "}
                  </b>
                </h6>
                <h6 className="text-sm">
                  {Cookies.get("currentLocalTrackArtist") != "undefined"
                    ? Cookies.get("currentLocalTrackArtist")
                    : " "}
                </h6>
                <h6 className="mt-1">
                  <span className="text-xs bg-gray-800 text-white p-1 rounded-full px-3">
                    {PlaybackSource}
                  </span>{" "}
                  <span className="text-xs bg-gray-800 text-white p-1 rounded-full px-3">
                    {PlaybackSource == "UMST" ? "Hi-res FLAC" : null}
                  </span>
                </h6>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-4 mt-auto mb-auto">
          <div>
            <center>
              <div>
                <button
                  onClick={() => {
                    if (song == 1) {
                      axios
                        .get(
                          `http://localhost:5000/search/singleTrack/${aid}/1`
                        )
                        .then((res) => {
                          Cookies.set(
                            "currentLocalTrackName",
                            res.data.trackName
                          );
                          Cookies.set(
                            "currentLocalTrackArtist",
                            res.data.trackArtist
                          );
                          Cookies.set(
                            "currentLocalAlbumArt",
                            res.data.relAlbumID.albumArt
                          );
                        });
                      index(song - 1);
                    } else {
                      if (song == 0) {
                        null;
                      } else {
                        axios
                          .get(
                            `http://localhost:5000/search/singleTrack/${aid}/${song}`
                          )
                          .then((res) => {
                            console.log(res.data);
                            Cookies.set(
                              "currentLocalTrackName",
                              res.data.trackName
                            );
                            Cookies.set(
                              "currentLocalTrackArtist",
                              res.data.trackArtist
                            );
                            Cookies.set(
                              "currentLocalAlbumArt",
                              res.data.relAlbumID.albumArt
                            );
                          });
                        index(song - 1);
                      }
                    }
                  }}
                  className="text-white text-3xl ms-2 me-2 p-2 rounded-2xl "
                >
                  <MdSkipPrevious className="transition fade-in-out hover:text-green-500" />
                </button>
                <button
                  // onClick={() => player.togglePlay()}
                  className="text-black bg-slate-200 transition fade-in-out hover:bg-green-500 motion-reduce:transition-none motion-reduce:hover:transform-none text-3xl ms-2 me-2 p-2 rounded-2xl"
                >
                  {playing ? (
                    <MdPause
                      className="transition fade-in-out hover:text-white"
                      onClick={() => togglePlayPause()}
                    />
                  ) : (
                    <MdPlayArrow
                      className="transition fade-in-out hover:text-white"
                      onClick={() => togglePlayPause()}
                    />
                  )}
                </button>
                <button
                  onClick={() => {
                    index(song + 1);
                    axios
                      .get(
                        `http://localhost:5000/search/singleTrack/${aid}/${
                          song + 2
                        }`
                      )
                      .then((res) => {
                        console.log(res.data);
                        Cookies.set(
                          "currentLocalTrackName",
                          res.data.trackName
                        );
                        Cookies.set(
                          "currentLocalTrackArtist",
                          res.data.trackArtist
                        );
                        Cookies.set(
                          "currentLocalAlbumArt",
                          res.data.relAlbumID.albumArt
                        );
                      });
                  }}
                  className="text-white text-3xl ms-2 me-2 p-2 rounded-2xl"
                >
                  <MdSkipNext className="transition fade-in-out hover:text-green-500" />
                </button>
              </div>
            </center>
            <div className="d-flex ms-auto me-auto py-2">
              <div className="w-25 text-end me-4 py-0.5">
                {stoMS(getPosition())}
              </div>
              <div className="py-1">
                <Seekbar
                  position={getPosition()}
                  duration={duration}
                  onSeek={(position) => {
                    seek(position);
                  }}
                  className="w-96"
                />
              </div>

              <div className="w-25 text-start ms-4 py-0.5">
                {stoMS(duration)}
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-3 mt-auto mb-auto">
          <div className="col-span-12"></div>
        </div>
      </div>
    </>
  );
};
const Test = () => {
  return "Placeholder playback";
};
