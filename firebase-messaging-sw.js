// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js');

// Khởi tạo app trong SW
firebase.initializeApp({
  apiKey: "AIzaSyDKLDWGtFABeQUZGSgvAPthc-5kXPox21I",
  authDomain: "storage-image-80802.firebaseapp.com",
  projectId: "storage-image-80802",
  storageBucket: "storage-image-80802.appspot.com",
  messagingSenderId: "1003874933380",
  appId: "1:1003874933380:web:d1503d83f5df09888f80d1",
  measurementId: "G-XXTE0XSGPV"
});

const messaging = firebase.messaging();

// Lắng nghe noti khi trang tắt (background)
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const { title, body, image, icon } = payload.notification;

  self.registration.showNotification(title, {
    body: body,
    icon: icon || image || 'default-icon.png', // Ưu tiên icon nếu có, sau đó là image
    image: image, // hiển thị ảnh lớn (nếu trình duyệt hỗ trợ)
  });
});
