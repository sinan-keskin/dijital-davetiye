/**
 * ╔══════════════════════════════════════════════╗
 * ║     DİJİTAL DAVETİYE — GÜVENLİK KALKANI    ║
 * ║        security.js  |  v1.0                 ║
 * ╚══════════════════════════════════════════════╝
 * Sağ tık, F12, Ctrl+U, DevTools tespiti,
 * sekme değişimi blur koruması dahildir.
 */

(function () {
  'use strict';

  /* ─── 1. KORUMA MESAJI OVERLAY ─── */
  function showProtectionOverlay(message) {
    const existing = document.getElementById('__security_overlay__');
    if (existing) return;

    const overlay = document.createElement('div');
    overlay.id = '__security_overlay__';
    overlay.style.cssText = `
      position: fixed; inset: 0; z-index: 2147483647;
      background: linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 100%);
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      font-family: 'Outfit', sans-serif; color: #fff;
      animation: fadeInOverlay 0.3s ease;
    `;

    overlay.innerHTML = `
      <style>
        @keyframes fadeInOverlay { from { opacity: 0; } to { opacity: 1; } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.6; } }
        #__security_overlay__ .shield { font-size: 80px; animation: pulse 2s infinite; }
        #__security_overlay__ h2 { font-size: 1.8rem; margin: 20px 0 10px; color: #c9a84c; }
        #__security_overlay__ p { color: #aaa; font-size: 1rem; max-width: 400px; text-align: center; line-height: 1.7; }
        #__security_overlay__ .btn {
          margin-top: 30px; padding: 12px 32px; border: none;
          background: linear-gradient(135deg, #c9a84c, #f0d080);
          color: #0a0a1a; font-size: 1rem; font-weight: 700;
          border-radius: 50px; cursor: pointer; transition: all 0.3s;
        }
        #__security_overlay__ .btn:hover { transform: scale(1.05); box-shadow: 0 0 20px rgba(201,168,76,0.5); }
      </style>
      <div class="shield">🛡️</div>
      <h2>Bu İçerik Korumalıdır</h2>
      <p>${message || 'Dijital davetiye şablonlarımız telif hakkı ile korunmaktadır. Lütfen sayfayı normal şekilde kullanınız.'}</p>
      <button class="btn" onclick="window.location.reload()">Sayfayı Yenile</button>
    `;

    document.body.appendChild(overlay);
  }

  /* ─── 2. SAĞ TIK ENGELİ ─── */
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    return false;
  }, true);

  /* ─── 3. KLAVYE KISAYOL ENGELİ ─── */
  document.addEventListener('keydown', function (e) {
    const key = e.key || e.keyCode;

    // F12
    if (e.keyCode === 123) { e.preventDefault(); return false; }

    // Ctrl+U (Kaynağı gör)
    if (e.ctrlKey && (key === 'u' || key === 'U' || e.keyCode === 85)) {
      e.preventDefault(); return false;
    }

    // Ctrl+Shift+I (Inspect)
    if (e.ctrlKey && e.shiftKey && (key === 'i' || key === 'I' || e.keyCode === 73)) {
      e.preventDefault(); return false;
    }

    // Ctrl+Shift+J (Console)
    if (e.ctrlKey && e.shiftKey && (key === 'j' || key === 'J' || e.keyCode === 74)) {
      e.preventDefault(); return false;
    }

    // Ctrl+Shift+C (Element seç)
    if (e.ctrlKey && e.shiftKey && (key === 'c' || key === 'C' || e.keyCode === 67)) {
      e.preventDefault(); return false;
    }

    // Ctrl+S (Kaydet)
    if (e.ctrlKey && (key === 's' || key === 'S' || e.keyCode === 83)) {
      e.preventDefault(); return false;
    }

    // Ctrl+A (Tümünü seç)
    if (e.ctrlKey && (key === 'a' || key === 'A' || e.keyCode === 65)) {
      e.preventDefault(); return false;
    }

    // Ctrl+P (Yazdır)
    if (e.ctrlKey && (key === 'p' || key === 'P' || e.keyCode === 80)) {
      e.preventDefault(); return false;
    }
  }, true);

  /* ─── 4. SEÇİM ENGELİ ─── */
  document.addEventListener('selectstart', function (e) {
    e.preventDefault(); return false;
  });
  document.addEventListener('dragstart', function (e) {
    e.preventDefault(); return false;
  });
  document.addEventListener('copy', function (e) {
    e.preventDefault(); return false;
  });

  /* ─── 5. DEVTOOLS TESPİTİ ─── */
  // iframe içinde çalışıyorsak (önizleme modu) boyut tespitini devre dışı bırak.
  // outerWidth/outerHeight iframe içinde ana pencerenin boyutunu döndürür,
  // bu da küçük iframe viewport'uyla kıyaslandığında yanlış pozitif üretir.
  const IS_IN_IFRAME = (function () {
    try { return window.self !== window.top; } catch (e) { return true; }
  })();

  let devToolsOpen = false;

  function detectDevTools() {
    // iframe içindeyken bu kontrolü atla — yanlış tetikleme olur
    if (IS_IN_IFRAME) return;

    const threshold = 160;
    const widthDiff  = window.outerWidth  - window.innerWidth  > threshold;
    const heightDiff = window.outerHeight - window.innerHeight > threshold;

    if ((widthDiff || heightDiff) && !devToolsOpen) {
      devToolsOpen = true;
      onDevToolsOpened();
    } else if (!widthDiff && !heightDiff && devToolsOpen) {
      devToolsOpen = false;
      const overlay = document.getElementById('__security_overlay__');
      if (overlay) overlay.remove();
    }
  }

  function onDevToolsOpened() {
    showProtectionOverlay('Geliştirici araçları bu sayfada kullanılamaz. Şablonlarımız telif hakkı ile korunmaktadır.');
  }

  // Sürekli kontrol — sadece üst pencerede çalışır
  if (!IS_IN_IFRAME) {
    setInterval(detectDevTools, 500);
  }

  /* ─── 6. BLUR KORUMASI — SEKME DEĞİŞİMİ ─── */
  // iframe içindeyken blur'u devreye alma — zaten ana sayfanın modal'ı içindedir
  if (!IS_IN_IFRAME) {
    let blurTimeout;
    const BLUR_AMOUNT = '15px';

    function applyBlur() {
      const content = document.getElementById('main-content');
      if (content) {
        content.style.filter = 'blur(' + BLUR_AMOUNT + ')';
        content.style.transition = 'filter 0.5s ease';
        content.style.userSelect = 'none';
      }
    }

    function removeBlur() {
      const content = document.getElementById('main-content');
      if (content) {
        content.style.filter = 'none';
        content.style.userSelect = 'none';
      }
    }

    // Sekme değişimi
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { applyBlur(); }
      else { blurTimeout = setTimeout(removeBlur, 300); }
    });

    // Fare sayfadan çıkınca
    document.addEventListener('mouseleave', function (e) {
      if (e.clientY <= 0 || e.clientX <= 0 ||
          e.clientX >= window.innerWidth || e.clientY >= window.innerHeight) {
        applyBlur();
      }
    });

    document.addEventListener('mouseenter', function () {
      clearTimeout(blurTimeout);
      removeBlur();
    });
  }

  /* ─── 7. CSS İLE EK KORUMA ─── */
  const style = document.createElement('style');
  style.textContent = `
    * {
      -webkit-user-select: none !important;
      -moz-user-select: none !important;
      -ms-user-select: none !important;
      user-select: none !important;
      -webkit-touch-callout: none !important;
    }
    img {
      pointer-events: none !important;
      -webkit-user-drag: none !important;
    }
    #main-content {
      transition: filter 0.5s ease;
    }
  `;
  document.head.appendChild(style);

  /* ─── 8. IFRAME KORUMASI ─── */
  // Kendi önizleme modalımızdan gelen iframe'lere izin ver.
  // Farklı bir domain'den iframe ile gömülmeye çalışılırsa engelle.
  if (IS_IN_IFRAME) {
    try {
      const parentHost = window.parent.location.hostname;
      const myHost     = window.location.hostname;
      // Aynı ana domain'den açılıyorsa (kendi sitemiz) — tamam
      const allowed = (parentHost === myHost) ||
                      parentHost.endsWith('github.io') ||
                      parentHost.endsWith('sinankeskin.com.tr') ||
                      parentHost === 'localhost' ||
                      parentHost === '127.0.0.1';
      if (!allowed) {
        document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;color:#c9a84c;background:#0a0a1a;">Bu içerik korumalıdır.</div>';
      }
    } catch (e) {
      // Cross-origin parent — farklı domain, izin yok
      document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;color:#c9a84c;background:#0a0a1a;">Bu içerik korumalıdır.</div>';
    }
  }

  console.log = function () {};
  console.warn = function () {};
  console.error = function () {};
  console.info = function () {};
  console.debug = function () {};
  console.dir = function () {};

})();
