import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import { Leaderboard } from "./components/Leaderboard";

import "./index.css";
import { UserProvider } from "./hooks/useUser";

import { Web3ReactProvider, Web3ReactHooks } from "@web3-react/core";
import { Connector } from "@web3-react/types";

import allConnections from "./utils/connectWallet";

const connections: [Connector, Web3ReactHooks][] = allConnections.map(
  ([connector, hooks]) => [connector, hooks]
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/leaderboard",
    element: <Leaderboard />,
  },
]);

const root = document.getElementById("root");

ReactDOM.createRoot(root as HTMLElement).render(
  <Web3ReactProvider connectors={connections}>
    <React.StrictMode>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </React.StrictMode>
  </Web3ReactProvider>
);
