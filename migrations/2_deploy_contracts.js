const VarunContract = artifacts.require('VarunContract');
const VarunToken = artifacts.require('VarunToken');

module.exports = async function (deployer) {
  await deployer.deploy(VarunToken);
  const token = await VarunToken.deployed();
  await deployer.deploy(VarunContract, token.address);
};
