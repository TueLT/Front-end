const messengerData = {
    user: {
        id: 0,
        name: "Người dùng chính",
        status: "Đang hoạt động",
        avatar: "https://via.placeholder.com/40",
        email: "user@example.com",
        lastSeen: "Vừa xong",
        theme: "Valorant"
    },
    chats: [
        {
            id: 1,
            name: "FC Dưỡng Sinh",
            preview: "Linh: Đặt sàn 1h chiều",
            time: "1 giờ",
            avatar: "https://via.placeholder.com/40",
            messages: []
        },
        {
            id: 2,
            name: "BLV Giảng A Phò và Giảng A Lừ (Nh...",
            preview: "Đặt đã gửi mút tơ đinh kèm, 1 giờ",
            time: "1 giờ",
            avatar: "https://via.placeholder.com/40",
            messages: []
        },
        {
            id: 3,
            name: "Thằng đệ non",
            preview: "Hết tiền đặt 1 giờ",
            time: "1 giờ",
            avatar: "https://via.placeholder.com/40",
            messages: [
                { id: 1, text: "Chịu", sender: "other", type: "received" },
                { id: 2, text: "Nắng", sender: "other", type: "received" },
                { id: 3, text: "Gạ kèo bóng đi", sender: "me", type: "sent" },
                { id: 4, text: "Game đi", sender: "other", type: "received" },
                { id: 5, text: "đá Thủy Lợi?", sender: "other", type: "received" },
                { id: 6, text: "Ko có số", sender: "me", type: "sent" },
                { id: 7, text: "Hết tiền đặt", sender: "me", type: "sent" }
            ]
        },
        {
            id: 4,
            name: "NT12 (T600LR), T3-T6(19:40-21:1...",
            preview: "Đăng Ngố đã khởi nhiệm, 4 giờ",
            time: "4 giờ",
            avatar: "https://via.placeholder.com/40",
            messages: []
        },
        {
            id: 5,
            name: "FC Online Vietnam News",
            preview: "Sự kiện thang Ball Lucky Ball d...",
            time: "5 giờ",
            avatar: "https://via.placeholder.com/40",
            messages: []
        },
        {
            id: 6,
            name: "AE Tiên Lữ",
            preview: "Bạn: 😍😍 7 giờ",
            time: "7 giờ",
            avatar: "https://via.placeholder.com/40",
            messages: []
        },
        {
            id: 7,
            name: "X-Samkok - Siêu Năng Tam Quốc (Off...",
            preview: "Việt: Game bảo trì thứ SV, 7 giờ",
            time: "7 giờ",
            avatar: "https://via.placeholder.com/40",
            messages: []
        }
    ],
    selectedChat: {
        id: 3,
        name: "Thằng đệ non",
        status: "Đang hoạt động",
        avatar: "https://via.placeholder.com/40",
        messages: [
            { id: 1, text: "Chịu", sender: "other", type: "received" },
            { id: 2, text: "Nắng", sender: "other", type: "received" },
            { id: 3, text: "Gạ kèo bóng đi", sender: "me", type: "sent" },
            { id: 4, text: "Game đi", sender: "other", type: "received" },
            { id: 5, text: "đá Thủy Lợi?", sender: "other", type: "received" },
            { id: 6, text: "Ko có số", sender: "me", type: "sent" },
            { id: 7, text: "Hết tiền đặt", sender: "me", type: "sent" }
        ]
    }
};

// Biến để lưu đoạn chat hiện tại
let currentChat = messengerData.chats.find(chat => chat.id === messengerData.selectedChat.id);

// Hàm để render danh sách đoạn chat
function renderChatList() {
    const chatList = document.getElementById('chat-list');
    chatList.innerHTML = ''; // Xóa danh sách hiện tại
    messengerData.chats.forEach(chat => {
        const chatItem = document.createElement('div');
        chatItem.classList.add('chat-item');
        chatItem.innerHTML = `
            <img src="${chat.avatar}" alt="Avatar">
            <div class="chat-info">
                <div class="chat-name">${chat.name}</div>
                <div class="chat-preview">${chat.preview}</div>
            </div>
            <div class="chat-time">${chat.time}</div>
        `;
        // Thêm sự kiện click để chọn đoạn chat
        chatItem.addEventListener('click', () => {
            updateSelectedChat(chat);
        });
        chatList.appendChild(chatItem);
    });
}

// Hàm để cập nhật đoạn chat được chọn
function updateSelectedChat(chat) {
    currentChat = chat;
    // Cập nhật tiêu đề đoạn chat
    const chatHeaderName = document.querySelector('.chat-header .chat-name');
    chatHeaderName.textContent = chat.name;

    // Cập nhật tiêu đề trong phần tùy chọn
    const chatOptionsName = document.querySelector('.chat-options-header .chat-name');
    chatOptionsName.textContent = chat.name;

    // Cập nhật tin nhắn
    renderMessages(chat.messages);
}

// Hàm để render tin nhắn
function renderMessages(messages) {
    const chatBody = document.getElementById('chat-body');
    chatBody.innerHTML = ''; // Xóa tin nhắn hiện tại
    messages.forEach(message => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `message-${message.type}`);
        messageDiv.textContent = message.text;
        chatBody.appendChild(messageDiv);
    });
    // Cuộn xuống dưới cùng để xem tin nhắn mới nhất
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Hàm để gửi tin nhắn
function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const messageText = messageInput.value.trim();
    if (messageText === '') return; // Không gửi nếu tin nhắn rỗng

    // Tạo tin nhắn mới
    const newMessage = {
        id: currentChat.messages.length + 1,
        text: messageText,
        sender: "me",
        type: "sent"
    };

    // Thêm tin nhắn vào đoạn chat hiện tại
    currentChat.messages.push(newMessage);

    // Cập nhật giao diện
    renderMessages(currentChat.messages);

    // Xóa ô nhập liệu
    messageInput.value = '';

    // Mô phỏng tin nhắn nhận sau 2 giây
    setTimeout(() => {
        receiveMessage();
    }, 2000);
}

// Hàm để mô phỏng tin nhắn nhận
function receiveMessage() {
    const newMessage = {
        id: currentChat.messages.length + 1,
        text: "Được thôi, mình hiểu rồi!",
        sender: "other",
        type: "received"
    };

    // Thêm tin nhắn vào đoạn chat hiện tại
    currentChat.messages.push(newMessage);

    // Cập nhật giao diện
    renderMessages(currentChat.messages);
}

// Thêm sự kiện cho nút gửi và phím Enter
window.onload = function() {
    renderChatList();
    renderMessages(messengerData.selectedChat.messages);

    const sendButton = document.getElementById('send-button');
    const messageInput = document.getElementById('message-input');

    // Gửi tin nhắn khi nhấn nút
    sendButton.addEventListener('click', sendMessage);

    // Gửi tin nhắn khi nhấn Enter
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
};