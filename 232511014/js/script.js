/**
 * Kişisel CV Sitesi JavaScript Dosyası
 */

// Sayfa yüklendiğinde çalışacak fonksiyonlar
document.addEventListener('DOMContentLoaded', function() {
    console.log("Sayfa yüklendi!");
    animateProgressBars();
    initializeDarkMode();
    initializeTooltips();
    startTypingEffect();
    trackScrollPosition();
});

// 1. CV İndirme Fonksiyonu
function downloadCV() {
    // Normalde burada CV dosyası indirilecek
    alert("CV indirme başlatılıyor...");

    // Kullanıcıya CV indiriliyor mesajı gösterilecek
    const downloadBtn = document.querySelector('.downloadcv-container .btn');

    if (downloadBtn) {
        const originalText = downloadBtn.textContent;
        downloadBtn.textContent = "İndiriliyor...";
        downloadBtn.disabled = true;

        // İndirme simülasyonu
        setTimeout(() => {
            downloadBtn.textContent = originalText;
            downloadBtn.disabled = false;
            alert("CV başarıyla indirildi!");
        }, 2000);
    }
}

// 2. Progress Bar Animasyonu
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');

    progressBars.forEach(bar => {
        const targetValue = bar.style.width;
        bar.style.width = '0';

        setTimeout(() => {
            bar.style.transition = 'width 1s ease-in-out';
            bar.style.width = targetValue;
        }, 500);
    });
}

// 3. Karanlık Mod Geçişi
function initializeDarkMode() {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    if (prefersDarkScheme.matches) {
        document.body.classList.add('dark-mode');
    }

    // Kullanıcı tercih değişimi dinlenecek
    prefersDarkScheme.addEventListener('change', e => {
        if (e.matches) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    });
}

// 4. Karanlık Mod Durumunu Değiştirme
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');

    // Kullanıcı tercihi local storage'a kaydedilecek
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
}

// 5. Mobil Menü Açma/Kapatma
function toggleMobileMenu() {
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse) {
        const isExpanded = navbarCollapse.classList.contains('show');

        if (isExpanded) {
            navbarCollapse.classList.remove('show');
        } else {
            navbarCollapse.classList.add('show');
        }
    }
}

// 6. Sayfa Kaydırma İzleme Fonksiyonu
function trackScrollPosition() {
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll("main > div[id]");
        const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

        // En yakın bölümü bulmak için
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        // Aktif menü öğesini güncelle
        navLinks.forEach(navLink => {
            navLink.classList.remove('active');
            const href = navLink.getAttribute('href');

            if (href && href.includes('#' + currentSection)) {
                navLink.classList.add('active');
            } else if (href === 'index.html' && window.location.pathname.endsWith('index.html') && window.scrollY < 100) {
                navLink.classList.add('active');
            }
        });
    });
}

// 7. Form Doğrulama Genel Fonksiyonu
function validateInput(inputElement, validationFunction, errorMessage) {
    const value = inputElement.value;
    const isValid = validationFunction(value);

    if (!isValid) {
        showInputError(inputElement, errorMessage);
        return false;
    } else {
        clearInputError(inputElement);
        return true;
    }
}

// 8. Form Hatası Gösterme Fonksiyonu
function showInputError(inputElement, message) {
    const formControl = inputElement.parentElement;

    // Hata mesajı elementi oluştur
    let errorElement = formControl.querySelector('.error-message');

    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message text-danger mt-1 small';
        formControl.appendChild(errorElement);
    }

    errorElement.textContent = message;
    inputElement.classList.add('is-invalid');
}

// 9. Form Hatasını Temizleme Fonksiyonu
function clearInputError(inputElement) {
    const formControl = inputElement.parentElement;
    const errorElement = formControl.querySelector('.error-message');

    if (errorElement) {
        formControl.removeChild(errorElement);
    }

    inputElement.classList.remove('is-invalid');
    inputElement.classList.add('is-valid');
}

// 10. Yazı Efekti Fonksiyonu
function startTypingEffect() {
    const element = document.querySelector('.hero-content h2');
    if (!element) return;

    const text = element.textContent;
    element.textContent = '';

    let i = 0;
    const typingInterval = setInterval(() => {
        if (i < text.length) {
            element.textContent += text[i];
            i++;
        } else {
            clearInterval(typingInterval);
        }
    }, 100);
}

// 11. Bütçe Değeri Güncelleme (İletişim Sayfasında Kullanılıyor)
function updateBudgetValue(val) {
    const budgetValue = document.getElementById('budgetValue');
    if (budgetValue) {
        budgetValue.innerHTML = '₺' + parseInt(val).toLocaleString('tr-TR');
    }
}

// jQuery Fonksiyonları - Site yüklendiğinde çalışacak
$(document).ready(function() {
    // 1. Sayfayı Yumuşak Kaydırma
    smoothScrollToAnchors();

    // 2. Proje Kartlarına Efekt Ekleme
    animateProjectCards();

    // 3. Form Elemanlarına Odaklanma Efekti
    enhanceFormInputs();

    // 4. Tooltip'leri Başlatma
    initializeTooltips();

    // 5. İletişim Formuna Submit İşlemi
    setupContactForm();
});

// jQuery Fonksiyon 1: Sayfayı Yumuşak Kaydırma
function smoothScrollToAnchors() {
    // Dahili bağlantılara yumuşak kaydırma ekle
    $('a[href^="#"]').on('click', function(event) {
        event.preventDefault();

        const target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 70
            }, 800);
        }
    });
}

// jQuery Fonksiyon 2: Proje Kartlarına Efekt Ekleme
function animateProjectCards() {
    $('.project-card').hover(
        function() {
            $(this).find('.project-tech span').addClass('animate__animated animate__pulse');
        },
        function() {
            $(this).find('.project-tech span').removeClass('animate__animated animate__pulse');
        }
    );
}

// jQuery Fonksiyon 3: Form Elemanlarına Odaklanma Efekti
function enhanceFormInputs() {
    $('.form-control').focus(function() {
        $(this).parent().addClass('input-focused');
    }).blur(function() {
        $(this).parent().removeClass('input-focused');
    });
}

// jQuery Fonksiyon 4: Tooltip'leri Başlatma
function initializeTooltips() {
    $('[data-bs-toggle="tooltip"]').tooltip();
}

// jQuery Fonksiyon 5: İletişim Formuna Submit İşlemi
function setupContactForm() {
    $('#contactForm').submit(function(e) {
        e.preventDefault();

        // Form doğrulaması burada yapılacak
        const isValid = validateForm();

        if (isValid) {
            // Form gönderme animasyonu
            $(this).find('button[type="submit"]')
                .prop('disabled', true)
                .html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Gönderiliyor...');

            // Form gönderme simülasyonu
            setTimeout(() => {
                $(this).find('button[type="submit"]')
                    .prop('disabled', false)
                    .html('Gönder');

                alert('Formunuz başarıyla gönderildi. En kısa sürede sizinle iletişime geçeceğiz.');
                this.reset();
            }, 2000);
        }
    });
}

/**
 * Futbol Dünyası JavaScript Fonksiyonları
 */

// Sayfa yüklendiğinde çalışacak fonksiyonlar
document.addEventListener('DOMContentLoaded', function() {
    console.log("Sayfa yüklendi!");
    initializeTooltips();
    setupScoreAnimation();
    setupLiveScoreUpdates();
    initializeGalleryLightbox();
    setupTeamComparison();
    addMatchCountdown();
    setupNewsFiltering();
    trackUserEngagement();
    setupVideoHighlights();
    setupStatsAnimation();
    setupMobileNavigation();
});

// 1. İstatistikleri Canlandırma
function setupStatsAnimation() {
    const statElements = document.querySelectorAll('.stat-number');

    if (statElements.length > 0) {
        statElements.forEach(element => {
            const target = parseInt(element.getAttribute('data-target') || element.textContent);
            let count = 0;
            const duration = 2000; // ms cinsinden animasyon süresi
            const frameRate = 60; // saniyedeki kare sayısı
            const frameDuration = 1000 / frameRate; // her karenin süresi
            const increment = target / (duration / frameDuration); // her karedeki artış miktarı

            element.textContent = '0';

            const timer = setInterval(() => {
                count += increment;
                if (count >= target) {
                    element.textContent = target;
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(count);
                }
            }, frameDuration);
        });
    }
}

// 2. Canlı Skor Güncellemesi Simülasyonu
function setupLiveScoreUpdates() {
    const liveScores = document.querySelectorAll('.live-score');

    if (liveScores.length > 0) {
        setInterval(() => {
            liveScores.forEach(score => {
                // Rastgele bir sayı üret
                if (Math.random() > 0.8) { // %20 ihtimalle
                    const homeScore = parseInt(score.querySelector('.home-score').textContent);
                    const awayScore = parseInt(score.querySelector('.away-score').textContent);

                    // Rastgele bir takım için skor artışı
                    if (Math.random() > 0.5) {
                        score.querySelector('.home-score').textContent = homeScore + 1;
                        showGoalNotification(score.querySelector('.home-team').textContent);
                    } else {
                        score.querySelector('.away-score').textContent = awayScore + 1;
                        showGoalNotification(score.querySelector('.away-team').textContent);
                    }
                }
            });
        }, 30000); // Her 30 saniyede bir kontrol et
    }
}

// 3. Gol Bildirimi Gösterme
function showGoalNotification(team) {
    // Bildirim gösterme (SweetAlert2 ile)
    if (typeof Swal !== 'undefined') {
        Swal.fire({
            title: 'GOL!',
            text: team + ' gol attı!',
            icon: 'success',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
        });
    } else {
        // SweetAlert2 yoksa basit alert göster
        alert('GOL! ' + team + ' gol attı!');
    }
}

// 4. Galeri İçin Lightbox
function initializeGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const imgSrc = this.querySelector('img').getAttribute('src');
                const imgAlt = this.querySelector('img').getAttribute('alt');

                // Basit lightbox oluştur
                const lightbox = document.createElement('div');
                lightbox.classList.add('lightbox');
                lightbox.innerHTML = `
                    <div class="lightbox-content">
                        <span class="close-lightbox">&times;</span>
                        <img src="${imgSrc}" alt="${imgAlt}">
                        <p>${imgAlt}</p>
                    </div>
                `;

                document.body.appendChild(lightbox);

                // Kapatma işlevi
                lightbox.querySelector('.close-lightbox').addEventListener('click', function() {
                    document.body.removeChild(lightbox);
                });

                // Dışarı tıklayınca kapat
                lightbox.addEventListener('click', function(e) {
                    if (e.target === lightbox) {
                        document.body.removeChild(lightbox);
                    }
                });
            });
        });
    }
}

// 5. Takım Karşılaştırma Fonksiyonu
function setupTeamComparison() {
    const compareBtn = document.querySelector('#compareTeamsBtn');

    if (compareBtn) {
        compareBtn.addEventListener('click', function() {
            const team1 = document.querySelector('#team1Select').value;
            const team2 = document.querySelector('#team2Select').value;

            if (team1 === team2) {
                alert('Lütfen farklı takımlar seçin!');
                return;
            }

            // Takım verilerini getir
            const team1Data = getTeamData(team1);
            const team2Data = getTeamData(team2);

            if (team1Data && team2Data) {
                showTeamComparison(team1Data, team2Data);
            } else {
                alert('Takım verileri bulunamadı!');
            }
        });
    }
}

// 6. Takım Verilerini Getir
function getTeamData(teamCode) {
    // Bu fonksiyon normalde bir API'ye istek atabilir
    // Şimdilik sabit veriler kullanıyoruz
    const teams = {
        'gs': {
            name: 'Galatasaray',
            points: 88,
            goals: 88,
            conceded: 24,
            wins: 28,
            draws: 4,
            losses: 2
        },
        'fb': {
            name: 'Fenerbahçe',
            points: 85,
            goals: 82,
            conceded: 32,
            wins: 27,
            draws: 4,
            losses: 3
        },
        'bjk': {
            name: 'Beşiktaş',
            points: 72,
            goals: 67,
            conceded: 38,
            wins: 22,
            draws: 6,
            losses: 6
        },
        'ts': {
            name: 'Trabzonspor',
            points: 63,
            goals: 52,
            conceded: 35,
            wins: 18,
            draws: 9,
            losses: 7
        }
    };

    return teams[teamCode];
}

// 7. Takım Karşılaştırma Gösterimi
function showTeamComparison(team1, team2) {
    const comparisonDiv = document.querySelector('#teamComparisonResult');

    if (comparisonDiv) {
        comparisonDiv.innerHTML = `
            <h4 class="text-center my-4">Takım Karşılaştırması</h4>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>İstatistik</th>
                        <th>${team1.name}</th>
                        <th>${team2.name}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Puan</td>
                        <td>${team1.points}</td>
                        <td>${team2.points}</td>
                    </tr>
                    <tr>
                        <td>Galibiyet</td>
                        <td>${team1.wins}</td>
                        <td>${team2.wins}</td>
                    </tr>
                    <tr>
                        <td>Beraberlik</td>
                        <td>${team1.draws}</td>
                        <td>${team2.draws}</td>
                    </tr>
                    <tr>
                        <td>Mağlubiyet</td>
                        <td>${team1.losses}</td>
                        <td>${team2.losses}</td>
                    </tr>
                    <tr>
                        <td>Atılan Gol</td>
                        <td>${team1.goals}</td>
                        <td>${team2.goals}</td>
                    </tr>
                    <tr>
                        <td>Yenilen Gol</td>
                        <td>${team1.conceded}</td>
                        <td>${team2.conceded}</td>
                    </tr>
                    <tr>
                        <td>Averaj</td>
                        <td>${team1.goals - team1.conceded}</td>
                        <td>${team2.goals - team2.conceded}</td>
                    </tr>
                </tbody>
            </table>
        `;

        comparisonDiv.scrollIntoView({ behavior: 'smooth' });
    }
}

// 8. Skor Animasyonu
function setupScoreAnimation() {
    const scores = document.querySelectorAll('.score-display');

    if (scores.length > 0) {
        scores.forEach(score => {
            score.addEventListener('mouseover', function() {
                this.classList.add('score-highlight');
            });

            score.addEventListener('mouseout', function() {
                this.classList.remove('score-highlight');
            });
        });
    }
}

// 9. Maç Geri Sayımı
function addMatchCountdown() {
    const countdownElement = document.querySelector('#matchCountdown');

    if (countdownElement) {
        // Bir sonraki maçın tarihini ayarla (örnek olarak)
        const matchDate = new Date();
        matchDate.setDate(matchDate.getDate() + 3); // 3 gün sonra
        matchDate.setHours(20, 0, 0); // 20:00

        updateCountdown();

        // Her saniye güncelle
        setInterval(updateCountdown, 1000);

        function updateCountdown() {
            const now = new Date().getTime();
            const distance = matchDate.getTime() - now;

            // Zaman hesaplamaları
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            countdownElement.innerHTML = `
                <strong>Bir Sonraki Maça:</strong> 
                ${days} gün, ${hours} saat, ${minutes} dakika, ${seconds} saniye
            `;

            // Süre dolmuşsa
            if (distance < 0) {
                clearInterval(updateCountdown);
                countdownElement.innerHTML = "Maç başladı!";
            }
        }
    }
}

// 10. Haber Filtreleme
function setupNewsFiltering() {
    const filterButtons = document.querySelectorAll('.news-filter');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const category = this.getAttribute('data-category');

                // Aktif butonu güncelle
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                // Haberleri filtrele
                const newsItems = document.querySelectorAll('.news-item');

                newsItems.forEach(item => {
                    if (category === 'all' || item.getAttribute('data-category') === category) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
}

// 11. Kullanıcı Etkileşimi İzleme
function trackUserEngagement() {
    let pageVisitStart = new Date();
    let scrollDepth = 0;

    // Sayfa kapatıldığında
    window.addEventListener('beforeunload', function() {
        const pageVisitDuration = (new Date() - pageVisitStart) / 1000; // saniye cinsinden

        // Normalde bu verileri bir analitik servisine gönderirdik
        console.log(`Ziyaret süresi: ${pageVisitDuration} saniye`);
        console.log(`Maksimum kaydırma derinliği: ${scrollDepth}%`);
    });

    // Kaydırma derinliğini izle
    window.addEventListener('scroll', function() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY;

        const currentScrollDepth = Math.floor((scrollTop / (documentHeight - windowHeight)) * 100);

        if (currentScrollDepth > scrollDepth) {
            scrollDepth = currentScrollDepth;
        }
    });
}

// 12. Video Vurgularını Gösterme
function setupVideoHighlights() {
    const videoButtons = document.querySelectorAll('.video-highlight-btn');

    if (videoButtons.length > 0) {
        videoButtons.forEach(button => {
            button.addEventListener('click', function() {
                const videoId = this.getAttribute('data-video-id');
                const videoTitle = this.getAttribute('data-video-title');

                // Video modalı oluştur
                const modal = document.createElement('div');
                modal.classList.add('modal', 'fade');
                modal.setAttribute('id', 'videoModal');
                modal.setAttribute('tabindex', '-1');
                modal.setAttribute('aria-labelledby', 'videoModalLabel');
                modal.setAttribute('aria-hidden', 'true');

                modal.innerHTML = `
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="videoModalLabel">${videoTitle}</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <div class="ratio ratio-16x9">
                                    <iframe src="https://www.youtube.com/embed/${videoId}" title="YouTube video" allowfullscreen></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                document.body.appendChild(modal);

                // Modalı göster
                const modalInstance = new bootstrap.Modal(modal);
                modalInstance.show();

                // Modal kapatıldığında temizle
                modal.addEventListener('hidden.bs.modal', function() {
                    document.body.removeChild(modal);
                });
            });
        });
    }
}

// 13. Mobil Navigasyon
function setupMobileNavigation() {
    const menuToggle = document.querySelector('.navbar-toggler');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }
}

// jQuery Fonksiyonları - Site yüklendiğinde çalışacak
$(document).ready(function() {
    // 1. Sayfayı Yumuşak Kaydırma
    smoothScrollToAnchors();

    // 2. Puan Durumu Tablosuna Efekt Ekleme
    animateTableRows();

    // 3. Form Elemanlarına Odaklanma Efekti
    enhanceFormInputs();

    // 4. Takım Logolarına Efekt
    animateTeamLogos();

    // 5. Haberler İçin Filtreleme ve Arama
    setupNewsSearch();
});

// jQuery Fonksiyon 1: Sayfayı Yumuşak Kaydırma
function smoothScrollToAnchors() {
    // Dahili bağlantılara yumuşak kaydırma ekle
    $('a[href^="#"]').on('click', function(event) {
        event.preventDefault();

        const target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 70
            }, 800);
        }
    });
}

// jQuery Fonksiyon 2: Puan Durumu Tablosuna Efekt Ekleme
function animateTableRows() {
    $('.table-striped tr').each(function(index) {
        $(this).css('opacity', '0');

        setTimeout(() => {
            $(this).animate({
                opacity: 1
            }, 300);
        }, index * 100);
    });
}

// jQuery Fonksiyon 3: Form Elemanlarına Odaklanma Efekti
function enhanceFormInputs() {
    $('.form-control').focus(function() {
        $(this).animate({
            boxShadow: '0 0 8px rgba(13, 110, 253, 0.5)'
        }, 300);
    }).blur(function() {
        $(this).animate({
            boxShadow: 'none'
        }, 300);
    });
}

// jQuery Fonksiyon 4: Takım Logolarına Efekt
function animateTeamLogos() {
    $('.team-logo').hover(
        function() {
            $(this).animate({
                width: '+=10px',
                height: '+=10px'
            }, 200);
        },
        function() {
            $(this).animate({
                width: '-=10px',
                height: '-=10px'
            }, 200);
        }
    );
}

// jQuery Fonksiyon 5: Haberler İçin Arama
function setupNewsSearch() {
    $('#newsSearch').on('keyup', function() {
        const searchTerm = $(this).val().toLowerCase();

        $('.news-item').each(function() {
            const title = $(this).find('.card-title').text().toLowerCase();
            const content = $(this).find('.card-text').text().toLowerCase();

            if (title.includes(searchTerm) || content.includes(searchTerm)) {
                $(this).fadeIn();
            } else {
                $(this).fadeOut();
            }
        });
    });
}