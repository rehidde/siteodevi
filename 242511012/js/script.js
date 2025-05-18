const menuData = {
    Pazartesi: [
        { name: "Spaghetti Carbonara", price: "320₺", desc: "Kremalı soslu İtalyan makarnası", image: "/image/indir.jpg" },
        { name: "Minestrone Çorbası", price: "290₺", desc: "Sebzeli geleneksel çorba", image: "" }
    ],
    Salı: [
        { name: "Penne Arrabbiata", price: "610₺", desc: "Acılı domates soslu makarna", image: "" },
        { name: "Bruschetta", price: "85₺", desc: "Domates ve fesleğenli ekmek", image: "" }
    ],
    Çarşamba: [
        { name: "Risotto ai Funghi", price: "530₺", desc: "Mantarlı İtalyan pirinç yemeği", image: "" },
        { name: "Melanzane alla Parmigiana", price: "430₺", desc: "Patlıcan dilimleri, domates sosu ve parmesan peyniri", image: "" }
    ],
    Perşembe: [
        { name: "Lasagna", price: "440₺", desc: "Kıymalı ve beşamelli lazanya", image: "" },
        { name: "Osso Buco", price: "730₺", desc: "Kemikli dana incik eti, sebzeler, beyaz şarap ve et suyuyla uzun süre pişirilir.", image: "" }
    ],
    Cuma: [
        { name: "Gnocchi al Pesto", price: "500₺", desc: "Pestolu patates hamuru", image: "" },
        { name: "Saltimbocca alla Romana", price: "650₺", desc: "İnce dana eti dilimleri, üzerine prosciutto (İtalyan jambonu) ve adaçayı", image: "" }
    ],
    Cumartesi: [
        { name: "Pizza Margherita", price: "450₺", desc: "Taze mozarella, domates ve fesleğen", image: "" },
        { name: "Tagliata di Manzo", price: "620₺", desc: "Izgara dana bonfile dilimleri, roka, parmesan ve balsamik", image: "" }
    ],
    Pazar: [
        { name: "Fettucine Alfredo", price: "390₺", desc: "Kremalı ve tereyağlı makarna", image: "" },
        { name: "Caprese Salata", price: "310₺", desc: "Mozzarella, domates ve fesleğen salatası", image: "" }
    ]
};

const drinks = [
    { name: "Espresso", price: "45₺", type: "Sıcak" },
    { name: "Limonata", price: "35₺", type: "Soğuk" },
    { name: "Chianti Classico", price: "750₺", type: "Şarap" },
    { name: "Barolo", price: "1200₺", type: "Şarap" },
    { name: "Montepulciano d’Abruzzo", price: "680₺", type: "Şarap" }
];

const dessertss = [
    { name: "Tiramisu", desc: "Kahveli ve kremalı tatlı", price: "180₺" },
    { name: "Panna Cotta", desc: "Vanilyalı sütlü tatlı", price: "150₺" },
    { name: "Cannoli", desc: "Tatlı kremalı İtalyan hamur işi", price: "200₺" },
    { name: "Zabaglione", desc: "Meyve dilimleriyle servis edilen şarap ve yumurta sarısı", price: "175₺" },
    { name: "Ricotta Cheesecake", desc: "Ricotta peynirinden yapılan cheesecake", price: "250₺" }
];

const workingHours = {
    Pazartesi: "11:00 - 22:00",
    Salı: "11:00 - 22:00",
    Çarşamba: "11:00 - 22:00",
    Perşembe: "11:00 - 22:00",
    Cuma: "11:00 - 23:30",
    Cumartesi: "12:00 - 23:30",
    Pazar: "12:00 - 22:00"
};

$(document).ready(function() {
    showCurrentTime();
    checkRestaurantStatus();
    displayReservationReminder(); 
    $('.card').hover(
        function() {
            $(this).css('transform', 'scale(1.05)');
        },
        function() {
            $(this).css('transform', 'scale(1)');
        }
    );
    $('.day-buttons button').on('click', function() {
        const day = $(this).data('day');
        showMenu(day);
    });
    $('#darkModeToggle').on('click', toggleDarkMode);
    showMenu('Pazartesi');
    loadDrinks();
    loadDesserts();
    styleTableRows();
});


function showCurrentTime() {
    setInterval(() => {
        $('#currentTime').text(new Date().toLocaleTimeString('tr-TR'));
    }, 1000);
}

function checkRestaurantStatus() {
    const now = new Date();
    const dayNames = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
    const currentDay = dayNames[now.getDay()];
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentTime = currentHour * 60 + currentMinutes;

    const [openHour, openMinute] = workingHours[currentDay].split(' - ')[0].split(':').map(Number);
    const [closeHour, closeMinute] = workingHours[currentDay].split(' - ')[1].split(':').map(Number);
    const openTime = openHour * 60 + openMinute;
    const closeTime = closeHour * 60 + closeMinute;

    const statusText = currentTime >= openTime && currentTime <= closeTime
        ? `Restoran şu an açık! (${workingHours[currentDay]})`
        : `Restoran şu an kapalı. Çalışma saatleri: ${workingHours[currentDay]}`;
    
    $('#currentTime').after(`<p class="text-center text-muted">${statusText}</p>`);
}

function showMenu(day) {
    const menuItems = $('#menuItems');
    menuItems.html(`
        <h3 class="text-center mb-2">${day} Menüsü</h3>
        <p class="text-center text-muted">Çalışma Saatleri: <strong>${workingHours[day]}</strong></p>
        <div class="row">
            ${menuData[day].map(item => `
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${item.name}</h5>
                            <p class="card-text">${item.desc}</p>
                        </div>
                        <div class="card-footer">
                            <span class="fw-bold">${item.price}</span>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `);
    $('.col-md-4').hide().fadeIn(1000);
}

function toggleDarkMode() {
    $('body').toggleClass('dark-mode');
    const darkModeBtn = $('#darkModeToggle');
    if ($('body').hasClass('dark-mode')) {
        darkModeBtn.html('☀️').removeClass('btn-outline-light').addClass('btn-outline-warning');
        $('.navbar').css('background-color', '#121212');
        $('.card').css({ 'background-color': '#252525', 'color': '#ffffff', 'border': '1px solid #444' });
        $('.card-footer').css({ 'background-color': '#2d2d2d', 'border-top': '1px solid #444' });
        $('.text-muted').css('color', '#aaa');
        $('.table').css({ 'background-color': '#252525', 'color': '#ffffff' });
        $('.table th, .table td').css({ 'border-color': '#444', 'background-color': '#252525' });
        $('.table-hover tbody tr').hover(function() {
            $(this).css('background-color', '#333');
        });
        $('.btn-outline-primary').css({ 'color': '#80b3ff', 'border-color': '#80b3ff' });
        $('.btn-outline-primary').hover(function() {
            $(this).css('background-color', '#1a3d7a');
        });
        $('.navbar .nav-link').css('color', '#ffffff');
    } else {
        darkModeBtn.html('🌙').removeClass('btn-outline-warning').addClass('btn-outline-light');
        $('.navbar').css('background-color', '');
        $('.card').css({ 'background-color': '', 'color': '', 'border': '' });
        $('.card-footer').css({ 'background-color': '', 'border-top': '' });
        $('.text-muted').css('color', '');
        $('.table').css({ 'background-color': '', 'color': '' });
        $('.table th, .table td').css({ 'border-color': '', 'background-color': '' });
        $('.table-hover tbody tr').unbind('hover');
        $('.btn-outline-primary').css({ 'color': '', 'border-color': '' });
        $('.btn-outline-primary').unbind('hover');
        $('.navbar .nav-link').css('color', '');
    }
    styleTableRows();
}

function styleTableRows() {
    $('.dessert-table tbody tr').each(function(index) {
        if ($('body').hasClass('dark-mode')) {
            $(this).css('background-color', index % 2 === 0 ? '#2a2a2a' : '#252525');
            $(this).css('color', '#ffffff');
        } else {
            $(this).css('background-color', '');
            $(this).css('color', '');
        }
    });
}

function loadDrinks() {
    const container = $('#drinkItems');
    container.empty(); 
    drinks.forEach(drink => {
        container.append(`
            <div class="col-md-3 mb-3">
                <div class="card">
                    <div class="card-body">
                        <h5>${drink.name}</h5>
                        <p class="text-muted">${drink.type}</p>
                        <span class="fw-bold">${drink.price}</span>
                    </div>
                </div>
            </div>
        `);
    });
    $('.col-md-3').hide().fadeIn(1000);
}

function loadDesserts() {
    const tbody = $('#dessertTableBody');
    tbody.empty(); 
    dessertss.forEach(dessert => {
        tbody.append(`
            <tr>
                <td><span class="dessert-name">${dessert.name}</span></td>
                <td><span class="dessert-desc">${dessert.desc}</span></td>
                <td class="fw-bold"><span class="dessert-price">${dessert.price}</span></td>
            </tr>
        `);
    });
    $('.dessert-table tbody tr').hide().fadeIn(1000);
}

function randomDessert() {
    const dessert = dessertss[Math.floor(Math.random() * dessertss.length)];
    alert(`Bugünün tatlı önerisi: ${dessert.name} - ${dessert.price}\n${dessert.desc}`);
}

function toggleItalianMusic() {
    $('#italianMusicList').slideToggle('slow');
}

function scrollToTop() {
    $('html, body').animate({ scrollTop: 0 }, 'slow');
}

function displayReservationReminder() {
    const now = new Date();
    const reminderDiv = $('#reservationReminder');
    const minReservationDate = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 saat sonrası
    const minDateStr = minReservationDate.toISOString().split('T')[0];

    reminderDiv.text(`Lütfen rezervasyonunuzu en az ${minDateStr} tarihinden itibaren yapınız.`);
}