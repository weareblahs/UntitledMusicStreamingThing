import { useState } from "react";
import Cookies from "js-cookie";
import { AuthURL } from "../Backend/AuthURLBuilder";
import { Homepage } from "./Homepage";
import { PlayWindow } from "../Components/PlaybackControls";
import { Search } from "./Search";
import { ViewAlbum } from "./ViewAlbum";
import { DistDash } from "./DistributionDashboard";
import { AddTrack } from "../DistDash/AddTrack";
import { UploadTracks } from "../DistDash/UploadTracks";
import { ViewLocalAlbum } from "./ViewLocalAlbum";
import { ViewSpotifyLikedTracks } from "./ViewSpotifyLikedTracks";
export const MainWindow = () => {
  const SpotifyTokenExpiry = Cookies.get("spotifyTokenExpiry");
  const [pageName, setPage] = useState("home");
  if (SpotifyTokenExpiry < Date.now()) {
    window.location.href = AuthURL();
  } else {
    return (
      <>
        {pageName == "home" ? <Homepage setPage={setPage} /> : null}
        {pageName == "search" ? <Search setPage={setPage} /> : null}
        {pageName == "viewAlbum" ? <ViewAlbum setPage={setPage} /> : null}
        {pageName == "distPortal" ? <DistDash setPage={setPage} /> : null}
        {pageName != "distPortal" ? <PlayWindow /> : null}
        {pageName == "viewLocalAlbum" ? (
          <ViewLocalAlbum setPage={setPage} />
        ) : null}
        {pageName == "viewSpotifyLikedTracks" ? (
          <ViewSpotifyLikedTracks />
        ) : null}
      </>
    );
  }
};
