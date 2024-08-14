import { useEffect, useState } from "react";
import {
  GetRecentlyPlayed,
  PlaySpotifyMusic,
} from "../../Backend/SpotifyAPIActions";
import { Card, CardBody } from "@nextui-org/card";
import Cookies from "js-cookie";
export const RecentlyListened = () => {
  const [recent, setRecent] = useState([]);
  useEffect(() => {
    async function getRecent() {
      const rl = await GetRecentlyPlayed();
      setRecent(rl);
    }
    getRecent();
  }, []);
  if (!recent) return null;
  return (
    <div
      className="overflow-x-scroll flex ms-auto me-auto"
      style={{ width: "80%" }}
    >
      {recent?.items?.map((Item) => {
        return (
          <Card
            className="mb-3 flex-shrink-0 me-4 max-w-[180px] hover:bg-blue-500 transition fade-in-out cursor-pointer"
            onClick={() => console.log(Item?.track?.uri)}
          >
            <CardBody className="max-w-[250px]">
              <img src={Item?.track?.album?.images?.[0].url} />
              <h1 className="truncate">{Item?.track?.name}</h1>
              <h4 className="truncate">{Item?.track?.artists?.[0].name}</h4>
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
};
