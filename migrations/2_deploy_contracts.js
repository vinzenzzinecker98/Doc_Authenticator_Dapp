const MyStringStore = artifacts.require("MyStringStore");
const Documents = artifacts.require("Documents");
module.exports = function(deployer) {
  deployer.deploy(MyStringStore);
  deployer.deploy(Documents);
};
