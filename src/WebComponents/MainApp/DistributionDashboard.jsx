import { FaAngleLeft, FaPlus } from "react-icons/fa";
import { AddAlbumBtn } from "../DistDash/AddAlbum";
import { Button, Card, CardBody, Chip } from "@nextui-org/react";
import { DeleteAlbum, SDAP } from "../Backend/DistributionDashboardActions";
import { useEffect, useState } from "react";
import { toggleAlbumAvailability } from "../Backend/DistributionDashboardActions";
import Cookies from "js-cookie";
import axios from "axios";
import { synonymOfBoolean } from "../Backend/ExtraCode";
// DistroKid simulator (instant approval)
export const DistDash = ({ setPage }) => {
  const [sdap, setsdap] = useState([]);
  Cookies.set("isDistDash", true);
  useEffect(() => {
    SDAP().then((data) => {
      setsdap(data);
    });
  }, []);
  console.log(sdap);
  const toggleAlbum = (aid, bool) => {
    toggleAlbumAvailability(aid, bool);
  };
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
          <Button
            onClick={() => {
              Cookies.set("isDistDash", false);
              window.location.href = "/";
            }}
          >
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
                  <h1 className="mt-2 mb-2">
                    {Album.albumType}{" "}
                    {!Album.available ? (
                      <Chip className="ms-2">Not available for streaming</Chip>
                    ) : (
                      <Chip className="ms-2">Available for streaming</Chip>
                    )}
                  </h1>
                  <h1></h1>
                  <div className="flex">
                    <Button
                      className="hover:bg-green-500 me-4 w-50"
                      onClick={() => {
                        console.log(Album.available);
                        axios
                          .get(
                            `http://localhost:5000/albumManagement/toggleAlbumAvailability/${
                              Album._id
                            }/${synonymOfBoolean(Album.available)}`,
                            {
                              headers: {
                                Authorization: `Bearer ${Cookies.get(
                                  "userToken"
                                )}`,
                              },
                            }
                          )
                          .then((res) => {
                            SDAP().then((data) => {
                              setsdap(data);
                            });
                          });
                      }}
                    >
                      Toggle Album Availability
                    </Button>
                    <Button
                      className="hover:bg-red-500 w-50"
                      onClick={() => {
                        deleteAlbum(Album._id);
                        SDAP().then((data) => {
                          setsdap(data);
                        });
                      }}
                    >
                      Delete album
                    </Button>
                  </div>
                </CardBody>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
};
