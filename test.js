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
    groupName: "PUBG BATTLEGROUNDS", // Changed 'author' to 'groupName' for consistency
    author: "PUBG Official", // Added 'author' field to match group.js
    timestamp: "6 phút", // Changed 'time' to 'timestamp'
    content: "EKDV PVS 2025 Spring!! Team Flash bất ngờ công bố bản hợp đồng mới 🔥🔥 RAMBO (FL BOTRELIMEX) 🔥🔥",
    profileImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8ku7ynjD6DIcRDtkYeBOxnFABgi_AcmWAYA&s", // Already present, keeping it
    images: ["https://kenh14cdn.com/2020/3/17/photo-1-1584431036054111629311.jpg"], // Changed to array for consistency
    likes: 120,
    comments: 45,
    shares: 23,
    liked: false,
},
{
    id: 2,
    groupName: "Team Flash",
    author: "Team Flash Admin",
    timestamp: "1 giờ",
    content: "Chào mừng thành viên mới của chúng tôi! 🎉 Hôm nay là một ngày đặc biệt! #TeamFlash",
    profileImage: "https://static.gosugamers.net/0e/3f/84/a230af1a3cd77edc5fd8ff0d36c74ed5799bc47d5977ce706ef2cfdfea.webp",
    images: ["https://cdn.tgdd.vn/Files/2021/12/12/1403925/pubg-pc_1280x720-800-resize.jpg"],
    likes: 89,
    comments: 12,
    shares: 5,
    liked: false,
},
{
    id: 3,
    groupName: "Gaming VN",
    author: "Gaming VN Editor",
    timestamp: "2 giờ",
    content: "Cập nhật giải đấu mới nhất! Ai sẽ là nhà vô địch? 🏆",
    profileImage: "https://marketplace.canva.com/EAGJmZcXb9A/1/0/1600w/canva-blue-and-black-illustrative-gaming-esports-logo-TOClzfKQMvU.jpg",
    images: ["https://nguyencongpc.vn/media/news/1003_top-pc-choi-pubg-2.jpg"],
    likes: 305,
    comments: 67,
    shares: 34,
    liked: false,
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

// Function to create a post element (similar to group.js)
function createPost(post) {
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    postElement.setAttribute('data-id', post.id);

    // Post Header
    const postHeader = document.createElement('div');
    postHeader.classList.add('post-header');

    const profileImg = document.createElement('img');
    profileImg.src = post.profileImage; // Use the specific profile image from the post data
    profileImg.alt = "Profile";

    const postInfo = document.createElement('div');
    postInfo.classList.add('post-info');

    const groupName = document.createElement('h3');
    groupName.textContent = post.groupName;

    const postMeta = document.createElement('p');
    postMeta.innerHTML = `${post.author} • ${post.timestamp} • <span>🌍</span>`;

    postInfo.appendChild(groupName);
    postInfo.appendChild(postMeta);
    postHeader.appendChild(profileImg);
    postHeader.appendChild(postInfo);

    // Post Content
    const postContent = document.createElement('p');
    postContent.textContent = post.content;

    // Post Images (if any)
    let postImages;
    if (post.images && post.images.length > 0) {
        postImages = document.createElement('div');
        postImages.classList.add('post-images');
        post.images.forEach(imageSrc => {
            const img = document.createElement('img');
            img.src = imageSrc;
            img.alt = "Post Image";
            postImages.appendChild(img);
        });
    }

    // Post Interactions
    const postInteractions = document.createElement('div');
    postInteractions.classList.add('post-interactions');

    const likes = document.createElement('span');
    likes.textContent = `${post.likes} lượt thích`;

    const commentsShares = document.createElement('span');
    commentsShares.textContent = `${post.comments} bình luận • ${post.shares} lượt chia sẻ`;

    postInteractions.appendChild(likes);
    postInteractions.appendChild(commentsShares);

    // Post Actions
    const postActions = document.createElement('div');
    postActions.classList.add('post-actions');

    const likeButton = document.createElement('button');
    likeButton.classList.add('like-btn');
    if (post.liked) likeButton.classList.add('liked');
    likeButton.textContent = "Thích";
    likeButton.onclick = () => toggleLike(post.id);

    const commentButton = document.createElement('button');
    commentButton.textContent = "Bình luận";

    const shareButton = document.createElement('button');
    shareButton.textContent = "Chia sẻ";

    postActions.appendChild(likeButton);
    postActions.appendChild(commentButton);
    postActions.appendChild(shareButton);

    // Assemble the post
    postElement.appendChild(postHeader);
    postElement.appendChild(postContent);
    if (postImages) postElement.appendChild(postImages);
    postElement.appendChild(postInteractions);
    postElement.appendChild(postActions);

    return postElement;
}

// Render Posts
function renderPosts() {
    const postsContainer = document.getElementById("posts-container");
    postsContainer.innerHTML = ''; // Clear existing content
    postsData.forEach(post => {
        const postElement = createPost(post);
        postsContainer.appendChild(postElement);
    });
}

// Toggle Like Functionality
function toggleLike(postId) {
    const post = postsData.find((p) => p.id === postId);
    if (post) {
        post.liked = !post.liked;
        post.likes = post.liked ? post.likes + 1 : post.likes - 1;
        renderPosts();
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