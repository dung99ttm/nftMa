import {useContext} from "react";
import {Link} from "react-router-dom";
import {ProviderContext} from "../providers/DappProvider";

const Header = () => {
  const context = useContext(ProviderContext);

  return (
    <div id="header">
      <Link to="/" id="logo">
        NFT Marketplace
      </Link>
      <div id="link-containers">
        <a>Start Hunting</a>
        {/* <a>Dark NFTs</a> */}
        <a>Community</a>
        <a>Craft NFT</a>
        <button id="connect-wallet" onClick={context.handleWallet}>
          {!context.account ? "Connect Wallet" : context.account}
        </button>
      </div>
    </div>
  );
};

export default Header;
