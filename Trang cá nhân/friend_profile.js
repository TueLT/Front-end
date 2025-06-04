// Dữ liệu bài viết giả (vì API không cung cấp bài viết)
const mockPosts = {
    1: [
        {
            username: "Nguyễn Văn An",
            tag: "Bóng đá",
            date: "20 tháng 8, 2024",
            content: "Trận đấu hôm qua thật kịch tính!",
            image: "https://via.placeholder.com/300?text=Football",
            likes: 10,
            liked: false,
            comments: []
        }
    ],
    2: [
        {
            username: "Trần Thị Bình",
            tag: "Du lịch",
            date: "10 tháng 9, 2024",
            content: "Phong cảnh ở đây đẹp như tranh!",
            image: "https://via.placeholder.com/300?text=Travel",
            likes: 15,
            liked: false,
            comments: []
        }
    ],
    3: [
        {
            username: "Lê Minh Châu",
            tag: "Công nghệ",
            date: "5 tháng 10, 2024",
            content: "Vừa hoàn thành một dự án nhỏ, cảm giác thật tuyệt!",
            image: "https://via.placeholder.com/300?text=Tech",
            likes: 20,
            liked: false,
            comments: []
        }
    ]
};

// Helper function to format the current date and time
function formatCurrentDateTime() {
    const now = new Date("2025-06-04T17:01:00+07:00");
    const day = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${day} tháng ${month}, ${year} lúc ${hours}:${minutes} ${ampm}`;
}

// Function to fetch friend data from API
async function fetchFriendData(friendId) {
    try {
        const response = await fetch(`http://localhost:8080/api/friend/${friendId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Không thể lấy thông tin bạn bè');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Lỗi khi gọi API lấy thông tin bạn bè:', error);
        throw error;
    }
}

// Function to set avatar dynamically
function setAvatar(element, avatarUrl) {
    element.style.backgroundImage = `url(${avatarUrl})`;
}

// Function to create a post element
function createPost(post, index) {
    const postDiv = document.createElement("div");
    postDiv.className = "post";
    postDiv.setAttribute("data-index", index);

    const postHeader = document.createElement("div");
    postHeader.className = "post-header";

    const profilePic = document.createElement("div");
    profilePic.className = "profile-pic-small";
    setAvatar(profilePic, post.avatar);
    postHeader.appendChild(profilePic);

    const headerInfo = document.createElement("div");
    const headerText = document.createElement("p");
    headerText.textContent = `${post.username} • ${post.tag} • ${post.date}`;
    headerInfo.appendChild(headerText);
    postHeader.appendChild(headerInfo);

    const postContent = document.createElement("div");
    postContent.className = "post-content";

    const contentText = document.createElement("p");
    contentText.textContent = post.content;
    postContent.appendChild(contentText);

    if (post.image) {
        const contentImage = document.createElement("img");
        contentImage.src = post.image;
        contentImage.alt = "Post image";
        postContent.appendChild(contentImage);
    }

    postDiv.appendChild(postHeader);
    postDiv.appendChild(postContent);

    // Add post actions (like, comment, share)
    const postActions = document.createElement("div");
    postActions.className = "post-actions";

    const actionButtons = document.createElement("div");
    actionButtons.className = "action-buttons";

    const likeBtn = document.createElement("button");
    likeBtn.className = "action-btn like-btn";
    likeBtn.textContent = "Thích";
    if (post.liked) {
        likeBtn.classList.add("liked");
    }
    likeBtn.onclick = () => toggleLike(index);
    actionButtons.appendChild(likeBtn);

    const commentBtn = document.createElement("button");
    commentBtn.className = "action-btn";
    commentBtn.textContent = "Bình luận";
    commentBtn.onclick = () => {
        const commentInput = document.getElementById(`comment-input-${index}`);
        commentInput.focus();
    };
    actionButtons.appendChild(commentBtn);

    const shareBtn = document.createElement("button");
    shareBtn.className = "action-btn";
    shareBtn.textContent = "Chia sẻ";
    actionButtons.appendChild(shareBtn);

    postActions.appendChild(actionButtons);

    const likeSection = document.createElement("div");
    likeSection.className = "like-section";

    const likeCount = document.createElement("span");
    likeCount.className = "like-count";
    likeCount.textContent = `${post.likes} lượt thích`;
    likeSection.appendChild(likeCount);

    postActions.appendChild(likeSection);

    const commentSection = document.createElement("div");
    commentSection.className = "comment-section";

    const commentInputDiv = document.createElement("div");
    commentInputDiv.className = "comment-input";

    const commentInput = document.createElement("input");
    commentInput.type = "text";
    commentInput.placeholder = "Viết bình luận...";
    commentInput.id = `comment-input-${index}`;
    commentInputDiv.appendChild(commentInput);

    const commentSubmitBtn = document.createElement("button");
    commentSubmitBtn.textContent = "Bình luận";
    commentSubmitBtn.disabled = true;
    commentSubmitBtn.onclick = () => submitComment(index);
    commentInputDiv.appendChild(commentSubmitBtn);

    commentInput.addEventListener("input", () => {
        commentSubmitBtn.disabled = commentInput.value.trim() === "";
    });

    commentSection.appendChild(commentInputDiv);

    const commentList = document.createElement("div");
    commentList.className = "comment-list";
    post.comments.forEach(comment => {
        const commentElement = createCommentElement(comment);
        commentList.appendChild(commentElement);
    });
    commentSection.appendChild(commentList);

    postActions.appendChild(commentSection);
    postDiv.appendChild(postActions);

    return postDiv;
}

function createCommentElement(comment) {
    const commentDiv = document.createElement("div");
    commentDiv.className = "comment";

    const commentProfilePic = document.createElement("div");
    commentProfilePic.className = "profile-pic-small";
    setAvatar(commentProfilePic, comment.avatar);
    commentDiv.appendChild(commentProfilePic);

    const commentContent = document.createElement("div");
    commentContent.className = "comment-content";

    const commentAuthor = document.createElement("span");
    commentAuthor.className = "comment-author";
    commentAuthor.textContent = comment.author;
    commentContent.appendChild(commentAuthor);

    const commentText = document.createElement("p");
    commentText.className = "comment-text";
    commentText.textContent = comment.text;
    commentContent.appendChild(commentText);

    const commentTimestamp = document.createElement("span");
    commentTimestamp.className = "comment-timestamp";
    commentTimestamp.textContent = comment.timestamp;
    commentContent.appendChild(commentTimestamp);

    commentDiv.appendChild(commentContent);
    return commentDiv;
}

function renderPosts(posts, avatar) {
    const postsSection = document.querySelector(".posts-section");
    if (!postsSection) return;

    postsSection.innerHTML = "";

    posts.forEach((post, index) => {
        post.avatar = avatar; // Sử dụng avatar từ dữ liệu bạn bè
        const postElement = createPost(post, index);
        postsSection.appendChild(postElement);
    });
}

function toggleLike(index) {
    const friendId = new URLSearchParams(window.location.search).get('friendId');
    mockPosts[friendId][index].liked = !mockPosts[friendId][index].liked;
    mockPosts[friendId][index].likes += mockPosts[friendId][index].liked ? 1 : -1;
    renderPosts(mockPosts[friendId], friendsData.avatar);
}

function submitComment(index) {
    const friendId = new URLSearchParams(window.location.search).get('friendId');
    const commentInput = document.getElementById(`comment-input-${index}`);
    const commentText = commentInput.value.trim();
    if (!commentText) return;

    const comment = {
        author: "Lương Trí Tuệ",
        avatar: "https://via.placeholder.com/150?text=User",
        text: commentText,
        timestamp: formatCurrentDateTime()
    };

    mockPosts[friendId][index].comments.push(comment);
    commentInput.value = "";
    renderPosts(mockPosts[friendId], friendsData.avatar);
}

// Function to render the intro section
function renderIntroSection(friendData) {
    const introSection = document.getElementById("friendIntroSection");
    if (!introSection) return;

    introSection.innerHTML = "";

    const heading = document.createElement("h2");
    heading.textContent = "Giới thiệu";
    introSection.appendChild(heading);

    // Hiển thị ngày sinh
    if (friendData.birthDay) {
        const birthDayP = document.createElement("p");
        birthDayP.textContent = `🎂 Sinh ngày ${new Date(friendData.birthDay).toLocaleDateString('vi-VN')}`;
        introSection.appendChild(birthDayP);
    }

    // Hiển thị địa chỉ
    if (friendData.address) {
        const addressP = document.createElement("p");
        addressP.textContent = `🏠 Sống tại ${friendData.address}`;
        introSection.appendChild(addressP);
    }

    // Hiển thị giới tính
    if (friendData.sex) {
        const sexP = document.createElement("p");
        sexP.textContent = `🚻 Giới tính: ${friendData.sex}`;
        introSection.appendChild(sexP);
    }
}

// Function to render the profile section
let friendsData = null; // Biến toàn cục để lưu dữ liệu bạn bè
function renderProfileSection(friendData) {
    friendsData = friendData; // Lưu dữ liệu bạn bè vào biến toàn cục để sử dụng ở các hàm khác

    const profilePic = document.querySelector(".profile-section .profile-pic");
    if (profilePic) {
        setAvatar(profilePic, friendData.avatar);
    }

    const username = document.getElementById("friendUsername");
    if (username) {
        username.textContent = `${friendData.firstName} ${friendData.lastName}`;
    }

    const friends = document.getElementById("friendFriends");
    if (friends) {
        friends.textContent = `0 người bạn`; // Giả định không có dữ liệu bạn bè, có thể thay bằng API
    }

    const addFriendBtn = document.getElementById("addFriendBtn");

    // Cập nhật trạng thái nút dựa trên isFriend
    if (friendData.isFriend) {
        addFriendBtn.textContent = "Đã gửi yêu cầu";
        addFriendBtn.disabled = true;
        addFriendBtn.style.backgroundColor = "#e4e6eb";
        addFriendBtn.style.color = "#606770";
        addFriendBtn.style.cursor = "not-allowed";
    } else {
        addFriendBtn.textContent = "Thêm bạn bè";
        addFriendBtn.disabled = false;
        addFriendBtn.style.backgroundColor = "#1877f2";
        addFriendBtn.style.color = "white";
        addFriendBtn.style.cursor = "pointer";
    }
}

// Function to call the add friend API
async function addFriend(friendId) {
    try {
        const response = await fetch(`http://localhost:8080/api/friend/add/${friendId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        });

        if (!response.ok) {
            throw new Error('Không thể gửi yêu cầu kết bạn');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Lỗi khi gọi API thêm bạn bè:', error);
        throw error;
    }
}

// Function to handle add friend button click
function setupAddFriendButton(friendId) {
    const addFriendBtn = document.getElementById("addFriendBtn");
    addFriendBtn.addEventListener("click", async () => {
        if (friendsData.isFriend) return;

        try {
            await addFriend(friendId);
            friendsData.isFriend = true;
            renderProfileSection(friendsData);
            alert("Yêu cầu kết bạn đã được gửi!");
        } catch (error) {
            alert("Có lỗi xảy ra khi gửi yêu cầu kết bạn. Vui lòng thử lại!");
        }
    });
}

// Logic chuyển đổi tab
function setupTabSwitching() {
    const tabs = document.querySelectorAll(".tab-link");

    tabs.forEach(tab => {
        tab.addEventListener("click", (e) => {
            e.preventDefault();
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
        });
    });
}

// Toggle profile dropdown
function toggleDropdown() {
    const dropdown = document.getElementById("profileDropdown");
    dropdown.classList.toggle("active");
}

// Thực thi khi trang tải
document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const friendId = urlParams.get('friendId');

    if (friendId) {
        try {
            const friendData = await fetchFriendData(friendId);
            friendData.isFriend = false; // Giả định ban đầu chưa gửi yêu cầu kết bạn
            renderProfileSection(friendData);
            renderIntroSection(friendData);

            // Hiển thị bài viết (dùng dữ liệu giả vì API không cung cấp)
            if (mockPosts[friendId]) {
                renderPosts(mockPosts[friendId], friendData.avatar);
            } else {
                const postsSection = document.querySelector(".posts-section");
                if (postsSection) {
                    postsSection.innerHTML = "<p>Không có bài viết nào.</p>";
                }
            }

            setupAddFriendButton(friendId);
        } catch (error) {
            document.getElementById("friendUsername").textContent = "Không tìm thấy bạn bè";
        }
    } else {
        document.getElementById("friendUsername").textContent = "Không tìm thấy bạn bè";
    }

    setupTabSwitching();
});