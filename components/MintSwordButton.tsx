import { useEthers } from "@usedapp/core";
import React, { useState } from "react";
import { Button, useToast } from "@chakra-ui/react";

export const MintSwordButton: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { account } = useEthers();
  const toast = useToast();

  async function mintSwordFromAPI() {
    setLoading(true);

    await fetch("/api/mint_sword", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        account,
        type: "gold",
      }),
    });

    setLoading(false);
    toast({
      title: "You've obtained your gold sword!",
      description: "refresh the page to see your updated inventory.",
    });
  }

  return (
    <>
      <Button
        isDisabled={!account}
        onClick={() => mintSwordFromAPI()}
        isLoading={loading}
      >
        Mint Gold Sword
      </Button>
    </>
  );
};
