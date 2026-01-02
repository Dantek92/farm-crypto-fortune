from telegram import WebAppInfo, InlineKeyboardButton, InlineKeyboardMarkup

# URL della tua Web App (da GitHub Pages o Vercel)
WEB_APP_URL = "https://Dantek92.github.io/farm-crypto-fortune/"

async def start_farm(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Avvia la Web App Farm Crypto Fortune"""
    keyboard = [
        [InlineKeyboardButton(
            "🎮 Gioca a Farm Crypto Fortune", 
            web_app=WebAppInfo(url=WEB_APP_URL)
        )]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    msg = (
        "🌾 <b>Farm Crypto Fortune</b> 💎\n\n"
        "Coltiva piante, guadagna TON e sblocca funzioni premium!\n\n"
        "• Registrazione gratuita\n"
        "• Terreno personale\n"
        "• Donazioni TON volontarie\n\n"
        "⚠️ <i>Apri la Web App per iniziare!</i>"
    )
    await update.message.reply_text(msg, reply_markup=reply_markup, parse_mode="HTML")

# Registra il comando
app.add_handler(CommandHandler("farm", start_farm))
