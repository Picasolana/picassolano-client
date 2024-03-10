import { initializeConnector, Web3ReactHooks } from "@web3-react/core";
import { Connector, Web3ReactStore } from "@web3-react/types";
import { Phantom } from "web3-react-phantom";
import { PhantomProvider } from "../types/Phantom";

const phantom = initializeConnector<Phantom>(
  (actions) => new Phantom({ actions })
);

const connectors: [Connector, Web3ReactHooks, Web3ReactStore][] = [phantom];

/**
 * Retrieves the Phantom Provider from the window object
 * @returns {PhantomProvider | undefined} a Phantom provider if one exists in the window
 */
export const getProvider = (): PhantomProvider | undefined => {
  if ("phantom" in window) {
    const anyWindow: any = window;
    const provider = anyWindow.phantom?.solana;

    if (provider?.isPhantom) {
      return provider;
    }
  }

  // window.open("https://phantom.app/", "_blank");
};

export default connectors;
