const defaultMessengerData = {
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
            status: "Đang hoạt động",
            messages: []
        },
        {
            id: 2,
            name: "BLV Giảng A Phò và Giảng A Lừ",
            preview: "Đặt đã gửi mút tơ đinh kèm",
            time: "1 giờ",
            avatar: "https://via.placeholder.com/40",
            status: "Đang hoạt động",
            messages: []
        },
        {
            id: 3,
            name: "Thằng đệ non",
            preview: "Hết tiền đặt",
            time: "1 giờ",
            avatar: "../img/hinh-anh-cute-avatar-vo-tri-3.jpg",
            status: "Đang hoạt động",
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
            name: "NT12 (T600LR)",
            preview: "Đăng Ngố đã khởi nhiệm",
            time: "4 giờ",
            avatar: "https://via.placeholder.com/40",
            status: "Đang hoạt động",
            messages: []
        }
    ],
    selectedChat: {
        id: 3,
        name: "Thằng đệ non",
        status: "Đang hoạt động",
        avatar: "../img/hinh-anh-cute-avatar-vo-tri-3.jpg",
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

// Tải dữ liệu từ localStorage hoặc sử dụng dữ liệu mặc định
let messengerData = JSON.parse(localStorage.getItem('messengerData')) || defaultMessengerData;

// Biến để lưu đoạn chat hiện tại
let currentChat = messengerData.chats.find(chat => chat.id === messengerData.selectedChat.id) || messengerData.chats[0];

// Hàm để lưu dữ liệu vào localStorage
function saveToLocalStorage() {
    localStorage.setItem('messengerData', JSON.stringify(messengerData));
}

// Hàm để render danh sách đoạn chat
function renderChatList() {
    const chatList = document.getElementById('chat-list');
    if (!chatList) return;
    chatList.innerHTML = '';
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
        chatItem.addEventListener('click', () => updateSelectedChat(chat));
        chatList.appendChild(chatItem);
    });
}

// Hàm để cập nhật đoạn chat được chọn
function updateSelectedChat(chat) {
    currentChat = chat;
    messengerData.selectedChat = {
        id: chat.id,
        name: chat.name,
        status: chat.status || "Đang hoạt động",
        avatar: chat.avatar,
        messages: chat.messages
    };

    // Cập nhật chat header
    const chatHeader = document.querySelector('.chat-header');
    if (chatHeader) {
        chatHeader.innerHTML = `
            <img src="${chat.avatar}" alt="Avatar">
            <div>
                <div class="chat-name">${chat.name}</div>
                <div class="status">${chat.status}</div>
            </div>
        `;
    }

    renderMessages(chat.messages);
    saveToLocalStorage();
}

// Hàm để render tin nhắn
function renderMessages(messages) {
    const chatBody = document.getElementById('chat-body');
    if (!chatBody) return;
    chatBody.innerHTML = '';
    messages.forEach(message => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `message-${message.type}`);
        messageDiv.textContent = message.text;
        chatBody.appendChild(messageDiv);
    });
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Hàm để gửi tin nhắn
function sendMessage() {
    const messageInput = document.getElementById('message-input');
    if (!messageInput) return;
    const messageText = messageInput.value.trim();
    if (!messageText) return;

    const newMessage = {
        id: currentChat.messages.length + 1,
        text: messageText,
        sender: 'me',
        type: 'sent'
    };

    currentChat.messages.push(newMessage);
    currentChat.preview = messageText;
    currentChat.time = 'Vừa xong';

    // Cập nhật messengerData.chats
    const chatIndex = messengerData.chats.findIndex(c => c.id === currentChat.id);
    if (chatIndex !== -1) {
        messengerData.chats[chatIndex] = { ...currentChat };
    }

    messengerData.selectedChat.messages = currentChat.messages;

    renderMessages(currentChat.messages);
    renderChatList();
    saveToLocalStorage();
    messageInput.value = '';

    setTimeout(receiveMessage, 2000);
}

// Hàm để mô phỏng tin nhắn nhận
function receiveMessage() {
    const newMessage = {
        id: currentChat.messages.length + 1,
        text: 'Được thôi, mình hiểu rồi!',
        sender: 'other',
        type: 'received'
    };

    currentChat.messages.push(newMessage);
    currentChat.preview = newMessage.text;
    currentChat.time = 'Vừa xong';

    // Cập nhật messengerData.chats
    const chatIndex = messengerData.chats.findIndex(c => c.id === currentChat.id);
    if (chatIndex !== -1) {
        messengerData.chats[chatIndex] = { ...currentChat };
    }

    messengerData.selectedChat.messages = currentChat.messages;

    renderMessages(currentChat.messages);
    renderChatList();
    saveToLocalStorage();
}

// Hàm để thay đổi avatar
function changeAvatar(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('../img/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            currentChat.avatar = e.target.result;
            // Cập nhật messengerData.chats
            const chatIndex = messengerData.chats.findIndex(c => c.id === currentChat.id);
            if (chatIndex !== -1) {
                messengerData.chats[chatIndex].avatar = currentChat.avatar;
            }
            messengerData.selectedChat.avatar = currentChat.avatar;
            updateSelectedChat(currentChat);
            renderChatList();
            saveToLocalStorage();
        };
        reader.readAsDataURL(file);
    }
}

// Khởi tạo ứng dụng
window.onload = function() {
    renderChatList();
    updateSelectedChat(currentChat);

    const sendButton = document.getElementById('send-button');
    const messageInput = document.getElementById('message-input');
    const avatarInput = document.getElementById('avatar-input');

    if (sendButton) {
        sendButton.addEventListener('click', sendMessage);
    }
    if (messageInput) {
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }
    if (avatarInput) {
        avatarInput.addEventListener('change', changeAvatar);
    }
};