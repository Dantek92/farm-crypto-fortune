// auth.js
class AuthManager {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        // Carica utente salvato
        const savedUser = localStorage.getItem('fcf_user');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.showMainScreen();
        } else {
            this.showAuthScreen();
        }

        // Eventi autenticazione
        document.getElementById('loginTab').addEventListener('click', () => this.switchTab('login'));
        document.getElementById('registerTab').addEventListener('click', () => this.switchTab('register'));
        document.getElementById('authForm').addEventListener('submit', (e) => this.handleAuth(e));
        document.getElementById('guestLogin').addEventListener('click', () => this.loginAsGuest());
        document.getElementById('logoutBtn').addEventListener('click', () => this.logout());
        
        // Eventi donazioni
        document.getElementById('copyAddress').addEventListener('click', () => this.copyAddress());
        document.getElementById('confirmDonation').addEventListener('click', () => this.confirmDonation());
    }

    switchTab(type) {
        document.getElementById('loginTab').classList.toggle('active', type === 'login');
        document.getElementById('registerTab').classList.toggle('active', type === 'register');
        
        const passwordFields = document.getElementById('passwordFields');
        if (type === 'login') {
            passwordFields.style.display = 'block';
            document.getElementById('confirmPassword').removeAttribute('required');
            document.getElementById('authSubmit').textContent = 'Accedi';
        } else {
            passwordFields.style.display = 'block';
            document.getElementById('confirmPassword').setAttribute('required', 'required');
            document.getElementById('authSubmit').textContent = 'Registrati';
        }
    }

    async handleAuth(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const isLogin = document.getElementById('loginTab').classList.contains('active');

        if (!isLogin && password !== confirmPassword) {
            alert('Le password non corrispondono!');
            return;
        }

        try {
            if (isLogin) {
                await this.login(username, password);
            } else {
                await this.register(username, password);
            }
        } catch (error) {
            alert(error.message);
        }
    }

    async register(username, password) {
        // Simula registrazione (in realtà salva localmente)
        const users = JSON.parse(localStorage.getItem('fcf_users') || '{}');
        
        if (users[username]) {
            throw new Error('Username già esistente!');
        }

        // Hash semplice (per demo - in produzione usa bcrypt)
        const user = {
            username,
            passwordHash: this.simpleHash(password),
            displayName: username,
            createdAt: new Date().toISOString()
        };

        users[username] = user;
        localStorage.setItem('fcf_users', JSON.stringify(users));
        
        this.currentUser = user;
        localStorage.setItem('fcf_user', JSON.stringify(user));
        this.showMainScreen();
    }

    async login(username, password) {
        const users = JSON.parse(localStorage.getItem('fcf_users') || '{}');
        const user = users[username];

        if (!user || user.passwordHash !== this.simpleHash(password)) {
            throw new Error('Username o password errati!');
        }

        this.currentUser = user;
        localStorage.setItem('fcf_user', JSON.stringify(user));
        this.showMainScreen();
    }

    loginAsGuest() {
        const guestUser = {
            username: 'guest_' + Date.now(),
            displayName: 'Ospite',
            isGuest: true
        };
        this.currentUser = guestUser;
        localStorage.setItem('fcf_user', JSON.stringify(guestUser));
        this.showMainScreen();
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('fcf_user');
        this.showAuthScreen();
    }

    showAuthScreen() {
        document.getElementById('authScreen').classList.remove('hidden');
        document.getElementById('mainScreen').classList.add('hidden');
    }

    showMainScreen() {
        document.getElementById('authScreen').classList.add('hidden');
        document.getElementById('mainScreen').classList.remove('hidden');
        document.getElementById('displayName').textContent = this.currentUser.displayName;
    }

    simpleHash(str) {
        // Hash semplice per demo (NON sicuro per produzione)
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Converti a 32bit integer
        }
        return hash.toString();
    }

    copyAddress() {
        const address = document.getElementById('tonAddress').textContent;
        navigator.clipboard.writeText(address).then(() => {
            alert('Indirizzo copiato!');
        });
    }

    confirmDonation() {
        if (window.Telegram?.WebApp) {
            window.Telegram.WebApp.sendData(JSON.stringify({
                action: 'donation_confirmed',
                userId: this.currentUser.username
            }));
            alert('✅ Richiesta inviata! Controlla Telegram.');
        } else {
            alert('Apri questa Web App da Telegram per confermare la donazione.');
        }
    }
}

// Avvia il sistema di autenticazione
const authManager = new AuthManager();
window.authManager = authManager;
