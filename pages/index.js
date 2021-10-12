import { useEffect } from "react";
import { ethers } from "ethers";

function Home() {
  const checkIfWalletIsConnected = () => {
    /*
     * First make sure we have access to window.ethereum
     */
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
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
        <button className="w-full p-4 bg-gray-900 rounded-lg text-white hover:bg-gray-200 hover:text-gray-800 transition-all duration-500">
          Send my song
        </button>
      </div>
    </div>
  );
}

export default Home;
