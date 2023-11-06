// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract CarNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // Structure mise à jour pour stocker des informations sur la voiture
    struct Car {
        string make;
        string model;
        uint256 year;
        string imageURI; // URL de l'image de la voiture
        string description; // Description de la voiture
    }

    // Mapping de tokenId à la structure Car
    mapping(uint256 => Car) public cars;

    // Événement émis lors de la fusion de NFT
    event NFTFused(uint256 newTokenId, uint256 carTokenId, uint256 partTokenId);

    constructor() ERC721("CarNFT", "CAR") {}

    // Fonction pour créer un nouveau NFT de voiture avec l'URL de l'image et une description
    function createCarNFT(
        string memory make,
        string memory model,
        uint256 year,
        string memory imageURI,
        string memory description,
        string memory tokenURI
    ) public returns (uint256) {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);

        cars[newItemId] = Car(make, model, year, imageURI, description);

        return newItemId;
    }

    // Fonction pour fusionner un NFT de voiture avec un NFT de pièce
    function fuseCarPart(uint256 carTokenId, uint256 partTokenId) public returns (uint256) {
        require(ownerOf(carTokenId) == msg.sender, "You must own the car NFT to fuse with a part.");
        require(ownerOf(partTokenId) == msg.sender, "You must own the part NFT to fuse.");

        // Créez un nouvel NFT qui est une combinaison de la voiture et de la pièce
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        Car memory car = cars[carTokenId];
        // Vous pouvez décider de la manière de combiner les URL des images et les descriptions
        string memory newTokenURI = string(abi.encodePacked(car.make, "_", car.model, "_fused"));
        string memory newImageURI = car.imageURI; // Utilisez l'URL de l'image de la voiture ou une nouvelle
        string memory newDescription = string(abi.encodePacked(car.description, "test", Strings.toString(partTokenId)));

        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, newTokenURI);

        cars[newTokenId] = Car(car.make, car.model, car.year, newImageURI, newDescription);

        // Brûler les NFTs originaux (voiture et pièce) si désiré
        // _burn(carTokenId);
        // _burn(partTokenId);

        emit NFTFused(newTokenId, carTokenId, partTokenId);

        return newTokenId;
    }
}
