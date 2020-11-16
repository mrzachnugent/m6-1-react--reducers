# Reducers

---

### The limitations of `useState`

No restrictions. It's the wild west.

```js
const App = () => {
  const [count, setCount] = React.useState(0);

  setCount("Hello"); // Whyyyyy makes no sense
};
```

---

### The limitations of `useState`

It spreads your application logic around

```js
const App = () => {
  const [count, setCount] = React.useState(0);

  return (
    <>
      Count: {count}
      <Game count={count} setCount={setCount} />
      <Reset setCount={setCount} />
    </>
  );
};

const Game = ({ count, setCount }) => {
  // Some logic here:
  return (
    <>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </>
  );
};

const Reset = ({ setCount }) => {
  // Some other logic here:
  return (
    <>
      <button onClick={() => setCount(0)}>Reset</button>
    </>
  );
};
```

---

### Introducing: `useReducer`

This is a _powerful_ but _complex_ tool

---

### Part I: What is a "reducer"?

A reducer is a function that takes _the current state_ and _an action_ and produces a new state.

---

### useReducer demo

```js
// All of our logic is contained here.
// There is no other way to change the state.
function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    case "RESET":
      return 0;
    default:
      throw new Error("Unrecognized action");
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, 0);

  return (
    <>
      Count: {state}
      <Game count={count} dispatch={dispatch} />
      <Reset dispatch={dispatch} />
    </>
  );
};

const Game = ({ count, dispatch }) => {
  return (
    <>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>Increment</button>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>Decrement</button>
    </>
  );
};

const Reset = ({ dispatch }) => {
  return (
    <>
      <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>
    </>
  );
};
```

---

# Terminology

### "Action"

an "action" is a plain Javascript object that has a "type" property.

```js
{ type: 'INCREMENT' }

{ type: 'WIN_GAME' }

{
  type: 'submit-registration',
  username: 'seriousbanker123',
  password: 'passw0rd',
  agreedToTerms: true,
}

{
  type: 'registration-failure',
  message: 'Your password is too insecure.',
}
```

---

### Action Best Practices

Actions _describe an event_. They don't dictate what should happen to the state.

```js
// Good action: describes what is happening
{ type: 'clear-form' }

// Bad action: dictates what should happen with the state
{ type: 'set-user-email', value: '' }
{ type: 'set-user-password', value: '' }
```

---

### Why?

Actions _describe what happened_ because that's how you avoid spreading your logic all over the app.

Actions describe the event. _Reducers_ control what happens because of it.

---

# Quiz

Are the following actions good to go?

If not, what could be improved?

---

```js
{ type: 'click-to-open-modal', state: { newModal: 'login' } }
```

---

```js
{ type: 'toggle-terms-of-service', agreed: true }
```

---

```js
{ type: 'set-player-coordinates', x: 41, y: 22 }
```

---

```js
{
  event: "logout";
}
```

---

# Terminology

### Reducer

A function that takes _the current state_ and _an action_, and uses that information to produce a new state.

You never call this function yourself. You pass it to `useReducer`

---

# Terminology

### Reducer

By convention, reducers often take this form:

```js
function reducer(state, action) {
  switch (action.type) {
    case "some-action": {
      // return some new state
    }
    case "some-other-action": {
      // return some other new state
    }
    default: {
      // If no action matches, this must be a mistake
      throw new Error("whoopsie");
    }
  }
}
```

The _switch_ statement is a popular convention, but it's optional. You can write reducers however you want.

---

# Terminology

### Reducer

Another example:

```js
const reducer = (state, action) => {
  if (action.type === "some-action") {
    return "hieee";
  } else if (action.type === "some-other-action") {
    return "byeee";
  } else {
    throw new Error("whoopsie");
  }
};
```

---

# Terminology

### dispatch

When you call `useReducer`, you get two things out:

```js
const [state, dispatch] = useReducer(reducer, initialState);
```

The last item in that array is the state.

The second item is `dispatch`.

---

# Terminology

### dispatch

`dispatch` takes an action as an argument, and it calls the `reducer` function. This will trigger a re-render.

---

# Exercises

Update the following examples to use `useReducer`

---

<Timer />

```jsx
// Exercise 1
const LightSwitch = () => {
  const [isOn, setIsOn] = React.useState(false);

  return (
    <>
      Light is {isOn ? "on" : "off"}.
      <button onClick={() => setIsOn(!isOn)}>Toggle</button>
    </>
  );
};
```

---

<Timer />

```jsx
// Exercise 2
function App() {
  const [status, setStatus] = React.useState("idle");

  return (
    <form
      onSubmit={() => {
        setStatus("loading");

        getStatusFromServer()
          .then(() => {
            setStatus("idle");
          })
          .catch(() => {
            setStatus("error");
          });
      }}
    >
      Status is: {status}
      <button>Submit</button>
    </form>
  );
}
```

---

<Timer />

```jsx
// Exercise 3
export const ModalContext = React.createContext(null);

export const ModalProvider = ({ children }) => {
  const [currentModal, setCurrentModal] = React.useState(null);

  return (
    <ModalContext.Provider
      value={{
        currentModal,
        setCurrentModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
```

---

# Immutable updates

It's important that you don't _mutate_ the existing state:

```js
// 🚨 don't do this:
function reducer(state, action) {
  switch (action.type) {
    case "updateUserInfo": {
      state.firstName = action.firstName;
      state.lastName = action.lastName;

      return state;
    }
  }
}
```

---

# Quiz

What does the following output to the console?

```js
const obj = {
  numOfBeans: 2,
  numOfButtons: 0,
};

function grantHalfBean(someObject) {
  someObject.numOfBeans += 0.5;
  return someObject;
}

const updatedObj = grantHalfBean(obj);

console.log(obj === updatedObj);
```

---

You must produce a **new value** from the reducer, so that React knows it has to update!

---

# Demo

```jsx live=true
const initialState = {
  numOfBeans: 2,
  numOfButtons: 0,
};
const reducer = (state, action) => {
  if (action.type === "increment-beans") {
    state.numOfBeans += 0.5;
  }

  return state;
};
const App = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  console.log(state);
  return (
    <div className="App">
      <h1>
        {state.numOfBeans} Beans,
        {state.numOfButtons} Buttons.
      </h1>
      <button
        onClick={() =>
          dispatch({
            type: "increment-beans",
          })
        }
      >
        Click
      </button>
    </div>
  );
};

render(<App />);
```

---

# Fixing it

Always return a new object.

```js
const initialState = {
  numOfBeans: 2,
  numOfButtons: 0,
};
const reducer = (state, action) => {
  if (action.type === "increment-beans") {
    return {
      numOfButtons: state.numOfButtons,
      numOfBeans: state.numOfBeans + 0.5,
    };
  }

  return state;
};
```

---

### Pro-tip: Spread operator

```js
const initialState = {
  numOfBeans: 2,
  numOfButtons: 0,
  numOfBananas: 10,
  numOfBlasters: 8,
};

const reducer = (state, action) => {
  if (action.type === "increment-beans") {
    return {
      ...state, // <-- 👀
      numOfBeans: state.numOfBeans + 0.5,
    };
  }

  return state;
};
```

---

# Exercises

Update these objects to use `useReducer`, with a single immutable object

---

<Timer />

```jsx
// Exercise 4
const Game = () => {
  const [points, setPoints] = React.useState(0);
  const [status, setStatus] = React.useState("idle");

  return (
    <>
      Your score: {points}.
      {status === "playing" && (
        <>
          <button onClick={() => setPoints(points + 1)}>🍓</button>
          <button onClick={() => setPoints(points - 1)}>💀</button>
        </>
      )}
      <button onClick={() => setStatus("playing")}>Start game</button>
    </>
  );
};
```

---

<Timer />

```jsx
// Exercise 5
import sendDataToServer from "./some-madeup-place";
import FormField from "./some-other-madeup-place";

const SignUpForm = () => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");

  return (
    <form onSubmit={sendDataToServer}>
      <FormField
        label="First Name"
        value={firstName}
        onChange={(ev) => setFirstName(ev.target.value)}
      />
      <FormField
        label="Last Name"
        value={lastName}
        onChange={(ev) => setLastName(ev.target.value)}
      />
      <FormField
        label="Email"
        value={email}
        onChange={(ev) => setEmail(ev.target.value)}
      />

      <button>Submit</button>
      <button
        onClick={(ev) => {
          ev.preventDefault();

          setFirstName("");
          setLastName("");
          setEmail("");
        }}
      >
        Reset
      </button>
    </form>
  );
};
```

---

### `useState` vs `useReducer`

`useReducer` is good when the logic to update state is non-trivial, or you have a complex state shape (lots of related data).

`useState` is good for small and simple bits of state.

No hard rules though. Learn both, but use whichever you want.

---

### `useReducer` and `useContext`

Because _global state_ often has _non-trivial logic_, these two hooks/patterns are frequently used together.

---

```jsx
// UserContext.js
export const UserContext = React.createContext();

function reducer(state, action) {
  switch (action.type) {
    case "login": {
      return action.user;
    }

    case "logout": {
      return null;
    }

    case "change-email": {
      return {
        ...state,
        email: action.email,
      };
    }

    default:
      throw new Error("unrecognized action: " + action.type);
  }
}

export const UserProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, null);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
```

---

# Exercises

Finish writing the following context components with `useReducer`

---

```js
// Exercise 6
export const StudentContext = React.createContext();

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = React.useState({
    aditya: false,
    bodhi: false,
    chetan: false,
  });

  // We need actions to:
  // - mark a student as "present"
  // - mark a student as "absent",
  // - add a student to the class.

  return (
    <StudentContext.Provider value={{ state }}>
      {children}
    </StudentContext.Provider>
  );
};
```

---

```js
// Exercise 7
export const DataContext = React.createContext();

export const DataProvider = ({ children }) => {
  const [status, setStatus] = React.useState({
    data: null,
    status: "idle",
  });

  // We need actions to:
  // - start fetching data from the server
  // - receive data from the server
  // - receive an error from the server

  return (
    <DataContext.Provider value={{ state }}>{children}</DataContext.Provider>
  );
};
```

---

- https://reactjs.org/docs/hooks-reference.html#usereducer
