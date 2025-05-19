
function showWelcomeMessage() {
    alert("Elite Beauty Güzellik Salonu'na hoş geldiniz! Size nasıl yardımcı olabiliriz?");
}


function highlightService(element) {
    $(element).addClass("highlighted-service");
}


function unhighlightService(element) {
    $(element).removeClass("highlighted-service");
}


function validateForm(event) {
    event.preventDefault();
    let isValid = true;
    
    
    $("[required]").each(function() {
        if (!$(this).val()) {
            $(this).addClass("is-invalid");
            isValid = false;
        } else {
            $(this).removeClass("is-invalid");
        }
    });
    
  
    const email = $("#email").val();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        $("#email").addClass("is-invalid");
        isValid = false;
    }
    
    if (isValid) {
        alert("Formunuz başarıyla gönderildi! En kısa sürede sizinle iletişime geçeceğiz.");
        $("#contactForm")[0].reset();
    } else {
        alert("Lütfen gerekli alanları doldurunuz!");
    }
}


$(document).ready(function() {
    console.log("Sayfa yüklendi");
    
    
    $(".nav-link").click(function() {
        $(".nav-link").removeClass("active");
        $(this).addClass("active");
    });
    
    
    $('a[href*="#"]').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate(
            {
                scrollTop: $($(this).attr('href')).offset().top,
            },
            500,
            'linear'
        );
    });
});


function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


function colorizeHeadings() {
    $("h1, h2, h3, h4, h5, h6").each(function() {
        $(this).css("color", getRandomColor());
    });
}


function startCounter(elementId, targetNumber, duration) {
    let current = 0;
    const increment = targetNumber / (duration / 16); // 60fps
    const element = document.getElementById(elementId);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= targetNumber) {
            clearInterval(timer);
            current = targetNumber;
        }
        element.textContent = Math.floor(current);
    }, 16);
}


function toggleDarkMode() {
    $("body").toggleClass("dark-mode");
    localStorage.setItem("darkMode", $("body").hasClass("dark-mode"));
}


function addComment() {
    const name = $("#commentName").val();
    const text = $("#commentText").val();
    
    if (name && text) {
        const commentHtml = `
            <div class="comment">
                <strong>${name}</strong>
                <p>${text}</p>
                <span class="comment-date">${new Date().toLocaleString()}</span>
            </div>
        `;
        $("#commentsContainer").prepend(commentHtml);
        $("#commentName, #commentText").val("");
    } else {
        alert("Lütfen adınızı ve yorumunuzu giriniz!");
    }
}


$(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
        $(".navbar").addClass("scrolled");
    } else {
        $(".navbar").removeClass("scrolled");
    }
});


$(function () {
    $('[data-bs-toggle="tooltip"]').tooltip();
});


$('#termsModal').on('show.bs.modal', function () {
    $("body").addClass("modal-open");
});


$('#termsModal').on('hidden.bs.modal', function () {
    $("body").removeClass("modal-open");
});


$(".service-card").hover(
    function() {
        $(this).find(".card").css("transform", "translateY(-10px)");
    }, 
    function() {
        $(this).find(".card").css("transform", "translateY(0)");
    }
);