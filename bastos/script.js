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
});
