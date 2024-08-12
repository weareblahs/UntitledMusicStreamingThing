export const spotifyProperties = (property) => {
  if (property == "clientID") {
    return "3c53089d42734d9d8befc5904ba44a09";
  }
  if (property == "clientSecret") {
    return "ce7632a110f04aca84d104f24027d9bf";
  } else {
    if (!property) {
      console.log("No data specified");
    }
    return "Invalid property provided. Check console for details.";
  }
};
