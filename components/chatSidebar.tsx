import { ConnectButton } from "@rainbow-me/rainbowkit";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const SendIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="white"
      className="w-8 h-8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
      />
    </svg>
  );
};

const ChatSidebar = ({ ...props }) => {
  const [chatBlank, setChatBlank] = useState(true);
  const [chatValue, setChatValue] = useState("");

  const handleTyping = (e: any) => {
    setChatBlank(false);
    setChatValue(e.target.value);
  };

  return (
    <>
      <AnimatePresence>
        {props.address ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 3 }}
              transition={{ duration: 1 }}
              className="w-full flex justify-between"
            >
              <Image
                className="w-1/4 rounded-lg shadow-lg"
                src={`/avatars/${props.avatar}.png`}
                width={420}
                height={420}
                alt=""
              />
            </motion.div>
          </>
        ) : (
          <></>
        )}
      </AnimatePresence>
      <div className="absolute bottom-24 right-0 flex items-center w-[110%] h-20 bg-offwhite rounded-l-full shadow-lg">
        <AnimatePresence>
          {chatBlank ? (
            <></>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 3 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute z-20 flex justify-center items-center bg-[#8d84eb] rounded-full w-16 h-16 -left-12 cursor-pointer"
              >
                <SendIcon />
              </motion.div>
            </>
          )}
        </AnimatePresence>
        <textarea
          value={chatValue}
          placeholder={"sing a message into the sea..."}
          onChange={(e) => handleTyping(e)}
          className={
            "h-full w-full px-12 py-4 rounded-l-full bg-offwhite caret-walnut"
          }
        ></textarea>
      </div>
    </>
  );
};

export default ChatSidebar;
