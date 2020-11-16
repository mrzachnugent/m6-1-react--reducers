const router = require("express").Router();
const { delay } = require("./helpers");

const NUM_OF_ROWS = 8;
const SEATS_PER_ROW = 12;

// Code that is generating the seats/pricing/availability.
// ----------------------------------
const seats = {};
const pricingOptions = [500, 500, 400, 350, 250, 250, 175, 125];
const row = ["A", "B", "C", "D", "E", "F", "G", "H"];
for (let r = 0; r < row.length; r++) {
  for (let s = 1; s < 13; s++) {
    seats[`${row[r]}-${s}`] = {
      price: pricingOptions[r],
      isBooked: Math.floor(Math.random() * 2) > 0,
    };
  }
}
// ----------------------------------

router.get("/api/seat-availability", async (req, res) => {
  await delay(Math.random() * 3000);

  return res.json({
    seats: seats,
    numOfRows: 8,
    seatsPerRow: 12,
  });
});

let lastBookingAttemptSucceeded = false;

router.post("/api/book-seat", async (req, res) => {
  const { seatId, creditCard, expiration } = req.body;

  await delay(Math.random() * 3000);

  if (seats[seatId].isBooked) {
    return res.status(400).json({
      message: "This seat has already been booked!",
    });
  }

  if (!creditCard || !expiration) {
    return res.status(400).json({
      status: 400,
      message: "Please provide credit card information!",
    });
  }

  if (lastBookingAttemptSucceeded) {
    lastBookingAttemptSucceeded = !lastBookingAttemptSucceeded;

    return res.status(500).json({
      message: "An unknown error has occurred. Please try your request again.",
    });
  }

  lastBookingAttemptSucceeded = !lastBookingAttemptSucceeded;

  seats[seatId].isBooked = true;

  return res.status(200).json({
    status: 200,
    success: true,
  });
});

module.exports = router;
