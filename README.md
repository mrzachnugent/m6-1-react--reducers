# Workshop: Ticket-buying widget

In today's workshop, we'll be building a ticket-buying widget, for buying specific seats at a concert (or hockey game, or airplane). Here's a GIF of the flow:

![demo flow](./__lecture/assets/demo.gif)

To add a sense of realism, this workshop features **a Node.js server**. This server will tell you which seats are available, and let you process (fake) credit cards to charge tickets.

## Starting point

The `workshop` folder includes a barebones React application. You'll notice that you're given the "seat" asset, located in `src/assets/seat-available.svg`.

### Included Server

In the workshop folder, you'll see a `/server` directory. Feel free to poke around in it if you'd like, to see how it works!

There is also a new script in the `package.json`. To run this project, you'll need two active terminal windows, each running one of these commands:

- `yarn start`
- `yarn start:server`

This will run both a typical React application as well as our Node server.

> **Important:** To simulate a real "production" server, requests fail sometimes. If the server sends an error, it might not be a problem with your code, but rather a simulation of a network issue.

### Server endpoints

The server exposes the following endpoints:

#### GET `/api/seat-availability`

Returns JSON in the following format:

```json
{
  "numOfRows": 8,
  "seatsPerRow": 12,
  "seats": {
    "A-1": {
      "price": 225,
      "isBooked": false
    },
    "A-2": {
      "price": 225,
      "isBooked": false
    },
    "A-3": {
      "price": 225,
      "isBooked": false
    },
    // ...And many more in the "A" row
    "B-1": {
      "price": 215,
      "isBooked": false
    }
  }
}
```

The `seats` key contains all the information about every seat available. Every seat has a unique ID, like `C-11`:

- Rows are lettered from A to H, with `A` seats being the closest to the front (and the most expensive)
- Each row has 12 seats, numbered from 1 to 12. Seat # doesn't affect price.

#### POST `/api/book-seat`

Make a POST to this endpoint when the user is purchasing a ticket. It expects the following body, sent as JSON:

```json
{
  "seatId": "A-3",
  "creditCard": "1234123412341234",
  "expiration": "12/34"
}
```

These are the following validations applied:

- If the seat ID doesn't exist, or the seat is already booked, the server will return a 400 error
- If either the `creditCard` or `expiration` fields are left blank, the server will return a 400 error. The server doesn't actually care what you send it, so long as a value is provided for each field.
- Even requests (eg. 2nd request, 4th request, etc) will return a 500 error. **This is meant to simulate network errors.** Your code is not wrong :) this simulation is to make sure that your code is _gracefully handling_ those errors, and showing the user an error.

If there is an error, the response body will look like this:

```json
{
  "message": "An unknown error has occurred. Please try your request again."
}
```

If all is right with the request, and it isn't a simulated network error, you'll get the following response:

```json
{
  "success": true
}
```

---

## Exercise 1: Adding dependencies

Open this exercise file: [exercise-1.md](__workshop/exercise-1.md)

## Exercise 2: Managing state

Open this exercise file: [exercise-2.md](__workshop/exercise-2.md)

## Exercise 3: Fetching data

Open this exercise file: [exercise-3.md](__workshop/exercise-3.md)

## Exercise 4: Initial UI

Open this exercise file: [exercise-4.md](__workshop/exercise-4.md)

## Exercise 5: Polishing this UI

Open this exercise file: [exercise-5.md](__workshop/exercise-5.md)

## Exercise 6: Preparing for purchasing

Open this exercise file: [exercise-6.md](__workshop/exercise-6.md)

## Exercise 7: Purchase state

Open this exercise file: [exercise-7.md](__workshop/exercise-7.md)

---

<center>🟡 - Minimally complete workshop (75%) - 🟡</center>

---

## Exercise 8: Purchasing!

### Exercise 8A: Showing and hiding the modal

Open this exercise file: [exercise-8A.md](__workshop/exercise-8A.md)

### Exercise 8B: Populating the modal

Open this exercise file: [exercise-8B.md](__workshop/exercise-8B.md)

### Exercise 8C: Sending the request

Open this exercise file: [exercise-8C.md](__workshop/exercise-8C.md)

---

<center>🟢 - Complete workshop (100%) - 🟢</center>

---

### Exercise 9: Finishing touches

Open this exercise file: [exercise-9.md](__workshop/exercise-9.md)

---

# Super Stretch goals

This is a _very_ long workshop, so it is unlikely that you'll have time for these stretch goals! Just in case, though, some are provided:

Open this exercise file: [more-stretch-goals.md](__workshop/more-stretch-goals.md)
