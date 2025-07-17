
// Default Data
const storiesData = [{
    id: 1,
    name: "Nguyễn Thanh Hiền Tạ Văn",
    image: "https://img.freepik.com/free-vector/detailed-esports-gaming-logo_79603-1792.jpg",
}, {
    id: 2,
    name: "Chin Tsu",
    image: "https://marketplace.canva.com/EAF1Ah5STk8/1/0/1600w/canva-dark-abstract-black-panther-gaming-logo-JqcoEpC3-BI.jpg",
}, {
    id: "Nguyễn Hải Yên",
    image: "https://static.vecteezy.com/system/resources/thumbnails/014/468/586/small_2x/hacker-mascot-for-sports-and-esports-logo-anonymous-e-sports-gaming-hacker-face-musk-logo-evil-face-mask-logo-hoodie-illustration-vector.jpg",
}, {
    id: 4,
    name: "konichiwa",
    image: "https://static.vecteezy.com/system/resources/previews/005/076/592/non_2x/hacker-mascot-for-sports-and-esports-logo-free-vector.jpg",
}];

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
    commentsList: [{ id: 1, author: "Thảo Minh", content: "Chúc mừng Team Flash!", timestamp: "5 phút" }, { id: 2, author: "Nguyễn Văn Boy", content: "RAMBO quá đỉnh! 🔥", timestamp: "4 phút" }],
    shares: 23,
    liked: false,
}, {
    id: 2,
    groupName: "Team Flash",
    author: "Team Flash Admin",
    timestamp: "1 giờ",
    content: "Chào mừng thành viên mới của chúng tôi! 🎉 Hôm nay là một ngày đặc biệt! #TeamFlash",
    profileImage: "https://static.gosugamers.net/0e/3f/84/a230af1a3cd77edc5fd8ff0d36c74ed5799bc47d5977ce706ef2cfdfea.webp",
    images: ["https://cdn.tgdd.vn/Files/2021/12/12/1403925/pubg-pc_1280x720-800-resize.jpg"],
    likes: 89,
    comments: 12,
    commentsList: [{ id: 1, author: "Lương Tri Tuệ", content: "Tuyệt vời! Chúc mừng cả đội!", timestamp: "50 phút" }],
    shares: 5,
    liked: false,
}, {
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
}];

const profileData = {
    user_id: null,
    email: "",
    firstName: "",
    lastName: "",
    sex: "",
    avatar: "https://via.placeholder.com/150?text=Avatar",
    phoneNumber: "",
    birthDay: "",
    address: "",
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

// Load avatar from localStorage if available
if (localStorage.getItem("userAvatar")) {
    profileData.avatar = localStorage.getItem("userAvatar");
}

// Hàm getProfileInfo: Lấy thông tin hồ sơ cá nhân từ API
async function getProfileInfo() {
    console.log("Bắt đầu getProfileInfo");
    try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) throw new Error("Không tìm thấy Access Token. Vui lòng đăng nhập lại!");

        const response = await fetch("http://localhost:8080/api/profile", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            if (response.status === 401) { // Xử lý lỗi Bad credentials
                const newToken = await refreshToken();
                if (!newToken) throw new Error("Không thể làm mới token. Vui lòng đăng nhập lại!");
                const retryResponse = await fetch("http://localhost:8080/api/profile", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${newToken}`
                    }
                });
                if (!retryResponse.ok) throw new Error(`Không thể lấy thông tin hồ sơ: ${retryResponse.statusText}`);
                const data = await retryResponse.json();
                updateProfileData(data);
                return data;
            } else {
                throw new Error(`Không thể lấy thông tin hồ sơ: ${response.statusText}`);
            }
        }

        const data = await response.json();
        updateProfileData(data);
        return data;
    } catch (error) {
        console.error("Lỗi khi lấy thông tin hồ sơ:", error);
        alert(`Lỗi: ${error.message}`);
        throw error;
    }
}

// Hàm cập nhật profileData
function updateProfileData(data) {
    profileData.user_id = data.user_id ?? null;
    profileData.email = data.email ?? "";
    profileData.firstName = data.firstName ?? "";
    profileData.lastName = data.lastName ?? "";
    profileData.sex = data.sex ?? "";
    profileData.avatar = data.avatar ?? profileData.avatar;
    profileData.phoneNumber = data.phoneNumber ?? "";
    profileData.birthDay = data.birthDay ?? "";
    profileData.address = data.address ?? "";
    if (data.avatar) localStorage.setItem("userAvatar", data.avatar);
    profileData.introItems = [
        { emoji: "🎓", text: "Học Information of Technology (IT) tại Học viện Công nghệ Bưu chính Viễn thông cơ sở tại TP. Hà Nội" },
        { emoji: "🎓", text: "Đã học tại Trường THPT Chuỷên Hùng Vương" },
        { emoji: "🏠", text: `Sống tại ${data.address || "Hưng Yên"}` },
        { emoji: "📍", text: `Đến từ ${data.address || "Hưng Yên"}` },
        { emoji: "📡", text: "Có 27 người theo dõi" },
        { emoji: "📞", text: `Số điện thoại: ${data.phoneNumber || "Chưa cung cấp"}` },
        { emoji: "🎂", text: `Sinh nhật: ${data.birthDay || "Chưa cung cấp"}` }
    ];
}

// Hàm làm mới token
async function refreshToken() {
    try {
        const response = await fetch("http://localhost:8080/api/refresh-token", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken: localStorage.getItem("refreshToken") })
        });
        if (!response.ok) throw new Error("Không thể làm mới token");
        const data = await response.json();
        localStorage.setItem("accessToken", data.accessToken);
        return data.accessToken;
    } catch (error) {
        console.error("Lỗi khi làm mới token:", error);
        return null;
    }
}

// Render Stories
function renderStories() {
    const storiesContainer = document.getElementById("stories-container");
    if (storiesContainer) {
        storiesContainer.innerHTML = storiesData.map(story => `<div class="story"><img src="${story.image}" alt="Story"><span>${story.name}</span></div>`).join("");
    }
}

// Function to create a post element
function createPost(post) {
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    postElement.setAttribute('data-id', post.id);

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

    const postContent = document.createElement('p');
    postContent.textContent = post.content;

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

    const postInteractions = document.createElement('div');
    postInteractions.classList.add('post-interactions');
    const likes = document.createElement('span');
    likes.textContent = `${post.likes} lượt thích`;
    const commentsShares = document.createElement('span');
    commentsShares.textContent = `${post.comments} bình luận • ${post.shares} lượt chia sẻ`;
    postInteractions.appendChild(likes);
    postInteractions.appendChild(commentsShares);

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

    const commentSection = document.createElement('div');
    commentSection.classList.add('comment-section');
    commentSection.style.display = 'none';
    const commentList = document.createElement('div');
    commentList.classList.add('comment-list');
    if (post.commentsList && post.commentsList.length > 0) {
        post.commentsList.forEach(comment => {
            const commentItem = document.createElement('div');
            commentItem.classList.add('comment-item');
            commentItem.innerHTML = `<span class="comment-author">${comment.author}</span><span class="comment-content">${comment.content}</span><span class="comment-timestamp">${comment.timestamp}</span>`;
            commentList.appendChild(commentItem);
        });
    }

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

    commentInput.addEventListener('input', () => {
        commentSubmitButton.disabled = commentInput.value.trim() === '';
    });

    commentSubmitButton.addEventListener('click', () => {
        if (commentInput.value.trim() !== '') {
            const newComment = {
                id: (post.commentsList ? post.commentsList.length + 1 : 1),
                author: profileData.firstName && profileData.lastName ? `${profileData.lastName} ${profileData.firstName}` : "Lương Tri Tuệ",
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

    commentInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && commentInput.value.trim() !== '') {
            commentSubmitButton.click();
        }
    });

    commentButton.addEventListener('click', () => {
        const isHidden = commentSection.style.display === 'none';
        commentSection.style.display = isHidden ? 'block' : 'none';
        if (isHidden) commentInput.focus();
    });

    commentInputContainer.appendChild(commentInput);
    commentInputContainer.appendChild(commentSubmitButton);
    commentSection.appendChild(commentList);
    commentSection.appendChild(commentInputContainer);

    postElement.appendChild(postHeader);
    postElement.appendChild(postContent);
    if (postImages) postElement.appendChild(postImages);
    postElement.appendChild(postInteractions);
    postElement.appendChild(postActions);
    postElement.appendChild(commentSection);

    return postElement;
}

// Fetch Posts from API
async function fetchPosts() {
    try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) throw new Error("Không tìm thấy Access Token. Vui lòng đăng nhập lại!");

        const response = await fetch("http://localhost:8080/api/posts", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            if (response.status === 401) {
                const newToken = await refreshToken();
                if (!newToken) throw new Error("Không thể làm mới token");
                const retryResponse = await fetch("http://localhost:8080/api/posts", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${newToken}`
                    }
                });
                if (!retryResponse.ok) throw new Error(`Không thể lấy bài viết từ API: ${retryResponse.statusText}`);
                const apiPosts = await retryResponse.json();
                return apiPosts.map(transformPostData);
            } else {
                throw new Error(`Không thể lấy bài viết từ API: ${response.statusText}`);
            }
        }

        const apiPosts = await response.json();
        return apiPosts.map(transformPostData);
    } catch (error) {
        console.error("Lỗi khi lấy bài viết:", error);
        alert(`Lỗi: ${error.message}`);
        return [];
    }
}

// Transform Post Data
function transformPostData(apiPost) {
    const timestamp = new Date(parseInt(apiPost.createTime)).toLocaleString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
console.log(apiPost.tags);

    
    const images = apiPost.images ;
    const tags = apiPost.tags ;
    const liked = apiPost.is_like === "true";
    const likes = parseInt(apiPost.count_like) || 0;

    return {
        id: apiPost.postId,
        groupName: "Lương Tri Tuệ",
        author: profileData.firstName && profileData.lastName ? `${profileData.lastName} ${profileData.firstName}` : "Người dùng",
        timestamp: timestamp,
        content: apiPost.caption || "",
        profileImage: profileData.avatar || "https://via.placeholder.com/150?text=Avatar",
        images: images,
        likes: likes,
        liked: liked,
        tags: tags,
        comments: 0,
        commentsList: [],
        shares: 0
    };
}

// Render Posts
async function renderPosts() {
    const postsContainer = document.getElementById("posts-container");
    if (!postsContainer) {
        console.error("Không tìm thấy posts-container!");
        return;
    }

    postsContainer.innerHTML = '';
    const posts = await fetchPosts();
    if (posts.length === 0) {
        postsContainer.innerHTML = '<p>Không có bài viết nào để hiển thị.</p>';
    } else {
        posts.forEach(post => {
            const postElement = createPost(post);
            postsContainer.appendChild(postElement);
        });
    }
}

// Toggle Like Functionality
function toggleLike(postId) {
    const post = postsData.find(p => p.id === postId);
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
    Array.from(files).forEach(file => {
        formData.append('file', file); // Key 'files' để khớp với API
    });

    try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) throw new Error("Không tìm thấy Access Token. Vui lòng đăng nhập lại!");

        const response = await fetch('http://localhost:8080/api/files/upload', {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
            body: formData,
        });

        if (!response.ok) {
            if (response.status === 401) {
                const newToken = await refreshToken();
                if (!newToken) throw new Error("Không thể làm mới token");
                const retryResponse = await fetch('http://localhost:8080/api/files/upload', {
                    method: 'POST',
                    headers: {
                        "Authorization": `Bearer ${newToken}`
                    },
                    body: formData,
                });
                if (!retryResponse.ok) throw new Error(`Upload thất bại: ${retryResponse.statusText}`);
                return await retryResponse.json();
            } else {
                throw new Error(`Upload thất bại: ${response.statusText}`);
            }
        }

        return await response.json(); // Trả về mảng URL
    } catch (error) {
        console.error('Lỗi khi upload file:', error);
        alert('Không thể upload ảnh. Vui lòng thử lại.');
        return [];
    }
}

// Render Profile Section
function renderProfileSection() {
    const profilePic = document.querySelector(".profile-pic");
    if (profilePic) {
        profilePic.style.backgroundImage = `url(${profileData.avatar})`;
    }
    const profileUsername = document.querySelector(".profile-info h1");
    if (profileUsername) {
        profileUsername.textContent = `${profileData.lastName} ${profileData.firstName}` || "Người dùng";
    }
    const dropdownUsername = document.getElementById("dropdown-username");
    if (dropdownUsername) {
        dropdownUsername.textContent = `${profileData.lastName} ${profileData.firstName}` || "Người dùng";
    }
    const modalUsername = document.getElementById("modal-username");
    if (modalUsername) {
        modalUsername.textContent = `${profileData.lastName} ${profileData.firstName}` || "Người dùng";
    }
}

// Initial Render and Event Listeners
document.addEventListener("DOMContentLoaded", async () => {
    renderStories();
    try {
        await getProfileInfo(); // Lấy thông tin hồ sơ
        renderProfileSection(); // Cập nhật giao diện hồ sơ
    } catch (error) {
        console.error("Lỗi khi khởi tạo hồ sơ:", error);
    }
    await renderPosts();

    const profileIcon = document.getElementById("profile-icon");
    if (profileIcon) profileIcon.addEventListener("click", toggleProfileDropdown);

    document.addEventListener("click", closeDropdownOnClickOutside);

    const createPostInput = document.getElementById('create-post-input');
    const postModal = document.getElementById('post-modal');
    const closeModal = document.getElementById('close-modal');
    const postContent = document.getElementById('post-content');
    const postBtn = document.getElementById('post-btn');
    const imageUploadInput = document.getElementById('post-image-upload');
    let selectedImages = [];

    if (createPostInput) {
        createPostInput.addEventListener('click', () => {
            postModal.classList.add('active');
        });
    }

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            postModal.classList.remove('active');
            postContent.value = '';
            postBtn.classList.remove('active');
            selectedImages = [];
            if (imageUploadInput) imageUploadInput.value = '';
        });
    }

    if (postContent) {
        postContent.addEventListener('input', () => {
            if (postContent.value.trim() !== '' || selectedImages.length > 0) {
                postBtn.classList.add('active');
            } else {
                postBtn.classList.remove('active');
            }
        });
    }

    if (imageUploadInput) {
        imageUploadInput.addEventListener('change', (e) => {
            selectedImages = Array.from(e.target.files);
            if (postContent.value.trim() !== '' || selectedImages.length > 0) {
                postBtn.classList.add('active');
            } else {
                postBtn.classList.remove('active');
            }
            console.log("Ảnh đã chọn:", selectedImages.map(file => file.name));
        });
    }

    if (postBtn) {
        postBtn.addEventListener('click', async () => {
            const content = postContent.value.trim();
            if (content === '' && selectedImages.length === 0) return;

            let imageUrls = [];
            if (selectedImages.length > 0) {
                imageUrls = await uploadFiles(selectedImages);
                if (imageUrls.length === 0) {
                    alert("Upload ảnh thất bại, nhưng bài viết vẫn có thể được đăng.");
                }
            }

            const postData = {
                tags: ["pikachu", "electric", "cute"],
                images: [imageUrls.join(',')],
                caption: content || " "
            };

            try {
                const accessToken = localStorage.getItem("accessToken");
                if (!accessToken) throw new Error("Không tìm thấy Access Token. Vui lòng đăng nhập lại!");

                const response = await fetch("http://localhost:8080/api/posts", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`
                    },
                    body: JSON.stringify(postData)
                });

                if (!response.ok) {
                    if (response.status === 401) {
                        const newToken = await refreshToken();
                        if (!newToken) throw new Error("Không thể làm mới token");
                        const retryResponse = await fetch("http://localhost:8080/api/posts", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${newToken}`
                            },
                            body: JSON.stringify(postData)
                        });
                        if (!retryResponse.ok) throw new Error(`Không thể đăng bài viết: ${retryResponse.statusText}`);
                        const newPostFromServer = await retryResponse.json();
                        createNewPost(newPostFromServer, imageUrls);
                    } else {
                        throw new Error(`Không thể đăng bài viết: ${response.statusText}`);
                    }
                } else {
                    const newPostFromServer = await response.json();
                    createNewPost(newPostFromServer, imageUrls);
                }

                postModal.classList.remove('active');
                postContent.value = '';
                postBtn.classList.remove('active');
                selectedImages = [];
                if (imageUploadInput) imageUploadInput.value = '';
                await renderPosts();
            } catch (error) {
                console.error("Lỗi khi đăng bài viết:", error);
                alert(`Lỗi: ${error.message}`);
            }
        });
    }

    if (postModal) {
        postModal.addEventListener('click', (e) => {
            if (e.target === postModal) {
                postModal.classList.remove('active');
                postContent.value = '';
                postBtn.classList.remove('active');
                selectedImages = [];
                if (imageUploadInput) imageUploadInput.value = '';
            }
        });
    }
});

function createNewPost(newPostFromServer, imageUrls) {
    const newPost = {
        id: newPostFromServer.postId || postsData.length + 1,
        groupName: "Lương Tri Tuệ",
        author: profileData.firstName && profileData.lastName ? `${profileData.lastName} ${profileData.firstName}` : "Người dùng",
        timestamp: "Vừa xong",
        content: newPostFromServer.caption || "",
        profileImage: profileData.avatar || "https://via.placeholder.com/150?text=Avatar",
        images: imageUrls,
        likes: 0,
        comments: 0,
        commentsList: [],
        shares: 0,
        liked: false,
    };
    postsData.unshift(newPost);
}
