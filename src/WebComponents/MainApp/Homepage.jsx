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
export const Homepage = ({ setPage }) => {
  const lts = Cookies.get("linkedToSpotify");
  const [distPermissions, setDP] = useState(false);
  useEffect(() => {
    userProps().then((data) => setDP(data.isAdmin));
    console.log(distPermissions);
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
            <h1 className="font-bold text-6xl text-center mt-4 mb-4">
              Welcome,{" "}
              {jwtDecode(Cookies.get("userToken")).data.fullname.split(" ")[0]}.
            </h1>
            <div className="ms-auto me-auto mt-2" style={{ width: "80%" }}>
              <div className="grid grid-cols-12 gap-4">
                <div className={searchClass} onClick={() => setPage("search")}>
                  <FaSearch />
                  Search library
                </div>
                {!lts ? (
                  <div
                    className="col-span-12 text-2xl bg-blue-300 leading-7 text-black p-7 rounded-3xl hover:bg-green-600 transition fade-in-out cursor-pointer"
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
              <div
                className="col-span-6 text-2xl mt-4 bg-blue-300 leading-7 text-black p-7 rounded-3xl hover:bg-green-600 transition fade-in-out cursor-pointer"
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
    </>
  );
};
