// 1. Sepet ve favori işlemleri
let cartItems = [];
let cartTotal = 0;
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

function addToCart(gameName) {
    const price = calculateGamePrice(gameName);
    cartItems.push({ name: gameName, price: price });
    cartTotal += price;
    
    updateCartDisplay();
    showNotification(`${gameName} sepete eklendi!`, 'success');
    updateCartButton(gameName);
}

// 2. Oyun fiyatını hesaplama
function calculateGamePrice(gameName) {
    // Oyun adına göre özel fiyatlandırma
    const specialPrices = {
        'Minecraft': 129,
        'call of duty': 299,
        'ELDEN RING': 349,
        'Cyberpunk 2077': 249
    };
    
    return specialPrices[gameName] || Math.floor(Math.random() * 200) + 50;
}

// 3. Sepet bilgilerini güncelleme
function updateCartDisplay() {
    $('#cart-count').text(`Sepetteki Ürün Sayısı: ${cartItems.length}`);
    $('#cart-total').text(`Toplam Fiyat: ${cartTotal} TL`);
    
    // Sepet detayları için modal içeriğini güncelle
    let cartDetails = '';
    cartItems.forEach(item => {
        cartDetails += `<div class="cart-item d-flex justify-content-between mb-2">
            <span>${item.name}</span>
            <span>${item.price} TL</span>
        </div>`;
    });
    
    $('#cart-items-container').html(cartDetails);
}

// 4. Bildirim gösterme fonksiyonu
function showNotification(message, type = 'info') {
    const types = {
        'info': 'primary',
        'success': 'success',
        'warning': 'warning',
        'error': 'danger'
    };
    
    const notification = $(`
        <div class="alert alert-${types[type]} alert-dismissible fade show notification" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `);
    
    $('#notifications-container').append(notification);
    
    // 5 saniye sonra otomatik kapat
    setTimeout(() => {
        notification.alert('close');
    }, 5000);
}

// 5. Oyun beğenme fonksiyonu
function likeGame(gameName) {
    const gameElement = $(`span.label:contains('${gameName}')`).closest('.div-box');
    gameElement.css('box-shadow', '0 0 15px rgba(25, 135, 84, 0.5)');
    
    // Beğeni sayısını güncelle
    const currentLikes = parseInt(localStorage.getItem(`like_${gameName}`)) || 0;
    localStorage.setItem(`like_${gameName}`, currentLikes + 1);
    
    updateLikeDislikeCounts();
    showNotification(`${gameName} oyununu beğendiniz!`, 'success');
}

// 6. Oyun beğenmeme fonksiyonu
function dislikeGame(gameName) {
    const gameElement = $(`span.label:contains('${gameName}')`).closest('.div-box');
    gameElement.css('box-shadow', '0 0 15px rgba(220, 53, 69, 0.5)');
    
    // Beğenmeme sayısını güncelle
    const currentDislikes = parseInt(localStorage.getItem(`dislike_${gameName}`)) || 0;
    localStorage.setItem(`dislike_${gameName}`, currentDislikes + 1);
    
    updateLikeDislikeCounts();
    showNotification(`${gameName} oyununu beğenmediniz.`, 'warning');
}

// 7. Beğeni sayılarını güncelleme
function updateLikeDislikeCounts() {
    $('.div-box').each(function() {
        const gameName = $(this).find('.label').text();
        const likes = parseInt(localStorage.getItem(`like_${gameName}`)) || 0;
        const dislikes = parseInt(localStorage.getItem(`dislike_${gameName}`)) || 0;
        
        $(this).find('.btn-like').html(`<i class="bi bi-hand-thumbs-up"></i> ${likes}`);
        $(this).find('.btn-dislike').html(`<i class="bi bi-hand-thumbs-down"></i> ${dislikes}`);
    });
}

// 8. Oyun arama fonksiyonu
function searchGames() {
    const searchTerm = $('#searchInput').val().toLowerCase().trim();
    
    if (searchTerm.length < 2) {
        $('.div-box').show();
        return;
    }
    
    $('.div-box').each(function() {
        const gameName = $(this).find('.label').text().toLowerCase();
        $(this).toggle(gameName.includes(searchTerm));
    });
}

// 9. Sepeti temizleme fonksiyonu
function clearCart() {
    if (cartItems.length === 0) {
        showNotification('Sepetiniz zaten boş!', 'warning');
        return;
    }
    
    if (confirm('Sepetinizdeki tüm ürünleri silmek istediğinize emin misiniz?')) {
        cartItems = [];
        cartTotal = 0;
        updateCartDisplay();
        $('.btn-add-to-cart').removeClass('btn-secondary').addClass('btn-primary').text('Sepete Ekle');
        showNotification('Sepet temizlendi!', 'success');
    }
}

// 10. Favorilere ekleme/çıkarma
function toggleFavorite(gameName) {
    const index = favorites.indexOf(gameName);
    const gameElement = $(`span.label:contains('${gameName}')`).closest('.div-box').find('.btn-favorite');
    
    if (index === -1) {
        favorites.push(gameName);
        gameElement.removeClass('btn-outline-secondary').addClass('btn-warning');
        showNotification(`${gameName} favorilere eklendi!`, 'success');
    } else {
        favorites.splice(index, 1);
        gameElement.removeClass('btn-warning').addClass('btn-outline-secondary');
        showNotification(`${gameName} favorilerden çıkarıldı.`, 'info');
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoriteButtons();
}

// 11. Favori butonlarını güncelleme
function updateFavoriteButtons() {
    $('.btn-favorite').each(function() {
        const gameName = $(this).closest('.div-box').find('.label').text();
        if (favorites.includes(gameName)) {
            $(this).removeClass('btn-outline-secondary').addClass('btn-warning');
        } else {
            $(this).removeClass('btn-warning').addClass('btn-outline-secondary');
        }
    });
}

// 12. Sepet butonunu güncelleme
function updateCartButton(gameName) {
    $(`span.label:contains('${gameName}')`).closest('.div-box').find('.btn-add-to-cart')
        .removeClass('btn-primary')
        .addClass('btn-secondary')
        .text('Sepete Eklendi');
}

// 13. Oyun detaylarını gösterme fonksiyonu
function showGameDetails(gameName) {
    const gameDetails = {
        'call of duty': {
            price: 299,
            genre: 'FPS',
            rating: '4.5/5',
            description: 'Aksiyon dolu bir birinci şahıs nişancı oyunu'
        },
        'Minecraft': {
            price: 129,
            genre: 'Sandbox',
            rating: '5/5',
            description: 'Yaratıcılığınızı konuşturacağınız açık dünya oyunu'
        },
        // Diğer oyunlar için detaylar eklenebilir
    };
    
    const details = gameDetails[gameName] || {
        price: calculateGamePrice(gameName),
        genre: 'Bilinmiyor',
        rating: 'Değerlendirilmedi',
        description: 'Bu oyun hakkında detay bulunamadı.'
    };
    
    $('#gameDetailsLabel').text(gameName);
    $('#gameDetailsPrice').text(`${details.price} TL`);
    $('#gameDetailsGenre').text(details.genre);
    $('#gameDetailsRating').text(details.rating);
    $('#gameDetailsDescription').text(details.description);
    
    // Modal'ı göster
    const gameModal = new bootstrap.Modal(document.getElementById('gameDetailsModal'));
    gameModal.show();
}

// 14. Karanlık mod fonksiyonu
function toggleDarkMode() {
    $('body').toggleClass('dark-mode');
    localStorage.setItem('darkMode', $('body').hasClass('dark-mode'));
    showNotification(`Karanlık mod ${$('body').hasClass('dark-mode') ? 'açıldı' : 'kapatıldı'}`, 'info');
}

// 15. Sayfa yüklendiğinde çalışacak fonksiyonlar
$(document).ready(function() {
    // Karanlık mod kontrolü
    if (localStorage.getItem('darkMode') === 'true') {
        $('body').addClass('dark-mode');
    }
    
    // Beğeni sayılarını yükle
    updateLikeDislikeCounts();
    
    // Favori butonlarını yükle
    updateFavoriteButtons();
    
    // Oyun kutularına hover efekti
    $('.div-box').hover(
        function() {
            $(this).css('transform', 'translateY(-5px)');
        },
        function() {
            $(this).css('transform', 'translateY(0)');
        }
    );
    
    // Sepet modal'ını başlat
    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    
    // Sepeti göster butonu
    $('#showCartBtn').click(function() {
        if (cartItems.length === 0) {
            showNotification('Sepetiniz boş!', 'warning');
        } else {
            cartModal.show();
        }
    });
    
    // Satın alma butonu
    $('#purchaseBtn').click(function() {
        if (cartItems.length === 0) {
            showNotification('Sepetiniz boş!', 'warning');
            return;
        }
        
        showNotification(`Satın alma işlemi başarılı! Toplam: ${cartTotal} TL`, 'success');
        cartItems = [];
        cartTotal = 0;
        updateCartDisplay();
        cartModal.hide();
        // script.js'de bu fonksiyonu ekleyin
function updateCartButton(gameName) {
    $(`span.label:contains('${gameName}')`).closest('.div-box').find('.btn-add-to-cart')
        .removeClass('btn-primary')
        .addClass('btn-secondary')
        .text('Sepete Eklendi');
}
    });
});