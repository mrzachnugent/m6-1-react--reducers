import React from "react";
import {
  Dialog,
  FormControl,
  TextField,
  Button,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { BookingContext } from "./BookingContext";
import styled from "styled-components";
import { SeatContext } from "./SeatContext";

export const PurchaseModal = ({ globalState }) => {
  const {
    state: { selectedSeatId, price },
    actions: {
      cancelBookingProcess,
      purchaseTicketSuccess,
      purchaseTicketFailure,
      purchaseTicketRequest,
    },
  } = React.useContext(BookingContext);

  const {
    actions: { markSeatAsPurchased },
  } = React.useContext(SeatContext);

  const [creditCard, setCreditCard] = React.useState("");
  const [expiration, setExpiration] = React.useState("");
  const [successPurchase, setSuccessPurchase] = React.useState(false);

  React.useEffect(() => {
    purchaseTicketRequest();

    return () => {
      purchaseTicketRequest();
    };
  }, []);

  const handleClose = () => {
    cancelBookingProcess();
  };

  const handleCCInput = (e) => {
    setCreditCard(e.target.value);
    console.log(creditCard);
  };
  const handleExpirationInput = (e) => {
    setExpiration(e.target.value);
    console.log(expiration);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      if (creditCard.length > 4) {
        purchaseTicketSuccess();
        markSeatAsPurchased({ isBooked: true, selectedSeatId });
        setSuccessPurchase(true);
        setTimeout(() => {
          setSuccessPurchase(false);
        }, 3000);
      }
    } catch (err) {
      purchaseTicketFailure();
    }
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  return (
    <>
      <Dialog open={selectedSeatId !== null} onClose={handleClose}>
        <StyledDialog>
          <h1>Purchase ticket</h1>
          <Description>
            You're purchasing <BoldText>1</BoldText> ticket for the price of $
            {price}
          </Description>
          <TicketGridRow>
            <div>
              <BoldText>Row</BoldText>
            </div>
            <div>
              <BoldText>Seat</BoldText>
            </div>
            <div>
              <BoldText>Price</BoldText>
            </div>
          </TicketGridRow>
          <TicketGridRow>
            <div>
              <p>{String(selectedSeatId)[0]}</p>
            </div>
            <div>
              <p>{String(selectedSeatId)[2]}</p>
            </div>
            <div>
              <p>${price}</p>
            </div>
          </TicketGridRow>
          <StyledForm>
            <label
              htmlFor="outlined-basic"
              style={{ fontWeight: "bold", paddingBottom: "15px" }}
            >
              Credit Card Number:
            </label>
            <div
              style={{
                width: "500px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <TextField
                id="outlined-basic"
                label="xxxx xxxx xxxx xxxx"
                variant="outlined"
                inputProps={{ maxLength: 19, inputMode: "numeric" }}
                onChange={handleCCInput}
              />
              <TextField
                label="Expiration"
                variant="outlined"
                inputProps={{ maxLength: 6, inputMode: "numeric" }}
                onChange={handleExpirationInput}
                style={{ width: "100px" }}
              />

              <StyledButton onClick={handleOnSubmit}>Purchase</StyledButton>
            </div>
          </StyledForm>
        </StyledDialog>
      </Dialog>
      {successPurchase && (
        <Snackbar open={true} autoHideDuration={6000}>
          <Alert severity="success">
            Successfully purchased ticket! Enjoy the show.
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

const StyledDialog = styled.div`
  width: 600px;
  height: 450px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledButton = styled(Button)`
  background: #3f51b5 !important;
  color: #fff !important;
  padding: 0 25px !important;
`;

const StyledForm = styled(FormControl)`
  background: #eeeeee;
  padding: 20px !important;
  margin-top: 20px !important;
`;

const TicketGridRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 300px;
  border-bottom: 1px solid #d3d3d3;
  padding: 15px 0;
`;

const BoldText = styled.span`
  font-weight: bold;
`;

const Description = styled.p`
  padding: 20px 0;
`;
