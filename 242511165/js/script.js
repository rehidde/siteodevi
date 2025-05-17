// Document Ready Fonksiyonu
$(document).ready(function() {
    // Navbar aktif öğe yönetimi
    manageActiveNavItem();
    
    // Sepet sidebar aç/kapa
    setupCartSidebar();
    
    // Modal yönetimi
    setupModals();
    
    // Arama fonksiyonelliği
    setupSearch();
    
    // Favori butonları
    setupWishlistButtons();
    
    // Ürün kartlarına hover efekti
    setupProductHover();
    
    // Kategorilere tıklama
    setupCategoryClick();
    
    // Newsletter formu
    setupNewsletter();
    
    // Sayfa yüklendiğinde animasyonlar
    pageLoadAnimations();
    
    // Footer yılı güncelleme
    updateFooterYear();
    
    // Responsive menü
    setupMobileMenu();
});

// 1. Navbar aktif öğe yönetimi
function manageActiveNavItem() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Tüm aktif sınıfları kaldır
            navItems.forEach(navItem => {
                navItem.classList.remove('active');
            });
            
            // Tıklanana aktif sınıf ekle
            this.classList.add('active');
            
            // Kategoriye göre filtreleme yap (simüle ediyoruz)
            const category = this.getAttribute('data-category');
            if (category) {
                filterProductsByCategory(category);
            }
        });
    });
}

// 2. Sepet sidebar aç/kapa fonksiyonları
function setupCartSidebar() {
    const cartButton = document.getElementById('cartButton');
    const closeCart = document.getElementById('closeCart');
    const cartSidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('overlay');
    
    cartButton.addEventListener('click', function() {
        cartSidebar.classList.add('open');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    closeCart.addEventListener('click', function() {
        cartSidebar.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    overlay.addEventListener('click', function() {
        cartSidebar.classList.remove('open');
        this.classList.remove('active');
        document.body.style.overflow = '';
    });
}

// 3. Modal yönetimi fonksiyonları
function setupModals() {
    const userButton = document.getElementById('userButton');
    const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
    
    userButton.addEventListener('click', function() {
        loginModal.show();
    });
    
    // Login form submit
    $('#loginForm').submit(function(e) {
        e.preventDefault();
        const email = $('#loginEmail').val();
        const password = $('#loginPassword').val();
        
        // Simüle edilmiş login işlemi
        simulateLogin(email, password);
    });
    
    // Şifremi unuttum ve kayıt ol linkleri
    $('.forgot-password').click(function() {
        alert('Şifre sıfırlama linki e-posta adresinize gönderilecektir.');
    });
    
    $('.register-link').click(function() {
        alert('Kayıt sayfasına yönlendiriliyorsunuz.');
    });
}

// 4. Arama fonksiyonelliği
function setupSearch() {
    const searchButton = $('#searchButton');
    const searchInput = $('#searchInput');
    
    searchButton.click(function() {
        performSearch(searchInput.val());
    });
    
    searchInput.keypress(function(e) {
        if (e.which === 13) {
            performSearch(searchInput.val());
        }
    });
}

// 5. Favori butonları yönetimi
function setupWishlistButtons() {
    $('.wishlist-icon').click(function() {
        $(this).toggleClass('active');
        $(this).find('i').toggleClass('far fas');
        
        const productId = $(this).attr('id').replace('wish', '');
        toggleWishlist(productId);
    });
}

// 6. Ürün kartlarına hover efekti
function setupProductHover() {
    $('.product-card').hover(
        function() {
            $(this).css('box-shadow', '0 10px 20px rgba(0,0,0,0.1)');
        },
        function() {
            $(this).css('box-shadow', '0 3px 10px rgba(0,0,0,0.1)');
        }
    );
}

// 7. Kategorilere tıklama
function setupCategoryClick() {
    $('.category-box').click(function() {
        const categoryId = $(this).attr('id');
        filterProductsByCategory(categoryId);
    });
}

// 8. Newsletter formu
function setupNewsletter() {
    $('#newsletterButton').click(function() {
        const email = $('#newsletterEmail').val();
        
        if (validateEmail(email)) {
            subscribeNewsletter(email);
        } else {
            alert('Lütfen geçerli bir e-posta adresi giriniz.');
        }
    });
}

// 9. Sayfa yüklendiğinde animasyonlar
function pageLoadAnimations() {
    $('.category-box').each(function(index) {
        $(this).css('opacity', 0).delay(index * 100).animate({opacity: 1}, 300);
    });
    
    $('.product-card').each(function(index) {
        $(this).css({
            'opacity': 0,
            'transform': 'translateY(20px)'
        }).delay(index * 100).animate({
            'opacity': 1,
            'transform': 'translateY(0)'
        }, 400);
    });
}

// 10. Footer yılı güncelleme
function updateFooterYear() {
    const year = new Date().getFullYear();
    $('.copyright-text').text(`© ${year} BeautyBox. Tüm hakları saklıdır.`);
}

// Yardımcı Fonksiyonlar

// Kategoriye göre ürün filtreleme (simüle edilmiş)
function filterProductsByCategory(category) {
    console.log(`Kategoriye göre filtreleme: ${category}`);
    // Gerçek uygulamada burada AJAX çağrısı yapılabilir
    $('.products-wrapper').fadeOut(300, function() {
        // Filtreleme simülasyonu
        setTimeout(() => {
            $(this).fadeIn(300);
        }, 500);
    });
}

// Arama işlemi (simüle edilmiş)
function performSearch(query) {
    if (query.trim() === '') {
        alert('Lütfen arama yapmak için bir kelime giriniz.');
        return;
    }
    
    console.log(`Arama sorgusu: ${query}`);
    // Gerçek uygulamada burada AJAX çağrısı yapılabilir
    $('.products-wrapper').fadeOut(300, function() {
        // Arama sonuçları simülasyonu
        setTimeout(() => {
            $(this).fadeIn(300);
        }, 500);
    });
}

// Favori ekleme/çıkarma (simüle edilmiş)
function toggleWishlist(productId) {
    console.log(`Ürün favorilere eklendi/çıkarıldı: ${productId}`);
    // Gerçek uygulamada burada AJAX çağrısı yapılabilir
}

// E-posta doğrulama
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Newsletter aboneliği (simüle edilmiş)
function subscribeNewsletter(email) {
    console.log(`E-posta abone oldu: ${email}`);
    $('#newsletterEmail').val('');
    alert('Teşekkürler! BeautyBox bültenine başarıyla abone oldunuz.');
}

// Login simülasyonu
function simulateLogin(email, password) {
    console.log(`Login attempt with email: ${email}`);
    // Gerçek uygulamada burada AJAX çağrısı yapılabilir
    setTimeout(() => {
        $('#loginModal').modal('hide');
        alert('Başarıyla giriş yapıldı!');
    }, 1000);
}

// Responsive menü için setup
function setupMobileMenu() {
    const $navbar = $('.main-nav');
    const $menuItems = $('.nav-item');
    
    function checkScreenSize() {
        if ($(window).width() < 768) {
            if (!$('#mobileMenuBtn').length) {
                createMobileMenuButton();
            }
        } else {
            $('#mobileMenuBtn').remove();
            $navbar.css('display', '');
        }
    }
    
    function createMobileMenuButton() {
        const $button = $('<button id="mobileMenuBtn" class="btn btn-dark d-block d-md-none w-100 mb-3"><i class="fas fa-bars"></i> Menü</button>');
        $button.insertBefore($navbar);
        
        $button.click(function() {
            $navbar.slideToggle();
        });
        
        $navbar.hide();
    }
    
    $(window).resize(checkScreenSize);
    checkScreenSize();
}