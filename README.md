# 💌 Dijital Davetiye Atelyesi — Admin Kılavuzu

> Tüm haklarınız saklıdır. Bu sistem size özel olarak kurulmuştur.

---

## 📁 Klasör Yapısı

```
dijital_davetiye/
├── index.html              ← Ana mağaza sayfanız
├── assets/
│   ├── css/main.css        ← Ana stiller
│   ├── js/security.js      ← Güvenlik katmanı
│   ├── js/main.js          ← Ana sayfa JS
│   └── images/             ← Ana sayfa görselleri
├── sablon-1/               ← Minimalist Gold şablonu
│   ├── index.html
│   └── images/
├── sablon-2/               ← Çiçekli Romantik şablonu
│   ├── index.html
│   └── images/
├── sablon-3/               ← Modern Karanlık şablonu
│   ├── index.html
│   └── images/
└── README.md               ← Bu dosya
```

---

## 🚀 GitHub Pages'e Yükleme

1. GitHub'da `dijital-davetiye` adında yeni bir repo oluşturun
2. Bu klasördeki tüm dosyaları repoya yükleyin
3. Repo → **Settings** → **Pages** → **Source: main branch / root**
4. Siteniz `https://kullanici-adi.github.io/dijital-davetiye/` adresinde yayında!

---

## 💍 Davetiye Satışı: Adım Adım

### 1. Şablonu Kopyalayın

Müşteriniz hangi şablonu istediyse, o klasörü kopyalayın:

```
sablon-1/ → kopyala → ayse-fatma/
sablon-2/ → kopyala → caner-merve/
sablon-3/ → kopyala → elif-kerem/
```

### 2. Düzenlenecek Alanları Bulun

Her şablonun `index.html` dosyasında `<!-- DÜZENLE -->` yorumları var:

| Yorum | Ne değiştirilecek |
|---|---|
| `<!-- DÜZENLE: İsim 1 -->` | Gelinin/damadın adı |
| `<!-- DÜZENLE: İsim 2 -->` | Diğer kişinin adı |
| `<!-- DÜZENLE: Tarih -->` | Düğün tarihi (metin) |
| `<!-- DÜZENLE: Harita linki -->` | Google Maps URL'si |
| `<!-- DÜZENLE: Müzik linki -->` | MP3 dosyası veya URL |
| `WEDDING_DATE = new Date(...)` | Geri sayım tarihi (JS formatı) |

### 3. Geri Sayım Tarihini Güncelleyin

Her şablonun JS bölümünde bu satırı bulun ve değiştirin:

```javascript
// Şablon 1 için:
const WEDDING_DATE = new Date('2025-08-15T19:00:00');
//                              YYYY-AA-GG SS:DD:SS

// Örnek — 20 Eylül 2025, saat 20:00:
const WEDDING_DATE = new Date('2025-09-20T20:00:00');
```

### 4. Fotoğrafları Ekleyin

Müşterinin fotoğraflarını şu konumlara kaydedin:

```
ayse-fatma/images/slide1.jpg   ← 1. fotoğraf
ayse-fatma/images/slide2.jpg   ← 2. fotoğraf
```

> 💡 **İpucu:** Daha fazla fotoğraf eklemek için `index.html`'de `slider-track` div'ine yeni `slider-slide` blokları ekleyip `slider-dots`'a da yeni buton ekleyin.

### 5. Harita Linkini Oluşturun

1. Google Maps'te mekanı bulun
2. "Paylaş" → "Haritayı göm" yerine adres çubuğundaki URL'yi kopyalayın
3. Veya şu formatı kullanın:
   ```
   https://maps.google.com/?q=Mekan+Adı+Şehir
   ```
4. Boşluklar yerine `+` koyun

### 6. Müzik Dosyası Ekleyin

**Seçenek A — Kendi MP3'ünüzü ekleyin:**
```html
<source src="music.mp3" type="audio/mpeg" />
```
`music.mp3` dosyasını müşterinin klasörüne (ör. `ayse-fatma/`) koyun.

**Seçenek B — Harici link kullanın:**
```html
<source src="https://example.com/muzik.mp3" type="audio/mpeg" />
```

### 7. GitHub'a Yükleyin

```bash
git add .
git commit -m "Ayşe & Fatma davetiyesi eklendi"
git push
```

Davetiye linki: `https://kullanici-adi.github.io/dijital-davetiye/ayse-fatma/`

---

## 📲 Telegram Linki Şablonu

"Fiyat Al" butonu otomatik olarak şablon adını mesaj olarak Telegram'a gönderir.

El ile link oluşturmak için:
```
https://t.me/sinankeeeee?text=Merhaba!%20[ŞABLON_ADI]%20şablonu%20hakkında%20fiyat%20almak%20istiyorum.
```

---

## 🛡️ Güvenlik Özellikleri

| Özellik | Durum |
|---|---|
| Sağ tık engeli | ✅ Aktif |
| F12 (DevTools) engeli | ✅ Aktif |
| Ctrl+U (Kaynağı gör) | ✅ Aktif |
| Ctrl+Shift+I (Inspect) | ✅ Aktif |
| Ctrl+S (Kaydet) | ✅ Aktif |
| Görsel sürükleme engeli | ✅ Aktif |
| Metin seçme engeli | ✅ Aktif |
| DevTools açık tespiti | ✅ Aktif (içerik gizlenir) |
| Sekme değişince blur | ✅ Aktif (15px blur) |
| Fare çıkınca blur | ✅ Aktif |
| Console engeli | ✅ Aktif |

---

## 💡 İpuçları

- **Özel domain**: GitHub Pages'e özel domain bağlayabilirsiniz (ücretsiz SSL dahil).
- **Şablon kopyası**: Müşteri için kopyaladığınız klasörü asla `sablon-X` ile başlatmayın. Özel bir isim kullanın (`ayse-fatma`, `caner-merve` gibi).
- **Önizleme**: Ana sayfadaki "Önizleme" butonu şablonları iframe içinde gösterir; müşterilere doğrudan şablon linkini vermeden önce böyle gösterebilirsiniz.

---

## 📞 Destek

Telegram: [@sinankeeeee](https://t.me/sinankeeeee)
