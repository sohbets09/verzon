// ============================================
//  VERZON - OÝUN PLATFORMASY
//  script.js - DOLY IŞLEÝÄN
// ============================================

// ============================================
//  OÝUNLAR - GÖNI JS-DE SAKLANÝAR!
//  INDI IŞLEÝÄR!
// ============================================
const allGames = [];

// ============================================
//  OÝUNLARY GÖRKEZ
// ============================================

function displayGames(games) {
    const freeGames = games.filter(g => g.price === 0);
    const freeGrid = document.getElementById('freeGamesGrid');
    if (freeGrid) {
        freeGrid.innerHTML = freeGames.length > 0 ? renderGameCards(freeGames) : 
            '<div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 30px;"><div class="icon">🎁</div><h3>Mugt oýun ýok</h3></div>';
    }
    
    const paidGames = games.filter(g => g.price > 0);
    const paidGrid = document.getElementById('paidGamesGrid');
    if (paidGrid) {
        paidGrid.innerHTML = paidGames.length > 0 ? renderGameCards(paidGames) : 
            '<div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 30px;"><div class="icon">🪙</div><h3>Pullu oýun ýok</h3></div>';
    }
}

function renderGameCards(games) {
    return games.map(game => `
        <a href="game.html?id=${game.id}" class="game-card">
            <div class="game-img" style="background-image: url('${game.image || 'https://picsum.photos/300/200'}');">
                <span class="badge ${game.price === 0 ? 'badge-free' : 'badge-paid'}">
                    ${game.price === 0 ? '🎁 Mugt' : '🪙 ' + game.price + ' ZC'}
                </span>
            </div>
            <div class="info">
                <h3>${game.title}</h3>
                <div class="category">${game.category}</div>
                <div class="price ${game.price === 0 ? 'free' : ''}">
                    ${game.price === 0 ? 'Mugt' : game.price + ' ZC'}
                </div>
            </div>
        </a>
    `).join('');
}

// ============================================
//  ULANYJY DOLANDYRYŞ
// ============================================

function checkUser() {
    const username = localStorage.getItem('username');
    const display = document.getElementById('usernameDisplay');
    const authBtn = document.getElementById('authBtn');
    const adminLink = document.getElementById('adminLink');
    const profileAdminBtn = document.getElementById('profileAdminBtn');
    
    if (username) {
        if (display) display.textContent = '👤 ' + username;
        if (authBtn) {
            authBtn.textContent = 'Çykmak';
            authBtn.href = '#';
            authBtn.onclick = function(e) {
                e.preventDefault();
                logout();
            };
        }
        if (username === 'admin') {
            if (adminLink) adminLink.style.display = 'inline';
            if (profileAdminBtn) profileAdminBtn.style.display = 'inline';
        } else {
            if (adminLink) adminLink.style.display = 'none';
            if (profileAdminBtn) profileAdminBtn.style.display = 'none';
        }
    } else {
        if (display) display.textContent = '👤 Myhman';
        if (authBtn) {
            authBtn.textContent = 'Giriş';
            authBtn.href = 'login.html';
        }
        if (adminLink) adminLink.style.display = 'none';
        if (profileAdminBtn) profileAdminBtn.style.display = 'none';
    }
}

function logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('zoncoin');
    window.location.href = 'index.html';
}

function getUsers() {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.length === 0) {
        users = [
            { id: 1, username: 'admin', password: 'admin123', zoncoin: 9999 },
            { id: 2, username: 'test', password: 'test123', zoncoin: 100 }
        ];
        localStorage.setItem('users', JSON.stringify(users));
    }
    return users;
}

function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// ============================================
//  GIRIŞ WE HASAP AÇMAK
// ============================================

function login(username, password) {
    const users = getUsers();
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        localStorage.setItem('username', username);
        localStorage.setItem('userId', user.id);
        localStorage.setItem('zoncoin', user.zoncoin);
        showFlash('Hos geldiňiz, ' + username + '! 👋', 'success');
        setTimeout(() => window.location.href = 'index.html', 1000);
    } else {
        showFlash('Ýalňyş ulanyjy ady ýa-da açar söz!', 'error');
    }
}

function register(username, password) {
    const users = getUsers();
    
    if (users.find(u => u.username === username)) {
        showFlash('Bu ulanyjy ady eýýäm bar!', 'error');
        return;
    }
    
    const newUser = {
        id: users.length + 1,
        username: username,
        password: password,
        zoncoin: 0
    };
    
    users.push(newUser);
    saveUsers(users);
    
    showFlash('✅ Hasap döredildi! Indi giriň.', 'success');
    setTimeout(() => window.location.href = 'login.html', 1000);
}

// ============================================
//  PROFIL
// ============================================

function loadProfile() {
    const username = localStorage.getItem('username');
    const userId = localStorage.getItem('userId');
    
    if (!username) {
        window.location.href = 'login.html';
        return;
    }
    
    const displayUsername = document.getElementById('profileUsername');
    const displayCoins = document.getElementById('profileCoins');
    
    if (displayUsername) displayUsername.textContent = username;
    if (displayCoins) {
        const users = getUsers();
        const user = users.find(u => u.id == userId);
        displayCoins.textContent = user ? user.zoncoin || 0 : 0;
    }
}

// ============================================
//  GÖZLEG
// ============================================

function searchGames() {
    const query = document.getElementById('searchInput').value.toLowerCase().trim();
    const searchResults = document.getElementById('searchResults');
    const searchGrid = document.getElementById('searchGrid');
    const freeSection = document.getElementById('freeSection');
    const paidSection = document.getElementById('paidSection');
    
    if (!query) {
        searchResults.style.display = 'none';
        freeSection.style.display = 'block';
        paidSection.style.display = 'block';
        displayGames(allGames);
        return;
    }
    
    const filtered = allGames.filter(g => 
        g.title.toLowerCase().includes(query) || 
        g.category.toLowerCase().includes(query)
    );
    
    searchResults.style.display = 'block';
    freeSection.style.display = 'none';
    paidSection.style.display = 'none';
    
    if (filtered.length > 0) {
        searchGrid.innerHTML = renderGameCards(filtered);
    } else {
        searchGrid.innerHTML = `
            <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                <div class="icon" style="font-size: 48px;">🔍</div>
                <h3>Oýun tapylmady</h3>
                <p style="color: #94a9c9;">"${query}" gözlegi üçin hiç zat tapylmady</p>
            </div>
        `;
    }
}

// ============================================
//  OÝUN DETALY
// ============================================

function getGameById(id) {
    return allGames.find(g => g.id === id);
}

function displayGameDetail(id) {
    const game = getGameById(id);
    
    if (!game) {
        document.getElementById('gameTitleDisplay').textContent = 'Oýun tapylmady!';
        document.getElementById('gameImage').src = 'https://picsum.photos/600/350';
        document.getElementById('gameDescription').textContent = 'Bu oýun tapylmady ýa-da pozuldy.';
        document.getElementById('gamePrice').textContent = '❌';
        return;
    }
    
    document.getElementById('gameTitleDisplay').textContent = game.title;
    document.getElementById('gameImage').src = game.image || 'https://picsum.photos/600/350';
    document.getElementById('gameImage').alt = game.title;
    document.getElementById('gameCategory').textContent = '🏷️ ' + game.category;
    document.getElementById('gameDescription').textContent = game.description || 'Oýun hakda maglumat ýok.';
    document.getElementById('gameId').value = game.id;
    document.title = game.title + ' - Verzon';
    
    const priceEl = document.getElementById('gamePrice');
    if (game.price === 0) {
        priceEl.textContent = '🎁 Mugt';
        priceEl.className = 'price free';
    } else {
        priceEl.textContent = '🪙 ' + game.price + ' ZC';
        priceEl.className = 'price paid';
    }
    
    const userId = localStorage.getItem('userId');
    let inLibrary = false;
    let userCoins = 0;
    
    if (userId) {
        const library = JSON.parse(localStorage.getItem('library_' + userId) || '[]');
        inLibrary = library.find(g => g.id === game.id);
        const users = getUsers();
        const user = users.find(u => u.id == userId);
        userCoins = user ? user.zoncoin : 0;
    }
    
    updateGameActions(game, inLibrary, userCoins);
}

function updateGameActions(game, inLibrary, userCoins) {
    const actionsDiv = document.getElementById('gameActions');
    const coinInfo = document.getElementById('coinInfo');
    
    if (!actionsDiv) return;
    
    if (inLibrary) {
        actionsDiv.innerHTML = `
            <a href="${game.download_url || '#'}" target="_blank" class="btn btn-green">▶ Oýna / Ýükle</a>
            <button onclick="removeFromLibrary(${game.id})" class="btn btn-danger">Kitaphanadan aýyr</button>
            <a href="index.html" class="btn btn-outline">← Yza</a>
        `;
        if (coinInfo) coinInfo.innerHTML = '';
    } else if (game.price === 0) {
        actionsDiv.innerHTML = `
            <button onclick="addToLibrary(${game.id})" class="btn btn-primary">🎮 Kitaphana goş</button>
            <a href="${game.download_url || '#'}" target="_blank" class="btn btn-outline">🌐 Resmi sahypa</a>
            <a href="index.html" class="btn btn-outline">← Yza</a>
        `;
        if (coinInfo) coinInfo.innerHTML = '';
    } else {
        const enough = userCoins >= game.price;
        actionsDiv.innerHTML = `
            <button onclick="buyGame(${game.id})" class="btn ${enough ? 'btn-primary' : 'btn-warning'}">
                ${enough ? '🪙 Satyn al (' + game.price + ' ZC)' : '⚠️ ZonCoin ýok'}
            </button>
            <a href="buy.html?game=${game.id}" class="btn btn-outline">🪙 ZonCoin satyn al</a>
            <a href="${game.download_url || '#'}" target="_blank" class="btn btn-outline">🌐 Resmi sahypa</a>
            <a href="index.html" class="btn btn-outline">← Yza</a>
        `;
        
        if (coinInfo) {
            coinInfo.innerHTML = `
                <div class="coin-info">
                    <span class="label">🪙 Siziň balans:</span>
                    <span class="amount">${userCoins} ZC</span>
                    ${!enough ? `<span class="insufficient">(${game.price - userCoins} ZC ýeterlik däl!)</span>` : ''}
                </div>
            `;
        }
    }
}

// ============================================
//  KITAPHANA
// ============================================

function addToLibrary(gameId) {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        showFlash('Iň öň giriň!', 'warning');
        setTimeout(() => window.location.href = 'login.html', 1000);
        return;
    }
    
    const game = getGameById(gameId);
    if (!game) {
        showFlash('Oýun tapylmady!', 'error');
        return;
    }
    
    if (game.price > 0) {
        const users = getUsers();
        const user = users.find(u => u.id == userId);
        
        if (!user) {
            showFlash('Ulanyjy tapylmady!', 'error');
            return;
        }
        
        if (user.zoncoin < game.price) {
            showFlash(`ZonCoin ýeterlik däl! ${game.price} ZC gerek. Balans: ${user.zoncoin} ZC`, 'warning');
            setTimeout(() => {
                window.location.href = `buy.html?game=${gameId}`;
            }, 1500);
            return;
        }
        
        user.zoncoin = user.zoncoin - game.price;
        saveUsers(users);
        localStorage.setItem('zoncoin', user.zoncoin);
        showFlash(`💸 ${game.price} ZonCoin çykaryldy!`, 'info');
    }
    
    let library = JSON.parse(localStorage.getItem('library_' + userId) || '[]');
    
    if (library.find(g => g.id == gameId)) {
        showFlash('Bu oýun eýýäm kitaphanaňyzda bar!', 'info');
        return;
    }
    
    library.push(game);
    localStorage.setItem('library_' + userId, JSON.stringify(library));
    showFlash('Oýun kitaphana goşuldy! ✅', 'success');
    
    if (window.location.pathname.includes('game.html')) {
        setTimeout(() => window.location.reload(), 1000);
    }
}

function removeFromLibrary(gameId) {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        showFlash('Iň öň giriň!', 'warning');
        return;
    }
    
    let library = JSON.parse(localStorage.getItem('library_' + userId) || '[]');
    library = library.filter(g => g.id != gameId);
    localStorage.setItem('library_' + userId, JSON.stringify(library));
    showFlash('Oýun kitaphanadan aýryldy ❌', 'info');
    setTimeout(() => window.location.reload(), 500);
}

function loadLibrary() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        window.location.href = 'login.html';
        return;
    }
    
    const library = JSON.parse(localStorage.getItem('library_' + userId) || '[]');
    const grid = document.getElementById('libraryGrid');
    
    if (!grid) return;
    
    if (library.length === 0) {
        grid.innerHTML = '<div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 40px;"><div class="icon">📭</div><h3>Kitaphana boş</h3><p style="color: #94a9c9;">Dükandan oýun goşuň!</p></div>';
        return;
    }
    
    grid.innerHTML = library.map(game => `
        <div class="game-card">
            <div class="game-img" style="background-image: url('${game.image || 'https://picsum.photos/300/200'}');">
                <span class="badge badge-free">✅ Kitaphana</span>
            </div>
            <div class="info">
                <h3>${game.title}</h3>
                <div class="category">${game.category}</div>
                <div class="price ${game.price === 0 ? 'free' : ''}">
                    ${game.price === 0 ? 'Mugt' : game.price + ' ZC'}
                </div>
                <div style="display: flex; gap: 8px; margin-top: 8px;">
                    <a href="${game.download_url || '#'}" target="_blank" class="btn btn-primary" style="flex: 1; text-align: center; padding: 6px; font-size: 12px;">▶ Oýna</a>
                    <button onclick="removeFromLibrary(${game.id})" class="btn btn-danger" style="flex: 1; padding: 6px; font-size: 12px;">Aýyr</button>
                </div>
            </div>
        </div>
    `).join('');
}

// ============================================
//  ZONCOIN SATYN ALMAK
// ============================================

function buyGame(gameId) {
    const userId = localStorage.getItem('userId');
    if (!userId) {
        showFlash('Iň öň giriň!', 'warning');
        setTimeout(() => window.location.href = 'login.html', 1000);
        return;
    }
    
    const game = getGameById(gameId);
    if (!game) {
        showFlash('Oýun tapylmady!', 'error');
        return;
    }
    
    if (game.price === 0) {
        addToLibrary(gameId);
        return;
    }
    
    const users = getUsers();
    const user = users.find(u => u.id == userId);
    
    if (!user) {
        showFlash('Ulanyjy tapylmady!', 'error');
        return;
    }
    
    if (user.zoncoin < game.price) {
        window.location.href = `buy.html?game=${gameId}`;
        return;
    }
    
    user.zoncoin = user.zoncoin - game.price;
    saveUsers(users);
    localStorage.setItem('zoncoin', user.zoncoin);
    
    let library = JSON.parse(localStorage.getItem('library_' + userId) || '[]');
    if (!library.find(g => g.id == gameId)) {
        library.push(game);
        localStorage.setItem('library_' + userId, JSON.stringify(library));
    }
    
    showFlash(`✅ "${game.title}" satyn aldyňyz! ${game.price} ZC çykaryldy.`, 'success');
    setTimeout(() => window.location.reload(), 1000);
}

// ============================================
//  ADMIN
// ============================================

function loadAdminUsers() {
    const users = getUsers();
    const list = document.getElementById('userList');
    
    if (!list) return;
    
    if (users.length === 0) {
        list.innerHTML = `
            <div class="empty-users">
                <div class="icon">📭</div>
                <p>Hiç ulanyjy ýok</p>
            </div>
        `;
        return;
    }
    
    users.sort((a, b) => (b.zoncoin || 0) - (a.zoncoin || 0));
    
    list.innerHTML = users.map(u => `
        <div class="user-item">
            <span class="username">👤 ${u.username}</span>
            <div>
                <span class="coins">🪙 ${u.zoncoin || 0} ZC</span>
                <button onclick="adminRemoveUser('${u.username}')" style="background: none; border: none; color: #ef4444; cursor: pointer; margin-left: 8px; font-size: 14px;">🗑️</button>
            </div>
        </div>
    `).join('');
    
    updateAdminStats(users);
}

function updateAdminStats(users) {
    const total = users.length;
    const totalCoins = users.reduce((sum, u) => sum + (u.zoncoin || 0), 0);
    const maxCoins = users.length > 0 ? Math.max(...users.map(u => u.zoncoin || 0)) : 0;
    
    const totalUsersEl = document.getElementById('totalUsers');
    const totalCoinsEl = document.getElementById('totalCoins');
    const maxCoinsEl = document.getElementById('maxCoins');
    
    if (totalUsersEl) totalUsersEl.textContent = total;
    if (totalCoinsEl) totalCoinsEl.textContent = totalCoins;
    if (maxCoinsEl) maxCoinsEl.textContent = maxCoins;
}

function adminAddZoncoin(username, amount) {
    const users = getUsers();
    const userIndex = users.findIndex(u => u.username === username);
    
    if (userIndex === -1) {
        alert(`❌ "${username}" ulanyjysy tapylmady!`);
        return false;
    }
    
    users[userIndex].zoncoin = (users[userIndex].zoncoin || 0) + amount;
    saveUsers(users);
    
    const currentUser = localStorage.getItem('username');
    if (currentUser === username) {
        localStorage.setItem('zoncoin', users[userIndex].zoncoin);
    }
    
    return true;
}

function adminAddCoinsToAll(amount) {
    if (!confirm(`Ähli ulanyjylara ${amount} ZonCoin goşmak isleýärsiňizmi?`)) return;
    
    let users = getUsers();
    users = users.map(u => ({
        ...u,
        zoncoin: (u.zoncoin || 0) + amount
    }));
    saveUsers(users);
    
    const currentUser = localStorage.getItem('username');
    if (currentUser) {
        const user = users.find(u => u.username === currentUser);
        if (user) localStorage.setItem('zoncoin', user.zoncoin);
    }
    
    alert(`✅ Ähli ulanyjylara ${amount} ZonCoin goşuldy!`);
    loadAdminUsers();
}

function adminResetAllCoins() {
    if (!confirm('Ähli ulanyjylaryň ZonCoin-i 0 etmek isleýärsiňizmi?')) return;
    
    let users = getUsers();
    users = users.map(u => ({
        ...u,
        zoncoin: 0
    }));
    saveUsers(users);
    
    const currentUser = localStorage.getItem('username');
    if (currentUser) localStorage.setItem('zoncoin', '0');
    
    alert('✅ Ähli ZonCoin-ler 0 edildi!');
    loadAdminUsers();
}

function adminRemoveUser(username) {
    if (!confirm(`"${username}" ulanyjysyny pozmak isleýärsiňizmi?`)) return;
    
    let users = getUsers();
    users = users.filter(u => u.username !== username);
    saveUsers(users);
    
    const currentUser = localStorage.getItem('username');
    if (currentUser === username) {
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        localStorage.removeItem('zoncoin');
        window.location.href = 'login.html';
        return;
    }
    
    alert(`✅ "${username}" ulanyjysy pozuldy!`);
    loadAdminUsers();
}

function adminChangePassword(oldPassword, newPassword, confirmPassword) {
    if (newPassword.length < 4) {
        alert('❌ Täze parol 4 harpdan uzyn bolmaly!');
        return false;
    }
    
    if (newPassword !== confirmPassword) {
        alert('❌ Parollar gabat gelmeýär!');
        return false;
    }
    
    const users = getUsers();
    const adminIndex = users.findIndex(u => u.username === 'admin');
    
    if (adminIndex === -1) {
        alert('❌ Admin ulanyjysy tapylmady!');
        return false;
    }
    
    if (users[adminIndex].password !== oldPassword) {
        alert('❌ Häzirki parol ýalňyş!');
        return false;
    }
    
    users[adminIndex].password = newPassword;
    saveUsers(users);
    
    alert(`✅ Admin paroly üýtgedildi!\n🔑 Täze parol: ${newPassword}`);
    return true;
}

// ============================================
//  FLASH HABARLAR
// ============================================

function showFlash(message, type = 'info') {
    const existing = document.querySelector('.flash');
    if (existing) existing.remove();
    
    const flash = document.createElement('div');
    flash.className = 'flash ' + type;
    flash.textContent = message;
    
    const container = document.querySelector('.container');
    if (container) {
        container.insertBefore(flash, container.firstChild);
    } else {
        document.body.insertBefore(flash, document.body.firstChild);
    }
    
    setTimeout(() => flash.remove(), 4000);
}

// ============================================
//  SAHYPA ÝÜKLENENDE
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    checkUser();
    displayGames(allGames);
    
    const path = window.location.pathname;
    
    // === LOGIN.HTML ===
    if (path.includes('login.html')) {
        const form = document.querySelector('form');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;
                login(username, password);
            });
        }
    }
    
    // === REGISTER.HTML ===
    if (path.includes('register.html')) {
        const form = document.querySelector('form');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;
                register(username, password);
            });
        }
    }
    
    // === LIBRARY.HTML ===
    if (path.includes('library.html')) {
        loadLibrary();
    }
    
    // === PROFILE.HTML ===
    if (path.includes('profile.html')) {
        loadProfile();
    }
    
    // === GAME.HTML ===
    if (path.includes('game.html')) {
        const params = new URLSearchParams(window.location.search);
        const gameId = parseInt(params.get('id'));
        if (gameId) {
            displayGameDetail(gameId);
        } else {
            document.getElementById('gameTitleDisplay').textContent = 'Oýun saýlanmady!';
            document.getElementById('gameImage').src = 'https://picsum.photos/600/350';
            document.getElementById('gameDescription').textContent = 'Oýun görkezmek üçin ID gerek.';
            document.getElementById('gamePrice').textContent = '❌';
        }
    }
    
    // === ADMIN.HTML ===
    if (path.includes('admin.html')) {
        const username = localStorage.getItem('username');
        const adminContent = document.getElementById('adminContent');
        const accessDenied = document.getElementById('accessDenied');
        
        if (username !== 'admin') {
            if (adminContent) adminContent.style.display = 'none';
            if (accessDenied) accessDenied.style.display = 'block';
        } else {
            if (adminContent) adminContent.style.display = 'block';
            if (accessDenied) accessDenied.style.display = 'none';
            loadAdminUsers();
            
            const zoncoinForm = document.getElementById('zoncoinForm');
            if (zoncoinForm) {
                zoncoinForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    const username = document.getElementById('usernameInput').value.trim();
                    const amount = parseInt(document.getElementById('amountInput').value);
                    
                    if (!username || !amount || amount < 1) {
                        alert('Dogry maglumat giriziň!');
                        return;
                    }
                    
                    if (adminAddZoncoin(username, amount)) {
                        const users = getUsers();
                        const user = users.find(u => u.username === username);
                        alert(`✅ ${username} ulanyjysyna ${amount} ZonCoin goşuldy!\n🪙 Täze balans: ${user.zoncoin} ZC`);
                        document.getElementById('usernameInput').value = '';
                        document.getElementById('amountInput').value = '';
                        loadAdminUsers();
                    }
                });
            }
            
            const passwordForm = document.getElementById('passwordForm');
            if (passwordForm) {
                passwordForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    const oldPassword = document.getElementById('oldPassword').value.trim();
                    const newPassword = document.getElementById('newPassword').value.trim();
                    const confirmPassword = document.getElementById('confirmPassword').value.trim();
                    
                    if (adminChangePassword(oldPassword, newPassword, confirmPassword)) {
                        document.getElementById('oldPassword').value = '';
                        document.getElementById('newPassword').value = '';
                        document.getElementById('confirmPassword').value = '';
                    }
                });
            }
        }
    }
});