  const currentUserId = parseInt(localStorage.getItem("userId"));
  let currentRoomId = null;
  let currentFriendName = "";

  const friendListEl = document.getElementById("friend-list");
  const chatBoxEl = document.getElementById("chat-box");
  const chatHeaderEl = document.getElementById("chat-header");
  const messageInput = document.getElementById("message-input");
  const sendBtn = document.getElementById("send-btn");
  const searchInput = document.getElementById("search-input");
  let curentFriendId = null;
  const token = localStorage.getItem("accessToken");
  if (!token || !currentUserId) {
    alert("Vui lòng đăng nhập lại!");
    window.location.href = 'http://127.0.0.1:5500/front-end/facebook-clone-fe/sign_in.html';
  }

  // ====== SOCKET.IO INIT ======
  if (!window.socket) {
    window.socket = io("http://localhost:9092", {
      transports: ["websocket"]
    });

    window.socket.on("connect", () => {
      console.log("✅ Socket connected:", window.socket.id);
    });

    window.socket.on("message_response", async (msg) => {
      if (curentFriendId != null) {
        try {
          const chatRes = await fetch(`http://localhost:8080/api/chats/${curentFriendId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            },
          });

          if (!chatRes.ok) throw new Error("Không thể tải tin nhắn");

          const messages = await chatRes.json();
          messages.sort((a, b) => a.updateTime - b.updateTime);

          // ❗ Xóa toàn bộ tin nhắn cũ trên UI
          chatBoxEl.innerHTML = "";

          // Gắn lại tin nhắn mới
          messages.forEach(msg => appendMessage(msg));
        } catch (err) {
          console.error("Lỗi khi nhận message và reload:", err);
        }
      }
    });

    window.addEventListener("beforeunload", () => {
      window.socket.disconnect();
    });
  }
  // ====== Search FRIEND LIST ======
  async function searchFriends(keyword) {
    try {
      const response = await fetch(`http://localhost:8080/api/friend/search/${encodeURIComponent(keyword)}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error("Không thể tìm kiếm bạn bè");

      const friends = await response.json();

      // Xóa danh sách cũ
      friendListEl.innerHTML = '';

      // Render lại danh sách mới
      friends.forEach(friend => {
        const item = document.createElement('div');
        item.className = 'friend-item';
        const avatarUrl = friend.avatar || 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg';

        item.innerHTML = `
        <img src="${avatarUrl}" alt="avatar" class="avatar">
        <div class="name">${friend.fullName}</div>
      `;
        item.addEventListener('click', () => {
          loadChat(friend.userId, friend.fullName);
        });
        friendListEl.appendChild(item);
      });

    } catch (error) {
      console.error('Lỗi tìm kiếm:', error);
      alert("Không thể tìm kiếm bạn bè.");
    }
  }

  // ====== LOAD FRIEND LIST ======
  async function loadFriends() {
    try {
      const response = await fetch('http://localhost:8080/api/friend/list', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        window.location.href = 'http://127.0.0.1:5500/front-end/facebook-clone-fe/sign_in.html';
      };

      const friends = await response.json();
      friendListEl.innerHTML = '';

      friends.forEach(friend => {
        const item = document.createElement('div');
        item.className = 'friend-item';
        const avatarUrl = friend.avatar || 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg';
        item.innerHTML = `
          <img src="${avatarUrl}" alt="avatar" class="avatar">
          <div class="name">${friend.fullName}</div>
        `;
        item.addEventListener('click', () => {
          loadChat(friend.userId, friend.fullName);
        });
        friendListEl.appendChild(item);
      });

    } catch (error) {
      console.error('Lỗi tải danh sách bạn bè:', error);
      window.location.href = 'http://127.0.0.1:5500/front-end/facebook-clone-fe/sign_in.html';
    }
  }

  // ====== LOAD CHAT ROOM ======
  async function loadChat(friendId, friendName) {
    currentFriendName = friendName;
    chatHeaderEl.textContent = friendName;
    chatBoxEl.innerHTML = "";
    try {
      const roomRes = await fetch(`http://localhost:8080/api/friend/${friendId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      if (!roomRes.ok) throw new Error("Không thể lấy thông tin phòng chat");

      const roomId = await roomRes.json();
      currentRoomId = roomId;
      curentFriendId = roomId;
      joinRoom(roomId);

      const chatRes = await fetch(`http://localhost:8080/api/chats/${roomId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      if (!chatRes.ok) throw new Error("Không thể tải tin nhắn");

      const messages = await chatRes.json();
      messages.sort((a, b) => a.updateTime - b.updateTime);
      messages.forEach(msg => appendMessage(msg));

    } catch (err) {
      console.error(err);
      alert("Đã xảy ra lỗi khi tải phòng chat.");
    }
  }

  // ====== JOIN ROOM ======
  function joinRoom(roomId) {
    window.socket.emit("join_chat_user", {
      id: roomId,
      userId: currentUserId
    });
  }

  // ====== SEND MESSAGE ======
  function sendMessage() {
    const content = messageInput.value.trim();
    if (!content || !currentRoomId) return;

    const now = Date.now();
    const data = {
      id: currentRoomId,
      userId: currentUserId,
      content: content,
      createTime: now,
      updateTime: now
    };

    appendMessage(data); // Hiển thị trước
    window.socket.emit("send_message_user", data); // Gửi đi
    messageInput.value = "";
  }

  // ====== APPEND MESSAGE TO CHATBOX ======
  function appendMessage(data) {
    const div = document.createElement("div");
    div.classList.add("message");
    div.classList.add(data.userId == currentUserId ? "right" : "left");
    div.textContent = data.content;
    chatBoxEl.appendChild(div);
    chatBoxEl.scrollTop = chatBoxEl.scrollHeight;
  }

  // ====== BIND EVENTS ======
  sendBtn.onclick = sendMessage;
  messageInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
  });
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const keyword = searchInput.value.trim();
      console.log(keyword)
      if (keyword) {
        searchFriends(keyword);
      }
    }
  });
  // ====== INIT ======
  loadFriends();