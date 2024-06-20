import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { App } from "./components/App.jsx";
import { persistor, store } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { Loader } from "./components/Loader/Loader.jsx";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store} loading={<Loader />}>
    <PersistGate loading={<Loader />} persistor={persistor}>
      <BrowserRouter basename="/project-test">
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
