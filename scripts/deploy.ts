const hre = require("hardhat");

async function main() {
  // Nous obtenons le contrat à déployer
  const CarNFT = await hre.ethers.getContractFactory("CarNFT");
  const carNFT = await CarNFT.deploy();

  await carNFT.deployed();

  console.log("CarNFT deployed to:", carNFT.address);
}

// Nous recommandons cette configuration de traitement d'erreur pour attraper toutes les erreurs asynchrones
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });