import {useContext} from "react";
import {Link} from "react-router-dom";
import {ProviderContext} from "../providers/DappProvider";
import {useLocation} from "react-router";

const Header = () => {
  const context = useContext(ProviderContext);
  const location = useLocation();

  return (
    <div id="header">
      <Link to="/" id="logo">
        NFT Marketplace
      </Link>
      <div id="link-containers">
        <Link
          to="/explore"
          style={
            location.pathname === "/explore"
              ? {border: "1px solid #ffffff"}
              : {}
          }
        >
          Explore
        </Link>
        <Link
          to="/create"
          style={
            location.pathname === "/create"
              ? {border: "1px solid #ffffff"}
              : {}
          }
        >
          Create
        </Link>
        <Link
          to="/activity"
          style={
            location.pathname === "/activity"
              ? {border: "1px solid #ffffff"}
              : {}
          }
        >
          Activity
        </Link>
        <Link
          to="/myNFT"
          style={
            location.pathname === "/myNFT"
              ? {border: "1px solid #ffffff"}
              : {}
          }
        >
          My NFT
        </Link>
        <Link
          to="/listings"
          style={
            location.pathname === "/listings"
              ? {border: "1px solid #ffffff"}
              : {}
          }
        >
          Listings
        </Link>
        <button id="connect-wallet" onClick={context.handleWallet}>
          {!context.account ? "Connect Wallet" : context.account}
        </button>
      </div>
    </div>
  );
};

export default Header;
