import { motion } from "framer-motion";

export const Wave = ({ ...props }) => {
  return (
    <>
      <svg
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1050 73"
      >
        <defs></defs>
        <rect
          className={`${props.waveColor}`}
          y="32"
          width="1050"
          height="41"
        />
        <path
          className={`${props.waveColor} wave-stroke`}
          d="M1050,34c-20.19,0-20.19-32-40.38-32s-20.19,32-40.38,32-20.19-32-40.38-32-20.19,32-40.38,32-20.19-32-40.38-32-20.19,32-40.38,32-20.19-32-40.38-32-20.19,32-40.38,32-20.19-32-40.38-32-20.19,32-40.38,32-20.19-32-40.39-32-20.19,32-40.38,32-20.19-32-40.38-32-20.19,32-40.38,32S464.46,2,444.26,2s-20.19,32-40.38,32S383.69,2,363.49,2s-20.19,32-40.39,32S302.91,2,282.72,2s-20.19,32-40.38,32S222.14,2,201.95,2s-20.19,32-40.39,32S141.37,2,121.17,2s-20.19,32-40.39,32S60.59,2,40.39,2,20.2,34,0,34"
        />
      </svg>
    </>
  );
};

const Waves = ({ ...props }) => {
  return (
    <div className="relative w-full h-24">
      <motion.div
        animate={{ x: ["-50%", "0%"] }}
        transition={{
          duration: props.waveLength,
          repeat: Infinity,
          ease: "linear",
        }}
        className={`absolute bottom-0 w-[200%] flex blur-2xl opacity/50`}
      >
        <div className={`w-screen ${props.accent} ${props.accentHeight}`}></div>
        <div className={`w-screen ${props.accent} ${props.accentHeight}`}></div>
      </motion.div>

      <div className={`absolute w-full h-24 overflow-hidden ${props.offset}`}>
        <motion.div
          animate={{ x: "-50%" }}
          transition={{
            duration: props.waveLength,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex w-[200%] blur-[1px]"
        >
          <motion.div
            className="w-1/2"
            animate={{
              skewX: [0, 20, 0, 15, 0],
              scaleY: [1, 0.9, 1],
              y: [15, props.waveHeight, 15],
            }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            <Wave waveColor={props.waveColor} />
          </motion.div>
          <motion.div
            className="w-1/2"
            animate={{
              skewX: [0, 20, 0, 15, 0],
              scaleY: [1, 0.9, 1],
              y: [15, props.waveHeight, 15],
            }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            <Wave waveColor={props.waveColor} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Waves;
