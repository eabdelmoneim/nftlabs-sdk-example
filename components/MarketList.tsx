import { ThirdwebSDK } from "@3rdweb/sdk";
import { Box, Button, Flex, Image, Stack, Text, useToast } from "@chakra-ui/react";
import { useEthers } from "@usedapp/core";
import React, { useEffect, useState } from "react";

export const MarketList: React.FC<{ displayAccount?: string }> = ({
  displayAccount,
}) => {
  const { library } = useEthers();
  const [swordList, setSwordMarketList] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    async function fetchMarketList() {
      if (!library) {
        return;
      }
      const sdk = new ThirdwebSDK(library.getSigner());
      const market = sdk.getMarketModule(
        process.env.NEXT_PUBLIC_MARKET_MODULE_ADDRESS as string
      );
      
      setSwordMarketList(await market.getAll());
      
    }
    fetchMarketList();
  }, [library, displayAccount]);

  async function buyNFTfromAPI(listingId: any) {

    if (!library) {
      return;
    }

    setLoading(true);

    const sdk = new ThirdwebSDK(library.getSigner());
      const market = sdk.getMarketModule(
        process.env.NEXT_PUBLIC_MARKET_MODULE_ADDRESS as string
      );

    await market.buy(listingId, 1);

    setLoading(false);
    toast({
      title: "You've successfully bought a sword from the market!",
      description: "refresh the page to see your updated inventory.",
    });

    // await fetch("/api/buy_sword", {
    //   method: "POST",
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     listingId,
    //     quantity: "1",
    //   }),
    // });
  }

  return (
    <>
      <Stack>
        {swordList.length ? (
          swordList.map((sword: any) => (
            <Box key={sword.id} border="1px" padding={4}>
              <Flex align="center">
                <Box>
                  <Image src={sword.tokenMetadata.image} boxSize="64px" />
                  <Text fontWeight="bold">{sword.tokenMetadata.name}</Text>
                  <Text fontSize="sm">{sword.tokenMetadata.description}</Text>
                  <Text fontSize="sm">Price: {sword.currencyMetadata.displayValue}</Text>
                  <Text fontSize="sm">Sold by Seller {sword.seller}</Text>
                  {sword.seller != displayAccount ? (<Button onClick={() => buyNFTfromAPI(sword.id)}>Buy NFT</Button>) : (<Button>Unlist</Button>)}
                </Box>
              </Flex>
            </Box>
          ))
        ) : (
          <>
            <Text>No swords</Text>
          </>
        )}
      </Stack>
    </>
  );
};
