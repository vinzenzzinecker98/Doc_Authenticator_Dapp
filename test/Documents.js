const Documents = artifacts.require("./Documents.sol");


contract("Documents", accounts => {
  it("should register and validate a document, without changing ownership", async () => {

    const documents = await Documents.deployed();

    // Register
    await documents.register("correcthash", { from: accounts[0] });

    //attempt to alter ownership from 0 to 1 
    await documents.register("correcthash", { from: accounts[1] });

    // Validate
    const a = await documents.verify("correcthash", {from: accounts[1]});
    const b = await documents.verify("incorrecthash", {from: accounts[2]});
   

    assert.equal(a, accounts[0], "registration not working or ownership altered");
    assert.equal(b, 0x0000000000000000000000000000000000000000, "validation not working, not stored document was said to be registered")

  });
});
