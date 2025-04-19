function showSection(sectionId) {
    const profileSection = document.querySelector('.profile-section');
    const ppContentSection = document.querySelector('.pp-content-section');
    const defaultSidebar = document.querySelector('.sidebar');
    const listingsSection = document.querySelector('.listings-section');
    const transactionSection = document.querySelector('.transaction-section');
    const chatSection = document.querySelector('.chat-section');
    const myListingsSection = document.getElementById('myListingsSection');

    // Hide all sections initially
    [profileSection, ppContentSection, listingsSection, transactionSection, chatSection, myListingsSection].forEach(section => {
        if (section) section.classList.add('hidden');
    });

    // Show specific section

    if (sectionId === 'transaction-section') {
        if (profileSection) profileSection.classList.remove('hidden');
        if (transactionSection) transactionSection.classList.remove('hidden');
    }
    else if (sectionId === 'chat-section') {
        if (listingsSection) listingsSection.classList.remove('hidden');
        if (chatSection) chatSection.classList.remove('hidden');
    } else if (sectionId === 'listings-section') {
        if (listingsSection) listingsSection.classList.remove('hidden');
    }
    else if (sectionId === 'profile-section') {
        if (profileSection) profileSection.classList.remove('hidden');
        if (ppContentSection) ppContentSection.classList.remove('hidden');
    }

    // Sidebar always visible
    if (defaultSidebar) defaultSidebar.classList.remove('hidden');
}
let showingListings = false;

function toggleListings() {
    const profileSection = document.querySelector('.profile-section');
    const ppContentSection = document.querySelector('.pp-content-section');
    const defaultSidebar = document.querySelector('.sidebar');
    const myListingsSection = document.getElementById('myListingsSection');
    const transactionSection = document.querySelector('.transaction-section');
    const chatSection = document.querySelector('.chat-section');
    const listingsSection = document.querySelector('.listings-section');
    const toggleButton = document.getElementById('toggleListingsBtn');

    if (showingListings) {
        // Show profile view
        if (profileSection) profileSection.classList.remove('hidden');
        if (ppContentSection) ppContentSection.classList.remove('hidden');
        if (myListingsSection) myListingsSection.classList.add('hidden');
        if (transactionSection) transactionSection.classList.add('hidden');
        if (chatSection) chatSection.classList.add('hidden');
        if (listingsSection) listingsSection.classList.add('hidden');

        if (toggleButton) toggleButton.textContent = "View My Listings";
    } else {
        // Show listings view
        if (transactionSection) transactionSection.classList.add('hidden');
        if (chatSection) chatSection.classList.add('hidden');
        if (ppContentSection) ppContentSection.classList.add('hidden');
        if (listingsSection) listingsSection.classList.add('hidden');

        if (profileSection) profileSection.classList.remove('hidden');
        if (myListingsSection) myListingsSection.classList.remove('hidden');

        if (toggleButton) toggleButton.textContent = "Show Profile";
    }

    showingListings = !showingListings;
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    if (!input) {
        console.warn('Chat input not found');
        return;
    }
    const messageText = input.value.trim();
    if (!messageText) return;

    const messagesContainer = document.getElementById('chatMessages');
    if (!messagesContainer) {
        console.warn('Chat messages container not found');
        return;
    }

    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', 'sent');
    messageDiv.innerHTML = `
        <p>${messageText}</p>
        <p><small>${new Date().toLocaleString()}</small></p>
    `;

    messagesContainer.appendChild(messageDiv);
    input.value = '';
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Initial state when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');
    showSection('profile-section'); // Or default to 'profile'
});
