import { useState } from "react";
import { Homepage } from "./Homepage";
export const MainWindowAssignments = () => {
  const [pageName, setPage] = useState("home");
  if (pageName == "home") {
    return (
      <>
        <Homepage setPage={setPage} />
      </>
    );
  }
};
