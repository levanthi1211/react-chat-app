import React from "react";
import ReactDOM from "react-dom/client";
import "./shared/styles/globals.css";
import "./shared/styles/_main.scss";
import { Routers } from "./shared/routes/Routers";
import { Provider } from "react-redux";
import { store } from "./shared/infra/redux/store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <Routers />
    </Provider>
  </React.StrictMode>
);
