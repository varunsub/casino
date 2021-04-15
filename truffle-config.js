require('babel-register');
require('babel-polyfill');
const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();
const mnemonic = process.env.MNEMONIC;

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*',
    },
    ropsten: {
      provider: function () {
        return new HDWalletProvider(
          mnemonic,
          'https://ropsten.infura.io/v3/fbbf6b3bf530459d9f5f1c98dfb5f17e'
        );
      },
      network_id: 3,
    },
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      version: '0.8.0',
      evmVersion: 'petersburg',
    },
  },
};
