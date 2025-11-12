# 🐛 Bug Fixes Changelog - Belajar Jepang App

## Tanggal: 2025-11-12

### ✅ Bug yang Diperbaiki:

#### 1. **Security Fix - API Key Exposure (CRITICAL)** 
**File:** `index2.html` line 414  
**Sebelum:**
```javascript
const GEMINI_API_KEY = "AIzaSyCZVyGLZrlJW-bQFSYfIgVgWhVWQ6icaeE";
```
**Sesudah:**
```javascript
const GEMINI_API_KEY = "GANTI_DENGAN_API_KEY_KAMU"; // ⚠️ JANGAN COMMIT KEY ASLI!
```
**Keterangan:** API key tidak boleh di-expose di client-side. Untuk production gunakan backend/serverless function.

---

#### 2. **Race Condition Fix - fetchAIExamples**
**File:** `index2.html` line 723-820  
**Masalah:** Flag `isFetchingExamples` tidak di-reset jika error terjadi sebelum finally block  
**Fix:** Tambahkan `try-finally` untuk memastikan flag selalu direset
```javascript
try {
    // ... async operations
} catch (error) {
    // ... error handling
} finally {
    // BUG FIX: Pastikan flag selalu direset
    isFetchingExamples = false;
}
```

---

#### 3. **UX Improvement - Speech Recognition Timeout**
**File:** `index2.html` line 543  
**Sebelum:** Timeout 15 detik (terlalu lama)  
**Sesudah:** Timeout 8 detik (lebih responsif)
```javascript
// BUG FIX: Kurangi timeout dari 15 detik jadi 8 detik untuk UX lebih baik
}, 8000); // Lebih responsif untuk user experience
```

---

#### 4. **Logic Fix - Shuffle Deck Duplicate Cards**
**File:** `index2.html` line 920-930  
**Masalah:** Kartu yang salah berkali-kali bisa mendominasi deck  
**Fix:** Cap maksimal duplikasi jadi 3x
```javascript
// BUG FIX: Cap maksimal duplikasi untuk mencegah deck didominasi 1 kartu
const MAX_DUPLICATES = 3;
const timesToAdd = Math.min(incorrectCards.get(identifier), MAX_DUPLICATES);
```

---

#### 5. **Division by Zero Fix**
**File:** `index.html` line 3058-3064  
**Masalah:** Jika `state.test.target` = 0, akan menghasilkan `Infinity`  
**Fix:** Tambahkan default value dan cap maksimal 100%
```javascript
// BUG FIX: Prevent division by zero
const target = state.test.target || 1; // Default to 1
const pct = (state.test.total / target) * 100;
if (bar) bar.style.width = Math.min(100, pct) + '%'; // Cap at 100%
```

---

#### 6. **Performance Fix - Search Input Debouncing**
**File:** `index.html` line 4514  
**Masalah:** Re-render terjadi setiap keystroke, bisa lag di device lemah  
**Fix:** Tambahkan debouncing 300ms
```javascript
// BUG FIX: Tambahkan debouncing untuk search input
let searchDebounceTimer;
function debouncedRenderCustomSetGrid() {
    clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(() => {
        renderCustomSetGrid();
    }, 300); // 300ms delay
}
```

---

### 🔜 Bug yang Belum Diperbaiki (Need Attention):

#### 7. **Memory Leak - Event Listener Accumulation**
**File:** `index.html`  
**Lokasi:** Fungsi `bind()` dan `renderAll()`  
**Issue:** Event listener menumpuk saat `renderAll()` dipanggil berulang  
**TODO:** Tambahkan cleanup mechanism atau gunakan event delegation

#### 8. **Missing type="button" Attributes**
**File:** `index3.html`, `index2.html`  
**Issue:** Beberapa button tidak punya explicit `type="button"`  
**TODO:** Tambahkan `type="button"` ke semua button yang bukan submit button

#### 9. **Browser Compatibility Warning**
**File:** `index2.html`  
**Issue:** Web Speech API tidak support di Firefox & Safari iOS  
**TODO:** Tambahkan warning/fallback yang lebih jelas untuk browser yang tidak support

---

## 📝 Catatan Tambahan:

### Recommendation untuk Production:
1. **Pisahkan CSS & JS ke file terpisah** - File index.html terlalu besar (4700+ baris)
2. **Implementasi Backend API Proxy** - Untuk menyembunyikan API key
3. **Tambahkan Service Worker** - Untuk offline capability
4. **Implementasi Error Boundary** - Untuk menangkap error global
5. **Add Unit Tests** - Untuk mencegah regression bugs

### Performance Tips:
- Gunakan `requestAnimationFrame` untuk animasi
- Lazy load komponen yang tidak langsung digunakan
- Implementasi virtual scrolling untuk list panjang
- Compress gambar dan assets

---

**Last Updated:** 2025-11-12  
**Fixed By:** AI Assistant  
**Tested:** ✅ Local testing passed
