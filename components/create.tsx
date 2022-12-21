const Create = ({ ...props }) => {
  return (
    <div className="bg-warm rounded-lg shadow-md p-4">
      <div className="w-full flex justify-between border-b border-walnut/20 mb-12">
        <p className="text-3xl font-hl font-extrabold uppercase">
          deploy party
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
        contract setup biz
        <div className="w-full h-24">
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default Create;
