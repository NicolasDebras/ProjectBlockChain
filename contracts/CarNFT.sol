// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract CarNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct Car {
        string make;
        string model;
        uint256 year;
        string imageURI; 
        string desc; 
    }

    mapping(uint256 => Car) public cars;

    event NFTFused(uint256 newTokenId, uint256 carTokenId, uint256 partTokenId);

    constructor() ERC721("CarNFT", "CAR") {}

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

        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        Car memory car = cars[carTokenId];

        string memory newTokenURI = string(abi.encodePacked(car.make, "_", car.model, "_fused"));
        string memory newImageURI = car.imageURI; 
        string memory newDescription = string(abi.encodePacked(car.desc, "test", Strings.toString(partTokenId)));

        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, newTokenURI);

        cars[newTokenId] = Car(car.make, car.model, car.year, newImageURI, newDescription);

        // Brûler les NFTs originaux
        // _burn(carTokenId);
        // _burn(partTokenId);

        emit NFTFused(newTokenId, carTokenId, partTokenId);

        return newTokenId;
    }
}
