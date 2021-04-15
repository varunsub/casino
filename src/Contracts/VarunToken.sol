pragma solidity >=0.6.0;
import "./SafeMath.sol";

contract VarunToken {
    //instantiate
    string public name = "VarunToken";
    string public symbol = "VTC";
    uint256 public _totalSupply = 1000000000000000000000000;
    uint8 public decimals = 18;

    mapping(address => uint256) public balances;
    mapping(address => mapping(address => uint256)) public allowed;
    mapping(address => uint256) timestamp;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    event Faucet(address borrower, uint256 timestamp);

    constructor() public {
        balances[msg.sender] = _totalSupply;
        emit Transfer(address(0), msg.sender, _totalSupply);
    }

    function balanceOf(address _tokenOwner) public view returns (uint256) {
        return balances[_tokenOwner];
    }

    function totalSupply() public view returns (uint256) {
        return _totalSupply - balances[address(0)];
    }

    function allowance(address _tokenOwner, address _spender)
        public
        view
        returns (uint256 remaining)
    {
        return allowed[_tokenOwner][_spender];
    }

    function faucet(address _borrower) public payable {
        balances[_borrower] = 1000000;
        timestamp[_borrower] = block.timestamp;
        emit Faucet(_borrower, block.timestamp);
    }

    function transfer(address _to, uint256 _value)
        public
        returns (bool success)
    {
        require(balances[msg.sender] >= _value);

        balances[msg.sender] -= _value;
        balances[_to] += _value;

        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function remove(address _to, uint256 _value) public returns (bool success) {
        require(balances[msg.sender] >= _value);

        balances[msg.sender] -= _value;
        balances[_to] += _value;

        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public returns (bool success) {
        require(_value <= balances[_from]);
        require(_value <= allowed[_from][msg.sender]);

        balances[_from] -= _value;
        balances[_to] += _value;
        allowed[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }
}
