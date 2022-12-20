const RulesModal = ({ ...props }) => {
  return (
    <div className="fixed z-40 w-screen h-screen flex justify-center items-center backdrop-blur-md">
      <div className="p-12" onClick={() => props.setRulesModalOpen(false)}>
        x
      </div>
      <div>ruuuuuules</div>
    </div>
  );
};

export default RulesModal;
