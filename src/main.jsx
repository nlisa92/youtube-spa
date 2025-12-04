import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { HashRouter } from "react-router-dom";

import "@ant-design/v5-patch-for-react-19";
import "antd/dist/reset.css";

import "./index.css";
import App from "./App.jsx";
import { store, persistor } from "./store/store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HashRouter>
          <App />
        </HashRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);
