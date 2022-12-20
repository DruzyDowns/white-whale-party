import { motion } from "framer-motion";
import Image from "next/image";

const Mascot = () => {
  return (
    <>
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
      <Image
        className="relative z-10"
        src={"/white_whale-mascot.png"}
        width={1024}
        height={1024}
        alt=""
      />
    </>
  );
};

export default Mascot;
