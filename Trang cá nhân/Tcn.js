const profileData = {
    username: "Lương Trí Tuệ",
    avatar: "https://via.placeholder.com/150?text=Avatar",
    friends: 376,
    bio: "Tôi là một sinh viên IT đam mê công nghệ và thích khám phá những điều mới mẻ. Yêu âm nhạc, du lịch và trò chơi điện tử!",
    introItems: [
        { emoji: "🎓", text: "Học Information of Technology (IT) tại Học viện Công nghệ Bưu chính Viễn thông cơ sở tại TP. Hà Nội" },
        { emoji: "🎓", text: "Đã học tại Trường THPT Chuỷên Hùng Vương" },
        { emoji: "🏠", text: "Sống tại Hưng Yên" },
        { emoji: "📍", text: "Đến từ Hưng Yên" },
        { emoji: "📡", text: "Có 27 người theo dõi" }
    ],
    user_id: null,
    email: null,
    sex: null
};

// Load avatar from localStorage if available
if (localStorage.getItem("userAvatar")) {
    profileData.avatar = localStorage.getItem("userAvatar");
}

// Load posts from localStorage if available
let postsData = JSON.parse(localStorage.getItem("postsData")) || [
    {
        username: "Lương Trí Tuệ",
        tag: "Liên Quân Mobile",
        date: "30 tháng 7, 2024",
        content: "Cùng bạn tham gia",
        image: "https://nguoinoitieng.tv/images/nnt/106/0/bjbs.jpg",
        likes: 0,
        liked: false,
        comments: []
    },
    {
        username: "Lương Trí Tuệ",
        tag: "Học tập",
        date: "25 tháng 6, 2024",
        content: "Hôm nay vừa hoàn thành bài thuyết trình về AI, cảm giác thật tuyệt!",
        image: "https://pcmarket.vn/media/news/1203_vavab9.png",
        likes: 0,
        liked: false,
        comments: []
    },
    {
        username: "Lương Trí Tuệ",
        tag: "Du lịch",
        date: "15 tháng 5, 2024",
        content: "Chuyến đi Đà Lạt thật đáng nhớ, hoa cẩm tú cầu đẹp mê ly!",
        image: "https://technews.hacom.vn/wp-content/uploads/2020/06/valorant-agents-players.jpg",
        likes: 0,
        liked: false,
        comments: []
    }
];

// Save posts to localStorage
function savePostsToLocalStorage() {
    localStorage.setItem("postsData", JSON.stringify(postsData));
}

// Fetch profile data from API using GET method with Access Token
async function fetchProfileData() {
    console.log("Bắt đầu fetchProfileData");
    try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            throw new Error("Không tìm thấy Access Token. Vui lòng đăng nhập lại!");
        }

        const response = await fetch("http://localhost:8080/api/profile", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        });
        if (!response.ok) {
            throw new Error(`Không thể lấy dữ liệu từ API: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Dữ liệu từ API:", data);
        
        // Update profileData with API data, with null checks
        profileData.user_id = data.user_id ?? null;
        profileData.email = data.email ?? "";
        profileData.username = (data.lastName && data.firstName) ? `${data.lastName} ${data.firstName}` : profileData.username;
        profileData.avatar = data.avatar ?? "";
        profileData.sex = data.sex ?? null;
        
        // Save avatar to localStorage if provided by API
        if (data.avatar) {
            localStorage.setItem("userAvatar", data.avatar);
        }
        
        // Populate edit profile form
        populateEditProfileForm();
    } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        alert(`Lỗi: ${error.message}`);
        populateEditProfileForm(); // Open modal with current data
    }
}

// Populate edit profile form with profileData
function populateEditProfileForm() {
    console.log("Bắt đầu populateEditProfileForm");
    // Open modal first to ensure elements are in DOM
    openEditProfileModal();

    // Get elements and check for null
    const userIdInput = document.getElementById("edit-user-id");
    const emailInput = document.getElementById("edit-email");
    const firstNameInput = document.getElementById("edit-first-name");
    const lastNameInput = document.getElementById("edit-last-name");
    const avatarInput = document.getElementById("edit-avatar");
    const sexSelect = document.getElementById("edit-sex");

    // Check if elements exist before setting values
    if (userIdInput) userIdInput.value = profileData.user_id || "";
    if (emailInput) emailInput.value = profileData.email || "";
    const username = typeof profileData.username === "string" ? profileData.username : "";
    if (firstNameInput) firstNameInput.value = username.split(" ").pop() || "";
    if (lastNameInput) lastNameInput.value = username.split(" ").slice(0, -1).join(" ") || "";
    if (avatarInput) avatarInput.value = profileData.avatar || "";
    if (sexSelect) sexSelect.value = profileData.sex || "";
}

// Open edit profile modal
function openEditProfileModal() {
    console.log("Bắt đầu openEditProfileModal");
    const modal = document.getElementById("editProfileModalOverlay");
    if (modal) {
        modal.classList.add("active");
        console.log("Modal đã được mở");
    } else {
        console.error("Không tìm thấy modal chỉnh sửa hồ sơ!");
    }
}

// Close edit profile modal
function closeEditProfileModal() {
    console.log("Bắt đầu closeEditProfileModal");
    const modal = document.getElementById("editProfileModalOverlay");
    if (modal) {
        modal.classList.remove("active");
        console.log("Modal đã được đóng");
    }
}

// Save profile changes (client-side only)
function saveProfileChanges() {
    console.log("Bắt đầu saveProfileChanges");
    const firstNameInput = document.getElementById("edit-first-name");
    const lastNameInput = document.getElementById("edit-last-name");
    const emailInput = document.getElementById("edit-email");
    const avatarInput = document.getElementById("edit-avatar");
    const sexSelect = document.getElementById("edit-sex");

    if (!firstNameInput || !lastNameInput || !emailInput) {
        alert("Không thể lưu thay đổi do không tìm thấy các trường nhập liệu!");
        return;
    }

    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const email = emailInput.value.trim();
    const avatar = avatarInput ? avatarInput.value.trim() : "";
    const sex = sexSelect ? sexSelect.value : "";

    if (!firstName || !lastName || !email) {
        alert("Vui lòng điền đầy đủ họ, tên và email!");
        return;
    }

    // Update profileData
    profileData.email = email;
    profileData.username = `${lastName} ${firstName}`;
    profileData.avatar = avatar || profileData.avatar;
    profileData.sex = sex;
    
    // Save avatar to localStorage
    if (avatar) {
        localStorage.setItem("userAvatar", avatar);
    }
    
    // Re-render profile and intro sections
    renderProfileSection();
    renderIntroSection();
    updateAllAvatars();
    
    closeEditProfileModal();
}

// Handle edit profile button click
function handleEditProfile() {
    console.log("Nút chỉnh sửa trang cá nhân được nhấn");
    fetchProfileData();
}

// Post data and generation logic
// (postsData initialization moved to top with localStorage loading)

// Helper function to format the current date and time
function formatCurrentDateTime() {
    const now = new Date("2025-06-05T11:23:00+07:00");
    const day = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${day} tháng ${month}, ${year} lúc ${hours}:${minutes} ${ampm}`;
}

// Function to set avatar dynamically
function setAvatar(element) {
    element.style.backgroundImage = `url(${profileData.avatar})`;
}

// Function to update all avatars on the page
function updateAllAvatars() {
    const avatars = document.querySelectorAll(".profile-pic, .profile-pic-small");
    avatars.forEach(avatar => setAvatar(avatar));
}

function createPost(post, index) {
    const postDiv = document.createElement("div");
    postDiv.className = "post";
    postDiv.setAttribute("data-index", index);

    const postHeader = document.createElement("div");
    postHeader.className = "post-header";

    const profilePic = document.createElement("div");
    profilePic.className = "profile-pic-small";
    setAvatar(profilePic);
    postHeader.appendChild(profilePic);

    const headerInfo = document.createElement("div");
    const headerText = document.createElement("p");
    headerText.textContent = `${post.username} • ${post.tag} • ${post.date}`;
    headerInfo.appendChild(headerText);
    postHeader.appendChild(headerInfo);

    const postContent = document.createElement("div");
    postContent.className = "post-content";

    if (post.isShared) {
        const sharedHeader = document.createElement("p");
        sharedHeader.className = "shared-header";
        sharedHeader.textContent = `${post.sharer} đã chia sẻ bài viết của ${post.originalPoster}`;
        postContent.appendChild(sharedHeader);

        const sharedContent = document.createElement("div");
        sharedContent.className = "post-shared";

        const originalHeader = document.createElement("p");
        originalHeader.textContent = `${post.originalPoster} • ${post.originalTag} • ${post.originalDate}`;
        sharedContent.appendChild(originalHeader);

        const originalContent = document.createElement("p");
        originalContent.textContent = post.content;
        sharedContent.appendChild(originalContent);

        if (post.image) {
            const contentImage = document.createElement("img");
            contentImage.src = post.image;
            contentImage.alt = "Post image";
            sharedContent.appendChild(contentImage);
        }

        postContent.appendChild(sharedContent);
    } else {
        const contentText = document.createElement("p");
        contentText.textContent = post.content;
        postContent.appendChild(contentText);

        if (post.image) {
            const contentImage = document.createElement("img");
            contentImage.src = post.image;
            contentImage.alt = "Post image";
            postContent.appendChild(contentImage);
        }
    }

    postDiv.appendChild(postHeader);
    postDiv.appendChild(postContent);

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
    shareBtn.onclick = () => sharePost(index);
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
    setAvatar(commentProfilePic);
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

function renderPosts() {
    const postsSection = document.querySelector(".posts-section");
    if (!postsSection) return;

    const createPostSection = postsSection.querySelector(".create-post");
    postsSection.innerHTML = "";
    postsSection.appendChild(createPostSection);

    postsData.forEach((post, index) => {
        const postElement = createPost(post, index);
        postsSection.appendChild(postElement);
    });
}

function toggleLike(index) {
    postsData[index].liked = !postsData[index].liked;
    postsData[index].likes += postsData[index].liked ? 1 : -1;
    savePostsToLocalStorage();
    renderPosts();
}

function submitComment(index) {
    const commentInput = document.getElementById(`comment-input-${index}`);
    const commentText = commentInput.value.trim();
    if (!commentText) return;

    const comment = {
        author: profileData.username,
        text: commentText,
        timestamp: formatCurrentDateTime()
    };

    postsData[index].comments.push(comment);
    commentInput.value = "";
    savePostsToLocalStorage();
    renderPosts();
}

function sharePost(index) {
    const originalPost = postsData[index];
    const sharedPost = {
        username: profileData.username,
        tag: "Chia sẻ",
        date: formatCurrentDateTime(),
        content: originalPost.content,
        image: originalPost.image,
        likes: 0,
        liked: false,
        comments: [],
        privacy: "public",
        isShared: true,
        sharer: profileData.username,
        originalPoster: originalPost.username,
        originalTag: originalPost.tag,
        originalDate: originalPost.date
    };

    postsData.unshift(sharedPost);
    savePostsToLocalStorage();
    renderPosts();

    const postsSection = document.querySelector(".posts-section");
    postsSection.scrollIntoView({ behavior: "smooth" });
}

function submitPost() {
    const postContent = document.getElementById("postContent");
    if (!postContent) return;

    const content = postContent.value.trim();
    if (!content) return;

    const selectedPrivacy = document.getElementById("selectedPrivacy");
    if (!selectedPrivacy) return;

    const privacy = selectedPrivacy.getAttribute("data-value");
    const newPost = {
        username: profileData.username,
        tag: "Status",
        date: formatCurrentDateTime(),
        content: content,
        image: null,
        likes: 0,
        liked: false,
        comments: [],
        privacy: privacy
    };

    postsData.unshift(newPost);
    savePostsToLocalStorage();
    renderPosts();
    closePostModal();

    const postsSection = document.querySelector(".posts-section");
    if (postsSection) {
        postsSection.scrollIntoView({ behavior: "smooth" });
    }
}

function renderIntroSection() {
    const introSection = document.getElementById("introSection");
    if (!introSection) return;

    introSection.innerHTML = "";

    const heading = document.createElement("h2");
    heading.textContent = "Giới thiệu";
    introSection.appendChild(heading);

    if (profileData.bio) {
        const bio = document.createElement("p");
        bio.className = "bio";
        bio.textContent = profileData.bio;
        introSection.appendChild(bio);
    }

    const bioButton = document.createElement("button");
    bioButton.textContent = "Chỉnh sửa tiểu sử";
    introSection.appendChild(bioButton);

    profileData.introItems.forEach(item => {
        const p = document.createElement("p");
        p.textContent = `${item.emoji} ${item.text}`;
        introSection.appendChild(p);
    });

    if (profileData.sex) {
        const sexItem = document.createElement("p");
        sexItem.textContent = `🚻 Giới tính: ${profileData.sex}`;
        introSection.appendChild(sexItem);
    }
}

function renderProfileSection() {
    const profilePic = document.querySelector(".profile-section .profile-pic");
    if (profilePic) {
        setAvatar(profilePic);
    }

    const profileInfo = document.querySelector(".profile-section .profile-info");
    if (profileInfo) {
        const username = profileInfo.querySelector("h1");
        if (username) {
            username.textContent = profileData.username;
        }

        const friends = profileInfo.querySelector("p");
        if (friends) {
            friends.textContent = `${profileData.friends} người bạn`;
        }
    }
}

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

function openPostModal() {
    const modalOverlay = document.getElementById("postModalOverlay");
    if (!modalOverlay) return;

    modalOverlay.classList.add("active");

    const textarea = modalOverlay.querySelector("textarea");
    if (textarea) {
        textarea.focus();
    }

    const modalProfilePic = modalOverlay.querySelector(".modal-profile .profile-pic-small");
    if (modalProfilePic) {
        setAvatar(modalProfilePic);
    }
}

function closePostModal() {
    const modalOverlay = document.getElementById("postModalOverlay");
    if (!modalOverlay) return;

    modalOverlay.classList.remove("active");

    const textarea = modalOverlay.querySelector("textarea");
    const postBtn = modalOverlay.querySelector(".post-btn");
    if (textarea) textarea.value = "";
    if (postBtn) postBtn.disabled = true;

    const privacyDropdown = document.getElementById("privacyDropdown");
    if (privacyDropdown) {
        privacyDropdown.classList.remove("active");
    }
}

function togglePrivacyDropdown() {
    const privacyDropdown = document.getElementById("privacyDropdown");
    if (privacyDropdown) {
        privacyDropdown.classList.toggle("active");
    }
}

function selectPrivacy(displayText, value) {
    const selectedPrivacy = document.getElementById("selectedPrivacy");
    if (selectedPrivacy) {
        selectedPrivacy.textContent = displayText;
        selectedPrivacy.setAttribute("data-value", value);
    }

    const privacyDropdown = document.getElementById("privacyDropdown");
    if (privacyDropdown) {
        privacyDropdown.classList.remove("active");
    }
}

function setupAvatarUpload() {
    const avatarUploadInput = document.getElementById("avatar-upload");
    if (avatarUploadInput) {
        avatarUploadInput.addEventListener("change", (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    profileData.avatar = e.target.result;
                    localStorage.setItem("userAvatar", profileData.avatar);
                    updateAllAvatars();
                };
                reader.readAsDataURL(file);
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    renderProfileSection();
    renderPosts();
    setupTabSwitching();
    renderIntroSection();
    setupAvatarUpload();

    const editProfileBtn = document.querySelector(".profile-section .edit-profile-btn");
    if (editProfileBtn) {
        editProfileBtn.addEventListener("click", handleEditProfile);
    } else {
        console.error("Không tìm thấy nút chỉnh sửa trang cá nhân!");
    }

    const textarea = document.querySelector(".post-modal textarea");
    const postBtn = document.querySelector(".post-btn");

    if (textarea && postBtn) {
        textarea.addEventListener("input", () => {
            postBtn.disabled = textarea.value.trim() === "";
        });
    }

    const modalOverlay = document.getElementById("postModalOverlay");
    if (modalOverlay) {
        modalOverlay.addEventListener("click", (e) => {
            if (e.target === modalOverlay) {
                closePostModal();
            }
        });
    }

    const editModalOverlay = document.getElementById("editProfileModalOverlay");
    if (editModalOverlay) {
        editModalOverlay.addEventListener("click", (e) => {
            if (e.target === editModalOverlay) {
                closeEditProfileModal();
            }
        });
    }

    document.addEventListener("click", (e) => {
        const privacyDropdown = document.getElementById("privacyDropdown");
        const privacySettings = document.querySelector(".privacy-settings");
        if (privacyDropdown && !privacySettings.contains(e.target)) {
            privacyDropdown.classList.remove("active");
        }
    });
});