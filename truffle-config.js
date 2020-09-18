

const path = require("path");

module.exports = {
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "5777", // Match any network id
      //usually you set a gas price here but deployment failed using that, without it it works
    }
  }
};

