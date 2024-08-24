import Cookies from "js-cookie";
function getQueryVariable(variable) {
  //url replace
  var query = window.location.href.split("/loginAuth#")[1];
  console.log(query);
  var vars = query.split("&");
  console.log(vars);
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    console.log(pair);
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return false;
}
export const LoginMiddleware = () => {
  Cookies.set(
    "spotifyAccessHeader",
    `${getQueryVariable("token_type")} ${getQueryVariable("access_token")}`
  );
  Cookies.set("spotifyAccessToken", `${getQueryVariable("access_token")}`);
  Cookies.set(
    "spotifyTokenExpiry",
    parseInt(Date.now()) + 1 * (60 * 60 * 1000)
  );
  Cookies.set("linkedToSpotify", true);
  Cookies.set("setSpotifySession", true);
  Cookies.set("playbackSource", "spotify");
  window.location.href = "/";
};
