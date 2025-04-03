// Default Data
const storiesData = [
    {
        id: 1,
        name: "Nguyễn Thanh Hiền Tạ Văn",
        image: "https://via.placeholder.com/60",
    },
    {
        id: 2,
        name: "Chin Tsu",
        image: "https://via.placeholder.com/60",
    },
    {
        id: 3,
        name: "Nguyễn Hải Yên",
        image: "https://via.placeholder.com/60",
    },
    {
        id: 4,
        name: "Lương Tứ",
        image: "https://via.placeholder.com/60",
    },
];

const postsData = [
    {
        id: 1,
        author: "PUBG: BATTLEGROUNDS",
        time: "6 phút",
        content: "EKDV PVS 2025 Spring!! Team Flash bất ngờ công bố bản hợp đồng mới 🔥🔥 RAMBO (FL BOTRELIMEX) 🔥🔥",
        image: "https://via.placeholder.com/500",
        profileImage: "https://via.placeholder.com/40",
        liked: false,
        likes: 120,
        comments: 45,
        shares: 23,
    },
    {
        id: 2,
        author: "Team Flash",
        time: "1 giờ",
        content: "Chào mừng thành viên mới của chúng tôi! 🎉 Hôm nay là một ngày đặc biệt! #TeamFlash",
        image: "https://via.placeholder.com/500",
        profileImage: "https://via.placeholder.com/40",
        liked: false,
        likes: 89,
        comments: 12,
        shares: 5,
    },
    {
        id: 3,
        author: "Gaming VN",
        time: "2 giờ",
        content: "Cập nhật giải đấu mới nhất! Ai sẽ là nhà vô địch? 🏆",
        image: "https://via.placeholder.com/500",
        profileImage: "https://via.placeholder.com/40",
        liked: false,
        likes: 305,
        comments: 67,
        shares: 34,
    },
];

// Render Stories
function renderStories() {
    const storiesContainer = document.getElementById("stories-container");
    storiesContainer.innerHTML = storiesData
        .map(
            (story) => `
                <div class="story">
                    <img src="${story.image}" alt="Story">
                    <span>${story.name}</span>
                </div>
            `
        )
        .join("");
}

// Render Posts
function renderPosts() {
    const postsContainer = document.getElementById("posts-container");
    postsContainer.innerHTML = postsData
        .map(
            (post) => `
                <div class="post" data-id="${post.id}">
                    <div class="post-header">
                        <img src="${post.profileImage}" alt="Profile">
                        <div class="post-info">
                            <h3>${post.author}</h3>
                            <p>${post.time} • <span>🌍</span></p>
                        </div>
                    </div>
                    <p>${post.content}</p>
                    <img src="${post.image}" alt="Post">
                    <div class="post-interactions">
                        <span>${post.likes} lượt thích</span>
                        <span>${post.comments} bình luận • ${post.shares} lượt chia sẻ</span>
                    </div>
                    <div class="post-actions">
                        <button class="like-btn ${post.liked ? "liked" : ""}" onclick="toggleLike(${post.id})">Thích</button>
                        <button>Bình luận</button>
                        <button>Chia sẻ</button>
                    </div>
                </div>
            `
        )
        .join("");
}

// Toggle Like Functionality
function toggleLike(postId) {
    const post = postsData.find((p) => p.id === postId);
    if (post) {
        post.liked = !post.liked;
        post.likes = post.liked ? post.likes + 1 : post.likes - 1; // Increment or decrement likes
        renderPosts(); // Re-render posts to update the UI
    }
}

// Initial Render
document.addEventListener("DOMContentLoaded", () => {
    renderStories();
    renderPosts();
});