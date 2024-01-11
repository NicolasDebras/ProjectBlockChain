document.addEventListener('DOMContentLoaded', function () {
    //pour ouvrir ma popup
    function openPopup(walletAddress) {
        var popup = document.getElementById('popup');
        var walletAddressSpan = document.getElementById('walletAddress');
        var popupMessage = document.getElementById('popupMessage');
        if (walletAddressSpan && popup && popupMessage) {
            walletAddressSpan.textContent = walletAddress;
            popupMessage.style.display = 'block';
            popup.style.display = 'block';
        } else {
            console.error('Élément(s) nécessaire(s) pour la pop-up introuvable(s) dans le DOM.');
        }
    }
    function closePopup() {
        var popup = document.getElementById('popup');
        if (popup) {
            popup.style.display = 'none';
        }
    }
    //pour ccoonnecter le wallet
    async function connectWallet() {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            openPopup(accounts[0]);
        } catch (error) {
            console.error('Erreur:', error);
        }
    }
    document.getElementById('connectWallet').addEventListener('click', connectWallet);
    document.querySelector('.close-button').addEventListener('click', closePopup);
	
    let contractABI, contractAddress, contract;

    fetch('../contracts/build/contracts/CarNFT.json')
        .then(response => response.json())
        .then(data => {
            contractABI = data.abi;
            contractAddress = data.networks['1704885168162'].address;
            const web3 = new Web3(window.ethereum || "http://localhost:8545");
            contract = new web3.eth.Contract(contractABI, contractAddress);

            document.getElementById('createCarNFTForm').addEventListener('submit', async function(event) {
                event.preventDefault();
                const make = document.getElementById('make').value;
                const model = document.getElementById('model').value;
                const year = document.getElementById('year').value;
                const imageURI = document.getElementById('imageURI').value;
                const description = document.getElementById('description').value;
                const tokenURI = document.getElementById('tokenURI').value;
                
                try {
                    const accounts = await web3.eth.getAccounts();
                    const receipt = await contract.methods.createCarNFT(make, model, year, imageURI, description, tokenURI)
                        .send({ from: accounts[0], gasPrice: '20000000000' });
                    console.log('NFT créé avec succès', receipt);
                } catch (error) {
                    console.error('Erreur lors de la création du NFT:', error);
                }
            });
			
			async function displayNFTs() {
			  const nftCount = await contract.methods.getAllTokenIds().call();
			  const nftDisplayDiv = document.getElementById('nftDisplay');

			  for (let i = 0; i < nftCount.length; i++) {
				const tokenId = nftCount[i];
				const nftDetails = await contract.methods.cars(tokenId).call();
				const nftElement = document.createElement('div');
				nftElement.innerHTML = `
				  <h3>${nftDetails.make} ${nftDetails.model} (${nftDetails.year})</h3>
				  <img src="${nftDetails.imageURI}" alt="Image of ${nftDetails.make} ${nftDetails.model}">
				  <p>Description: ${nftDetails.desc}</p>
				`;
				nftDisplayDiv.appendChild(nftElement);
			  }
			}

			displayNFTs();
        })
        .catch(error => {
            console.error('Erreur lors du chargement du contrat:', error);
        });
});