import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

export const UploadTracks = () => {
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
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </h1>
    </div>
  );
};
