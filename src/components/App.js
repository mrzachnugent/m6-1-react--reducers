import React from "react";

import GlobalStyles from "./GlobalStyles";
import { SeatContext } from "./SeatContext";
import TicketWidget from "./TicketWidget";

function App() {
  const [change, setChange] = React.useState(false);
  const {
    state,
    actions: { receiveSeatInfoFromServer },
  } = React.useContext(SeatContext);

  React.useEffect(() => {
    const getSeatData = async () => {
      const data = await fetch("/api/seat-availability");
      const dataToJson = await data.json();
      receiveSeatInfoFromServer(dataToJson);
    };
    getSeatData();
  }, [change]);

  return (
    <>
      <GlobalStyles />
      <TicketWidget change={change} setChange={setChange} />
    </>
  );
}

export default App;
