// contract test code will go here
const assert = require("assert");
const ganache = require("ganache");
const { beforeEach } = require("mocha");
const { it } = require("mocha");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require("../compile");

let accounts;
let inbox;
const INITIAL_STRING = "Hi! there";

beforeEach(async () => {
  //Get the list of all unlocked accounts
  accounts = await web3.eth.getAccounts();
  // console.log(accounts);

  //Use one of those accounts to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: [INITIAL_STRING],
    })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox", () => {
  it("deploys a contract", () => {
    //check if there is a address property in inbox object
    assert.ok(inbox.options.address);
  });

  it("has a default message", async () => {
    const message = await inbox.methods.getMessage().call();
    assert.equal(message, INITIAL_STRING);
  });

  it("can change the message", async () => {
    await inbox.methods.setMessage("Hello world").send({ from: accounts[0] });
    const message = await inbox.methods.getMessage().call();
    console.log(message);
    assert.equal(message, "Hello world");
  });
});
/*
class Car {
  park() {
    return "stopped";
  }
  drive() {
    return "vroom";
  }
}

let car;

beforeEach(() => {
  car = new Car();
});

describe("car", () => {
  it("can park", () => {
    assert.equal(car.park(), "stopped");
  });

  it("can drive", () => {
    assert.equal(car.drive(), "vroom");
  });
});
*/
