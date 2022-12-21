import { ConnectButton } from "@rainbow-me/rainbowkit";
import { reverse } from "dns";
import { AnimatePresence, motion } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Mascot from "../components/mascot";
import Waves, { Wave } from "../components/waves";
import { Source_Serif_Pro, Spectral } from "@next/font/google";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { useContractEvent } from "wagmi";
import ChatSidebar from "../components/chatSidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import RulesModal from "../components/rulesModal";
import Header from "../components/header";
import Search from "../components/search";
import Coral from "../components/coral";
import Clam from "../components/clam";
import Create from "../components/create";

const spectral = Spectral({
  weight: ["800", "600"],
  variable: "--font-spectral",
});
const source = Source_Serif_Pro({
  weight: ["400"],
  variable: "--font-source",
});

const Home: NextPage = () => {
  const { address, isConnecting, isDisconnected } = useAccount({
    onConnect({ address, connector, isReconnected }) {
      generateAvatar();
    },
  });

  const findGames = useContractEvent({
    address: process.env.NEXT_PUBLIC_CONTRACT_FACTORY_ADDRESS,
    //abi: ensRegistryABI,
    eventName: "NewOwner",
    listener(node, label, owner) {
      console.log(node, label, owner);
    },
  });

  // Get the default provider
  const provider = ethers.getDefaultProvider();

  // Load the contract artifact
  const artifact = require("../contracts/WhiteWhaleFactory.json");

  // Get the contract address
  //const contractAddress = artifact.networks["5777"].address;

  // Get an instance of the contract
  //const contract = new ethers.Contract(contractAddress, artifact.abi, provider);

  // Retrieve past events from the blockchain

  useEffect(() => {
    // declare the data fetching function
    const fetchContractEvents = async () => {
      //const pastEvents = await contract.queryFilter("filter");
    };

    // call the function
    fetchContractEvents()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  const [avatar, setAvatar] = useState("");
  const [gameState, setGameState] = useState("setup");
  const [disclaimed, setDisclaimed] = useState(false);
  const [rulesModalOpen, setRulesModalOpen] = useState(false);

  async function generateAvatar() {
    axios
      .post("/api/avatar", { seed: 0 })
      .then(function (response) {
        setAvatar(response.data.avatar);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    if (avatar == "") {
      generateAvatar();
    }
  }, [avatar]);

  const Disclaimer = ({ ...props }) => {
    const handleDisclaimer = () => {
      setDisclaimed(true);
    };
    return (
      <div className="space-y-4">
        <p className="text-3xl font-hl font-extrabold uppercase tracking-wide">
          first things first.
        </p>
        <p className="w-full">
          Let&apos;s go ahead and get this out of the way. This is a an on-chain
          social experiment, and by design, no token you deposit into this
          contract may ever be returned to you. The spirit of this style of gift
          exchange is to purposefully choose tokens of little to no value to you
          — and to have fun fighting with your friends over silly and/or useless
          gifts.
        </p>
        <p className="w-full">
          You should read the{" "}
          <span
            onClick={() => props.setRulesModalOpen(true)}
            className="underline cursor-pointer"
          >
            rules
          </span>{" "}
          before deciding to play. You should only play with a group you trust.
        </p>
        <p className="w-full">
          By proceeding any further you acknowledge that you are swimming in the
          dark sea of Ethereum and no one, not even the White Whale, can
          guarantee your safety.
        </p>
        <button
          onClick={() => handleDisclaimer()}
          className="relative z-20 w-1/2 bg-walnut text-white py-2 rounded-lg uppercase font-bold tracking-wider cursor-pointer hover:shadow-lg"
        >
          aye, I agree
        </button>
      </div>
    );
  };

  return (
    <div className={`${spectral.variable} ${source.variable}`}>
      <Head>
        <title>White Whale</title>
        <meta name="description" content="White Whaaaaaaalllleeee!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full h-screen relative body-gradient overflow-hidden font-body text-walnut text-lg">
        {rulesModalOpen ? (
          <>
            <RulesModal
              rulesModalOpen={rulesModalOpen}
              setRulesModalOpen={setRulesModalOpen}
            />
          </>
        ) : (
          <></>
        )}

        <Header
          rulesModalOpen={rulesModalOpen}
          setRulesModalOpen={setRulesModalOpen}
        />
        <div className="w-full absolute bottom-0 blur-[2px]">
          <Waves
            waveColor={"wave-fill-dark"}
            accent={
              "bg-gradient-to-r from-[#f37d75] via-[#f4c9a6] to-[#f37d75]"
            }
            accentHeight={"h-8"}
            offset={"bottom-4"}
            waveLength={30}
            waveHeight={15}
          />
        </div>
        <AnimatePresence>
          <div className="relative w-3/4 h-full p-16 top-0 left-0">
            <div className="w-full h-full flex justify-center items-center">
              <div className="flex w-full items-center space-x-8">
                <div className="relative z-10 w-1/2 space-y-8">
                  {address ? (
                    <>
                      {(() => {
                        switch (gameState) {
                          case "setup":
                            return (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{
                                  duration: 0.7,
                                  ease: "easeOut",
                                }}
                              >
                                <div className="bg-warm p-6 rounded-lg shadow-md space-y-4">
                                  <p className="text-3xl font-hl font-extrabold uppercase tracking-wide">
                                    join a party
                                  </p>
                                  <p className="">
                                    Search the network for an eligible party &
                                    join a pod for an existing game.
                                  </p>
                                  <button
                                    onClick={() => setGameState("searching")}
                                    className="relative z-20 w-1/2 bg-walnut text-white py-2 rounded-lg uppercase font-bold tracking-wider cursor-pointer hover:shadow-lg"
                                  >
                                    find your pod
                                  </button>
                                </div>
                                <p className="py-8 text-4xl font-hl font-extrabold uppercase tracking-widest">
                                  —or—
                                </p>
                                <div className="bg-warm p-6 rounded-lg shadow-md space-y-4">
                                  <p className="text-3xl font-hl font-extrabold uppercase">
                                    start your own
                                  </p>
                                  <p className="">
                                    Deploy a White Whale party contract and be
                                    the master of your own destiny.
                                  </p>
                                  <button
                                    onClick={() => setGameState("creating")}
                                    className="relative z-20 w-1/2 bg-walnut text-white py-2 rounded-lg uppercase font-bold tracking-wider cursor-pointer hover:shadow-lg"
                                  >
                                    deploy new party
                                  </button>
                                </div>
                              </motion.div>
                            );
                          case "searching":
                            return (
                              <>
                                {disclaimed ? (
                                  <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{
                                      duration: 0.7,
                                      ease: "easeOut",
                                    }}
                                    className="h-screen pt-24"
                                  >
                                    <Search
                                      gameState={gameState}
                                      setGameState={setGameState}
                                    />
                                  </motion.div>
                                ) : (
                                  <>
                                    <Disclaimer
                                      rulesModalOpen={rulesModalOpen}
                                      setRulesModalOpen={setRulesModalOpen}
                                    />
                                  </>
                                )}
                              </>
                            );
                          case "creating":
                            return (
                              <>
                                {disclaimed ? (
                                  <>
                                    <motion.div
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      exit={{ opacity: 0 }}
                                      transition={{
                                        duration: 0.7,
                                        ease: "easeOut",
                                      }}
                                      className="h-screen pt-24"
                                    >
                                      <Create
                                        gameState={gameState}
                                        setGameState={setGameState}
                                      />
                                    </motion.div>
                                  </>
                                ) : (
                                  <>
                                    <Disclaimer
                                      rulesModalOpen={rulesModalOpen}
                                      setRulesModalOpen={setRulesModalOpen}
                                    />
                                  </>
                                )}
                              </>
                            );
                          case "active":
                            return <></>;
                          default:
                            return null;
                        }
                      })()}
                    </>
                  ) : (
                    <>
                      <p className="text-2xl">
                        Connect your wallet to get started.
                      </p>
                      <ConnectButton />
                    </>
                  )}
                </div>
                {(() => {
                  switch (gameState) {
                    case "setup":
                      return (
                        <>
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 3, ease: "easeOut" }}
                            className="w-1/2 relative"
                          >
                            <Mascot />
                          </motion.div>
                        </>
                      );
                    case "searching":
                      return (
                        <>
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 3, ease: "easeOut" }}
                            className="w-1/2 relative"
                          >
                            <Coral />
                          </motion.div>
                        </>
                      );
                    case "creating":
                      return (
                        <>
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 3, ease: "easeOut" }}
                            className="w-1/2 relative"
                          >
                            <Clam />
                          </motion.div>
                        </>
                      );
                    case "playing":
                      return <></>;
                    default:
                      return null;
                  }
                })()}
              </div>
            </div>
          </div>
          {gameState == "playing" ? (
            <>
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: "0%" }}
                exit={{ x: "100%" }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="fixed w-1/4 h-full top-0 right-0 p-2 bg-warm shadow-xl"
              >
                <ChatSidebar address={address} avatar={avatar} />
              </motion.div>
            </>
          ) : (
            <></>
          )}
        </AnimatePresence>
        <div className="w-full absolute z-40 bottom-0">
          <Waves
            waveColor={"wave-fill-light"}
            accent={
              "bg-gradient-to-r from-[#8d84eb] via-[#f37d75] to-[#8d84eb]"
            }
            accentHeight={"h-10"}
            offset={"bottom-0"}
            waveLength={20}
            waveHeight={15}
          />
          <div className="absolute bottom-0 w-full h-2 bg-[#eee0da]"></div>
        </div>
      </main>
    </div>
  );
};

export default Home;
