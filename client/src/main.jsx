import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store, persistor } from "./redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import ThemeProvider from "./utils/ThemeProvider.jsx";
import UserContextWrapper from "./context/UserContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    {/* React.StrictMode */}
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <ThemeProvider>
          <UserContextWrapper>
            <App />
          </UserContextWrapper>
        </ThemeProvider>
      </Provider>
    </PersistGate>
  </>
);
