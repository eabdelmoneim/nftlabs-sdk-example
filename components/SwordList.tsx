import { useEthers } from "@usedapp/core";
import React, { useEffect, useState } from "react";
import { Image, Text, Stack, Box, Flex } from "@chakra-ui/react";
import { NFTLabsSDK } from "@nftlabs/sdk";

export const SwordList: React.FC<{ displayAccount?: string }> = ({
  displayAccount,
}) => {
  const { library } = useEthers();
  const [swordList, setSwordList] = useState<any>([]);

  useEffect(() => {
    async function fetchSwordList() {
      if (!library) {
        return;
      }
      const sdk = new NFTLabsSDK(library.getSigner());
      const nft = sdk.getNFTModule(
        process.env.NEXT_PUBLIC_NFT_MODULE_ADDRESS as string
      );
      if (displayAccount) {
        const owned = await nft.getOwned(displayAccount);
        setSwordList(owned);
      } else {
        setSwordList(await nft.getAll());
      }
    }
    fetchSwordList();
  }, [library, displayAccount]);

  return (
    <>
      <Stack>
        {swordList.length ? (
          swordList.map((sword: any) => (
            <Box key={sword.id} border="1px" padding={4}>
              <Flex align="center">
                <Box>
                  <Image src={sword.image} boxSize="64px" />
                  <Text fontWeight="bold">{sword.name}</Text>
                  <Text fontSize="sm">{sword.description}</Text>
                </Box>

                <Box fontSize="xs">
                  <pre>{JSON.stringify(sword.properties, null, 2)}</pre>
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
