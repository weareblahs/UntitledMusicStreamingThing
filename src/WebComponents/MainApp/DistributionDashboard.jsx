import { FaAngleLeft, FaPlus } from "react-icons/fa";
import { AddAlbumBtn } from "../DistDash/AddAlbum";
import { Button, Card, CardBody } from "@nextui-org/react";
import { DeleteAlbum, SDAP } from "../Backend/DistributionDashboardActions";
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
  const deleteAlbum = (albumID) => {
    const deleteConfirmation = confirm(
      "Are you sure you want to delete this album from the database?"
    );
    deleteConfirmation ? DeleteAlbum(albumID) : null;
  };
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
          <AddAlbumBtn setPage={setPage} />
        </div>
      </div>
      <div className="grid grid-cols-13 max-w-[1280px] ms-auto me-auto mt-4">
        <div className="me-5 grid grid-cols-subgrid gap-4 col-span-4">
          {sdap.map((Album) => {
            const albumArt = `http://localhost:5000/img/${Album.albumArt}/400`;
            return (
              <Card>
                <CardBody>
                  <img src={albumArt}></img>
                  <h1 className="text-2xl">{Album.albumName}</h1>
                  <h1>
                    {Album.mainArtist ? Album.mainArtist : "Unknown artist"}
                  </h1>
                  <h1>{Album.albumType}</h1>
                  <Button
                    className="hover:bg-red-500 w-50"
                    onClick={() => {
                      deleteAlbum(Album._id);
                    }}
                  >
                    Delete album
                  </Button>
                  <Button
                    className="hover:bg-red-500 w-50"
                    onClick={() => {
                      deleteAlbum(Album._id);
                    }}
                  >
                    Delete album
                  </Button>
                </CardBody>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
};
