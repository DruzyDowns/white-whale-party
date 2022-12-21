import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const PartyCard = ({ partyData, ...props }: any) => {
  const [cardSelected, setCardSelected] = useState(false);

  const handleGameStart = () => {
    console.log("joining game");
  };

  const handleCardView = (cardData: any) => {
    setCardSelected(true);
    props.setSelectedPartyData(cardData);
  };

  return (
    <div
      onClick={() => handleCardView(partyData)}
      className="flex items-center p-2 px-4 rounded-lg space-x-8 bg-offwhite/50 shadow-md cursor-pointer transition hover:scale-[101%] hover:shadow-lg"
    >
      <div className="bg-warm w-1/4 rounded-lg">
        <Image
          className="w-full rounded-lg shadow-lg"
          src={`/coral.png`}
          width={420}
          height={420}
          alt=""
        />
      </div>
      <div className="w-full space-y-2">
        <p className="text-sm font-bold">{partyData.name}</p>
        <p className="text-sm">
          deployed by:{" "}
          <span className="underline">
            {partyData.contract.slice(0, 3)}...
            {partyData.contract.slice(-4)}
          </span>
        </p>
      </div>
    </div>
  );
};

const Search = ({ ...props }) => {
  const [selectedPartyData, setSelectedPartyData] = useState({
    name: "",
    symbol: "",
    contract: "",
  });
  const dummyData = [
    {
      name: "First Annual Stapleverse WW Gift Exchange",
      symbol: "SVWW",
      contract: "ox001204q304590345134532453200",
    },
    {
      name: "Second Annual Stapleverse WW Gift Exchange",
      symbol: "SVWW",
      contract: "ox001204q304590345134532453240",
    },
    {
      name: "Third Annual Stapleverse WW Gift Exchange",
      symbol: "SVWW",
      contract: "ox001204q304590345134532453241",
    },
    {
      name: "First Annual Stapleverse WW Gift Exchange",
      symbol: "SVWW",
      contract: "ox001204q304590345134532453242",
    },
    {
      name: "Second Annual Stapleverse WW Gift Exchange",
      symbol: "SVWW",
      contract: "ox001204q304590345134532453243",
    },
    {
      name: "Third Annual Stapleverse WW Gift Exchange",
      symbol: "SVWW",
      contract: "ox001204q30459034513453245324",
    },
    {
      name: "First Annual Stapleverse WW Gift Exchange",
      symbol: "SVWW",
      contract: "ox001204q304590345134532453245",
    },
    {
      name: "Second Annual Stapleverse WW Gift Exchange",
      symbol: "SVWW",
      contract: "ox001204q304590345134532453246",
    },
    {
      name: "Third Annual Stapleverse WW Gift Exchange",
      symbol: "SVWW",
      contract: "ox001204q304590345134532453247",
    },
  ];
  return (
    <div className="relative bg-warm rounded-lg shadow-md p-4">
      <AnimatePresence>
        <motion.div
          key={selectedPartyData.contract}
          initial={{ opacity: "0%" }}
          animate={{ opacity: "100%" }}
          exit={{ opacity: "0%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute w-[200%] top-1/4 left-full p-4"
        >
          <div className="w-full p-4 bg-warm shadow-md rounded-lg space-y-4">
            <p className="text-3xl font-hl font-extrabold">
              {selectedPartyData.name}
            </p>
            <p className="text-xl">
              deployed by:{" "}
              <span className="underline">
                {selectedPartyData.contract.slice(0, 3)}...
                {selectedPartyData.contract.slice(-4)}
              </span>
            </p>
            <p className="text-xl">participants: 12</p>
            <p className="text-xl">starts at block 420</p>
            <button
              onClick={() => props.setGameState("playing")}
              className="relative z-20 w-1/2 bg-walnut text-white py-2 rounded-lg uppercase font-bold tracking-wider cursor-pointer hover:shadow-lg"
            >
              join party
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="w-full flex justify-between border-b border-walnut/20 mb-12">
        <p className="text-3xl font-hl font-extrabold uppercase">
          active parties
        </p>
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
        {dummyData.map((party) => (
          <PartyCard
            key={party.contract}
            partyData={party}
            gameState={props.gameState}
            setGameState={props.setGameState}
            selectedPartyData={selectedPartyData}
            setSelectedPartyData={setSelectedPartyData}
          />
        ))}
        <div className="w-full h-24">
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default Search;
