# Exercise 6: Preparing for purchasing

Right now, you're probably rendering a bunch of seat images inside the `TicketWidget` component. We need to do a bit of prep work.

First, if you haven't already, create a `Seat` component, and move the Seat tooltip and greying-out logic to the Seat component. Inside your TicketWidget component, you should be left with something like this:

```js
{
  range(seatsPerRow).map((seatIndex) => {
    const seat = seats[seatId];

    return (
      <SeatWrapper key={seatIndex}>
        <Seat
          rowIndex={rowIndex}
          seatIndex={seatIndex}
          width={36}
          height={36}
          price={seat.price}
          status={seat.isBooked ? "unavailable" : "available"}
        />
      </SeatWrapper>
    );
  });
}
```

Inside your `Seat` component, wrap the image in a `<button>`. This is important because we'll soon allow for purchasing buttons by clicking on the seat, and we should never put `onClick` events on an `img` tag, or anything other than a `<button>`, for keyboard users.

We can add `disabled={true}` to this button if the seat is booked.
