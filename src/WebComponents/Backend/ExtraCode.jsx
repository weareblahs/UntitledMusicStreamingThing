export const msToMS = (millis) => {
  //https://stackoverflow.com/a/21294619/17271169
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};
