import { useEffect, useState } from "react";
import { ethers } from "ethers";

function Home() {
  const [currentAccount, setCurrentAccount] = useState("");

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log(
          "Make sure you have metamask and are logged in to your Rinkeby account."
        );
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      /*
       * Check if we're authorized to access the user's wallet
       */
      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Implement your connectWallet method here
   */
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  /*
   * This runs our function when the page loads.
   */
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className="w-full lg:w-1/2 mx-auto m-1">
      <h1 className="text-3xl text-white py-8">
        Pop ETH Songs List Collection 🥤
      </h1>
      <p className="text-white">
        Please send me a Youtube link with your favourite Pop song.
      </p>
      <p className="text-white">I'll play it at least once.</p>
      <p className="text-white">
        And maybe, if I like it, I'll play it non-stop.
      </p>

      <div className="song-form mt-8">
        <button
          className="w-full p-4 bg-gray-900 rounded-lg text-white hover:bg-gray-200 hover:text-gray-800 transition-all duration-500"
          onClick={null}
        >
          Send my song
        </button>
      </div>

      <div className="connect-account mt-8">
        {!currentAccount && (
          <button
            className="waveButton bg-yellow-200 px-5 py-3 rounded-lg"
            onClick={connectWallet}
          >
            Connect your MetaMask Wallet
          </button>
        )}
      </div>
    </div>
  );
}

export default Home;
