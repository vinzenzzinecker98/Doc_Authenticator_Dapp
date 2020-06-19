
const Documents = artifacts.require("./Documents.sol");


contract("Documents", accounts => {
  it("has been stored", async () => {
    const documents = await Documents.deployed();

    // Register
    await documents.register("HiMrWorld", { from: accounts[0] });

    // Validate
    const a = await documents.verify("HiMrWorldd", {from: accounts[1]});
    const b = await documents.verify("HiMrWorld", {from: accounts[1]});
    assert.equal(a, true, "nicht geklappt")
    
  });
});
