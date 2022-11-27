import React from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";
import { ABI_CODE, ESCROW_ADDRESS } from "./utils/constant";

const App = () => {
  const [provider, setProvider] = React.useState(null);
  const [contract, setContract] = React.useState(null);
  const [amount, setAmount] = React.useState(null);

  React.useEffect(() => {
    async function initiate() {
      const _providerCopy = await detectEthereumProvider(); // gives window.ethereum object
      const providerCopy = new ethers.providers.Web3Provider(_providerCopy); // bind the metamask provider with ether library provider
      if (providerCopy) {
        setProvider(providerCopy);
      } else {
        alert("Install metamask");
      }

    }
    initiate();
  }, []);

  async function connect(){
    await provider.send("eth_requestAccounts", []);
  
    const signer = await provider.getSigner();
    const contractCopy = new ethers.Contract(
      ESCROW_ADDRESS,
      ABI_CODE,
      signer
    );
    const amountCopy = await contractCopy.amount();
    setAmount(amountCopy.toNumber());
    setContract(contractCopy);
  }

  async function deposit() {
    const transaction = await contract.deposit({value: amount});
    await transaction.wait();
  }

  async function submitWork(){
    await contract.submitWork();
  }

  async function releaseFund(){
    await contract.release();
  }
  return (
    <div style={{textAlign: 'center'}}>
      <h1>Escow contract app</h1>
      <div><button onClick={connect}>Connect Wallet</button></div>
      <h3>Active contract address:{contract?.address}</h3>
      <h3>amount to deposit:{amount}</h3>
      <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
        <button onClick={deposit}>Deposit</button>
        <button onClick={releaseFund}>Release</button>
        <button onClick={submitWork}>Submit work</button>
      </div>
    </div>
  );
};

export default App;
