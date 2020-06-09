pragma solidity >=0.4.21 <0.7.0;

contract Documents {
  
  mapping (String memory => adress) public store;

  function set(string memory x) public {
    myString = x;
  }

  function verify(String memory hash) returns (boolean)
  {
    if (store[hash]!=null){
      return true;
    }
    return false;
  }

  function register (String memory hash)
  {
    if (store[hash]=null){
       store[hash]=msg.sender;
    }
  }
}
