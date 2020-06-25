pragma solidity >=0.4.21 <0.7.0;
//SPDX-License-Identifier: AFL-3.0

contract Documents {
  mapping (string => address) public store;

  function register (string memory _hash) public
  {
    //Only register document if no one has claimed the exact hash value before.
    //so that document ownership cannot be altered
    if (store[_hash] == address(0)){

      //store the owners public adress associated with the hash value.
       store[_hash] = msg.sender;
    }
  }

  function verify (string memory __hash) public view returns (address)
  {
      return store[__hash];
  }
}
