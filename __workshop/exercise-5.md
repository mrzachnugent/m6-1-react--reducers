# Exercise 5: Polishing this UI

There are a few things that this UI doesn't yet do:

1. There is no loading state. It should show a loading spinner while we wait for that data to come in.
2. It should "gray out" any seats that are not available (already booked), according to the server data
3. There should be a tooltip on hover that shows the price per seat (using server data).

This is a challenging task! Don't be afraid to ask TCs for help.

At the end of this task, your UI should look like this:

![TicketWidget polished UI](../__lecture/assets/ex-4.gif)

_HINT:_ For the loading spinner, you can use the `CircularProgress` component from Material UI: https://material-ui.com/components/progress/

_HINT:_ For the "greyed out" seats, you can use a CSS filter:

```css
filter: grayscale(100%);
```

_HINT:_ For the tooltip, check out the Tippy.js/react docs! https://www.npmjs.com/package/@tippy.js/react
