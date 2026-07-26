document.addEventListener("DOMContentLoaded", () => {
    // 1. Session verification & Header updater
    const authLink = document.getElementById("auth-nav-link");
    if (!authLink) return;

    const token = localStorage.getItem("scentura_token");
    const userStr = localStorage.getItem("scentura_user");

    if (token && userStr) {
        try {
            const user = JSON.parse(userStr);
            const avatarPath = user.avatarUrl || 'images/user.png';
            
            // Set navbar layout to include Cart icon and rounded Avatar
            authLink.innerHTML = `
                <div style="display: flex; align-items: center; gap: 20px; height: 100%;">
                    <!-- Cart Icon Button -->
                    <div id="header-cart-btn" style="position: relative; cursor: pointer; display: flex; align-items: center;" title="Xem giỏ hàng">
                        <svg viewBox="0 0 24 24" style="width: 26px; height: 26px; fill: none; stroke: #c5a880; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; transition: stroke 0.3s;" onmouseover="this.style.stroke='#ffffff'" onmouseout="this.style.stroke='#c5a880'">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                        <!-- Cart Badge Count -->
                        <span id="cart-badge" style="position: absolute; top: -8px; right: -8px; background-color: #ff4d4d; color: white; font-size: 10px; font-weight: bold; border-radius: 50%; width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; border: 1.5px solid #0d0d0d; box-shadow: 0 2px 5px rgba(0,0,0,0.3); display: none;">0</span>
                    </div>
                    
                    <!-- User Avatar -->
                    <div id="user-avatar-btn" style="display: flex; align-items: center; justify-content: center;" title="${user.username} - Nhấp để đăng xuất">
                        <img src="${avatarPath}" alt="${user.username}" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover; border: 2px solid #c5a880; transition: transform 0.3s ease, border-color 0.3s ease; cursor: pointer;" onmouseover="this.style.transform='scale(1.08)'; this.style.borderColor='#ffffff';" onmouseout="this.style.transform='scale(1)'; this.style.borderColor='#c5a880';">
                    </div>
                </div>
            `;
            authLink.href = "#";
            
            // Setup Cart Drawer & Events
            setupCartDrawer(user.username);

            // Click Avatar to logout
            const avatarBtn = document.getElementById("user-avatar-btn");
            if (avatarBtn) {
                avatarBtn.addEventListener("click", (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const confirmLogout = confirm("Bạn có chắc chắn muốn đăng xuất tài khoản Scentura?");
                    if (confirmLogout) {
                        localStorage.removeItem("scentura_token");
                        localStorage.removeItem("scentura_user");
                        window.location.href = "index.html";
                    }
                });
            }

            // Click Cart Icon to open drawer
            const cartBtn = document.getElementById("header-cart-btn");
            if (cartBtn) {
                cartBtn.addEventListener("click", (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    openCart();
                });
            }

        } catch (err) {
            console.error("Lỗi khi tải thông tin phiên đăng nhập:", err);
            localStorage.removeItem("scentura_token");
            localStorage.removeItem("scentura_user");
        }
    } else {
        // If not logged in, point to login.html
        authLink.textContent = "Đăng Nhập";
        authLink.href = "login.html";
    }
});

// 2. Global Toast Notification System
function showToast(message, type = 'success') {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.style.cssText = `
            position: fixed;
            top: 30px;
            right: 30px;
            padding: 15px 25px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            z-index: 100000;
            display: flex;
            align-items: center;
            gap: 10px;
            transform: translateY(-120px);
            opacity: 0;
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            color: white;
            font-family: 'Montserrat', sans-serif;
        `;
        document.body.appendChild(toast);
    }
    
    toast.textContent = message;
    
    if (type === 'error') {
        toast.style.backgroundColor = '#ff4d4d';
    } else {
        toast.style.backgroundColor = '#2ecc71';
    }

    // Force reflow
    toast.offsetHeight;
    
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';
    
    setTimeout(() => {
        toast.style.transform = 'translateY(-120px)';
        toast.style.opacity = '0';
    }, 3000);
}

// 3. Cart Drawer and LocalStorage Engine
let currentUsername = "";

function setupCartDrawer(username) {
    currentUsername = username;
    
    // Inject Drawer UI if not present
    if (!document.getElementById("cart-drawer")) {
        // Backdrop overlay
        const overlay = document.createElement("div");
        overlay.id = "cart-overlay";
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-color: rgba(0,0,0,0.6);
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
            z-index: 9998;
            display: none;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        document.body.appendChild(overlay);

        // Drawer
        const drawer = document.createElement("div");
        drawer.id = "cart-drawer";
        drawer.style.cssText = `
            position: fixed;
            top: 0;
            right: -400px;
            width: 100%;
            max-width: 400px;
            height: 100vh;
            background-color: #141414;
            border-left: 1px solid rgba(197, 168, 128, 0.2);
            box-shadow: -10px 0 30px rgba(0,0,0,0.5);
            z-index: 9999;
            transition: right 0.4s cubic-bezier(0.25, 1, 0.5, 1);
            display: flex;
            flex-direction: column;
            color: #f5f5f5;
            font-family: 'Montserrat', sans-serif;
        `;
        
        drawer.innerHTML = `
            <!-- Header -->
            <div style="padding: 20px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); display: flex; justify-content: space-between; align-items: center;">
                <h3 style="margin: 0; font-family: 'Lora', serif; color: #c5a880; font-size: 20px; font-weight: 600; letter-spacing: 1px;">GIỎ HÀNG CỦA BẠN</h3>
                <span id="close-cart-btn" style="cursor: pointer; font-size: 28px; color: #a0a0a0; transition: color 0.3s; line-height: 1;" onmouseover="this.style.color='#ffffff'" onmouseout="this.style.color='#a0a0a0'">&times;</span>
            </div>
            
            <!-- Cart Items container -->
            <div id="cart-items-container" style="flex: 1; overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 15px;">
                <!-- Dynamically loaded items -->
            </div>
            
            <!-- Footer -->
            <div style="padding: 20px; border-top: 1px solid rgba(255, 255, 255, 0.1); background-color: #0d0d0d; display: flex; flex-direction: column; gap: 15px;">
                <div style="display: flex; justify-content: space-between; font-size: 16px; font-weight: 600;">
                    <span>Tổng cộng:</span>
                    <span id="cart-total-price" style="color: #c5a880; font-weight: 700;">0đ</span>
                </div>
                <button id="checkout-btn" style="background: linear-gradient(135deg, #d4af37 0%, #b8860b 100%); border: none; color: #000; padding: 14px; border-radius: 8px; font-size: 14px; font-weight: 700; cursor: pointer; text-transform: uppercase; letter-spacing: 1.5px; transition: all 0.3s ease;" onmouseover="this.style.filter='brightness(1.1)'" onmouseout="this.style.filter='none'">
                    Thanh Toán Ngay
                </button>
            </div>
        `;
        document.body.appendChild(drawer);

        // Bind events
        document.getElementById("close-cart-btn").addEventListener("click", closeCart);
        overlay.addEventListener("click", closeCart);
        document.getElementById("checkout-btn").addEventListener("click", handleCheckout);
    }

    updateCartBadge();
    renderCart();
}

function getCart() {
    if (!currentUsername) return [];
    const cartStr = localStorage.getItem(`scentura_cart_${currentUsername}`);
    return cartStr ? JSON.parse(cartStr) : [];
}

function saveCart(cart) {
    if (!currentUsername) return;
    localStorage.setItem(`scentura_cart_${currentUsername}`, JSON.stringify(cart));
    updateCartBadge();
    renderCart();
}

function updateCartBadge() {
    const badge = document.getElementById("cart-badge");
    if (!badge) return;

    const cart = getCart();
    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (totalQty > 0) {
        badge.textContent = totalQty;
        badge.style.display = "flex";
    } else {
        badge.style.display = "none";
    }
}

function renderCart() {
    const container = document.getElementById("cart-items-container");
    const totalEl = document.getElementById("cart-total-price");
    if (!container || !totalEl) return;

    const cart = getCart();
    container.innerHTML = "";

    if (cart.length === 0) {
        container.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: #a0a0a0; gap: 15px;">
                <svg viewBox="0 0 24 24" style="width: 60px; height: 60px; fill: none; stroke: currentColor; stroke-width: 1.5;">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                <p style="font-size: 14px; text-align: center;">Giỏ hàng của bạn đang trống.</p>
            </div>
        `;
        totalEl.textContent = "0đ";
        return;
    }

    let totalVal = 0;

    cart.forEach((item, index) => {
        // Parse numerical price (e.g. "49.000đ" -> 49000)
        const priceNum = parseInt(item.price.replace(/[^0-9]/g, ''), 10) || 0;
        const itemTotal = priceNum * item.quantity;
        totalVal += itemTotal;

        const itemRow = document.createElement("div");
        itemRow.style.cssText = `
            display: flex;
            align-items: center;
            gap: 15px;
            padding-bottom: 15px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        `;

        itemRow.innerHTML = `
            <img src="${item.image || 'images/user.png'}" alt="${item.name}" style="width: 65px; height: 65px; border-radius: 8px; object-fit: cover; border: 1px solid rgba(255, 255, 255, 0.1);">
            <div style="flex: 1; display: flex; flex-direction: column; gap: 6px;">
                <h5 style="margin: 0; font-size: 14px; font-weight: 600; color: #f5f5f5;">${item.name}</h5>
                <span style="font-size: 13px; color: #c5a880; font-weight: bold;">${item.price}</span>
                
                <!-- Quantity controls -->
                <div style="display: flex; align-items: center; gap: 10px; margin-top: 4px;">
                    <button onclick="changeQty(${index}, -1)" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.2); color: #fff; width: 22px; height: 22px; border-radius: 4px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 12px;">-</button>
                    <span style="font-size: 13px; font-weight: bold; min-width: 15px; text-align: center;">${item.quantity}</span>
                    <button onclick="changeQty(${index}, 1)" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.2); color: #fff; width: 22px; height: 22px; border-radius: 4px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 12px;">+</button>
                </div>
            </div>
            <button onclick="deleteItem(${index})" style="background: none; border: none; color: #ff4d4d; cursor: pointer; padding: 5px;" title="Xóa khỏi giỏ hàng">
                <svg viewBox="0 0 24 24" style="width: 18px; height: 18px; fill: currentColor;">
                    <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"/>
                </svg>
            </button>
        `;
        container.appendChild(itemRow);
    });

    // Format total back to "XX.XXXđ" format
    totalEl.textContent = totalVal.toLocaleString('vi-VN') + "đ";
}

// 4. Cart Operations
window.addToScenturaCart = function(product) {
    const cart = getCart();
    const existing = cart.find(item => item.name === product.name);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    saveCart(cart);
    showToast(`Đã thêm "${product.name}" vào giỏ hàng!`);
    openCart();
};

window.changeQty = function(index, change) {
    const cart = getCart();
    if (!cart[index]) return;

    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    saveCart(cart);
};

window.deleteItem = function(index) {
    const cart = getCart();
    if (!cart[index]) return;

    const removedName = cart[index].name;
    cart.splice(index, 1);
    saveCart(cart);
    showToast(`Đã xóa "${removedName}" khỏi giỏ hàng.`, 'error');
};

function openCart() {
    const overlay = document.getElementById("cart-overlay");
    const drawer = document.getElementById("cart-drawer");
    if (!overlay || !drawer) return;

    overlay.style.display = "block";
    // Force reflow
    overlay.offsetHeight;
    overlay.style.opacity = "1";
    drawer.style.right = "0";
}

function closeCart() {
    const overlay = document.getElementById("cart-overlay");
    const drawer = document.getElementById("cart-drawer");
    if (!overlay || !drawer) return;

    overlay.style.opacity = "0";
    drawer.style.right = "-400px";

    setTimeout(() => {
        overlay.style.display = "none";
    }, 300);
}

function handleCheckout() {
    const cart = getCart();
    if (cart.length === 0) return;

    showToast("Đặt hàng thành công! Cảm ơn bạn đã lựa chọn Scentura.");
    saveCart([]);
    closeCart();
}
