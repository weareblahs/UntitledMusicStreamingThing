import {
  FaSearch,
  FaBook,
  FaSpotify,
  FaCompactDisc,
  FaSignOutAlt,
} from "react-icons/fa";
import { linkedToSpotify } from "../Authentication/LocalAuthentication";
import { AuthURL } from "../Backend/AuthURLBuilder";
import { useEffect, useState } from "react";
// import { RecentlyListened } from "./HomeComponents/RecentlyListened";
import { userProps } from "../Authentication/LocalAuthentication";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { SpotifyRecommendations } from "./SpotifyRecommendations";
export const Homepage = ({ setPage }) => {
  const lts = Cookies.get("linkedToSpotify");
  const [distPermissions, setDP] = useState(false);
  useEffect(() => {
    userProps().then((data) => setDP(data.isAdmin));
  }, []);
  const [searchClass, setSC] = useState();
  useEffect(() => {
    lts
      ? setSC(
          "col-span-12 text-2xl bg-blue-300 leading-7 text-black p-7 rounded-3xl hover:bg-green-600 transition fade-in-out cursor-pointer"
        )
      : setSC(
          "col-span-12 text-2xl bg-blue-300 leading-7 text-black p-7 rounded-3xl hover:bg-green-600 transition fade-in-out cursor-pointer"
        );
  }, []);

  return (
    <>
      <div className="flex ">
        <div className="ms-auto me-auto">
          <div>
            <h1 className="font-bold text-6xl text-center">
              Welcome,{" "}
              {console.log(
                `Your user ID is ${
                  jwtDecode(Cookies.get("userToken")).data._id
                }`
              )}
              {jwtDecode(Cookies.get("userToken")).data.fullname.split(" ")[0]}.
            </h1>
            {!lts ? (
              <center>
                <div
                  className="col-span-12 text-2xl mt-2 bg-blue-300 leading-7 w-96 text-black p-7 rounded-3xl hover:bg-green-600 transition fade-in-out cursor-pointer"
                  onClick={() => (window.location.href = AuthURL())}
                >
                  <FaSpotify />
                  Link to Spotify
                </div>
              </center>
            ) : null}
            <div className="mb-2">
              <div className="flex gap-8 ms-auto me-auto">
                <div
                  className="text-2xl mt-4 w-96 bg-blue-300 leading-7 text-black p-7 rounded-3xl hover:bg-green-600 transition fade-in-out cursor-pointer"
                  onClick={() => setPage("search")}
                >
                  <FaSearch />
                  Search library
                </div>

                {distPermissions == true ? (
                  <div
                    className="col-span-6 text-2xl mt-4 bg-blue-300 leading-7 w-96 text-black p-7 rounded-3xl hover:bg-green-600 transition fade-in-out cursor-pointer"
                    onClick={() => setPage("distPortal")}
                  >
                    <FaCompactDisc />
                    Dashboard
                  </div>
                ) : null}
                <div
                  className="col-span-6 text-2xl mt-4 bg-blue-300 leading-7 w-96 text-black p-7 rounded-3xl hover:bg-green-600 transition fade-in-out cursor-pointer"
                  onClick={() => {
                    Cookies.remove("userToken");
                    window.location.href = "/";
                  }}
                >
                  <FaSignOutAlt />
                  Log out
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ms-auto me-auto mt-2" style={{ width: "77%" }}>
        <SpotifyRecommendations setPage={setPage} />
      </div>
    </>
  );
};
