import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import ClientForm from "./pages/ClientForm";
import ClientList from "./pages/ClientList";
import { CustomerProvider } from "./context/CustomerProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <ClientForm />,
      },
      {
        path: "/list",
        element: <ClientList />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CustomerProvider>
      <RouterProvider router={router} />
    </CustomerProvider>
  </React.StrictMode>
);
