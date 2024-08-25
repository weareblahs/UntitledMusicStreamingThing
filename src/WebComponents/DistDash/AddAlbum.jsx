import { FaPlus } from "react-icons/fa";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";
import { AddAlbumInformation } from "../Backend/DistributionDashboardActions";
import { AddTrack } from "./AddTrack";
export const AddAlbumBtn = ({ setPage }) => {
  const [addAlbumWindow, toggleAddAlbumWindow] = useState(false);
  const albumInfo = new FormData();
  // change album info (onChange)
  const changeAlbumInfo = (e) => {
    albumInfo.set([e.target.name], e.target.value);
  };
  const changeAlbumArt = (e) => {
    albumInfo.set("albumArt", e.target.files[0]);
  };
  const submitData = async () => {
    const info = await AddAlbumInformation(albumInfo);
    localStorage.setItem("tempdistdashalbumid", info.album._id);
    window.location.href = "/DistDashEndpoint/addTrack";
  };
  if (addAlbumWindow) {
    return (
      <div style={{ maxWidth: "80%" }} className="ms-auto me-auto">
        <h1 className="text-2xl text-center">Add release</h1>
        <div className="max-w-[800px] ms-auto me-auto">
          <div className="col-span-6 block">
            <label aria-label="albumName" onChange={(e) => changeAlbumInfo(e)}>
              Release name
            </label>
            <Input
              name="albumName"
              onChange={(e) => changeAlbumInfo(e)}
            ></Input>
            <label aria-label="artistName" onChange={(e) => changeAlbumInfo(e)}>
              Main Artist Name
            </label>
            <Input
              name="mainArtist"
              onChange={(e) => changeAlbumInfo(e)}
            ></Input>
            <label aria-label="artistName" onChange={(e) => changeAlbumInfo(e)}>
              Release Year
            </label>
            <Input
              name="releaseYear"
              type="number"
              onChange={(e) => changeAlbumInfo(e)}
            ></Input>
            <label aria-label="artistName" onChange={(e) => changeAlbumInfo(e)}>
              Label
            </label>
            <Input name="label" onChange={(e) => changeAlbumInfo(e)}></Input>
            <label aria-label="albumType">Release type</label>
            <Select name="albumType" onChange={(e) => changeAlbumInfo(e)}>
              <SelectItem name="albumType" key="album">
                Album
              </SelectItem>
              <SelectItem name="albumType" key="compilation">
                Compilation
              </SelectItem>
              <SelectItem name="albumType" key="EP">
                EP
              </SelectItem>
              <SelectItem name="albumType" key="single">
                Single
              </SelectItem>
            </Select>
            <label aria-label="albumArt">Album artwork</label>
            <Input
              type="file"
              name="albumArt"
              onChange={(e) => changeAlbumArt(e)}
              accept="image/jpg,image/jpeg,image/png"
            ></Input>
            <div className="mt-2 mb-2">
              <Button
                className="bg-green-500 text-black"
                onClick={() => submitData({ setPage })}
              >
                Proceed to next step
              </Button>
              <Button
                className="bg-red-500 text-white ms-2"
                onClick={() => {
                  toggleAddAlbumWindow(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <Button className="w-100" onClick={() => toggleAddAlbumWindow(true)}>
        <FaPlus />
        Add release
      </Button>
    );
  }
};
