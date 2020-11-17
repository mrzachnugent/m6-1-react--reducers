import React from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";

import { getRowName, getSeatNum } from "../helpers";
import { range } from "../utils";
import { SeatContext } from "./SeatContext";
import { BookingContext } from "./BookingContext";
import { PurchaseModal } from "./PurchaseModal";

import seatAvailable from "../assets/seat-available.svg";

const TicketWidget = ({ change, setChange }) => {
  // TODO: use values from Context
  const {
    state: { numOfRows, seatsPerRow, hasLoaded, seats },
  } = React.useContext(SeatContext);

  const { actions } = React.useContext(BookingContext);
  const { beginBookingProcess } = actions;
  // const numOfRows = 6;
  // const seatsPerRow = 6;

  // TODO: implement the loading spinner <CircularProgress />
  // with the hasLoaded flag

  return (
    <Viewport>
      <PurchaseModal change={change} setChange={setChange} />
      {hasLoaded ? (
        <Wrapper>
          {range(numOfRows).map((rowIndex) => {
            const rowName = getRowName(rowIndex);

            return (
              <Row key={rowIndex}>
                <RowLabel>Row {rowName}</RowLabel>
                {range(seatsPerRow).map((seatIndex) => {
                  const seatId = `${rowName}-${getSeatNum(seatIndex)}`;
                  const seatPrice = seats[seatId].price;
                  return (
                    <SeatWrapper key={seatId}>
                      <Tippy
                        content={
                          <span>
                            Row {rowName}, Seat {seatIndex} - ${seatPrice}
                          </span>
                        }
                        arrow={true}
                        flip={true}
                      >
                        <SeatButton
                          disabled={seats[seatId].isBooked}
                          onClick={() =>
                            beginBookingProcess({
                              price: seatPrice,
                              selectedSeatId: seatId,
                            })
                          }
                        >
                          <img src={seatAvailable} alt="seat-available" />
                        </SeatButton>
                      </Tippy>
                    </SeatWrapper>
                  );
                })}
              </Row>
            );
          })}
        </Wrapper>
      ) : (
        <CircularProgress color="secondary" />
      )}
    </Viewport>
  );
};

const Viewport = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const Wrapper = styled.div`
  background: transparent;
  /* background: #eee; */
  border: 1px solid #222222;
  border-radius: 3px;
  /* padding: 8px; */
`;

const Row = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;

  &:not(:last-of-type) {
    border-bottom: 1px solid #222;
  }
`;

const RowLabel = styled.div`
  font-weight: bold;
  width: 75px;
  padding-left: 15px;
`;

const SeatWrapper = styled.div`
  padding: 10px;
  background: #eee;
`;

const SeatButton = styled.button`
  border: none;
  cursor: pointer;
  background: transparent;
  transition: all, 0.1s ease-in-out;

  &:hover {
    filter: hue-rotate(180deg);
    opacity: 0.5;
  }
  &:disabled {
    filter: saturate(0);
    opacity: 0.5;
    cursor: default;
  }
`;

export default TicketWidget;
