document.addEventListener('DOMContentLoaded', function () {
    const postsContainer = document.getElementById('posts-container');

    // Default post data with profile images
    const postsData = [
        {
            groupName: "Tìm Phòng Trọ - Nhà Trọ Cho Sinh Viên Tại Hà Nội",
            author: "Hoàng Quốc Việt",
            timestamp: "Vừa xong",
            content: "CẦN HỘ CAO CẤP FULL TIỆN NGHI ĐÀ QUAY TRỌ LẠI... Xem thêm",
            profileImage: "https://static.valorantstats.xyz/agent-headshots/yoru-headshot.png", // Specific profile image for this group
            images: [
                "img/apartment1.jpg",
                "img/apartment2.jpg",
                "img/apartment3.jpg",
                "img/apartment4.jpg"
            ],
            likes: 10,
            comments: 5
        },
        {
            groupName: "Cafe Đường Phố",
            author: "Nguyễn Văn An",
            timestamp: "15 phút trước",
            content: "Cà phê sáng nay thật tuyệt! Ai muốn đi cùng không? ☕",
            profileImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRraibIxLwN0bKU7rfy7Ohlt7OO8EaC3dTLlw&s", // Specific profile image for this group
            images: [
                
                "https://preview.redd.it/voxalxsr8nl51.png?width=4096&format=png&auto=webp&s=d01fc3090800bbe04fbb3898e29e86fb1694a3ce"
            ],
            likes: 25,
            comments: 8
        },
        {
            groupName: "GÓC THÔNG TIN HUST",
            author: "Trần Minh Tuấn",
            timestamp: "1 giờ trước",
            content: "Lịch thi cuối kỳ đã có, mọi người xem và chuẩn bị nhé! 📚",
            profileImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCKOLNDjzY2iYB4PR76o9ZxGZ9arHF4B6s8w&s", // Specific profile image for this group
            images: [],
            likes: 40,
            comments: 12
        },
        {
            groupName: "Tabi and Homies",
            author: "Lê Thị Hồng",
            timestamp: "30 phút trước",
            content: "Hôm nay tụ họp ở công viên, ai tham gia thì inbox mình nhé! 🌳",
            profileImage: "https://static.valorantstats.xyz/agent-headshots/neon-headshot.png", // Specific profile image for this group
            images: [
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvTMewJNb-EgeK3nk3jtWXBo5TBsHqNsMIHQ&s"
            ],
            likes: 15,
            comments: 3
        }
    ];

    // Function to create a post element
    function createPost(post) {
        const postElement = document.createElement('div');
        postElement.classList.add('post');

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
        postMeta.textContent = `${post.author} • ${post.timestamp}`;

        postInfo.appendChild(groupName);
        postInfo.appendChild(postMeta);
        postHeader.appendChild(profileImg);
        postHeader.appendChild(postInfo);

        // Post Content
        const postContent = document.createElement('p');
        postContent.textContent = post.content;

        // Post Images (if any)
        let postImages;
        if (post.images.length > 0) {
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
        likes.textContent = `👍 ${post.likes} lượt thích`;

        const comments = document.createElement('span');
        comments.textContent = `💬 ${post.comments} bình luận`;

        postInteractions.appendChild(likes);
        postInteractions.appendChild(comments);

        // Post Actions
        const postActions = document.createElement('div');
        postActions.classList.add('post-actions');

        const likeButton = document.createElement('button');
        likeButton.textContent = "Thích";

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

    // Populate posts
    postsData.forEach(post => {
        const postElement = createPost(post);
        postsContainer.appendChild(postElement);
    });
});