import { Button } from '@material-ui/core';
export default function Faucet({ contract, account, updateBal }) {
  async function handleFaucet() {
    await contract.methods.faucet().send({ from: account });
    updateBal();
  }
  return (
    <>
      <Button onClick={() => handleFaucet()}>Get VTC</Button>
    </>
  );
}
