import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";
import { ModalProvider } from "./context/ModalContext";
import { router } from "./router";
import "./index.css";
import "./styles/App.css";

Amplify.configure(awsExports);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ModalProvider>
    <RouterProvider router={router} />
  </ModalProvider>
);
