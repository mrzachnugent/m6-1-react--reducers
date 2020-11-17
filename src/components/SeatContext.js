import React from "react";

export const SeatContext = React.createContext();

const initialState = {
  hasLoaded: false,
  seats: null,
  numOfRows: 0,
  seatsPerRow: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "receive-seat-info-from-server":
      return {
        ...state,
        hasLoaded: true,
        seats: action.seats,
        numOfRows: action.numOfRows,
        seatsPerRow: action.seatsPerRow,
      };
    case "mark-seat-as-purchased":
      const seatID = action.selectedSeatId;
      console.log(seatID);
      return {
        ...state,
        seats: {
          ...state.seats,
          [action.selectedSeatId]: {
            ...action.selectedSeatId,
            isBooked: action.isBooked,
          },
        },
      };
    default:
      throw new Error(`Unrecognized action: ${action.type}`);
  }
}

export const SeatProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  console.log(state);
  const receiveSeatInfoFromServer = (data) => {
    dispatch({
      type: "receive-seat-info-from-server",
      ...data,
    });
  };

  const markSeatAsPurchased = (data) => {
    dispatch({
      type: "mark-seat-as-purchased",
      ...data,
    });
  };

  return (
    <SeatContext.Provider
      value={{
        state,
        actions: {
          receiveSeatInfoFromServer,
          markSeatAsPurchased,
        },
      }}
    >
      {children}
    </SeatContext.Provider>
  );
};
