pragma solidity >=0.4.21 <0.7.0;
//SPDX-License-Identifier: AFL-3.0

contract Documents {
  mapping (string => address) public store;

  function register (string memory _hash) public
  {
    //Only register document if no one has claimed the exact hash value before.
    //document ownership cannot be altered
    if (store[_hash] == address(0)){
      //store the owners public adress associated with the hash value.
       store[_hash] = msg.sender;
    }
  }

  //check whether the given value is stored in the ledger
  //keyword view to enable contract calls only (not altering state)
  function verify (string memory __hash) public view returns (address)
  {
      return store[__hash];
  }
}
