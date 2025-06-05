// Function to fetch friend invitations from API
async function fetchFriendInvitations() {
    const bearerToken = localStorage.getItem('accessToken');
    const apiUrl = 'http://localhost:8080/api/friend/list/invited';

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching friend invitations:', error);
        return []; // Return empty array if there's an error
    }
}

// Function to approve friend invitation
async function approveFriendInvitation(friendId, button) {
    const bearerToken = localStorage.getItem('accessToken');
    const apiUrl = `http://localhost:8080/api/friend/approval/${friendId}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to approve friend request');
        }

        // Update UI on success
        button.innerText = "Đã xác nhận";
        button.style.backgroundColor = "#e4e6eb";
        button.style.color = "#050505";
        button.disabled = true;

        return await response;
    } catch (error) {
        console.error('Error approving friend request:', error);
        alert('Lỗi khi xác nhận lời mời kết bạn: ' + error.message);
        return null;
    }
}

// Function to render friend requests from API data
async function renderFriendRequests() {
    const friendRequestsContainer = document.getElementById("friendRequests");
    friendRequestsContainer.innerHTML = ""; // Clear existing content

    // Show loading state
    // friendRequestsContainer.innerHTML = '<p>Đang tải lời mời kết bạn...</p>';

    // Get data from API
    const invitationsData = await fetchFriendInvitations();

    // If no data
    if (!invitationsData || invitationsData.length === 0) {
        friendRequestsContainer.innerHTML = '<p>Không có lời mời kết bạn nào</p>';
        return;
    }

    // Render friend invitations
    invitationsData.forEach(friend => {
        const friendCard = document.createElement("div");
        friendCard.classList.add("friend-card");

        // Handle default avatar if null
        const avatarUrl = friend.avatar || 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg';

        friendCard.innerHTML = `
            <img src="${avatarUrl}" alt="Profile">
            <div class="name">${friend.fullName || `${friend.firstName} ${friend.lastName}`}</div>
            <div class="mutual">${friend.mutualFriends ? friend.mutualFriends + ' bạn chung' : ''}</div>
            <div class="buttons">
                <button class="confirm" onclick="approveFriendInvitation('${friend.userId}', this)">Xác nhận</button>
            </div>
        `;

        friendRequestsContainer.appendChild(friendCard);
    });
}

// Render friend requests on page load
window.onload = renderFriendRequests;