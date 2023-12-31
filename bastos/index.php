<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wallet</title>
    <script src="https://cdn.jsdelivr.net/npm/web3/dist/web3.min.js"></script>
    <style>
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
    </style>
</head>
<body>
    <h1>Coucou</h1>
    <button id="connectWallet">Connecter Wallet</button>
	<!-- confirmation -->
	<div id="popup" class="popup">
		<div class="popup-content">
			<span class="close-button">&times;</span>
			<p id="popupMessage">Vous êtes connecté à l'adresse : <span id="walletAddress"></span></p>
		</div>
	</div>
    <script src="script.js"></script>
</body>
</html>
