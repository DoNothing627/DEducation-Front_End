import { createContext } from "react";

interface EthereumContextType {
  deducation: any;
  provider: any;
}

export const EthereumContext = createContext<EthereumContextType>(
  {} as EthereumContextType
);

// export const EthereumContext = createContext({});
