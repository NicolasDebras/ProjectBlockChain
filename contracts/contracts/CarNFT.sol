// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract CarNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    uint256[] private _allTokenIds;

    struct Car {
        string make;
        string model;
        uint256 year;
        string imageURI; 
        string desc; 
    }


    // Piece de voiture 
    struct Part {
        string name;
        string typePart;
        string imageURI;
        string rank; 
        string desc; 
    }

    mapping(uint256 => Car) public cars;
    mapping(uint256 => Part) public parts;

    event CarNFTCreated(uint256 tokenId, string make, string model, uint256 year);
    event PartNFTCreated(uint256 tokenId, string name, string typePart, string rank);  
    event NFTFused(uint256 newTokenId, uint256 carTokenId, uint256 partTokenId);

    constructor() ERC721("CarNFT", "CAR") {}
	
	function getAllTokenIds() public view returns (uint256[] memory) {
        return _allTokenIds;
    }

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
        _allTokenIds.push(newItemId);

        emit CarNFTCreated(newItemId, make, model, year);
        return newItemId;
    }

    function createPartNFT(
        string memory name,
        string memory typePart,
        string memory imageURI,
        string memory rank,
        string memory description,
        string memory tokenURI
    ) public returns (uint256) {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);

        parts[newItemId] = Part(name, typePart, imageURI, rank, description);

        emit PartNFTCreated(newItemId, name, typePart, rank);

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
        _burn(partTokenId);

        emit NFTFused(newTokenId, carTokenId, partTokenId);

        return newTokenId;
    }
}
