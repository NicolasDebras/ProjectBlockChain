import { expect } from "chai";
import { ethers } from "hardhat";

describe("Deploy Contract", function () {

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


describe("PartNFT", function () {
    it("Should create a new Part NFT", async function () {
        // Déployez le contrat CarNFT
        const CarNFT = await ethers.getContractFactory("CarNFT");
        const carNFT = await CarNFT.deploy();

        //await carNFT.deployed();

        // Créez un NFT de voiture
        const createTx = await carNFT.createPartNFT(
            "name",
            "type",
            "imageURI",
            "rank",
            "This is a description of the part",
            "tokenURI"
        );

        // Attendez que la transaction soit confirmée
        let receipt = await createTx.wait();

        // Récupérez les détails du Car NFT créé
        const part = await carNFT.parts(1);

        expect(part.name).to.equal("name");
    });

    it("Should create a two Part NFT", async function () {
        // Déployez le contrat CarNFT
        const CarNFT = await ethers.getContractFactory("CarNFT");
        const carNFT = await CarNFT.deploy();

        //await carNFT.deployed();

        // Créez un NFT de voiture
        const createTx = await carNFT.createPartNFT(
            "name",
            "type",
            "imageURI",
            "rank",
            "This is a description of the part",
            "tokenURI"
        );

        const createTx2 = await carNFT.createPartNFT(
            "test2",
            "type",
            "imageURI",
            "rank",
            "This is a description of the part",
            "tokenURI"
        );

        // Attendez que la transaction soit confirmée
        let receipt = await createTx.wait();
        receipt = await createTx2.wait();

        // Récupérez les détails du Car NFT créé
        const part = await carNFT.parts(2);

        expect(part.name).to.equal("test2");
    });
});

describe("fuse two NFT", function () {
    it("Should create a two Part NFT", async function () {
        const CarNFT = await ethers.getContractFactory("CarNFT");
        const carNFT = await CarNFT.deploy();

        

        const createCarTx = await carNFT.createCarNFT(
            "Make",
            "Model",
            2023,
            "carImageURI",
            "This is a description of the car",
            "carTokenURI"
        );

        // Créez un NFT de pièce
        const createPartTx = await carNFT.createPartNFT(
            "PartName",
            "PartType",
            "partImageURI",
            "PartRank",
            "This is a description of the part",
            "partTokenURI"
        );
        const createCarReceipt = await createCarTx.wait();
        console.log(createCarReceipt);
        const carTokenId = createCarReceipt?.events?.find((e) => e.event === "CarNFTCreated")?.args.tokenId;

        const createPartReceipt = await createPartTx.wait();
        const partTokenId = createPartReceipt?.events?.find((e) => e.event === "PartNFTCreated")?.args.tokenId;
        
        if (!carTokenId || !partTokenId) {
            if (!carTokenId && !partTokenId)
                throw new Error("Token Car & Part ID not found");
            if (!carTokenId )
                throw new Error("Token Car ID not found");
            else
                throw new Error("Token Part ID not found");
          }

        // Fusionnez la voiture et la pièce
        const fuseTx = await carNFT.fuseCarPart(carTokenId, partTokenId);
        const fuseReceipt = await fuseTx.wait();

        // Vérifiez que la fusion a créé un nouvel NFT avec un nouvel ID
        const fusedTokenId = fuseReceipt.events[0].args[0];
        expect(fusedTokenId).to.be.a('number');


    });
});