import { Card, CardBody } from "@nextui-org/card";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { Switch } from "@nextui-org/react";
import { FinalProperties } from "../Backend/DistributionDashboardActions";
export const MoreInformation = () => {
  const [info, setInfo] = useState([]);
  const [availableState, setAS] = useState(false);
  const changeInfo = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  console.log(availableState);
  return (
    <>
      {/* // props: copyright, phonoCopyright | POST /addCopyrightInfo*/}
      {/* POST /setAvailable/:id/:bool */}

      <div className="ms-auto me-auto" style={{ width: "80%" }}>
        <h1 className="text-2xl">Add details</h1>
        <p className="text-xl">
          Last step: add copyright information and set album publishing status.
        </p>
        <div className="flex mt-2">
          <Card className="me-4" style={{ width: "50%" }}>
            <CardBody>
              <label>Copyright text (&copy;)</label>
              <Input name="copyright" onChange={(e) => changeInfo(e)}></Input>
            </CardBody>
          </Card>
          <Card className="me-4" style={{ width: "50%" }}>
            <CardBody>
              <label>
                Sound recording / phonograph copyright text (&#8471;)
              </label>
              <Input
                name="phonoCopyright"
                onChange={(e) => changeInfo(e)}
              ></Input>
            </CardBody>
          </Card>
        </div>
        <center>
          {" "}
          <div className="mt-3">
            <span className="me-2">Album availability</span>
            <Button
              className={`${availableState ? "bg-green-500" : null}`}
              onClick={() => {
                availableState ? setAS(false) : setAS(true);
                setInfo({ ...info, availableState });
                console.log(info);
              }}
            >
              {availableState
                ? "Available for streaming"
                : "Not available for streaming"}
            </Button>
          </div>
        </center>
        <Button
          className="hover:bg-green-500 hover:text-black w-100 mt-4 ms-auto me-auto"
          onClick={() =>
            FinalProperties(
              info,
              availableState,
              localStorage.getItem("tempdistdashalbumid")
            )
          }
        >
          <span className="">Submit album</span>
        </Button>
      </div>
    </>
  );
};
