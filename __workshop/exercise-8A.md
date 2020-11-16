# Exercise 8A: Showing and hiding the modal

When clicking a seat, we should open a modal. Let's create that now.

Create a new component, `PurchaseModal`. We'll use the `Dialog` component from Material UI. The documentation is super useful, and can be found here: https://material-ui.com/components/dialogs/

(For Material UI docs in general, notice the `< >` icon below all code snippets; clicking it shows the _full_ version, with all the imports and setup logic)

The `Dialog` component takes an `open` boolean prop, which controls whether it's open or not.

In your new `PurchaseModal` component, subscribe to the `BookingContext` you created, and use it to figure out the current state. You can then add some logic like this:

```js
// Inside `PurchaseModal.js`:
<Dialog
  open={selectedSeatId !== null}
>
```

This way, the `PurchaseModal` will only be shown when the user has an active seat selected, which happens when the user clicks on an available seat.

> The solution GIFs we've been looking at used a slightly different modal solution. Don't worry if your modal doesn't appear identical.

`Dialog` also takes a `handleClose` function, which the component will call if the user tries to close the modal by clicking the backdrop or pressing "Escape". Create a new action, `cancel-booking-process`, which re-initializes the state, setting `selectedSeatId` to `null` and resetting the other values.

At this point, you should be able to see a modal by clicking a seat, and dismiss the modal to return to the original view.
