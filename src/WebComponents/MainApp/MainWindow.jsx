import { useState } from "react";
import Cookies from "js-cookie";
import { AuthURL } from "../Backend/AuthURLBuilder";
import { Homepage } from "./Homepage";
import { PlayWindow } from "../Components/PlaybackControls";
import { Search } from "./Search";
import { ViewAlbum } from "./ViewAlbum";
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
        <PlayWindow />
      </>
    );
  }
};
