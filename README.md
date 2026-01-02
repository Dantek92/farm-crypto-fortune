# 🌾 Farm Crypto Fortune

![Farm Crypto Fortune Banner](https://via.placeholder.com/800x200/1a2a6c/ffffff?text=Farm+Crypto+Fortune+-+Gioco+3D+con+TON)
> **Coltiva, raccogli e guadagna TON reali** in un'esperienza di gioco 3D integrata direttamente in Telegram.

Farm Crypto Fortune è un **gioco Web3 innovativo** che unisce l'OSINT, la coltivazione virtuale e le criptovalute. Gioca direttamente da Telegram, coltiva piante OSINT, guadagna TON e supporta lo sviluppo con donazioni volontarie.

---

## ✨ Caratteristiche Principali

- 🎮 **Gioco 3D interattivo** con Three.js
- 🔐 **Autenticazione sicura** con Firebase (email/password)
- 💎 **Guadagno TON reale** tramite donazioni volontarie
- 🌱 **Sistema di coltivazione** con 4 tipi di piante:
  - **Piantina** (30s) → 0.1 TON
  - **Patata** (60s) → 0.25 TON
  - **Grano** (90s) → 0.5 TON
  - **Pannocchia** (120s) → 1.0 TON
- 🚀 **Funzioni premium** sbloccabili:
  - Espansione slot (2 TON)
  - Crescita veloce (1 TON)
  - Raccolto bonus (3 TON)
- 📱 **Integrazione Telegram WebApp** - gioca senza uscire da Telegram
- 🔁 **Recupero password reale** via email
- 🌐 **Mobile-first** - perfetto su smartphone

---

## 🚀 Come Giocare

1. **Apri la chat con il bot Telegram**: [@FarmCryptoFortuneBot](https://t.me/FarmCryptoFortuneBot)
2. **Invia il comando**: `/farm`
3. **Clicca "Gioca a Farm Crypto Fortune"**
4. **Registrati o accedi** con la tua email
5. **Inizia a coltivare** e guadagna TON!

> 💡 **Non hai un wallet TON?** Scarica [Tonkeeper](https://tonkeeper.com/) o [MyTonWallet](https://mytonwallet.app/)

---

## 🛠️ Tecnologie Utilizzate

| Categoria | Tecnologia |
|----------|------------|
| **Frontend** | Three.js, Vite, HTML5, CSS3 |
| **Autenticazione** | Firebase Authentication |
| **Database** | Firestore (dati utente) |
| **Hosting** | GitHub Pages |
| **Integrazione** | Telegram WebApp API |
| **Stile** | Glassmorphism, Animazioni CSS |

---

## 📦 Struttura del Progetto
farm-crypto-fortune/
├── index.html          # Pagina principale
├── main.js             # Logica Three.js e gioco
├── auth.js             # Sistema autenticazione Firebase
├── style.css           # Stili avanzati
├── firebase-config.js  # Configurazione Firebase
├── .github/workflows/  # GitHub Actions per deploy
│   └── deploy.yml
├── package.json        # Dipendenze npm
└── README.md           # Questo file

---

## 🚀 Installazione per Sviluppatori

### Prerequisiti
- [Node.js](https://nodejs.org/) v18+
- Account [GitHub](https://github.com)
- Progetto [Firebase](https://console.firebase.google.com/)

### Passaggi

1. **Clona il repository**
   ```bash
   git clone https://github.com/Dantek92/farm-crypto-fortune.git
   cd farm-crypto-fortune

   Installa le dipendenze
   npm install
Pubblica su GitHub Pages
npm run build
git add .
git commit -m "Deploy"
git push
⚠️ Disclaimer Legale

    Farm Crypto Fortune non vende beni o servizi. Le donazioni in TON sono volontarie e non garantiscono alcun diritto. Non siamo un servizio finanziario autorizzato. Le funzioni premium sono offerte come ringraziamento per il supporto allo sviluppo.

📜 Licenza

Questo progetto è distribuito sotto licenza MIT.
Vedi il file LICENSE
 per dettagli.
🙌 Contribuisci

I contributi sono benvenuti! Per favore:

    Forka il repository
    Crea un nuovo branch (git checkout -b feature/AmazingFeature)
    Commita le tue modifiche (git commit -m 'Add some AmazingFeature')
    Pusha il branch (git push origin feature/AmazingFeature)
    Apri una Pull Request

    📞 Supporto

Hai domande o problemi?
Contatta lo sviluppatore: @doctorplague92

    🌱 Coltiva il futuro, un seme TON alla volta.
   
