# [6-1]

# Reducers and NPM Ecosystem

---

# Housekeeping:

### Context components

It's common convention to create a component file to deal exclusively with a certain context.

---

```jsx
export const UserContext = React.createContext("user");

const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);

  return (
    <UserContext.Provider
      value={{
        user: user,
        setUser: user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
```

---

With this component created, we _import the provider_ to make that state globally available.

```jsx
import UserProvider from "./UserContext";

const App = () => {
  <UserProvider>
    <Header />
    <Router>{/* All your normal stuff */}</Router>
  </UserProvider>;
};
```

---

Then, we can access that state anywhere!

```jsx
import { UserContext } from "./UserContext";

const Navigation = () => {
  const { user } = React.useContext(UserContext);

  return (
    <nav>
      <ul>
        {!user && (
          <li>
            <LoginDialogTrigger />
          </li>
        )}
      </ul>
    </nav>
  );
};
```
