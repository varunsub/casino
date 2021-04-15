import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import VarunContract from '../abis/VarunContract.json';
import Web3 from 'web3';

export default function BalanceTable({ balance }) {
  const { register, handleSubmit, control } = useForm();
  const [error, setError] = useState(null);

  async function onSubmit(data) {
    let amount = parseInt(data.betAmount);
    console.log(amount);
    console.log(balance);
    console.log(data.choice);
    let num;
    const web3 = new Web3(window.ethereum);

    if (data.choice === 'heads') num = 0;
    else num = 1;

    var contract = new web3.eth.Contract(
      VarunContract.abi,
      '0x7811ED3e89483e061f3032A2c63f24d2abe708c3'
    );
    contract.methods.bet(amount, num);
    if (amount < balance) {
      setError(null);
    } else {
      setError('Not enough balance');
    }
  }
  return (
    <TableContainer>
      <StyledTable>
        <thead>
          <tr>
            <th>Balance (wei)</th>
            <th>Bet</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{balance}</td>
            <td>Mark</td>
          </tr>
        </tbody>
      </StyledTable>
      Enter an amount to bet and select a side
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="betAmount"
          control={control}
          rules={{ required: true }}
          type="number"
          {...register('betAmount')}
        />{' '}
        <select {...register('choice')}>
          <option value="heads">heads</option>
          <option value="tails">tails</option>
        </select>
        <input type="submit" />
      </form>
      <div>{error !== null ? error : null}</div>
    </TableContainer>
  );
}

const StyledTable = styled.table`
  margin: 5%;
  width: 20% !important;
`;

const TableContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
`;
