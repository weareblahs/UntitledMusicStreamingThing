import {
  Button,
  Card,
  CardBody,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import {
  FinalizeUpload,
  GetSingleAlbum,
} from "../Backend/DistributionDashboardActions";
import { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
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
    for (let i = 0; i < e.target.files.length; i++) {
      uploader.append("tracks", e.target.files[i]);
    }
    console.log(uploader.getAll("tracks"));
  };
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div className="max-w-[1280px] ms-auto me-auto">
      <h1 className="text-2xl">Upload tracks</h1>
      <h1>
        <i>WAV files are accepted.</i>
        <Card className="p-5">
          <h1 className="text-2xl">
            Please upload your file with the format being 1.wav, 2.wav, etc.
            When you click on "Choose Files", please choose all the files.{" "}
            <span className="underline cursor-pointer" onClick={onOpen}>
              Why?
            </span>
          </h1>
          {/* "why?" */}
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Why?
                  </ModalHeader>
                  <ModalBody>
                    <p>
                      {" "}
                      <i>Untitled Music Streaming Thing</i> processes the files
                      by using the track number as the filename. Due to
                      technical limitations, if you accidentally uploaded the
                      files with the original names and submitted it to our
                      servers, please delete and recreate the related release on
                      the distribution dashboard.
                      <br />
                      <br />
                      In technical terms, the ways to integrate Album ID and
                      renaming is hard at the server side. Retrieving tracks
                      also uses this kind of format ([Album ID]_[Track number])
                      to stream the files to the frontend of the streaming
                      platform. Server side (or the client side) won't check for
                      the file name, but you are unable to stream the files if
                      you use your original file names for processing.
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="danger"
                      className="bg-red-500 text-white hover:bg-red-400 hover:text-black"
                      variant="light"
                      onPress={onClose}
                    >
                      Close
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
          <CardBody>
            <input
              type="file"
              name="tracks"
              onChange={(e) => uploadFile(e)}
              accept="audio/wav"
              multiple="true"
            ></input>
          </CardBody>
        </Card>
        <Button
          className="w-100"
          onClick={() =>
            FinalizeUpload(
              uploader,
              localStorage.getItem("tempdistdashalbumid")
            )
          }
        >
          Submit
        </Button>
      </h1>
    </div>
  );
};
