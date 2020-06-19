pragma solidity >=0.4.21 <0.7.0;
//SPDX-License-Identifier: AFL-3.0

contract Documents {
  mapping (string => address) public store;

  

  function register (string memory _hash) public
  {
    if (store[_hash] == address(0)){
       store[_hash] = msg.sender;
    }
  }

  function verify (string memory __hash) public view returns (bool)
  {
    if (store[__hash] != address(0)){
      return true;
    }
    return false;
  }
}
