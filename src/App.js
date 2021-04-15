import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import BalanceTable from './Components/BalanceTable';
import VarunContract from './abis/VarunContract.json';
import VarunToken from './abis/VarunToken.json';
import Faucet from './Components/Faucet';
export default function App() {
  const [connection, setConnection] = useState('loading');
  const [balance, setBalance] = useState(null);
  const [account, setAccount] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [contractAddress, setContractAddress] = useState(null);
  const [stateWeb3, setStateWeb3] = useState(null);
  const [token, setToken] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    async function run() {
      //sets up web3 and gets network and account
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      if (typeof accounts[0] !== undefined) {
        try {
          //saves to state if exists
          setStateWeb3(web3);
          setAccount(accounts[0]);

          //load contracts
          const BankAddress = VarunContract.networks[networkId].address;
          const vToken = new web3.eth.Contract(
            VarunToken.abi,
            VarunToken.networks[networkId].address
          );
          const vContract = new web3.eth.Contract(
            VarunContract.abi,
            VarunContract.networks[networkId].address
          );

          //sets contract and token
          setToken(vToken);
          setContractAddress(BankAddress);
          setContract(vContract);

          let bal = await vToken.methods.balanceOf(accounts[0]).call();
          setBalance(bal);
          setConnection('connected');
        } catch (e) {
          console.log(e);
        }
      } else setConnection('none');
    }
    run();
  }, []);

  async function updateBal() {
    let bal = await token.methods.balanceOf(account).call();
    setBalance(bal);
  }

  // State for when the wallet information is loading
  if (connection === 'loading') {
    return (
      <>
        <LoadingContainer>
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </LoadingContainer>
      </>
    );
  }

  //State if no wallet is present in the browser
  if (connection === 'none') {
    return (
      <>
        Oops, you need Meta Mask to use this app. Please install it and come
        back
      </>
    );
  }

  if (connection === 'invalid network') {
    return (
      <>
        <div>Please make sure you're connected to the Ropsten Test network</div>
      </>
    );
  }
  //State once wallet is found
  if (connection === 'connected') {
    return (
      <>
        <Faucet contract={contract} account={account} updateBal={updateBal} />
        <BalanceTable balance={balance} />
      </>
    );
  }
}

const LoadingContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
