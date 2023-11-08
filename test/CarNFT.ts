import { expect } from "chai";
import { ethers } from "hardhat";

describe("Deploy Contract", function ()
{

})

describe("CarNFT", function () {
  it("Should create a new Car NFT", async function () {
    // Déployez le contrat CarNFT
    const CarNFT = await ethers.getContractFactory("CarNFT");
    const carNFT = await CarNFT.deploy();
    
    //await carNFT.deployed();

    // Créez un NFT de voiture
    const createTx = await carNFT.createCarNFT(
      "Make",     
      "Model",    
      2023,       
      "imageURI", 
      "This is a description of the car", 
      "tokenURI"  
    );

    // Attendez que la transaction soit confirmée
    let receipt = await createTx.wait();

    // Récupérez les détails du Car NFT créé
    const car = await carNFT.cars(1);

    expect(car.make).to.equal("Make");
    expect(car.model).to.equal("Model");
    expect(car.year).to.equal(2023);
  });
});