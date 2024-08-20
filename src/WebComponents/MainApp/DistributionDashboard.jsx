import { FaAngleLeft, FaPlus } from "react-icons/fa";
import { AddAlbumBtn } from "../DistDash/AddAlbum";
import { Button } from "@nextui-org/react";

// DistroKid simulator (instant approval)
export const DistDash = ({ setPage }) => {
  return (
    <div className="max-w-[1280px] ms-auto me-auto">
      <div className="flex">
        <Button onClick={() => setPage("home")}>
          <FaAngleLeft />
          Back
        </Button>
        <h1 className="mt-auto mb-auto ms-3 text-xl">Distribution Dashboard</h1>
      </div>
      <div className="pt-3">
        <AddAlbumBtn />
      </div>
    </div>
  );
};
