![image](https://github.com/user-attachments/assets/26b26e5c-1cba-4de6-b215-41a78d320edc)

# About this project

This is a web player that plays from Spotify or your local sources (that can be uploaded to your local server via "Distribution Dashboard").

# How to get started?

## Before you start

You are required to provide your Spotify Client ID and Client Secret for the app. See `src/WebComponents/Backend/SpotifyClientData.jsx.template` for details on how to set it up.

## 1. Set up the server.

The server is explicitly required for the usage of Untitled Music Streaming Thing, as it uses the server to log in. Host it locally on port 5000 for your own access. See [here](https://github.com/weareblahs/UMSTServer) for more details about the server.

## 2. Clone this repository.

After you finally get the server up and running, clone this repository.

```bash
git clone https://github.com/weareblahs/UntitledMusicStreamingThing
cd UntitledMusicStreamingThing
```

## 3. Install required modules for the app to run.

This will install all required modules for UMST to run properly.

```bash
npm install
```

## 4. Start UMST and register a local account.

After you added all required modules, start the server.

```bash
npm run dev
```

Then, go to the following address:

```
http://localhost:5000
```

Click on the "Sign up" button and follow the instructions.

## 5. Link to your Spotify account.

After logging in, click on "Link to Spotify" and follow the instructions to link to your Spotify account.

# Known bugs

- Sometimes the Spotify Web Playback SDK won't work. This can be resolved with sereval refreshes.
- Progress bar for Spotify won't update until an action is made (example: pause, next, previous, etc.)

# Credits (otherwise known as "What does this project use?")

| Application / Component name                                                                  | Usage                                                                                                   |
| --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| [MongoDB](https://www.mongodb.com/)                                                           | Backend database                                                                                        |
| [Express.js](https://expressjs.com/)                                                          | Backend API Controls                                                                                    |
| [React](https://react.dev/)                                                                   | Frontend (app) code                                                                                     |
| [Node.js](https://nodejs.org/en)                                                              | Frontend/backend base                                                                                   |
| [NextUI](https://nextui.org/)                                                                 | User interface framework                                                                                |
| [Tailwind CSS](https://tailwindcss.com/)                                                      | Custom styling                                                                                          |
| [react-spotify-web-playback-sdk](https://github.com/y-hiraoka/react-spotify-web-playback-sdk) | Spotify playback SDK wrapper for React that allows me to integrate efficently                           |
| [ky](https://github.com/sindresorhus/ky)                                                      | Used for all fetch requests on the frontend                                                             |
| [tailwind-scrollbar](https://github.com/adoxography/tailwind-scrollbar)                       | Scrollbar for album search                                                                              |
| [react-seekbar](https://github.com/kangju2000/react-seekbar)                                  | Seekbar for playback component on frontend                                                              |
| [Font Awesome](https://github.com/FortAwesome/Font-Awesome)                                   | Icons. via [react-icons](https://github.com/react-icons/react-icons)                                    |
| [Bootstrap Icons](https://github.com/twbs/icons)                                              | Icons. via [react-icons](https://github.com/react-icons/react-icons)                                    |
| [Radio Canada Big via Google Fonts](https://fonts.google.com/specimen/Radio+Canada+Big)       | Main font used for frontend                                                                             |
| [Inconsolata via Google Fonts](https://fonts.google.com/specimen/Inconsolata)                 | Font used for track number and length                                                                   |
| [js-cookie](https://github.com/js-cookie/js-cookie)                                           | Used for getting and setting cookies used in the current session                                        |
| [react-router](https://github.com/remix-run/react-router) - frontend uses react-router-dom    | Used for routing to different components and pages                                                      |
| [jwt-decode](https://github.com/auth0/jwt-decode)                                             | Used for decoding JWT-encoded tokens at the backend                                                     |
| [JSON Web Tokens](https://jwt.io/)                                                            | Used for encoding user data into token                                                                  |
| [debounce](https://github.com/sindresorhus/debounce)                                          | Used for delaying the search bar change state to prevent rate limits                                    |
| [react-use-audio-player](https://github.com/E-Kuerschner/useAudioPlayer)                      | Local file playback (including playlist). Powered by [howler.js](https://github.com/goldfire/howler.js) |

## Other credits

- Music icon for placeholder image via [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Simple_Music.svg), uploaded by [Tokyoship](https://commons.wikimedia.org/wiki/User:Tokyoship).

Some credits for code (such as Stack Overflow code) can be found under comments in the code.

## More questions

- How to make a user an administrator so that they can access the Distribution Portal, which is required to upload music to the platform?

1. Encode `e92007c04006d555762093c6efa650fe` into Base64. You can use free tools to encode it, such as `https://base64encode.org`.
2. Go to `http://localhost:5000/users/(BASE64_ENCODED_STRING)` on your browser, where the `BASE64_ENCODED_STRING` is the result from Step 1 (hint: starts with ZTky...)
3. Get current user ID after logging in into Untitled Music Streaming Thing by opening up the console under Developer Tools. This will be used.
4. Follow the instructions from the response given in Step 2.
