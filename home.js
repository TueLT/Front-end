// Default Data
const storiesData = [{
        id: 1,
        name: "Nguyễn Thanh Hiền Tạ Văn",
        image: "https://img.freepik.com/free-vector/detailed-esports-gaming-logo_79603-1792.jpg",
    },
    {
        id: 2,
        name: "Chin Tsu",
        image: "https://marketplace.canva.com/EAF1Ah5STk8/1/0/1600w/canva-dark-abstract-black-panther-gaming-logo-JqcoEpC3-BI.jpg",
    },
    {
        id: 3,
        name: "Nguyễn Hải Yên",
        image: "https://static.vecteezy.com/system/resources/thumbnails/014/468/586/small_2x/hacker-mascot-for-sports-and-esports-logo-anonymous-e-sports-gaming-hacker-face-musk-logo-evil-face-mask-logo-hoodie-illustration-vector.jpg",
    },
    {
        id: 4,
        name: "konichiwa",
        image: "https://static.vecteezy.com/system/resources/previews/005/076/592/non_2x/hacker-mascot-for-sports-and-esports-logo-free-vector.jpg",
    },
];

const postsData = [{
        id: 1,
        author: "PUBG BATTLEGROUNDS",
        time: "6 phút",
        content: "EKDV PVS 2025 Spring!! Team Flash bất ngờ công bố bản hợp đồng mới 🔥🔥 RAMBO (FL BOTRELIMEX) 🔥🔥",
        image: "https://kenh14cdn.com/2020/3/17/photo-1-1584431036054111629311.jpg",
        profileImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8ku7ynjD6DIcRDtkYeBOxnFABgi_AcmWAYA&s",
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
        image: "https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-6/487868696_972595685077576_8982559783268014013_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=bpgOSJc6Nc0Q7kNvwFj0a3z&_nc_oc=AdnAHz2WOvPmLPQwTsArI53YvILOzGqFjy4M4e3W9B8jMCzOZr6KlHpfeaR_gx-5CaA&_nc_zt=23&_nc_ht=scontent.fhan18-1.fna&_nc_gid=9sMikxpvaQ24H3nzHux57w&oh=00_AYG3C8un_CDltu1ofwLCIu-S5KWDikht_zj1MZ2KzgNwgQ&oe=67F55D31",
        profileImage: "https://static.gosugamers.net/0e/3f/84/a230af1a3cd77edc5fd8ff0d36c74ed5799bc47d5977ce706ef2cfdfea.webp",
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
        image: "https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-6/487540029_972460508424427_7815854577058079162_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_ohc=ef0TkHFgv3oQ7kNvwHeQi1l&_nc_oc=AdmfuHAKsBYsfUxhKw1n6fYyAceFD7ZCrgjJ-a31vHxKlRQ0rxT9R26TLcB-EHbzjIM&_nc_zt=23&_nc_ht=scontent.fhan18-1.fna&_nc_gid=MOglMvHhImN-ze8l-yUWUw&oh=00_AYHZbMrBCMD8cC-uZzUCtU-FoMe9rydF8K5bkFtCTPmTuQ&oe=67F56510",
        profileImage: "https://marketplace.canva.com/EAGJmZcXb9A/1/0/1600w/canva-blue-and-black-illustrative-gaming-esports-logo-TOClzfKQMvU.jpg",
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


// Toggle Profile Dropdown
function toggleProfileDropdown() {
    const dropdown = document.getElementById("profile-dropdown");
    dropdown.classList.toggle("active");
}

// Close Dropdown When Clicking Outside
function closeDropdownOnClickOutside(event) {
    const dropdown = document.getElementById("profile-dropdown");
    const profileIcon = document.getElementById("profile-icon");
    if (!dropdown.contains(event.target) && !profileIcon.contains(event.target)) {
        dropdown.classList.remove("active");
    }
}

// Initial Render and Event Listeners
document.addEventListener("DOMContentLoaded", () => {
    renderStories();
    renderPosts();

    // Add event listener for profile icon click
    const profileIcon = document.getElementById("profile-icon");
    profileIcon.addEventListener("click", toggleProfileDropdown);

    // Add event listener for clicking outside the dropdown
    document.addEventListener("click", closeDropdownOnClickOutside);
});