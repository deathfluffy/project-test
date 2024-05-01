import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { App } from "./components/App.jsx";
import { persistor, store } from "./store/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { PageLoader } from "./components/PageLoader/PageLoader.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={<PageLoader />} persistor={persistor}>
      <BrowserRouter basename="/project-test">
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
