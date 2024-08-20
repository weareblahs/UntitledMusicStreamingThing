import { FaSearch, FaBook, FaSpotify, FaCompactDisc } from "react-icons/fa";
import { linkedToSpotify } from "../Authentication/LocalAuthentication";
import { AuthURL } from "../Backend/AuthURLBuilder";
import { useEffect, useState } from "react";
// import { RecentlyListened } from "./HomeComponents/RecentlyListened";
import { userProps } from "../Authentication/LocalAuthentication";
export const Homepage = ({ setPage }) => {
  const lts = linkedToSpotify().linkedToSpotify;
  const [distPermissions, setDP] = useState(false);
  useEffect(() => {
    userProps().then((data) => setDP(data.isAdmin));
    console.log(distPermissions);
  }, []);
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
  console.log(AuthURL());
  return (
    <>
      <div
        className="flex"
        style={{
          height: "60vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
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
                {distPermissions == "true" ? (
                  <div
                    className="col-span-6 text-2xl mt-4 bg-blue-300 leading-7 text-black p-7 rounded-3xl hover:bg-green-600 transition fade-in-out cursor-pointer"
                    onClick={() => (window.location.href = AuthURL())}
                  >
                    <FaSpotify />
                    Link to Spotify
                  </div>
                ) : null}
              </div>
              {distPermissions == true ? (
                <div
                  className="col-span-6 text-2xl mt-4 bg-blue-300 leading-7 text-black p-7 rounded-3xl hover:bg-green-600 transition fade-in-out cursor-pointer"
                  onClick={() => setPage("distPortal")}
                >
                  <FaCompactDisc />
                  Distribution Portal
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
