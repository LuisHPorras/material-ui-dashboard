const { expect } = require("chai");

describe("Alert", function() {
  it("Should create a new alert and emit an event", async function() {
    
    const Alert = await ethers.getContractFactory("Alert");
    const alert = await Alert.deploy();
    
    await alert.deployed();
    await alert.create(0, "Im an alert");
    expect(await alert.getClaim()).to.equal("Im an alert");

    await alert.updateClaim("I still am an alert")
    expect(await alert.getClaim()).to.equal("I still am an alert");
  });
});
