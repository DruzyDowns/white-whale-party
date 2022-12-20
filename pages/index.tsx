import { ConnectButton } from "@rainbow-me/rainbowkit";
import { reverse } from "dns";
import { AnimatePresence, motion } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Mascot from "../components/mascot";
import Waves, { Wave } from "../components/waves";
import { Source_Serif_Pro, Spectral } from "@next/font/google";
import { useAccount } from "wagmi";
import ChatSidebar from "../components/chatSidebar";
import { useEffect, useState } from "react";
import axios from "axios";

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
  const [avatar, setAvatar] = useState("");

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

  return (
    <div className={`${spectral.variable} ${source.variable}`}>
      <Head>
        <title>White Whale</title>
        <meta name="description" content="White Whaaaaaaalllleeee!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full h-screen relative body-gradient overflow-hidden font-body text-walnut text-lg">
        <div className="fixed z-20 top-0 h-20 w-3/4 flex justify-between p-4">
          <h3 className="capitalize text-walnut text-4xl font-hl font-extrabold">
            white whale
          </h3>
        </div>
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
          <div className="relative w-3/4 h-full p-16 top-0 left-0 shadow-xl">
            <div className="w-full h-full flex justify-center items-center">
              <div className="flex w-full items-center space-x-8">
                <div className="space-y-8 w-1/2">
                  {address ? (
                    <>
                      <div>
                        <p className="text-3xl font-hl font-extrabold uppercase tracking-wide">
                          join a party
                        </p>
                        <p className="w-3/4">
                          Search the network for an eligible party & join a pod
                          for an existing game.
                        </p>
                      </div>
                      <p className="py-8 text-4xl font-hl font-extrabold uppercase tracking-widest">
                        —or—
                      </p>
                      <div>
                        <p className="text-3xl font-hl font-extrabold uppercase">
                          start your own
                        </p>
                        <p className="w-3/4">
                          Deploy a White Whale party contract and be the master
                          of your own destiny.
                        </p>
                      </div>
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
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 3, ease: "easeOut" }}
                  className="w-1/2 relative"
                >
                  <Mascot />
                </motion.div>
              </div>
            </div>
          </div>
          <div className="fixed w-1/4 h-full top-0 right-0 p-2 bg-warm shadow-xl">
            <ChatSidebar address={address} avatar={avatar} />
          </div>
        </AnimatePresence>
        <div className="w-full absolute bottom-0">
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
        </div>
      </main>
    </div>
  );
};

export default Home;
