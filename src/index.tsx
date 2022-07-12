import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.scss";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {persistStore} from "redux-persist";

import {App} from "./App";
import {store} from "./store/store";
import Preloader from "./components/Preloader";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Preloader/>} persistor={persistStore(store)}>
        <App/>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

