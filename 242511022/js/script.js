// Mock data for news
const mockNews = [
    {
        title: "Süper Lig'de Heyecan Dorukta",
        content: "Şampiyonluk yarışı kızışıyor! Son haftalara girilirken Galatasaray ve Fenerbahçe arasındaki rekabet devam ediyor.",
        date: "12 Mart 2024",
        image: "images/news1.jpg"
    },
    {
        title: "Milli Takım Kadrosu Açıklandı",
        content: "EURO 2024 hazırlıkları kapsamında milli takım kadrosu belli oldu.",
        date: "11 Mart 2024",
        image: "images/news2.jpg"
    }
];

// Mock data for live scores
const mockScores = [
    {
        homeTeam: "Real Madrid",
        awayTeam: "Barcelona",
        homeScore: 2,
        awayScore: 1,
        homeTeamLogo: "team-logos/real.png",
        awayTeamLogo: "team-logos/barca.png"
    },
    {
        homeTeam: "Manchester City",
        awayTeam: "Liverpool",
        homeScore: 3,
        awayScore: 2,
        homeTeamLogo: "team-logos/city.png",
        awayTeamLogo: "team-logos/liverpool.png"
    }
];

// Utility Functions
const utils = {
    showLoading: function() {
        const spinner = $('<div>').addClass('loading-spinner');
        $('body').append(spinner);
        return spinner;
    },
    
    hideLoading: function(spinner) {
        spinner.remove();
    },
    
    showNotification: function(message, type = 'success') {
        const notification = $('<div>')
            .addClass(`notification ${type}`)
            .text(message)
            .css({
                position: 'fixed',
                top: '20px',
                right: '20px',
                padding: '1rem',
                background: type === 'success' ? '#4CAF50' : '#f44336',
                color: 'white',
                borderRadius: '5px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                zIndex: 1000,
                opacity: 0
            });
        
        $('body').append(notification);
        notification.animate({ opacity: 1, right: '20px' }, 300);
        
        setTimeout(() => {
            notification.animate({ opacity: 0, right: '-100%' }, 300, function() {
                $(this).remove();
            });
        }, 3000);
    }
};

// Function 1: Form Validation
function validateForm() {
    let isValid = true;
    const name = $('#name').val();
    const email = $('#email').val();
    const phone = $('#phone').val();
    const message = $('#message').val();

    // Reset previous error states
    $('.form-control').removeClass('is-invalid');
    $('.invalid-feedback').remove();

    // Name validation
    if (name.length < 2) {
        showError($('#name'), 'İsim en az 2 karakter olmalıdır.');
        isValid = false;
    }

    // Email validation
    if (!validateEmail(email)) {
        showError($('#email'), 'Geçerli bir e-posta adresi giriniz.');
        isValid = false;
    }

    // Phone validation
    if (!validatePhone(phone)) {
        showError($('#phone'), 'Geçerli bir telefon numarası giriniz.');
        isValid = false;
    }

    // Message validation
    if (message && message.length < 10) {
        showError($('#message'), 'Mesaj en az 10 karakter olmalıdır.');
        isValid = false;
    }

    return isValid;
}

function showError(element, message) {
    element.addClass('is-invalid');
    element.after($('<div>').addClass('invalid-feedback').text(message));
}

// Function 2: Email Validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Function 3: Phone Validation
function validatePhone(phone) {
    const re = /^[0-9]{10}$/;
    return re.test(phone);
}

// Function 4: Dynamic News Loading with Mock Data
function loadNews() {
    const spinner = utils.showLoading();
    
    // Simulate API delay
    setTimeout(() => {
        updateNewsSection(mockNews);
        utils.showNotification('Haberler başarıyla güncellendi!');
        utils.hideLoading(spinner);
    }, 500);
}

// Function 5: News Section Update with Animation
function updateNewsSection(news) {
    const newsSection = $('.news-section');
    if (!newsSection.length) return;

    const newsGrid = newsSection.find('.news-grid');
    newsGrid.find('.news-item').fadeOut(300, function() {
        $(this).remove();
    });

    news.forEach((item, index) => {
        setTimeout(() => {
            const newsItem = $('<div>').addClass('news-item').css('opacity', 0);
            newsItem.html(`
                <img src="${item.image}" alt="${item.title}" class="news-image">
                <div class="news-content">
                    <span class="date"><i class="far fa-calendar"></i> ${item.date}</span>
                    <h3>${item.title}</h3>
                    <p>${item.content}</p>
                </div>
            `);
            newsGrid.append(newsItem);
            newsItem.animate({ opacity: 1 }, 500);
        }, index * 200);
    });
}

// Function 6: Live Score Update with Mock Data
function updateLiveScores() {
    // Simulate API delay
    setTimeout(() => {
        updateScoresSection(mockScores);
    }, 500);
}

// Function 7: Scores Section Update with Animation
function updateScoresSection(scores) {
    const scoresSection = $('.live-scores');
    if (!scoresSection.length) return;

    scoresSection.find('.match').fadeOut(300, function() {
        $(this).remove();
    });

    scores.forEach((score, index) => {
        setTimeout(() => {
            const matchDiv = $('<div>').addClass('match').css('opacity', 0);
            matchDiv.html(`
                <span class="team">${score.homeTeam}</span>
                <span class="score live-score">${score.homeScore}-${score.awayScore}</span>
                <span class="team">${score.awayTeam}</span>
            `);
            scoresSection.append(matchDiv);
            matchDiv.animate({ opacity: 1 }, 500);
        }, index * 200);
    });
}

// Function 8: Smooth Scroll with Enhanced Animation
function smoothScroll(target) {
    const targetElement = $(target);
    if (!targetElement.length) return;

    const targetPosition = targetElement.offset().top - 70;
    const startPosition = $(window).scrollTop();
    const distance = targetPosition - startPosition;
    const duration = 1000;
    let start = null;

    function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeOutCubic(progress);
        
        window.scrollTo(0, startPosition + (distance * ease));
        
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    requestAnimationFrame(animation);
}

// Function 9: Toggle Mobile Menu with Animation
function toggleMobileMenu() {
    $('.navbar-toggler').on('click', function() {
        const navbarCollapse = $('.navbar-collapse');
        if (navbarCollapse.hasClass('show')) {
            navbarCollapse.slideUp(300, function() {
                navbarCollapse.removeClass('show').css('display', '');
            });
        } else {
            navbarCollapse.slideDown(300, function() {
                navbarCollapse.addClass('show').css('display', '');
            });
        }
    });
}

// Function 10: Form Reset with Animation
function resetForm() {
    const form = $('#contactForm');
    if (!form.length) return;

    form.find('.form-control').each(function() {
        $(this).fadeOut(200).fadeIn(200);
    });
    setTimeout(() => {
        form[0].reset();
        utils.showNotification('Form başarıyla temizlendi!');
    }, 200);
}

// Image Lazy Loading
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// jQuery Document Ready
$(document).ready(function() {
    // Initialize functions
    toggleMobileMenu();
    lazyLoadImages();

    // Form submission handling with jQuery
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        if (validateForm()) {
            utils.showNotification('Form başarıyla gönderildi!');
            resetForm();
        }
    });

    // Smooth scroll for navigation links
    $('a.nav-link').on('click', function(e) {
        if (this.hash !== '') {
            e.preventDefault();
            smoothScroll(this.hash);
        }
    });

    // Auto-update live scores every 60 seconds
    updateLiveScores();
    setInterval(updateLiveScores, 60000);

    // Load initial news
    loadNews();

    // Add hover effects with jQuery
    $('.news-item, .team-item').hover(
        function() { $(this).addClass('hovered'); },
        function() { $(this).removeClass('hovered'); }
    );

    // Add parallax effect to hero section
    $(window).on('scroll', function() {
        const scrolled = $(window).scrollTop();
        $('.hero-section').css('background-position', `center ${scrolled * 0.5}px`);
    });

    // Initialize rating slider if it exists
    const ratingSlider = document.getElementById('rating');
    if (ratingSlider) {
        ratingSlider.addEventListener('input', function(e) {
            document.querySelector('.rating-value').textContent = e.target.value;
        });
    }
}); 