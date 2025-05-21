// Amatör ama eğlenceli animasyonlar ve efektler

// Sayfa yüklendiğinde çalışacak fonksiyonlar
document.addEventListener('DOMContentLoaded', function() {
    // Logo animasyonu
    const logo = document.querySelector('.logo-container img');
    if (logo) {
        logo.addEventListener('mouseover', function() {
            this.style.transform = 'rotate(360deg) scale(1.2)';
            this.style.transition = 'all 0.5s ease-in-out';
        });

        logo.addEventListener('mouseout', function() {
            this.style.transform = 'rotate(-5deg)';
            this.style.transition = 'all 0.5s ease-in-out';
        });
    }

    // Sayfa başlığı efekti
    const title = document.querySelector('.site-title h1');
    if (title) {
        setInterval(() => {
            title.style.color = randomColor();
        }, 2000);
    }

    // Takım logolarına efekt
    const teamLogos = document.querySelectorAll('.team-logo-item img');
    if (teamLogos.length > 0) {
        teamLogos.forEach(logo => {
            logo.addEventListener('click', function() {
                this.classList.add('spin-animation');
                setTimeout(() => {
                    this.classList.remove('spin-animation');
                }, 1000);
            });
        });
    }

    // Haber kartları efekti
    const newsCards = document.querySelectorAll('.news-card');
    if (newsCards.length > 0) {
        newsCards.forEach(card => {
            card.addEventListener('mouseover', function() {
                this.style.transform = 'translateY(-10px) rotate(2deg)';
            });

            card.addEventListener('mouseout', function() {
                this.style.transform = 'translateY(0) rotate(0)';
            });
        });
    }

    // Rastgele uçuşan futbol topları
    createFootballs();
});

// Rastgele renk üretme fonksiyonu
function randomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Rastgele futbol topları oluşturma
function createFootballs() {
    const container = document.querySelector('body');

    // Sadece ana sayfada çalışsın
    if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const ball = document.createElement('div');
                ball.classList.add('floating-ball');
                ball.innerHTML = '⚽';
                ball.style.left = Math.random() * 100 + 'vw';
                ball.style.animationDuration = 5 + Math.random() * 10 + 's';
                ball.style.animationDelay = Math.random() * 5 + 's';
                container.appendChild(ball);

                // 15 saniye sonra topu kaldır
                setTimeout(() => {
                    ball.remove();
                }, 15000);
            }, i * 3000);
        }
    }
}

// Haberler için devamını oku fonksiyonu
function readMoreNews(id) {
    alert('Haber #' + id + ' detayları henüz eklenmedi. Amatör bir site olduğu için bu özellik çalışmıyor! 😅');
}

// Daha fazla haber yükleme fonksiyonu
function loadMoreNews() {
    alert('Amatör bir site olduğu için şu anda daha fazla haber yüklenemiyor! 🙄 Lütfen daha sonra tekrar deneyin!');
}

// Arama fonksiyonu
function searchTeam() {
    const searchInput = document.getElementById('teamSearchInput');
    if (searchInput) {
        const searchTerm = searchInput.value.toLowerCase();
        alert('Aradığınız "' + searchTerm + '" takımı henüz veritabanımızda bulunmamaktadır. Amatör bir site olduğumuz için arama özelliğimiz düzgün çalışmıyor! 😅');
    }
}

// Animasyon için CSS ekle
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .spin-animation {
        animation: spin 1s linear;
    }
    
    .floating-ball {
        position: fixed;
        font-size: 2rem;
        z-index: 9999;
        animation: float-up 15s linear;
        opacity: 0.7;
    }
    
    @keyframes float-up {
        0% { 
            bottom: -50px;
            transform: translateX(0) rotate(0);
        }
        50% {
            transform: translateX(100px) rotate(180deg);
        }
        100% { 
            bottom: 100vh;
            transform: translateX(-100px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);