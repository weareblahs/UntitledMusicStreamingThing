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
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

export const LandingPage = () => {
  const { login, register } = useKindeAuth();
  return (
    <div className="center-everything bg-black p-5">
      {" "}
      <Card className="max-w-[600px] max-h-[500px]">
        <CardBody>
          <p className="ms-auto me-auto text-center text-6xl font-semibold mb-4">
            Untitled Music Streaming Thing
          </p>
          <p className="ms-auto me-auto text-center text-xl">
            Sign in with your own account. After this, you are able to listen to
            online music, or manage your music.
          </p>
          <div className="flex ms-auto me-auto mt-2">
            <Button
              className="max-w-52 bg-white me-4 text-black text-md font-semibold"
              onClick={login}
            >
              Sign in
            </Button>
            <Button
              className="max-w-52 bg-white text-black text-md font-semibold"
              onClick={register}
            >
              Sign up
            </Button>
          </div>
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
