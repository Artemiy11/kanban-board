import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "mobx-react";
import taskStore from "./store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider taskStore={taskStore}>
      <App />
    </Provider>
  </React.StrictMode>
);
