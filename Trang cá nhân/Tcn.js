// Profile data
const profileData = {
    username: "Lương Trí Tuệ",
    avatar: "https://via.placeholder.com/150?text=Avatar", // Default avatar
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

// Post data and generation logic
let postsData = [
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

// Helper function to format the current date and time
function formatCurrentDateTime() {
    const now = new Date("2025-06-01T21:32:00+07:00"); // Updated system-provided date and time
    const day = now.getDate();
    const month = now.getMonth() + 1; // Months are 0-based in JS
    const year = now.getFullYear();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert to 12-hour format
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
    setAvatar(profilePic); // Set avatar dynamically
    postHeader.appendChild(profilePic);

    const headerInfo = document.createElement("div");
    const headerText = document.createElement("p");
    headerText.textContent = `${post.username} • ${post.tag} • ${post.date}`;
    headerInfo.appendChild(headerText);
    postHeader.appendChild(headerInfo);

    const postContent = document.createElement("div");
    postContent.className = "post-content";

    // If this is a shared post, add the shared header and the original post content
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

    // Add post actions (like, comment, share)
    const postActions = document.createElement("div");
    postActions.className = "post-actions";

    // Action buttons (Like, Comment, Share)
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

    // Like section
    const likeSection = document.createElement("div");
    likeSection.className = "like-section";

    const likeCount = document.createElement("span");
    likeCount.className = "like-count";
    likeCount.textContent = `${post.likes} lượt thích`;
    likeSection.appendChild(likeCount);

    postActions.appendChild(likeSection);

    // Comment section
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

    // Enable/disable comment button based on input
    commentInput.addEventListener("input", () => {
        commentSubmitBtn.disabled = commentInput.value.trim() === "";
    });

    commentSection.appendChild(commentInputDiv);

    // Comment list
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
    setAvatar(commentProfilePic); // Set avatar dynamically
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

    // Preserve the create-post section
    const createPostSection = postsSection.querySelector(".create-post");
    postsSection.innerHTML = "";
    postsSection.appendChild(createPostSection);

    // Render posts
    postsData.forEach((post, index) => {
        const postElement = createPost(post, index);
        postsSection.appendChild(postElement);
    });
}

function toggleLike(index) {
    postsData[index].liked = !postsData[index].liked;
    postsData[index].likes += postsData[index].liked ? 1 : -1;
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
        privacy: "public", // Shared posts are public by default
        isShared: true,
        sharer: profileData.username,
        originalPoster: originalPost.username,
        originalTag: originalPost.tag,
        originalDate: originalPost.date
    };

    postsData.unshift(sharedPost); // Add shared post to the top
    renderPosts();

    // Scroll to the top to view the shared post
    const postsSection = document.querySelector(".posts-section");
    postsSection.scrollIntoView({ behavior: "smooth" });
}

function submitPost() {
    const postContent = document.getElementById("postContent").value.trim();
    if (!postContent) return;

    const selectedPrivacy = document.getElementById("selectedPrivacy").getAttribute("data-value");
    const newPost = {
        username: profileData.username,
        tag: "Status",
        date: formatCurrentDateTime(),
        content: postContent,
        image: null,
        likes: 0,
        liked: false,
        comments: [],
        privacy: selectedPrivacy
    };

    postsData.unshift(newPost); // Add new post to the top
    renderPosts();
    closePostModal();

    // Scroll to the top of the posts section to view the new post
    const postsSection = document.querySelector(".posts-section");
    postsSection.scrollIntoView({ behavior: "smooth" });
}

// Function to render the intro section
function renderIntroSection() {
    const introSection = document.getElementById("introSection");
    if (!introSection) return;

    // Clear existing content
    introSection.innerHTML = "";

    // Add heading
    const heading = document.createElement("h2");
    heading.textContent = "Giới thiệu";
    introSection.appendChild(heading);

    // Add bio
    if (profileData.bio) {
        const bio = document.createElement("p");
        bio.className = "bio";
        bio.textContent = profileData.bio;
        introSection.appendChild(bio);
    }

    // Add "Chỉnh sửa tiểu sử" button (since bio is now present)
    const bioButton = document.createElement("button");
    bioButton.textContent = "Chỉnh sửa tiểu sử";
    introSection.appendChild(bioButton);

    // Add intro items
    profileData.introItems.forEach(item => {
        const p = document.createElement("p");
        p.textContent = `${item.emoji} ${item.text}`;
        introSection.appendChild(p);
    });
}

// Function to render the profile section
function renderProfileSection() {
    const profilePic = document.querySelector(".profile-section .profile-pic");
    if (profilePic) {
        setAvatar(profilePic); // Set avatar dynamically
    }

    const profileInfo = document.querySelector(".profile-section .profile-info");
    if (profileInfo) {
        const username = profileInfo.querySelector("h1");
        username.textContent = profileData.username;

        const friends = profileInfo.querySelector("p");
        friends.textContent = `${profileData.friends} người bạn`;
    }
}

// Logic chuyển đổi tab
function setupTabSwitching() {
    const tabs = document.querySelectorAll(".tab-link");

    tabs.forEach(tab => {
        tab.addEventListener("click", (e) => {
            e.preventDefault(); // Ngăn hành vi mặc định của thẻ a

            // Loại bỏ lớp 'active' khỏi tất cả các tab
            tabs.forEach(t => t.classList.remove("active"));

            // Thêm lớp 'active' vào tab được nhấp
            tab.classList.add("active");
        });
    });
}

// Handle click on "Bạn đang nghĩ gì?" to open modal
function openPostModal() {
    const modalOverlay = document.getElementById("postModalOverlay");
    modalOverlay.classList.add("active");

    // Focus on the textarea when modal opens
    const textarea = modalOverlay.querySelector("textarea");
    textarea.focus();

    // Set avatar in the modal
    const modalProfilePic = modalOverlay.querySelector(".modal-profile .profile-pic-small");
    if (modalProfilePic) {
        setAvatar(modalProfilePic);
    }
}

// Handle closing the modal
function closePostModal() {
    const modalOverlay = document.getElementById("postModalOverlay");
    modalOverlay.classList.remove("active");

    // Reset textarea and button state
    const textarea = modalOverlay.querySelector("textarea");
    const postBtn = modalOverlay.querySelector(".post-btn");
    textarea.value = "";
    postBtn.disabled = true;

    // Close privacy dropdown if open
    const privacyDropdown = document.getElementById("privacyDropdown");
    if (privacyDropdown) {
        privacyDropdown.classList.remove("active");
    }
}

// Toggle privacy dropdown
function togglePrivacyDropdown() {
    const privacyDropdown = document.getElementById("privacyDropdown");
    privacyDropdown.classList.toggle("active");
}

// Select privacy option
function selectPrivacy(displayText, value) {
    const selectedPrivacy = document.getElementById("selectedPrivacy");
    selectedPrivacy.textContent = displayText;

    // Store the selected value
    selectedPrivacy.setAttribute("data-value", value);

    // Close the dropdown
    const privacyDropdown = document.getElementById("privacyDropdown");
    privacyDropdown.classList.remove("active");
}

// Handle avatar upload
function setupAvatarUpload() {
    const avatarUploadInput = document.getElementById("avatar-upload");
    if (avatarUploadInput) {
        avatarUploadInput.addEventListener("change", (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    profileData.avatar = e.target.result; // Update avatar in profileData
                    localStorage.setItem("userAvatar", profileData.avatar); // Save to localStorage
                    updateAllAvatars(); // Update all avatars on the page
                };
                reader.readAsDataURL(file);
            }
        });
    }
}

// Thực thi khi trang tải
document.addEventListener("DOMContentLoaded", () => {
    // Render profile section
    renderProfileSection();

    // Tạo bài viết
    renderPosts();

    // Thiết lập chuyển đổi tab
    setupTabSwitching();

    // Render intro section
    renderIntroSection();

    // Setup avatar upload
    setupAvatarUpload();

    // Enable "Đăng" button when textarea has content
    const textarea = document.querySelector(".post-modal textarea");
    const postBtn = document.querySelector(".post-btn");

    if (textarea && postBtn) {
        textarea.addEventListener("input", () => {
            postBtn.disabled = textarea.value.trim() === "";
        });
    }

    // Close modal and dropdown when clicking outside
    const modalOverlay = document.getElementById("postModalOverlay");
    if (modalOverlay) {
        modalOverlay.addEventListener("click", (e) => {
            if (e.target === modalOverlay) {
                closePostModal();
            }
        });
    }

    // Close privacy dropdown when clicking outside
    document.addEventListener("click", (e) => {
        const privacyDropdown = document.getElementById("privacyDropdown");
        const privacySettings = document.querySelector(".privacy-settings");
        if (privacyDropdown && !privacySettings.contains(e.target)) {
            privacyDropdown.classList.remove("active");
        }
    });
});