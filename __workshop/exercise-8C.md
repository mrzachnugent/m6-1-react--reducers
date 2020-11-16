# Exercise 8C: Sending the request

When the user clicks "Purchase", we want to make a request to our backend. The top of this README includes the list of API endpoints and how to use them. Make a POST to `/api/book-seat` with the specified data.

For consistency, you can create three new action types:

- `purchase-ticket-request`
- `purchase-ticket-failure`
- `purchase-ticket-success`

THe moment the user clicks "Purchase", you should dispatch that first action type to update the state: We've moved from the "seat-selected" status to the "awaiting-response" one!

If the server returns an error (which will happen 50% of the time, by design!), you can dispatch `purchase-ticket-failure`. This should set the status to `error`, and use the `message` field to update the `error` field in your state.

For example, an error should transform this state...

```json
{
  "status": "awaiting-response",
  "error": null,
  "selectedSeatId": "C-3",
  "price": 205
}
```

...into this one:

```json
  "status": "error",
  "error": "Please provide credit card information!",
  "selectedSeatId": "C-3",
  "price": 205
```

If the server returns a successful message, we can dispatch the `purchase-ticket-success` event, and update the state to this:

```json
  "status": "purchased",
  "error": null,
  "selectedSeatId": null,
  "price": null
```

Notice that we've unset `selectedSeatId` and `price`; now that we've purchased the seat, we can close that modal!
