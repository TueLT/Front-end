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
    groupName: "PUBG BATTLEGROUNDS",
    author: "PUBG Official",
    timestamp: "6 phút",
    content: "EKDV PVS 2025 Spring!! Team Flash bất ngờ công bố bản hợp đồng mới 🔥🔥 RAMBO (FL BOTRELIMEX) 🔥🔥",
    profileImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8ku7ynjD6DIcRDtkYeBOxnFABgi_AcmWAYA&s",
    images: ["https://kenh14cdn.com/2020/3/17/photo-1-1584431036054111629311.jpg"],
    likes: 120,
    comments: 45,
    commentsList: [
        { id: 1, author: "Thảo Minh", content: "Chúc mừng Team Flash!", timestamp: "5 phút" },
        { id: 2, author: "Nguyễn Văn Boy", content: "RAMBO quá đỉnh! 🔥", timestamp: "4 phút" },
    ],
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
    commentsList: [
        { id: 1, author: "Lương Tri Tuệ", content: "Tuyệt vời! Chúc mừng cả đội!", timestamp: "50 phút" },
    ],
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
    commentsList: [],
    shares: 34,
    liked: false,
},
];
const profileData = {
    user_id: null,
    email: "",
    firstName: "",
    lastName: "",
    sex: "",
    avatar: "https://via.placeholder.com/150?text=Avatar",
    friends: 376,
    bio: "Tôi là một sinh viên IT đam mê công nghệ và thích khám phá những điều mới mẻ. Yêu âm nhạc, du lịch và trò chơi điện tử!",
    introItems: [
        { emoji: "🎓", text: "Học Information of Technology (IT) tại Học viện Công nghệ Bưu chính Viễn thông cơ sở tại TP. Hà Nội" },
        { emoji: "🎓", text: "Đã học tại Trường THPT Chuỷên Hùng Vương" },
        { emoji: "🏠", text: "Sống tại Hưng Yên" },
        { emoji: "📍", text: "Đến từ Hưng Yên" },
        { emoji: "📡", text: "Có 27 người theo dõi" }
    ]
};
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

// Function to create a post element
function createPost(post) {
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    postElement.setAttribute('data-id', post.id);

    // Post Header
    const postHeader = document.createElement('div');
    postHeader.classList.add('post-header');

    const profileImg = document.createElement('img');
    profileImg.src = post.profileImage;
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
    commentButton.classList.add('comment-toggle-btn');
    commentButton.textContent = "Bình luận";

    const shareButton = document.createElement('button');
    shareButton.textContent = "Chia sẻ";

    postActions.appendChild(likeButton);
    postActions.appendChild(commentButton);
    postActions.appendChild(shareButton);

    // Comment Section (initially hidden)
    const commentSection = document.createElement('div');
    commentSection.classList.add('comment-section');
    commentSection.style.display = 'none'; // Initially hidden

    // Display existing comments
    const commentList = document.createElement('div');
    commentList.classList.add('comment-list');
    if (post.commentsList && post.commentsList.length > 0) {
        post.commentsList.forEach(comment => {
            const commentItem = document.createElement('div');
            commentItem.classList.add('comment-item');
            commentItem.innerHTML = `
                <span class="comment-author">${comment.author}</span>
                <span class="comment-content">${comment.content}</span>
                <span class="comment-timestamp">${comment.timestamp}</span>
            `;
            commentList.appendChild(commentItem);
        });
    }

    // Comment Input and Button
    const commentInputContainer = document.createElement('div');
    commentInputContainer.classList.add('comment-input-container');

    const commentInput = document.createElement('input');
    commentInput.type = 'text';
    commentInput.placeholder = 'Viết bình luận...';
    commentInput.classList.add('comment-input');

    const commentSubmitButton = document.createElement('button');
    commentSubmitButton.textContent = 'Gửi';
    commentSubmitButton.classList.add('comment-submit-btn');
    commentSubmitButton.disabled = true;

    // Enable button when there's text in the input
    commentInput.addEventListener('input', () => {
        commentSubmitButton.disabled = commentInput.value.trim() === '';
    });

    // Handle comment submission
    commentSubmitButton.addEventListener('click', () => {
        if (commentInput.value.trim() !== '') {
            const newComment = {
                id: (post.commentsList ? post.commentsList.length + 1 : 1),
                author: "Lương Tri Tuệ",
                content: commentInput.value,
                timestamp: "Vừa xong",
            };
            if (!post.commentsList) post.commentsList = [];
            post.commentsList.push(newComment);
            post.comments += 1;
            commentInput.value = '';
            commentSubmitButton.disabled = true;
            renderPosts();
        }
    });

    // Allow pressing Enter to submit the comment
    commentInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && commentInput.value.trim() !== '') {
            commentSubmitButton.click();
        }
    });

    // Toggle comment section visibility when clicking the "Bình luận" button
    commentButton.addEventListener('click', () => {
        const isHidden = commentSection.style.display === 'none';
        commentSection.style.display = isHidden ? 'block' : 'none';
        if (isHidden) commentInput.focus(); // Focus the input when shown
    });

    commentInputContainer.appendChild(commentInput);
    commentInputContainer.appendChild(commentSubmitButton);
    commentSection.appendChild(commentList);
    commentSection.appendChild(commentInputContainer);

    // Assemble the post
    postElement.appendChild(postHeader);
    postElement.appendChild(postContent);
    if (postImages) postElement.appendChild(postImages);
    postElement.appendChild(postInteractions);
    postElement.appendChild(postActions);
    postElement.appendChild(commentSection);

    return postElement;
}

// Render Posts
async function fetchPosts() {
    try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            throw new Error("Không tìm thấy Access Token. Vui lòng đăng nhập lại!");
        }

        const response = await fetch("http://localhost:8080/api/posts", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            throw new Error(`Không thể lấy bài viết từ API: ${response.statusText}`);
        }

        const apiPosts = await response.json();
        return apiPosts.map(transformPostData);
    } catch (error) {
        console.error("Lỗi khi lấy bài viết:", error);
        alert(`Lỗi: ${error.message}`);
        return [];
    }
}

// Hàm transformPostData: Chuyển đổi dữ liệu bài viết từ API sang định dạng mong muốn
function transformPostData(apiPost) {
    const timestamp = new Date(parseInt(apiPost.createTime)).toLocaleString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    const images = apiPost.images ? apiPost.images.split(',') : [];
    const tags = apiPost.tags ? apiPost.tags.split(',') : [];
    const liked = apiPost.is_like === "true";
    const likes = parseInt(apiPost.count_like) || 0;

    return {
        id: apiPost.postId,
        author: profileData.firstName && profileData.lastName ? `${profileData.lastName} ${profileData.firstName}` : "Người dùng",
        timestamp: timestamp,
        content: apiPost.caption || "",
        images: images,
        likes: likes,
        liked: liked,
        tags: tags,
        comments: 0, // API không cung cấp số lượng bình luận, mặc định là 0
        commentsList: [], // API không cung cấp danh sách bình luận
        shares: 0 // API không cung cấp số lượng chia sẻ
    };
}

// Hàm renderPosts: Render các bài viết từ API
async function renderPosts() {
    const postsContainer = document.getElementById("posts-container");
    if (!postsContainer) {
        console.error("Không tìm thấy posts-container!");
        return;
    }

    postsContainer.innerHTML = ''; // Xóa nội dung cũ
    const posts = await fetchPosts(); // Lấy bài viết từ API
    posts.forEach(post => {
        const postElement = createPost(post); // Giả sử createPost đã được định nghĩa
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

// Upload files to the backend API
async function uploadFiles(files) {
    const formData = new FormData();
    files.forEach(file => {
        formData.append('file', file);
    });

    try {
        const response = await fetch('http://localhost:8080/api/files/upload', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Upload thất bại');
        }

        const fileUrls = await response.json();
        return fileUrls;
    } catch (error) {
        console.error('Lỗi khi upload file:', error);
        alert('Không thể upload ảnh. Vui lòng thử lại.');
        return [];
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

    // Show modal when clicking the input
    const createPostInput = document.getElementById('create-post-input');
    const postModal = document.getElementById('post-modal');
    const closeModal = document.getElementById('close-modal');
    const postContent = document.getElementById('post-content');
    const postBtn = document.getElementById('post-btn');

    createPostInput.addEventListener('click', () => {
        postModal.classList.add('active');
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        postModal.classList.remove('active');
        postContent.value = '';
        postBtn.classList.remove('active');
    });

    // Enable post button when text is entered
    postContent.addEventListener('input', () => {
        if (postContent.value.trim() !== '') {
            postBtn.classList.add('active');
        } else {
            postBtn.classList.remove('active');
        }
    });

    // Handle post submission
    postBtn.addEventListener('click', async () => {
        const content = postContent.value.trim();
        if (content === '') return; // Kiểm tra nếu nội dung rỗng thì không làm gì

        // Thu thập dữ liệu từ form
        const postData = {
            tags: ["pikachu", "electric", "cute"], // Có thể thay bằng input từ người dùng
            images: [
                "https://firebasestorage.googleapis.com/v0/b/storage-image-80802.appspot.com/o/b509c6df-d844-476d-9e60-212fb8555511.JPG?alt=media&token=22bf4bc3-cd5d-49bd-a1ac-f071874128f1"],

            caption: content // Nội dung bài viết từ postContent
        };

        try {
            // Lấy accessToken từ localStorage (giả sử bạn đã lưu token sau khi đăng nhập)
            const accessToken = localStorage.getItem("accessToken");
            if (!accessToken) {
                throw new Error("Không tìm thấy Access Token. Vui lòng đăng nhập lại!");
            }

            // Gửi yêu cầu POST đến API
            const response = await fetch("http://localhost:8080/api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}` // Thêm token vào header
                },
                body: JSON.stringify(postData) // Chuyển dữ liệu thành JSON
            });

            // Kiểm tra nếu yêu cầu không thành công
            if (!response.ok) {
                throw new Error(`Không thể đăng bài viết: ${response.statusText}`);
            }

            // Lấy dữ liệu bài viết mới từ server
            const newPostFromServer = await response.json();

            // Tạo đối tượng bài viết mới để thêm vào postsData
            const newPost = {
                id: newPostFromServer.id || postsData.length + 1, // Dùng id từ server nếu có
                groupName: "Lương Tri Tuệ", // Có thể cập nhật từ server nếu cần
                author: "Lương Tri Tuệ", // Có thể cập nhật từ server
                timestamp: "Vừa xong",
                content: newPostFromServer.caption, // Nội dung từ server
                profileImage: "img/profile.png", // Cập nhật nếu server trả về
                images: newPostFromServer.images || [], // Hình ảnh từ server
                likes: 0,
                comments: 0,
                commentsList: [],
                shares: 0,
                liked: false,
            };

            // Thêm bài viết mới vào danh sách và render lại giao diện
            postsData.unshift(newPost);
            renderPosts();
            postModal.classList.remove('active');
            postContent.value = '';
            postBtn.classList.remove('active');
        } catch (error) {
            console.error("Lỗi khi đăng bài viết:", error);
            alert(`Lỗi: ${error.message}`);
        }
    });

    // Close modal when clicking outside
    postModal.addEventListener('click', (e) => {
        if (e.target === postModal) {
            postModal.classList.remove('active');
            postContent.value = '';
            postBtn.classList.remove('active');
        }
    });
});