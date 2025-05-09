// Default Data for Marketplace Items
const marketplaceItems = [
    {
        id: 1,
        image: "https://www.phucanh.vn/media/news/0508_valorant-tren-playstation-1.jpg",
        price: "250.000 ₫",
        description: "Nghĩ sưu cộng. Cần bán laptop NHẬT Fujitsu i7, máy Phần mềm không camera",
        location: "Hà Đông",
    },
    {
        id: 2,
        image: "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/1c1776bd1bdd921061a53953d81a393ef69ce633-1920x1080.jpg?auto=format&fit=fill&q=80&w=956",
        price: "14.000.000 ₫",
        description: "Được bán pc cấu hình nhuần BH 34 tháng",
        location: "Hà Đông",
    },
    {
        id: 3,
        image: "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news/c6c50b680c5e1846a9c77f86d5aa357d46584ffe-1920x1080.png?auto=format&fit=fill&q=80&w=1082",
        price: "135 ₫",
        description: "ALL ASUS TUF Gaming F17 FX706HF màn chính hãng game cực đã",
        location: "Hà Đông",
    },
    {
        id: 4,
        image: "https://s3-api.fpt.vn/fptvn-storage/2024-12-26/1735178497_valorantposter.png",
        price: "2.700.000 ₫",
        description: "TRỌ MỚI TRÍ 2TR TRỌ",
        location: "Hà Đông",
    },
];

// Render Marketplace Items
function renderMarketplaceItems() {
    const marketplaceContainer = document.getElementById("marketplace-items");
    marketplaceContainer.innerHTML = marketplaceItems
        .map(
            (item) => `
                <div class="marketplace-item">
                    <img src="${item.image}" alt="Item">
                    <div class="item-info">
                        <p class="price">${item.price}</p>
                        <p>${item.description}</p>
                        <p class="location">${item.location}</p>
                    </div>
                </div>
            `
        )
        .join("");
}

// Render Marketplace Items
function renderMarketplaceItems() {
    const marketplaceContainer = document.getElementById("marketplace-items");
    marketplaceContainer.innerHTML = marketplaceItems
        .map(
            (item) => `
                <div class="marketplace-item">
                    <img src="${item.image}" alt="Item">
                    <div class="item-info">
                        <p class="price">${item.price}</p>
                        <p>${item.description}</p>
                        <p class="location">${item.location}</p>
                    </div>
                </div>
            `
        )
        .join("");
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

// Toggle Active Nav Icon
function toggleNavIcon(event) {
    const navIcons = document.querySelectorAll(".nav-icon");
    navIcons.forEach(icon => icon.classList.remove("active"));
    event.currentTarget.classList.add("active");
}

// Toggle Active Menu Item
function toggleMenuItem(event) {
    const menuItems = document.querySelectorAll(".menu-item");
    menuItems.forEach(item => item.classList.remove("active"));
    event.currentTarget.classList.add("active");
}

// Initial Render and Event Listeners
document.addEventListener("DOMContentLoaded", () => {
    renderMarketplaceItems();

    // Add event listener for profile icon click
    const profileIcon = document.getElementById("profile-icon");
    profileIcon.addEventListener("click", toggleProfileDropdown);

    // Add event listener for clicking outside the dropdown
    document.addEventListener("click", closeDropdownOnClickOutside);

    // Add event listeners for nav icons
    const navIcons = document.querySelectorAll(".nav-icon");
    navIcons.forEach(icon => {
        icon.addEventListener("click", toggleNavIcon);
    });

    // Set initial active state to Marketplace
    const marketplaceIcon = document.getElementById("nav-marketplace");
    marketplaceIcon.classList.add("active");

    // Add event listeners for menu items
    const menuItems = document.querySelectorAll(".menu-item");
    menuItems.forEach(item => {
        item.addEventListener("click", toggleMenuItem);
    });

    // Set initial active state to "Lượt xem tất cả"
    const browseItem = document.getElementById("menu-browse");
    browseItem.classList.add("active");
});