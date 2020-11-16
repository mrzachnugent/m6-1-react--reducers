# Exercise 2: Managing state

The interesting thing about this challenge is that there is some data that lives on the server—the set of seats—and we need to copy that to the client. But we will also need to keep the seat data in React state, since we need to mark seats as booked after the user purchases them!

First, let's create a context component to manage everything related to seats.

Take the time to **write this out**. Don't copy and paste! It's critical to build the muscle memory so that you can create context components without copying.

Create this file in `src/components/SeatContext.js`

```js
export const SeatContext = React.createContext();

const initialState = {
  hasLoaded: false,
  seats: null,
  numOfRows: 0,
  seatsPerRow: 0,
};

function reducer(state, action) {
  // TODO
}

export const SeatProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const receiveSeatInfoFromServer = (data) => {
    dispatch({
      type: "receive-seat-info-from-server",
      ...data,
    });
  };

  return (
    <SeatContext.Provider
      value={{
        state,
        actions: {
          receiveSeatInfoFromServer,
        },
      }}
    >
      {children}
    </SeatContext.Provider>
  );
};
```

A few notes here:

- We create a `SeatContext` and export it. This will be used to _subscribe_ to the data held within this context.
- The `SeatProvider` is what actually makes this data available to the React app, so that components further down the tree can subscribe to it.
- `receiveSeatInfoFromServer` and `markSeatAsPurchased` are functions that dispatch actions. Sometimes, they're called **action creators**. They're optional - if you wanted, you could pass `dispatch` directly - but it's a best practice to do it this way.

You'll notice, the `reducer` has a TODO. It's your job to write this code! But don't worry about it just yet, first we need to make our network requests.

Finally for this step, we need to wrap our entire application in the SeatProvider component. Head over to `src/index.js`, and wrap the root node:

```diff
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
+import { SeatProvider } from './components/SeatContext';

const rootElement = document.getElementById('root');

ReactDOM.render(
- <App />,
+ <SeatProvider>
+   <App />
+ </SeatProvider>,
  rootElement
);

```
