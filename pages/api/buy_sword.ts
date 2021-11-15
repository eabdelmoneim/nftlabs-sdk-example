import { ThirdwebSDK } from "@3rdweb/sdk";
import { ethers } from "ethers";
import { NextApiRequest, NextApiResponse } from "next";

function getRpcUrl() {
  const isTestnet = process.env.IS_TEST_NET || true;
  if (!process.env.NEXT_PUBLIC_RPC_URL) {
    if (isTestnet) {
      return "https://rpc-mumbai.maticvigil.com";
    } else {
      return "https://polygon-rpc.com";
    }
  }
  return process.env.NEXT_PUBLIC_RPC_URL;
}

function sample<T>(arr: Array<T>): T {
  return arr[Math.floor(Math.random() * arr.length)];
}


export default (req: NextApiRequest, res: NextApiResponse): Promise<any> => {
  const sdk = new ThirdwebSDK(
    new ethers.Wallet(
      process.env.PRIVATE_KEY as string,
      ethers.getDefaultProvider(getRpcUrl())
    )
  );

  const market = sdk.getMarketModule(
    process.env.NEXT_PUBLIC_MARKET_MODULE_ADDRESS as string
  );

  return new Promise<void>((resolve) => {
    const { listingId, quantity } = req.body;
    // TODO: validations

    // async/await works too!
    market
      .buy(listingId, quantity)
      .then((metadata) => {
        res.status(200).json(metadata);
        resolve();
      });
  });
};
