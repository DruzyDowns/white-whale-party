/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { ethers } from "ethers";
import { useContractEvent, useContractRead, useContractReads } from "wagmi";
import { ZDK, ZDKNetwork, ZDKChain } from "@zoralabs/zdk";
import { useEffect, useState } from "react";

import whiteWhaleAbi from "../contracts/WhiteWhale.json";

const networkInfo = {
  network: ZDKNetwork.Ethereum,
  chain: ZDKChain.Goerli,
};

const API_ENDPOINT = "https://api.zora.co/graphql";

const Game = ({ ...props }) => {
  const whiteWhaleABI = whiteWhaleAbi.whiteWhaleAbi;

  //console.log(ethers.utils.formatUnits(data._hex, 0));

  const [walletTokens, setWalletTokens] = useState([]);

  useEffect(() => {
    const zoraConfig = {
      endPoint: API_ENDPOINT,
      networks: [networkInfo],
    };
    const zdk = new ZDK(zoraConfig); // All arguments are optional

    const getWalletTokens: any = async (
      wallet: any,
      cursor: string | null | undefined,
      data: any[] = []
    ) => {
      try {
        const tokenMapping: any = [];
        const zoraData = await zdk.tokens({
          where: {
            ownerAddresses: [`${wallet}`],
          },
          pagination: {
            limit: 500,
          },
        });

        console.log(zoraData.tokens);

        zoraData.tokens.nodes.map((node: any) => {
          tokenMapping.push({
            contract: node.token.collectionAddress,
            tokenId: node.token.tokenId,
            image: node.token.image,
            collectionName: node.token.tokenContract.name,
            tokenName: node.token.name,
          });
        });

        setWalletTokens(tokenMapping);
      } catch (error) {}
    };
    getWalletTokens(props.address);
  }, [props.address]);

  const [gameStarted, setGameStarted] = useState(false);

  useContractEvent({
    address: process.env.NEXT_PUBLIC_SVGAME_CONTRACT_ADDRESS,
    abi: whiteWhaleABI,
    eventName: "GameStarted",
    listener(node, label, owner) {
      console.log(node, label, owner);
    },
  });

  const whiteWhaleContract = {
    address: process.env.NEXT_PUBLIC_SVGAME_CONTRACT_ADDRESS,
    abi: whiteWhaleABI,
  };

  const { data, isError, isLoading } = useContractReads({
    contracts: [
      {
        ...whiteWhaleContract,
        functionName: "balanceOf",
        args: [props.address],
      },
    ],
  });

  return (
    <div className="">
      <div className="w-full flex justify-between p-4 bg-warm rounded-lg shadow-md border-b border-walnut/20 mb-12">
        <div className="flex space-x-4">
          <div className="w-24 bg-warm rounded-lg">
            <Image
              className="w-full rounded-lg shadow-lg"
              src={`/coral.png`}
              width={420}
              height={420}
              alt=""
            />
          </div>
          <div>
            <p className="text-3xl font-hl font-extrabold uppercase">
              First Annual Stapleverse White Whale Gift Exchange
            </p>
            <p className="text-lg font-hl">
              0x979B9b3aF5d8a7b2AE7d15A400153b675715f86a
            </p>
          </div>
        </div>

        <div
          onClick={() => props.setGameState("setup")}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <p className="text-xs font-bold">back</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
            />
          </svg>
        </div>
      </div>

      <div className="relative h-[75vh] space-y-2 overflow-y-scroll">
        <div>deposit a token to join the game</div>
        <div className="grid grid-cols-4 gap-4">
          {walletTokens.map((token: any, i: number) => (
            <div key={i} className="bg-warm p-2 rounded-lg shadow-lg">
              {token.image != null &&
              token.image.mediaEncoding.__typename == "ImageEncodingTypes" ? (
                <>
                  <img
                    className="w-full rounded-lg shadow-lg"
                    src={token.image.mediaEncoding.thumbnail}
                    width={420}
                    height={420}
                    alt=""
                  />
                </>
              ) : (
                <div className="relative">
                  <p className="absolute bottom-2 left-2 text-xs">
                    no thumbnail for token
                  </p>
                  <Image
                    className="w-full rounded-lg shadow-lg"
                    src={`/white_whale_clam.png`}
                    width={420}
                    height={420}
                    alt=""
                  />
                </div>
              )}
              <div className="space-y-2 py-2">
                <p className="text-sm font-bold">{token.tokenName}</p>
                <p className="text-xs">{token.collectionName}</p>
                <p className="text-sm">ID: {token.tokenId}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full h-24">
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default Game;
