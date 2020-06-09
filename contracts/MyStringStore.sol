pragma solidity >=0.4.21 <0.7.0;
//SPDX-License-Identifier: AFL-3.0

contract MyStringStore {
  string public myString = "Hello World";

  function set(string memory x) public {
    myString = x;
  }
}
