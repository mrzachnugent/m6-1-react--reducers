Update the `useEffect` in `App` to call `receiveSeatInfoFromServer` with the data:

```diff
  const {
    actions: { receiveSeatInfoFromServer },
  } = React.useContext(SeatContext);

  React.useEffect(() => {
    fetch('/api/seat-availability')
      .then(res => res.json())
-     .then(data => console.log(data));
+     .then(data => receiveSeatInfoFromServer(data));
  }, []);
```

Inside the reducer, we want to produce a new state that matches the shape of the `initialState`, using the data available.

If we add a `console.log` to our reducer, here's what we get:

```js
const initialState = {
  hasLoaded: false,
  seats: null,
  numOfRows: 0,
  seatsPerRow: 0,
};

function reducer(state, action) {
  console.log(action);
  /*
  Logs:

  {
    type: 'receive-seat-info-from-server',
    seats: // big object full of seats
    numOfRows: 8,
    seatsPerRow: 12,
  }
  */
}
```

This looks an awful lot like the data we already have, in initialState!

Let's add a `switch`, and copy over the relevant bits:

```diff
function reducer(state, action) {
- // TODO
+ switch (action.type) {
+   case 'receive-seat-info-from-server': {
+     return {
+       ...state,
+       hasLoaded: true,
+       seats: action.seats,
+       numOfRows: action.numOfRows,
+       seatsPerRow: action.seatsPerRow,
+     };
+   }
+
+   default:
+     throw new Error(`Unrecognized action: ${action.type}`);
+ }
}
```

When `dispatch` is called with the `'receive-seat-info-from-server'` action, we want to return a new state, which updates:

- The `hasLoaded` state, from `false` to `true` (since we just finished getting our data!)
- The `seats`, `numOfRows`, and `seatsPerRow` that we got from the server.

We've done a lot of work so far, and not much in the UI is visible! By checking `console.log`, we should have _some_ confidence that what we're doing is right, but let's actually add some stuff to the DOM.

Inside `App`, let's also pull some more data out of context, and render it:

```diff
function App() {
  const {
+   state: { numOfRows },
    actions: { receiveSeatInfoFromServer },
  } = React.useContext(SeatContext);

  React.useEffect(() => {
    fetch('/api/seat-availability')
      .then(res => res.json())
      .then(data => receiveSeatInfoFromServer(data));
  });

  return (
    <>
      <GlobalStyles />
-     TODO: Build stuff!
+     This venue has {numOfRows} rows!
    </>
  );
}
```
