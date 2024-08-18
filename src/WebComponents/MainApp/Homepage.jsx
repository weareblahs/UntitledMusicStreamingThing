import { FaSearch, FaBook, FaSpotify } from "react-icons/fa";
import { linkedToSpotify } from "../Authentication/LocalAuthentication";
import { AuthURL } from "../Backend/AuthURLBuilder";
import { useEffect, useState } from "react";
// import { RecentlyListened } from "./HomeComponents/RecentlyListened";

export const Homepage = ({ setPage }) => {
  const lts = linkedToSpotify().linkedToSpotify;
  const [searchClass, setSC] = useState();
  useEffect(() => {
    lts == false
      ? setSC(
          "col-span-6 text-2xl bg-blue-300 leading-7 text-black p-7 rounded-3xl hover:bg-green-600 transition fade-in-out cursor-pointer"
        )
      : setSC(
          "col-span-12 text-2xl bg-blue-300 leading-7 text-black p-7 rounded-3xl hover:bg-green-600 transition fade-in-out cursor-pointer"
        );
  }, []);
  return (
    <>
      <div className="ms-auto me-auto">
        <div>
          <h1 className="font-bold text-8xl text-center">Welcome.</h1>
          <div className="ms-auto me-auto mt-2" style={{ width: "80%" }}>
            <div className="grid grid-cols-12 gap-4">
              <div className={searchClass} onClick={() => setPage("search")}>
                <FaSearch />
                Search library
              </div>
              {lts == "false" ? (
                <div
                  className="col-span-6 text-2xl bg-blue-300 leading-7 text-black p-7 rounded-3xl hover:bg-green-600 transition fade-in-out cursor-pointer"
                  onClick={() => (window.location.href = AuthURL())}
                >
                  <FaSpotify />
                  Link to Spotify
                </div>
              ) : null}
            </div>
          </div>
          <center>
            <div></div>
          </center>
        </div>
      </div>
    </>
  );
};
