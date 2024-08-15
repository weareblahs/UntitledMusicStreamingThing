import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Divider,
  Link,
  Button,
  Input,
} from "@nextui-org/react";
import { FaAngleLeft, FaSpotify } from "react-icons/fa";
import { AuthURL } from "../Backend/AuthURLBuilder";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

export const LandingPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState("landing");
  return (
    <>
      {page == "landing" ? (
        <div className="center-everything bg-black p-5">
          {" "}
          <Card className="max-w-[600px] max-h-[500px]">
            <CardBody>
              <p className="ms-auto me-auto text-center text-6xl font-semibold mb-4">
                Untitled Music Streaming Thing
              </p>
              <p className="ms-auto me-auto text-center text-xl">
                Sign in with your own account. After this, you are able to
                listen to online music, or manage your music.
              </p>
              <div className="flex ms-auto me-auto mt-2">
                <Button
                  className="max-w-52 bg-white me-4 text-black text-md font-semibold"
                  onClick={() => setPage("login")}
                >
                  Sign in
                </Button>
                <Button
                  className="max-w-52 bg-white text-black text-md font-semibold"
                  onClick={() => setPage("register")}
                >
                  Sign up
                </Button>
              </div>
            </CardBody>
            <p className="text-center mb-4">
              <i>
                Do note that a Spotify Premium account is required to access
                full library.
              </i>
            </p>
          </Card>
        </div>
      ) : null}
      {page == "login" ? (
        <div className="center-everything bg-black p-5">
          {" "}
          <Card className="min-w-[600px] max-w-[1280px] max-h-[500px]">
            <CardBody>
              <Button
                className="max-w-[100px]"
                onClick={() => setPage("landing")}
              >
                <FaAngleLeft /> Back
              </Button>
              <p className="ms-auto me-auto text-center text-6xl font-semibold mb-4">
                Sign in
              </p>
              <label>Username</label>
              <Input></Input>
              <label>Password</label>
              <Input></Input>
              <div className="flex ms-auto me-auto mt-2">
                <Button
                  className="max-w-52 bg-white me-4 text-black text-md font-semibold"
                  onClick={() => setPage("login")}
                >
                  Sign in
                </Button>
              </div>
            </CardBody>
            <p className="text-center mb-4"></p>
          </Card>
        </div>
      ) : null}
      {page == "register" ? (
        <div className="center-everything bg-black p-5">
          {" "}
          <Card className="min-w-[600px] max-w-[1280px] max-h-[500px]">
            <CardBody>
              <Button
                className="max-w-[100px]"
                onClick={() => setPage("landing")}
              >
                <FaAngleLeft /> Back
              </Button>
              <p className="ms-auto me-auto text-center text-6xl font-semibold mb-4">
                Sign in
              </p>
              <label>Username</label>
              <Input></Input>
              <label>Password</label>
              <Input></Input>
              <label>Confirm password</label>
              <Input></Input>
              <div className="flex ms-auto me-auto mt-2">
                <Button
                  className="max-w-52 bg-white me-4 text-black text-md font-semibold"
                  onClick={() => setPage("login")}
                >
                  Sign in
                </Button>
              </div>
            </CardBody>
            <p className="text-center mb-4"></p>
          </Card>
        </div>
      ) : null}
    </>
  );
};
