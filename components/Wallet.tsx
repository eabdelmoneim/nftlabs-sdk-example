import React from "react";
import { useEtherBalance, useEthers } from "@usedapp/core";
import { Button, Heading, Stack, Text, useToast } from "@chakra-ui/react";
import { formatEther } from "@ethersproject/units";
import { BigNumber } from "@ethersproject/bignumber";

const SignMessageComponent: React.FC = () => {
  const { library, account } = useEthers();
  const showToast = useToast();

  return (
    <Button
      onClick={() => {
        if (!library || !account) {
          showToast({
            title: "Sign Message Failed",
            description: "Wallet not connected",
            status: "error",
            duration: 15000,
            isClosable: true,
          });
          return;
        }

        library
          .getSigner(account)
          .signMessage(`Signing message for dApp starter @ ${Date.now()}`)
          .then((signature: any) => {
            showToast({
              title: "Sign Message Success",
              description: `Signature: ${signature}`,
              status: "success",
              duration: 15000,
              isClosable: true,
            });
          })
          .catch((error: any) => {
            showToast({
              title: "Sign Message Failed",
              description: error && error.message ? `${error.message}` : "",
              status: "error",
              duration: 15000,
              isClosable: true,
            });
          });
      }}
    >
      Sign Message
    </Button>
  );
};

const ChainComponent: React.FC = () => {
  const { chainId } = useEthers();
  return <Text>Chain ID: {chainId ? chainId : "-"}</Text>;
};

const AccountComponent: React.FC = () => {
  const { account } = useEthers();
  return <Text>Account: {account ? account : "-"}</Text>;
};

const BalanceComponent: React.FC = () => {
  const { account } = useEthers();
  const balance = useEtherBalance(account);
  return (
    <Text>
      Balance: Ξ{balance ? formatEther(balance as BigNumber) : "0.00"}
    </Text>
  );
};

export const Wallet: React.FC = () => {
  return (
    <>
      <Stack px={2} py={4} rounded="lg" border="1px" spacing={1}>
        <Heading size="md">Connected Wallet</Heading>
        <ChainComponent />
        <AccountComponent />
        <BalanceComponent />
      </Stack>
    </>
  );
};
