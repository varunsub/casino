pragma solidity >=0.6.0;
import "./VarunToken.sol";

contract VarunContract {
    VarunToken token;
    mapping(address => uint256) public betAmount;
    mapping(address => uint256) public balance;

    mapping(address => int8) public betOn;

    constructor(VarunToken _token) {
        token = _token;
        // balance = address(this).balance;
    }

    function faucet() public payable {
        token.faucet(msg.sender);
    }

    function bet(uint256 _amount, int8 _betOn) public payable {
        betAmount[msg.sender] = _amount;
        betOn[msg.sender] = _betOn;
        getResult();
    }

    function getResult() public payable {
        int8 result = random();
        if (result == betOn[msg.sender]) {}
    }

    function random() public view returns (int8) {
        // Not secure, use ChainLink in production
        return (block.number % 2);
    }
}
