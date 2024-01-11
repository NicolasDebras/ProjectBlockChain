<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wallet</title>
    <script src="https://cdn.jsdelivr.net/npm/web3/dist/web3.min.js"></script>
    <style>
		header {
			background-color: #333;
			color: white;
			padding: 10px 0;
		}

		nav ul {
			list-style: none;
			padding: 0;
			margin: 0;
			display: flex;
			justify-content: space-around;
			align-items: center;
		}

		nav a {
			color: white;
			text-decoration: none;
			padding: 10px 20px;
			transition: background-color 0.3s;
		}

		nav a:hover {
			background-color: #555;
		}
		
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            text-align: center;
            padding: 50px;
        }

        h1 {
            color: #333;
        }

        #connectWallet {
            background-color: #4CAF50;
            color: white;
            padding: 15px 32px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            margin: 4px 2px;
            cursor: pointer;
            border: none;
            border-radius: 5px;
            transition: background-color 0.3s ease;
        }

        #connectWallet:hover {
            background-color: #45a049;
        }
		.popup {
			display: none;
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.5);
			z-index: 2;
		}

		.popup-content {
			background-color: white;
			margin: 15% auto;
			padding: 20px;
			border-radius: 5px;
			width: 30%;
		}

		.close-button {
			color: #aaa;
			float: right;
			font-size: 28px;
			font-weight: bold;
		}

		.close-button:hover,
		.close-button:focus {
			color: black;
			text-decoration: none;
			cursor: pointer;
		}
		
		.nft-container {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
		}

		.nft-item {
			width: 30%;
			margin-bottom: 20px;
		}

		.nft-item img {
			width: 100%;
			height: auto;
			border-radius: 10px;
		}

    </style>
</head>
<body>
    <header>
        <nav>
            <ul>
                <li><a id="walletValue">0 ETH</a></li>
                <li><a href="#fusion">Fusion</a></li>
                <li><a href="#classement">Classement</a></li>
                <li><a id="connectWallet">Connecter Wallet</a></li>
            </ul>
        </nav>
    </header>
    <h1>MarketPlace</h1>
	<div id="popup" class="popup">
		<div class="popup-content">
			<span class="close-button">&times;</span>
			<p id="popupMessage">Vous êtes connecté à l'adresse : <span id="walletAddress"></span></p>
		</div>
	</div>	
	<!--pour afficher nos nft-->
	<div id="nftDisplay" class="nft-container"></div>
	
	<h1>Créer un Car NFT</h1>
		<form id="createCarNFTForm">
			<input type="text" id="make" placeholder="Marque">
			<input type="text" id="model" placeholder="Modèle">
			<input type="number" id="year" placeholder="Année">
			<input type="text" id="imageURI" placeholder="URI de l'image">
			<textarea id="description" placeholder="Description"></textarea>
			<input type="text" id="tokenURI" placeholder="Token URI">
			<button type="submit">Créer Car NFT</button>
		</form>

    <script src="script.js"></script>
</body>
</html>
