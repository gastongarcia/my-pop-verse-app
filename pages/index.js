import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Head from "next/head";
import abi from "../utils/SongPortal.json";

function Home() {
  const [currentAccount, setCurrentAccount] = useState("");

  const [totalSongs, setTotalSongs] = useState(0);

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
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const songPortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        let count = await songPortalContract.getTotalSongs();
        console.log("Retrieved total song count...", count.toNumber());
        setTotalSongs(count.toNumber());
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
        console.log("Retrieved total song count...", count.toNumber());
        setTotalSongs(count.toNumber());
        /*
         * Execute the actual song from your smart contract
         */
        const songTxn = await songPortalContract.song();
        console.log("Mining...", songTxn.hash);

        await songTxn.wait();
        console.log("Mined -- ", songTxn.hash);

        count = await songPortalContract.getTotalSongs();
        console.log("Retrieved total song count...", count.toNumber());
        setTotalSongs(count.toNumber());
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
        <h1 className="text-4xl text-blue-900 py-4 lg:py-8">
          Pop Songs Through The Ether 🥤
        </h1>
        <p className="text-gray-900 mt-5">
          You can send me a Pop Song using the button below.
        </p>
        <p className="text-gray-900">I'll play it at least once.</p>
        <p className="text-gray-900">
          And maybe, if I like it, I'll play it{" "}
          <span className="font-bold">All Night Long</span>.
        </p>

        {totalSongs !== 0 && (
          <p className="text-gray-900 text-2xl mt-8">
            Total songs sent to me so far: {totalSongs}
          </p>
        )}

        <div className="song-form mt-8">
          <button
            className="w-full lg:w-3/5 p-4 bg-gray-900 rounded-lg text-white hover:bg-gray-200 hover:text-gray-800 transition-all duration-500"
            onClick={song}
          >
            Hit me with a song
          </button>
        </div>

        <div className="connect-account mt-8">
          {!currentAccount && (
            <button
              className="songButton bg-yellow-200 px-5 py-3 rounded-lg"
              onClick={connectWallet}
            >
              Connect your MetaMask Wallet
            </button>
          )}
        </div>

        <div className="lionel mt-8 text-center lg:text-left">
          <img
            src="https://thumbs.gfycat.com/BrilliantSplendidDuiker-max-1mb.gif"
            alt="Lionel"
            className=" mx-auto lg:ml-1 border border-gray-800"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
