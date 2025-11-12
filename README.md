# 🇯🇵 Pelatih Kana Jepang v9

Aplikasi web interaktif untuk belajar Hiragana & Katakana dengan fitur AI, speech recognition, dan spaced repetition system.

## ✨ Fitur Utama

### 📚 Mode Pembelajaran
- **Latihan Kana** - Pilih rentang huruf & dengar pelafalan
- **Flashcard** - Kartu belajar interaktif dengan AI
- **Tabel Referensi** - Tabel lengkap Hiragana & Katakana
- **Kosakata & Ungkapan** - Belajar kata & frasa umum

### 🎯 Mode Tes
- **Multiple Choice** - Pilih jawaban A-D
- **Typing Mode** - Ketik jawaban langsung
- **Listening Quiz** - Dengar & jawab
- **Challenge Mode** - Tes dengan countdown timer
- **Custom Sets** - Buat set latihan sendiri

### 🤖 Fitur AI (Powered by Gemini)
- Verifikasi pelafalan real-time
- Contoh kalimat dinamis
- Feedback personal

### ⚙️ Fitur Tambahan
- **Pomodoro Timer** - Fokus belajar dengan teknik Pomodoro
- **SRS (Spaced Repetition)** - Review otomatis huruf yang sulit
- **Progress Tracking** - Simpan progres belajar kamu
- **Lite Mode** - Mode ringan untuk device lemah
- **Dark Mode** - Tema high contrast untuk mata nyaman

## 🚀 Quick Start

### 1. Setup API Key (Opsional - untuk fitur AI)

```bash
# 1. Copy config example
cp config.example.js config.js

# 2. Edit config.js dan ganti API key
# Dapatkan API key gratis di: https://makersuite.google.com/app/apikey
```

### 2. Buka di Browser

```bash
# Cara 1: Buka langsung file HTML
# Double-click index.html

# Cara 2: Gunakan local server (recommended)
# Dengan Python 3:
python -m http.server 8000

# Dengan Node.js:
npx http-server

# Lalu buka: http://localhost:8000
```

### 3. Mulai Belajar! 🎉

Pilih menu dari sidebar:
- 📘 **Latihan** - Untuk memulai
- 🗂️ **Flashcard** - Untuk review
- 🧠 **Tebak Arti** - Untuk tes pemahaman

## 📱 Kompatibilitas

### Browser Support
- ✅ Chrome 90+ (Recommended)
- ✅ Edge 90+
- ✅ Safari 14+
- ⚠️ Firefox (Speech Recognition tidak support)

### Device Support
- ✅ Desktop (Windows, Mac, Linux)
- ✅ Mobile (Android 8+, iOS 14+)
- ✅ Tablet

## 🛠️ Teknologi

- **Frontend:** Vanilla JavaScript, HTML5, CSS3
- **AI:** Google Gemini API
- **Speech:** Web Speech API
- **Storage:** LocalStorage
- **Icons:** Font Awesome 6
- **Fonts:** Inter, Noto Sans JP

## 📂 Struktur File

```
belajar-jepang/
├── index.html          # Halaman latihan utama
├── index2.html         # Flashcard
├── index3.html         # Tabel kana
├── index4.html         # Kosakata
├── index5.html         # Ungkapan
├── index6.html         # Menulis
├── index7.html         # Tebak arti
├── index8.html         # Pelatih membaca
├── config.js           # Konfigurasi (tidak di-commit)
├── config.example.js   # Template config
├── .gitignore          # Git ignore rules
├── CHANGELOG_BUGFIX.md # Bug fixes log
└── README.md           # File ini
```

## 🐛 Bug Fixes

Lihat [CHANGELOG_BUGFIX.md](CHANGELOG_BUGFIX.md) untuk daftar lengkap bug yang sudah diperbaiki.

### Recent Fixes (2025-11-12)
- ✅ Security: API key tidak lagi exposed
- ✅ Race condition di AI fetch
- ✅ Division by zero di progress bar
- ✅ Speech recognition timeout terlalu lama
- ✅ Debouncing untuk search input

## 🔒 Security Notes

⚠️ **PENTING:** Jangan commit `config.js` dengan API key asli!

Untuk production:
1. Gunakan environment variables
2. Buat backend/serverless function sebagai proxy
3. Implementasi rate limiting
4. Tambahkan authentication

## 📈 Performance Tips

- Aktifkan **Lite Mode** di device lemah (RAM < 4GB)
- Gunakan Chrome untuk performa terbaik
- Clear cache jika app terasa lambat
- Export & backup progres secara berkala

## 🤝 Contributing

Menemukan bug? Punya ide fitur baru?

1. Fork repository ini
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📝 License

MIT License - Bebas digunakan untuk belajar & personal project.

## 💖 Credits

- **Developer:** Alfan
- **AI Assistant:** Claude (Anthropic)
- **API:** Google Gemini
- **Fonts:** Google Fonts
- **Icons:** Font Awesome

## 📞 Support

Butuh bantuan? 
- 📧 Email: [email-kamu]
- 🐛 Issues: [GitHub Issues]
- 💬 Diskusi: [Forum/Chat]

---

**Selamat Belajar! がんばって！(Ganbatte!)** 🎌

Made with ❤️ for Japanese learners
