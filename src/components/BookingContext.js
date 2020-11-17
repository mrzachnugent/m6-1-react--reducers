import React from "react";

export const BookingContext = React.createContext();

const initialState = {
  status: "idle",
  error: null,
  selectedSeatId: null,
  price: null,
};

const reducer = (state, action) => {
  console.log(state);
  switch (action.type) {
    case "begin-booking-process":
      return {
        ...state,
        selectedSeatId: action.selectedSeatId,
        status: "seat-selected",
        price: action.price,
      };

    case "cancel-booking-process":
      return {
        ...initialState,
      };

    case "purchase-ticket-request":
      return {
        ...state,
        status: "awaiting-response",
      };

    case "purchase-ticket-failure":
      return {
        ...state,
        status: "error",
        error: "Please provide credit card information!",
      };

    case "purchase-ticket-success":
      return {
        ...state,
        ...initialState,
        status: "purchased",
      };

    default:
      throw new Error(`Unrecognized action: ${action.type}`);
  }
};

export const BookingProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const beginBookingProcess = (data) => {
    dispatch({
      type: "begin-booking-process",
      ...data,
    });
  };

  const cancelBookingProcess = () => {
    dispatch({
      type: "cancel-booking-process",
    });
  };

  const purchaseTicketRequest = () => {
    dispatch({
      type: "purchase-ticket-request",
    });
  };
  const purchaseTicketFailure = () => {
    dispatch({
      type: "purchase-ticket-failure",
    });
  };
  const purchaseTicketSuccess = () => {
    dispatch({
      type: "purchase-ticket-success",
    });
  };

  return (
    <BookingContext.Provider
      value={{
        state,
        actions: {
          beginBookingProcess,
          cancelBookingProcess,
          purchaseTicketSuccess,
          purchaseTicketFailure,
          purchaseTicketRequest,
        },
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
