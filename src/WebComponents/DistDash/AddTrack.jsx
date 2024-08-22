import {
  Input,
  Button,
  ButtonGroup,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableColumn,
  TableHeader,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import {
  AddTrackInfo,
  AddTracksToAlbum,
  GetSingleAlbum,
} from "../Backend/DistributionDashboardActions";

export const AddTrack = ({ setPage }) => {
  const [trackCount, setTrackCount] = useState(0);
  const [name, setName] = useState("");
  const trackInfo = [];
  const [ti, setTI] = useState([]);
  const [singleInfo, setSingleInfo] = useState([]);
  const [albumBasicInfo, setAlbumBasicInfo] = useState("Unknown");
  const [albID, setAlbID] = useState();
  useEffect(() => {
    async function fetchData() {
      const data = await GetSingleAlbum(
        localStorage.getItem("tempdistdashalbumid")
      );
      setName(data.albumName);
      setAlbID(data._id);
    }
    fetchData();
  }, []);
  const changeData = (e, trackNo) => {
    setSingleInfo({
      ...singleInfo,
      [e.target.name]: e.target.value,
    });
  };
  const addData = (tn) => {
    const tno = tn.tn;
    const ttf = singleInfo[`track${tno}_trackName`];
    const taf = singleInfo[`track${tno}_trackArtist`];
    const trackData = {
      relAlbumId: albID,
      trackNo: tno,
      trackName: ttf,
      trackArtist: taf,
    };
    trackInfo.push(trackData);
  };
  const submitAllData = (e) => {
    Array.from({ length: trackCount }, (_, i) => {
      addData({ tn: i + 1 });
    });
    setTI(trackInfo);
    console.log(trackInfo);
    AddTrackInfo(localStorage.getItem("tempdistdashalbumid"), trackInfo);
    AddTracksToAlbum(albID);
    window.location.href = "/DistDashEndpoint/uploadTracks";
  };

  return (
    <>
      <div className="max-w-[1280px] ms-auto me-auto flex">
        <h1 className="text-2xl mt-auto mb-auto ms-2">Editing {name}</h1>
      </div>
      <div className="max-w-[1280px] ms-auto me-auto">
        <label>Enter track count:</label>
        <div className="flex">
          <Input
            type="number"
            onChange={(e) => setTrackCount(e.target.value)}
          ></Input>
          <Button
            className="ms-2 hover:bg-green-500 hover:text-black"
            onClick={() => console.log(trackCount)}
          >
            Proceed with editing
          </Button>
        </div>
      </div>
      <div>
        <div className="max-w-[1280px] ms-auto me-auto mt-4">
          <Table className="">
            <TableHeader>
              <TableColumn>Track</TableColumn>
              <TableColumn>Track name</TableColumn>
              <TableColumn>Track artist</TableColumn>
              <TableColumn>Actions</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"No tracks added."}>
              {Array.from({ length: trackCount }, (_, i) => (
                <TableRow key={i}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>
                    <Input
                      name={`track${i + 1}_trackName`}
                      onChange={(e) => changeData(e, i + 1)}
                    ></Input>
                  </TableCell>
                  <TableCell>
                    <Input
                      name={`track${i + 1}_trackArtist`}
                      onChange={(e) => changeData(e, i + 1)}
                    ></Input>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button
            className="mt-2 w-100  hover:bg-green-500 hover:text-black"
            onClick={() => submitAllData()}
          >
            Next: Submit audio files for processing
          </Button>
        </div>
      </div>
    </>
  );
};
