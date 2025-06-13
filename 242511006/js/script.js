document.addEventListener('DOMContentLoaded', function() {
    console.log("Profesyonel LOL Rehberi DOM yüklendi ve hazır.");

    // 1. Karakter Filtreleme ve Arama Fonksiyonu
    function initFilteringAndSearch() {
        const filtreButonlari = document.querySelectorAll('.filtre-buton');
        const karakterKartlari = document.querySelectorAll('.karakter-karti'); 
        const aramaCubugu = document.getElementById('aramaCubugu');


        function applyFilterAndSearch() {
            const aktifFiltreButonu = document.querySelector('.filtre-buton.aktif');
            const secilenRol = aktifFiltreButonu ? aktifFiltreButonu.getAttribute('data-role') : 'all';
            const aramaTerimi = aramaCubugu ? aramaCubugu.value.toLowerCase() : "";
            console.log(`Filtreleme Uygulanıyor: Rol='${secilenRol}', Arama='${aramaTerimi}'`); 

            karakterKartlari.forEach(kart => {
                const kartRol = kart.getAttribute('data-role');
                const kartIsim = kart.getAttribute('data-isim') ? kart.getAttribute('data-isim').toLowerCase() : "";

                const isPlaceholder = kart.classList.contains('placeholder-kart');

            
                if (isPlaceholder && (secilenRol !== 'all' || aramaTerimi !== "")) {
                     kart.classList.add('gizli');
                     return; 
                }

                const rolEslesiyor = (secilenRol === 'all' || kartRol === secilenRol);
                const isimEslesiyor = (kartIsim.includes(aramaTerimi));

              
                if (!isPlaceholder && rolEslesiyor && isimEslesiyor) {
                    kart.classList.remove('gizli');
                } else if (!isPlaceholder) {
                    kart.classList.add('gizli');
                }
           
                 if (isPlaceholder && secilenRol === 'all' && aramaTerimi === "") {
                     kart.classList.remove('gizli');
                 }
            });
        }

     
        filtreButonlari.forEach(buton => {
            buton.addEventListener('click', function() {
             
                filtreButonlari.forEach(b => b.classList.remove('aktif'));
                this.classList.add('aktif');
                applyFilterAndSearch(); 
            });
        });

      
        if (aramaCubugu) {
            aramaCubugu.addEventListener('input', function() {
                applyFilterAndSearch(); 
            });
        }

        applyFilterAndSearch(); // Sayfa yüklendiğinde filtrelemeyi uygula
    }

    // 2. Tema Değiştirme Fonksiyonu
    function initThemeToggle() {
        const temaToggleButon = document.querySelector('.theme-toggle');
        const body = document.body;
        const temaIcon = temaToggleButon ? temaToggleButon.querySelector('.util-span') : null;

        
        function updateCssVariables(isLightMode) {
            const root = document.documentElement;
            if (isLightMode) {
                root.style.setProperty('--ana-renk', '#F0F2F5');
                root.style.setProperty('--ikincil-renk', '#FFFFFF');
                root.style.setProperty('--ucuncul-renk', '#D1D9E6');
                root.style.setProperty('--vurgu-renk', '#778DA9');
                root.style.setProperty('--metin-rengi', '#0D1B2A');
                root.style.setProperty('--parlak-vurgu', '#0D1B2A');
            } else {
                root.style.setProperty('--ana-renk', '#0D1B2A');
                root.style.setProperty('--ikincil-renk', '#1B263B');
                root.style.setProperty('--ucuncul-renk', '#415A77');
                root.style.setProperty('--vurgu-renk', '#778DA9');
                root.style.setProperty('--metin-rengi', '#E0E1DD');
                root.style.setProperty('--parlak-vurgu', '#E0E1DD');
            }
        }

        if (temaToggleButon && temaIcon) {
            temaToggleButon.addEventListener('click', function() {
                const isLightMode = body.classList.toggle('light-mode');
                if (isLightMode) {
                    temaIcon.innerHTML = '☀️ Tema Değiştir'; 
                    console.log("Açık tema aktif.");
                } else {
                    temaIcon.innerHTML = '🌙 Tema Değiştir'; 
                    console.log("Koyu tema aktif.");
                }
                updateCssVariables(isLightMode);
            });
        }
    }

    // 3. İletişim Formu İşleme Fonksiyonu
    function initContactForm() {
        // Form ID'sini 'contactForm' yerine, iletisim.html'deki gibi 'contact-form' olarak güncelliyoruz.
        // Ayrıca, input id'leri 'name', 'email', 'subject', 'message' yerine 'ad-soyad', 'eposta', 'konu', 'mesaj' olarak güncellendi.
        // Yeni eklenen inputlar için de JavaScript ile değer almayı ekledik.
        const contactForm = document.querySelector('.contact-form'); // class ile seçiyoruz
        if (contactForm) {
            contactForm.addEventListener('submit', function(event) {
                event.preventDefault(); 

                const adSoyad = document.getElementById('ad-soyad').value;
                const eposta = document.getElementById('eposta').value;
                const konu = document.getElementById('konu').value;
                const telefon = document.getElementById('telefon').value; // Yeni input
                const yas = document.getElementById('yas').value; // Yeni input
                const cinsiyet = document.getElementById('cinsiyet').value; // Yeni input
                const ilgiAlani = document.getElementById('ilgi-alani').value; // Yeni input
                const lolNick = document.getElementById('lol-nick').value; // Yeni input
                const rol = document.getElementById('rol').value; // Yeni input
                const mesaj = document.getElementById('mesaj').value;

                // Tüm gerekli alanların doldurulup doldurulmadığını kontrol edin
                if(adSoyad && eposta && konu && mesaj) { // Sadece zorunlu alanları kontrol ediyoruz
                    console.log("İletişim Formu Verileri Alındı:");
                    console.log("Ad Soyad:", adSoyad);
                    console.log("E-posta:", eposta);
                    console.log("Konu:", konu);
                    console.log("Telefon:", telefon);
                    console.log("Yaş:", yas);
                    console.log("Cinsiyet:", cinsiyet);
                    console.log("İlgi Alanı:", ilgiAlani);
                    console.log("LOL Nick:", lolNick);
                    console.log("Tercih Edilen Rol:", rol);
                    console.log("Mesaj:", mesaj);
                    alert('Mesajınız (simülasyonla) başarıyla gönderildi! Konsolu kontrol edin.');
                    contactForm.reset(); 
                } else {
                    alert('Lütfen zorunlu (*) alanları doldurun.');
                }
            });
        }
    }

    // 4. Kaydırma Efektleri Fonksiyonu (Header için)
    function initScrollEffects() {
        const siteHeader = document.getElementById('site-header');
        const threshold = 50; 

        if(siteHeader){
            window.addEventListener('scroll', function() {
                if (window.scrollY > threshold) {
                    siteHeader.classList.add('scrolled'); 
                } else {
                    siteHeader.classList.remove('scrolled');
                }
            });
        }
    }

    // 5. Yumuşak Kaydırma Fonksiyonu
    function initSmoothScrolling() {
        
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
           
             const href = anchor.getAttribute('href');
             const isSpecialNavDiv = anchor.closest('.nav-extra-div'); 

            if (href.length > 1 && !isSpecialNavDiv) { 
                anchor.addEventListener('click', function (e) {
                    const targetId = this.getAttribute('href').substring(1); 
                    const targetElement = document.getElementById(targetId);
                     const siteHeader = document.getElementById('site-header'); 

                    if (targetElement) {
                        e.preventDefault(); 

                     
                        const headerHeight = siteHeader ? siteHeader.offsetHeight : 0;
                        const targetPosition = targetElement.offsetTop - headerHeight;

                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth' 
                        });
                    }
                });
            }
        });
    }

    // 6. Ekstra Elementler İçin Hover Efektleri Fonksiyonu
     function initExtraElementEffects() {
         const ekstraElementler = document.querySelectorAll('.header-extra-div, .nav-extra-div, .cta-extra-div, .hero-extra-panel-1, .hero-extra-panel-2, .filtre-ekstra-div-1, .filtre-arama-div, .kart-ust-ekstra-div, .ozellik-ekstra-div, .alt-ekstra-div-1, .alt-ekstra-div-2, .karakter-karti-ekstra-div-1, .karakter-karti-ekstra-div-2, .karakter-bolumu-alt-ekstra-1, .karakter-bolumu-alt-ekstra-2, .ek-bilgi-kutu, .ek-bilgi-genel-div-1, .ek-bilgi-genel-div-2, .footer-sutun-ekstra-1, .footer-sutun-ekstra-2, .footer-sutun-ekstra-3, .footer-sutun-ekstra-4, .footer-alt-ekstra-1, .cok-alt-div-1, .cok-alt-div-2, .form-ekstra-div-1, .form-ekstra-div-2, .bilgi-karti-ekstra-div, .iletisim-genel-ekstra-1, .iletisim-genel-ekstra-2, .harita-ekstra-div'); // Tüm ekstra/panel elementlerini seç, harita-ekstra-div'i de ekledik

         ekstraElementler.forEach(el => {
             
             el.addEventListener('mouseover', () => {
                 el.classList.add('hover-efekt'); 
             });
             el.addEventListener('mouseout', () => {
                 el.classList.remove('hover-efekt');
             });
         });
     }

    // 7. Yeni Fonksiyon: Sosyal Medya İkonlarına Hover Efekti (basit bir örnek)
    function initSocialIconsHover() {
        const sosyalIkonlar = document.querySelectorAll('.sosyal-ikon-a'); // Sosyal ikon linklerini seç
        
        sosyalIkonlar.forEach(icon => {
            icon.addEventListener('mouseover', () => {
                icon.style.transform = 'scale(1.1)'; // Üzerine gelince biraz büyüt
                icon.style.transition = 'transform 0.3s ease'; // Yumuşak geçiş
            });
            icon.addEventListener('mouseout', () => {
                icon.style.transform = 'scale(1)'; // Üzerinden çekilince normale dön
            });
        });
        console.log("Sosyal medya ikon hover efektleri başlatıldı.");
    }


    // 8. Yeni Fonksiyon: Sıkça Sorulan Sorular (FAQ) Akordiyonu
    // Eğer sayfada FAQ bölümünüz varsa, bu fonksiyonu kullanabilirsiniz.
    // HTML yapısı:
    // <div class="faq-item">
    //     <div class="faq-question">Soru 1?</div>
    //     <div class="faq-answer">Cevap 1.</div>
    // </div>
    function initFaqAccordion() {
        const faqQuestions = document.querySelectorAll('.faq-question');

        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const answer = this.nextElementSibling; // Cevap bir sonraki element
                this.classList.toggle('active'); // Soruya aktif sınıfı ekle/kaldır
                if (answer.style.maxHeight) {
                    answer.style.maxHeight = null; // Cevabı kapat
                } else {
                    answer.style.maxHeight = answer.scrollHeight + "px"; // Cevabı aç
                }
            });
        });
        console.log("FAQ akordiyonu başlatıldı.");
    }


    // 9. Yeni Fonksiyon: Geri Sayım Sayacı (Örn: Bir sonraki etkinliğe kadar)
    // Bunun için HTML'de bir <div id="geriSayimSayaci"></div> elementi olmalı
    function initCountdownTimer() {
        const countdownElement = document.getElementById('geriSayimSayaci');
        if (!countdownElement) return;

        // Hedef tarih (örneğin, 2025 yılının sonu)
        const hedefTarih = new Date("Dec 31, 2025 23:59:59").getTime();

        const updateCountdown = setInterval(function() {
            const now = new Date().getTime();
            const distance = hedefTarih - now;

            if (distance < 0) {
                clearInterval(updateCountdown);
                countdownElement.innerHTML = "ETKİNLİK BAŞLADI!";
                return;
            }

            const gun = Math.floor(distance / (1000 * 60 * 60 * 24));
            const saat = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const dakika = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const saniye = Math.floor((distance % (1000 * 60)) / 1000);

            countdownElement.innerHTML = gun + "g " + saat + "s " + dakika + "dk " + saniye + "sn ";
        }, 1000);
        console.log("Geri sayım sayacı başlatıldı.");
    }

    function initHamburgerMenu() {
        const toggleButton = document.querySelector('.hamburger-menu-toggle');
        const mainNav = document.getElementById('main-nav');

        if (toggleButton && mainNav) {
            toggleButton.addEventListener('click', function() {
                mainNav.classList.toggle('active'); // Navigasyona 'active' sınıfı ekle/kaldır
                // Opsiyonel: Hamburger ikonunu değiştirmek için
                // this.classList.toggle('open');
            });
        }
        console.log("Hamburger menü başlatıldı.");
    }



    // Tüm fonksiyonları DOMContentLoaded içinde çağırın
    initFilteringAndSearch(); // Mevcut 1
    initThemeToggle();       // Mevcut 2
    initContactForm();       // Mevcut 3
    initScrollEffects();     // Mevcut 4
    initSmoothScrolling();   // Mevcut 5
    initExtraElementEffects(); // Mevcut 6

    initSocialIconsHover();    // Yeni 7. fonksiyon
    initFaqAccordion();        // Yeni 8. fonksiyon
    initCountdownTimer();      // Yeni 9. fonksiyon
    initHamburgerMenu();       // Yeni 10. fonksiyon


    console.log("Profesyonel JS kurulumu tamamlandı.");
});