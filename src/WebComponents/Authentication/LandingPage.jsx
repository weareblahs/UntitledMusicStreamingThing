import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Divider,
  Link,
  Button,
} from "@nextui-org/react";
import { FaSpotify } from "react-icons/fa";
import { AuthURL } from "../Backend/AuthURLBuilder";
export const LandingPage = () => {
  return (
    <div className="center-everything bg-black p-5">
      {" "}
      <Card className="max-w-[600px] max-h-[500px]">
        <CardBody>
          <p className="ms-auto me-auto text-center text-6xl font-semibold mb-4">
            Untitled Music Streaming Thing
          </p>
          <p className="ms-auto me-auto text-center text-xl">
            Sign in with your Spotify account to access online music.
          </p>
          <Button
            className="max-w-52 bg-green-500 mt-4 ms-auto me-auto text-md font-semibold"
            onClick={() => (window.location.href = AuthURL())}
          >
            <FaSpotify />
            Sign in with Spotify
          </Button>
        </CardBody>
        <p className="text-center mb-4">
          <i>
            Do note that a Spotify Premium account is required to access full
            library.
          </i>
        </p>
      </Card>
    </div>
  );
};
