// Kahve Bilgileri
function showCoffeeInfo(type) {
    alert(`${type} hakkında bilgi: ${getCoffeeDescription(type)}`);
    updateLastViewed(type);
}

function getCoffeeDescription(type) {
    const descriptions = {
        'Espresso': 'Yoğun ve sert bir kahve deneyimi.',
        'Latte': 'Bol sütlü yumuşak içimli kahve.',
        'Cappuccino': 'Eşit oranda espresso, süt ve süt köpüğü.'
    };
    return descriptions[type] || 'Bu kahve hakkında bilgi bulunamadı.';
}

// Navigasyon
function navigateToContact() {
    window.location.href = 'contact.html';
}

// Sosyal Medya
function openSocial(platform) {
    const urls = {
        'instagram': 'https://instagram.com',
        'twitter': 'https://twitter.com',
        'facebook': 'https://facebook.com'
    };
    window.open(urls[platform], '_blank');
}

// jQuery Efektleri
$(document).ready(function() {
    // Kart Animasyonu
    $('.coffee-card').hide().fadeIn(1000);
    
    // Başlık Efekti
    $('#mainHeading').hover(
        () => $(this).css('text-shadow', '2px 2px 4px #000000'),
        () => $(this).css('text-shadow', 'none')
    );
    
    // Footer Yılı Güncelleme
    const currentYear = new Date().getFullYear();
    $('.footer span:contains("2023")').text(`© ${currentYear} Kahve Dünyası. Tüm hakları saklıdır.`);
});