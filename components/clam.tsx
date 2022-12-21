import { motion } from "framer-motion";
import Image from "next/image";

const Clam = () => {
  return (
    <div className="w-full relative grid grid-cols-1 grid-rows-1">
      <div className="absolute inset-[15%] flex w-3/4 h-1/2 rounded-full blur-2xl overflow-hidden">
        <motion.div
          animate={{ x: ["50%", "0%"] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="w-[200%] h-full bg-gradient-to-r from-[#f37d75] via-[#fef0be] to-[#8d84eb]"
        ></motion.div>
      </div>
      <motion.div
        animate={{ y: [0, -5, 0], rotate: [1, -1, 1] }}
        transition={{
          duration: 7,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="relative z-10 row-start-1 col-start-1"
      >
        <Image
          className=""
          src={"/white_whale_clam.png"}
          width={1024}
          height={1024}
          alt=""
        />
      </motion.div>
    </div>
  );
};

export default Clam;
