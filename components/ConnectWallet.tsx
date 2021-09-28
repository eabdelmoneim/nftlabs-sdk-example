import { useEthers } from "@usedapp/core";
import React, { useRef } from "react";
import { Button } from "@chakra-ui/react";

interface ConnectorError {
  connector: any;
  error: Error;
}

export const ConnectWalletButton: React.FC = () => {
  const { account, activateBrowserWallet, deactivate, connector, error } =
    useEthers();

  const errorRef = useRef<ConnectorError | null>(null);

  if (error) {
    errorRef.current = { connector, error };
  } else {
    if (errorRef.current?.error && errorRef?.current.connector == connector) {
      errorRef.current = null;
    }
  }
  return (
    <>
      {account ? (
        <Button mt={2} onClick={() => deactivate()}>
          Disconnect Wallet
        </Button>
      ) : (
        <Button
          mt={2}
          onClick={() => activateBrowserWallet()}
          backgroundColor={errorRef.current ? "red.500" : ""}
        >
          {errorRef.current
            ? "Error: Connect Wallet (Retry)"
            : "Connect Wallet"}
        </Button>
      )}
    </>
  );
};
