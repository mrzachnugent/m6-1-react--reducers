# Exercise 7: Purchase state

Let's watch the GIF from the beginning again:

![demo flow](../__lecture/assets/demo.gif)

(To view the GIF in VS Code: open the Command Palette with cmd+shift+P or control+shift+P, and start typing "Markdown: Open preview to the side". The option should pop up as you type, and you can select it).

There are a few distinct "statuses":

- The initial looking-at-the-seats initial status
- Looking at the purchase modal, after clicking on a seat
- Waiting for the response, after submitting the credit card info (the 1 second while the button has a spinner in it)
- The error status, when the credit card info is incomplete
- The "success" status, after completing a purchase, with the happy green banner showing.

We should model this in our state. But where should it live?

Let's create another context component, `BookingContext`. Follow many of the same steps as before. For `initialState`, pass it an object like this:

```js
const initialState = {
  status: "idle",
  error: null,
  selectedSeatId: null,
  price: null,
};
```

`status` is the state we mentioned earlier, which tracks all the distinct moments in time that exist during the booking process. Here are the possible values:

- `idle`
- `seat-selected`
- `awaiting-response`
- `error`
- `purchased`

Here are the steps you should complete for this exercise. Because we've done something similar already, not very much detail is given:

- Wrap the Provider around the root node in `src/index`
- Create an action with the type `begin-booking-process`, and dispatch that action when clicking an available seat
- Update the reducer to update the state accordingly, when `begin-booking-process` is dispatched.
