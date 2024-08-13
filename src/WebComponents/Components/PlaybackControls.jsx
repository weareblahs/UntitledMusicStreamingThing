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
import { msToMS } from "../Backend/ExtraCode";
import { ViewAlbum } from "../MainApp/ViewAlbum";
export const PlayWindow = () => {
  const getOAuthToken = useCallback((callback) => {
    const token = Cookies.get("spotifyAccessToken");
    callback(token);
  }, []);

  return (
    <WebPlaybackSDK
      initialDeviceName="Untitled Music Streaming Thing"
      getOAuthToken={getOAuthToken}
      volume={0.5}
      connectOnInitialized={true}
    >
      <SpotifyPlayWindow />
    </WebPlaybackSDK>
  );
  // <LocalPlayWindow/>
};

const SpotifyPlayWindow = () => {
  const player = useSpotifyPlayer();
  const device = usePlayerDevice();
  const playbackState = usePlaybackState();
  const PlaybackSource = "Spotify";

  useEffect(() => {
    if (!device?.device_id) return undefined;
    Cookies.set("did", device?.device_id);
    ConnectToDevice(device?.device_id);
  }, [device]);
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
