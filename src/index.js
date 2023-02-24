import ReactDOM from "react-dom/client";
import "./index.css";
import "./style.css";
import App from "./App";
import InteractiveComments from "./context/InteractiveComments";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <InteractiveComments>
    <App />
  </InteractiveComments>
);
