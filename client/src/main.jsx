import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store, persistor } from "./redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import ThemeProvider from "./utils/ThemeProvider.jsx";
import UserContextWrapper from "./context/UserContext.jsx";
import { HelmetProvider } from "react-helmet-async";
ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <ThemeProvider>
          <UserContextWrapper>
            <HelmetProvider>
              <App />
            </HelmetProvider>
          </UserContextWrapper>
        </ThemeProvider>
      </Provider>
    </PersistGate>
  </>
);
