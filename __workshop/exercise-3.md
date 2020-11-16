# Exercise 3: Fetching data

Let's go to our `App.js`. We'll subscribe to the context we created by importing it and using the `useContext` hook:

```diff
import React from 'react';

+import { SeatContext } from './SeatContext';

function App() {
+ const {
+   actions: { receiveSeatInfoFromServer },
+ } = React.useContext(SeatContext);

  return (
    <>
      <GlobalStyles />
      TODO: Build stuff!
    </>
  );
}
```

When the `App` renders for the first time, we want to make a `fetch` request to our `/api/seat-availability` route. We can use `useEffect` for this:

```diff
function App() {
  const {
    actions: { receiveSeatInfoFromServer },
  } = React.useContext(SeatContext);

+ React.useEffect(() => {
+   fetch('/api/seat-availability')
+     .then(res => res.json())
+     .then(data => console.log(data));
+ }, []);

  return (
    <>
      <GlobalStyles />
      TODO: Build stuff!
    </>
  );
}
```

As a reminder: `useEffect` takes two arguments, and the second is a _list of dependencies_. We pass an empty array because we only want this code to run once, the very first time the component renders. _If you forget this array, bad things will happen._ 😬

In this code snippet, we're simply logging the result of our fetch request. Instead, we should use the `receiveSeatInfoFromServer` function to update our React state with that info!

Remember how we left the `reducer` blank, in `SeatContext`? Now's the time to hook that all up.

Take a moment to give this a shot yourself. Add some more `console.log`s to understand which functions fire when, and what the available data is.

> 🆘 **If you are stuck, or want to compare, you can look at this [hint](./_hints/hint-1.md).**
