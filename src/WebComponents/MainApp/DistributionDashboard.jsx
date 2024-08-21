import { FaAngleLeft, FaPlus } from "react-icons/fa";
import { AddAlbumBtn } from "../DistDash/AddAlbum";
import { Button, Card, CardBody } from "@nextui-org/react";
import { SDAP } from "../Backend/DistributionDashboardActions";
import { useEffect, useState } from "react";

// DistroKid simulator (instant approval)
export const DistDash = ({ setPage }) => {
  const [sdap, setsdap] = useState([]);
  useEffect(() => {
    SDAP().then((data) => {
      setsdap(data);
    });
  }, []);
  console.log(sdap);
  return (
    <>
      <div className="max-w-[1280px] ms-auto me-auto">
        <div className="flex">
          <Button onClick={() => setPage("home")}>
            <FaAngleLeft />
            Back
          </Button>
          <h1 className="mt-auto mb-auto ms-3 text-xl">
            Distribution Dashboard
          </h1>
        </div>
        <div className="pt-3">
          <AddAlbumBtn />
        </div>
      </div>
      <div className="max-w-[1280px] ms-auto me-auto mt-4">
        <div className="flex">
          {sdap.map((Album) => {
            const albumArt = `http://localhost:5000/img/${Album.albumArt}/400`;
            return (
              <Card className="max-w-[200px] me-4">
                <CardBody>
                  <img src={albumArt}></img>
                  <h1 className="text-2xl">{Album.albumName}</h1>
                  <h1>
                    {Album.albumMainArtist
                      ? Album.albumMainArtist
                      : "Unknown artist"}
                  </h1>
                  <h1>{Album.albumType}</h1>
                </CardBody>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
};
