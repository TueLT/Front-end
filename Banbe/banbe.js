// Default friend request data
const friendRequestsData = [
    {
        name: "Nguyễn Huyền Diệu",
        image: "https://via.placeholder.com/200x150?text=Sunset",
        mutual: ""
    },
    {
        name: "Lê Thùy",
        image: "https://via.placeholder.com/200x150?text=Avatar",
        mutual: ""
    },
    {
        name: "Nguyen P.Linh",
        image: "https://via.placeholder.com/200x150?text=Avatar",
        mutual: ""
    },
    {
        name: "Huy Sâu Đôi",
        image: "https://via.placeholder.com/200x150?text=Profile",
        mutual: "17 bạn chung"
    },
    {
        name: "Bùi Thị Khanh Linh",
        image: "https://via.placeholder.com/200x150?text=Profile",
        mutual: "1 bạn chung"
    }
];

// Function to render friend requests
function renderFriendRequests() {
    const friendRequestsContainer = document.getElementById("friendRequests");
    friendRequestsContainer.innerHTML = ""; // Clear existing content

    friendRequestsData.forEach(friend => {
        const friendCard = document.createElement("div");
        friendCard.classList.add("friend-card");

        friendCard.innerHTML = `
            <img src="${friend.image}" alt="Profile">
            <div class="name">${friend.name}</div>
            <div class="mutual">${friend.mutual}</div>
            <div class="buttons">
                <button class="confirm" onclick="handleConfirm(this)">Xác nhận</button>
                <button class="delete" onclick="handleDelete(this)">Xóa</button>
            </div>
        `;

        friendRequestsContainer.appendChild(friendCard);
    });
}

// Function to handle confirm action
function handleConfirm(button) {
    button.innerText = "Đã xác nhận";
    button.style.backgroundColor = "#e4e6eb";
    button.style.color = "#050505";
    button.disabled = true;
    button.nextElementSibling.remove();
}

// Function to handle delete action
function handleDelete(button) {
    button.parentElement.parentElement.remove();
}

// Render friend requests on page load
window.onload = renderFriendRequests;