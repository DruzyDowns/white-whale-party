import { motion } from "framer-motion";
import Image from "next/image";

const Coral = () => {
  return (
    <div className="w-full relative grid grid-cols-1 grid-rows-1">
      <div className="absolute flex w-1/2 h-1/3 inset-1/4 blur-2xl overflow-hidden">
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
        animate={{ y: [0, -2, 0], opacity: [0.75, 0.5, 0.75] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="relative z-10 row-start-1 col-start-1"
      >
        <Image
          className=""
          src={"/coral.png"}
          width={1024}
          height={1024}
          alt=""
        />
      </motion.div>
    </div>
  );
};

export default Coral;
