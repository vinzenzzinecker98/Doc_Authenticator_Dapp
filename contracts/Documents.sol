pragma solidity >=0.4.21 <0.7.0;

contract Documents {
  mapping (string => address) public store;

  function verify(string memory hash) public view returns (bool)
  {
    if (store[hash] != address(0)){
      return true;
    }
    return false;
  }

  function register (string memory _hash) public
  {
    if (store[_hash] == address(0)){
       store[_hash] = msg.sender;
    }
  }
}
