import { FaSearch, FaBook, FaSpotify } from "react-icons/fa";
import { linkedToSpotify } from "../Authentication/LocalAuthentication";
import { AuthURL } from "../Backend/AuthURLBuilder";
// import { RecentlyListened } from "./HomeComponents/RecentlyListened";

export const Homepage = ({ setPage }) => {
  const lts = linkedToSpotify().linkedToSpotify;
  return (
    <>
      <div className="">
        <div>
          <h1 className="font-bold text-8xl text-center">Welcome.</h1>
          <div className="ms-auto me-auto mt-2" style={{ width: "80%" }}>
            <div className="grid grid-cols-12 gap-4">
              <div
                className="col-span-6 text-2xl bg-blue-300 leading-7 text-black p-7 rounded-3xl hover:bg-green-600 transition fade-in-out cursor-pointer"
                onClick={() => setPage("search")}
              >
                <FaSearch />
                Search library
              </div>
              {!lts ? (
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
            <div>
              {/* <h2 className="text-2xl pt-2">Recently Listened</h2> */}
              {/* <RecentlyListened /> */}
            </div>
          </center>
        </div>
      </div>
    </>
  );
};
