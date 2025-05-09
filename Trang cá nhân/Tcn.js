
// Post data and generation logic
const postsData = [
    {
        username: "Lương Trí Tuệ",
        tag: "Liên Quân Mobile",
        date: "30 tháng 7, 2024",
        content: "Cùng bạn tham gia",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUlsSgNMZa7wg18UgH_y77AkYwXctdbqzwLw&s"
    },
    {
        username: "Lương Trí Tuệ",
        tag: "Học tập",
        date: "25 tháng 6, 2024",
        content: "Hôm nay vừa hoàn thành bài thuyết trình về AI, cảm giác thật tuyệt!",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlJsMOU8_1ajhqD3JcOGc9K1gcM4zoBzYiKA&s"
    },
    {
        username: "Lương Trí Tuệ",
        tag: "Du lịch",
        date: "15 tháng 5, 2024",
        content: "Chuyến đi Đà Lạt thật đáng nhớ, hoa cẩm tú cầu đẹp mê ly!",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzA6a5c3AsLiduTi__wv4vCfALfGB0CTKrjg&s"
    }
];

function createPost(post) {
    const postDiv = document.createElement("div");
    postDiv.className = "post";

    const postHeader = document.createElement("div");
    postHeader.className = "post-header";

    const profilePic = document.createElement("div");
    profilePic.className = "profile-pic-small";
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

    return postDiv;
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

// Thực thi khi trang tải
document.addEventListener("DOMContentLoaded", () => {
    // Tạo bài viết
    const postsSection = document.querySelector(".posts-section");
    if (postsSection) {
        postsData.forEach(post => {
            const postElement = createPost(post);
            postsSection.appendChild(postElement);
        });
    }

    // Thiết lập chuyển đổi tab
    setupTabSwitching();
});