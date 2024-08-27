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
import {
  linkedToSpotify,
  loginUser,
  registerUser,
} from "./LocalAuthentication";
export const LandingPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState("landing");
  const [loginInfo, setLoginInfo] = useState([]);
  const [registerInfo, setRegisterInfo] = useState([]);
  const [passwordToCompare, setConfirmPassword] = useState("");
  const notAKeyloggerButItsUsedForLoginPurposes = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };
  const notAKeyloggerButItsUsedForRegistrationPurposes = (e) => {
    setRegisterInfo({ ...registerInfo, [e.target.name]: e.target.value });
  };
  console.log(passwordToCompare);
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
                listen to online music.
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
            <p className="text-center mb-4 px-5">
              <i>
                Do note that a Spotify Premium account is required to access
                full library. To link your Spotify Premium account, please go to
                "Link Spotify account" after logging in.
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
              <Input
                name="username"
                onChange={(e) => notAKeyloggerButItsUsedForLoginPurposes(e)}
              ></Input>
              <label>Password</label>
              <Input
                name="password"
                type="password"
                onChange={(e) => notAKeyloggerButItsUsedForLoginPurposes(e)}
              ></Input>
              <div className="flex ms-auto me-auto mt-2">
                <Button
                  className="max-w-52 bg-white me-4 text-black text-md font-semibold"
                  onClick={async () => console.log(await loginUser(loginInfo))}
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
                Register
              </p>
              <label>Name</label>
              <Input
                name="fullname"
                onChange={(e) =>
                  notAKeyloggerButItsUsedForRegistrationPurposes(e)
                }
              ></Input>
              <label>Username</label>
              <Input
                name="username"
                onChange={(e) =>
                  notAKeyloggerButItsUsedForRegistrationPurposes(e)
                }
              ></Input>
              <label>Password</label>
              <Input
                name="password"
                type="password"
                onChange={(e) =>
                  notAKeyloggerButItsUsedForRegistrationPurposes(e)
                }
              ></Input>
              <label>Confirm password</label>
              <Input
                name="password2"
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Input>
              <div className="flex ms-auto me-auto mt-2">
                <Button
                  className="max-w-52 bg-white me-4 text-black text-md font-semibold"
                  onClick={() => registerUser(registerInfo, passwordToCompare)}
                >
                  Register account
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
