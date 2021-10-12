import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Head from "next/head";
import abi from "../utils/SongPortal.json";

function Home() {
  const [currentAccount, setCurrentAccount] = useState("");

  const contractAddress = "0x3e9d0ed6967eBB254dE6b7b8fe07386eE943eE05";

  const contractABI = abi.abi;

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

  //the push song function - calls the function on the contract
  const song = async () => {
    console.log("Song button called");
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const songPortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        let count = await songPortalContract.getTotalSongs();
        console.log("Retrieved total songs count...", count.toNumber());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
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
    <div>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Monoton&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="w-full p-3 lg:p-0 lg:w-2/3 mx-auto m-1">
        <h1 className="text-4xl text-white py-4 lg:py-8">
          Pop Songs Through The Ether 🥤
        </h1>
        <p className="text-white mt-5">
          Please send me a Youtube link with your favourite Pop song.
        </p>
        <p className="text-white">I'll play it at least once.</p>
        <p className="text-white">
          And maybe, if I like it, I'll play it non-stop.
        </p>

        <div className="song-form mt-8">
          <button
            className="w-full p-4 bg-gray-900 rounded-lg text-white hover:bg-gray-200 hover:text-gray-800 transition-all duration-500"
            onClick={song}
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

        <div className="lionel text-center mt-8">
          <img
            src="https://thumbs.gfycat.com/BrilliantSplendidDuiker-max-1mb.gif"
            alt="Lionel"
            className="mx-auto border border-gray-800"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
