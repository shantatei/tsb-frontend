import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Loading from "./components/Loading";
import { getTotals } from "./redux/cartSlice";

const root = ReactDOM.createRoot(document.getElementById("root"));

const THEME = createTheme({
  typography: {
    fontFamily: " 'Roboto Flex', sans-serif",
    fontSize: 16,
  },
});

store.dispatch(getTotals());

root.render(
  <ThemeProvider theme={THEME}>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
