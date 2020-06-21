pragma solidity >=0.4.21 <0.7.0;
//SPDX-License-Identifier: AFL-3.0

contract Documents {
  mapping (bytes32 => address) public store;

  function register (bytes32 _hash) public
  {
    if (store[_hash] == address(0)){
       store[_hash] = msg.sender;
    }
  }

  function verify (bytes32 __hash) public view returns (bool)
  {
    if (store[__hash] != address(0)){
      return true;
    }
    return false;
  }
}
