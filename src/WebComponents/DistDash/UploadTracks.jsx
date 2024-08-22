import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { GetSingleAlbum } from "../Backend/DistributionDashboardActions";
import { useEffect, useState } from "react";

export const UploadTracks = () => {
  const [trackInfo, setTrackInfo] = useState([]);
  useEffect(() => {
    async function getInfo() {
      const info = await GetSingleAlbum(
        localStorage.getItem("tempdistdashalbumid")
      );
      setTrackInfo(info);
    }
    getInfo();
  }, []);
  console.log(trackInfo);
  const uploader = new FormData();
  const uploadFile = (e) => {
    uploader.set([e.target.name], e.target.files[0]);
    console.log(uploader.getAll("track1_audio"));
  };

  return (
    <div className="max-w-[1280px] ms-auto me-auto">
      <h1 className="text-2xl">Upload tracks</h1>
      <h1>
        <i>WAV files are accepted.</i>
        <Table>
          <TableHeader>
            <TableColumn>Track</TableColumn>
            <TableColumn>Title</TableColumn>
            <TableColumn>Upload</TableColumn>
            <TableColumn>Information</TableColumn>
          </TableHeader>
          <TableBody>
            {trackInfo?.tracks?.map((Track) => {
              return (
                <TableRow>
                  <TableCell>{Track?.trackNo}</TableCell>
                  <TableCell>{Track?.trackName}</TableCell>
                  <TableCell>
                    <input
                      type="file"
                      name={Track.trackNo}
                      onChange={(e) => uploadFile(e)}
                      accept="audio/wav"
                    ></input>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </h1>
    </div>
  );
};
