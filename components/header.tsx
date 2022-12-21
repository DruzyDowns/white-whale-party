import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = ({ ...props }) => {
  return (
    <div className="fixed z-20 top-0 h-20 w-3/4 flex items-baseline p-4 space-x-12">
      <h3 className="capitalize text-walnut text-4xl font-hl font-extrabold">
        white whale
      </h3>
      <ul className="flex space-x-8 cursor-pointer">
        <li onClick={() => props.setRulesModalOpen(true)}>rules</li>
        <li>active parties</li>
        <li>create</li>
        <li>view contract</li>
        <li>github</li>
      </ul>
      <div className="h-fit">
        <ConnectButton chainStatus="icon" showBalance={false} />
      </div>
    </div>
  );
};

export default Header;
