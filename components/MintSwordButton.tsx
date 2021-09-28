import { useEthers } from "@usedapp/core";
import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

export const MintSwordButton: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { account } = useEthers();
  const router = useRouter();

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
    setTimeout(() => router.reload(), 500);
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
