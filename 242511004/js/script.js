

    //1
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function (e) {
            const target = this.getAttribute('data-target');
            if (target) {
                e.preventDefault();
                document.querySelectorAll('.section').forEach(section => {
                    section.classList.remove('active');
                });
                const targetEl = document.getElementById(target);
                if (targetEl) targetEl.classList.add('active');
            }
        });
    });

    //2
    const searchInput = document.getElementById('searchInput');
    const noResults = document.getElementById('noResults');

    searchInput.addEventListener('keyup', function () {
        const value = this.value.toLowerCase();
        let visibleCount = 0;
        document.querySelectorAll('.recipe-container').forEach(container => {
            const text = container.textContent.toLowerCase();
            const isVisible = text.includes(value);
            container.style.display = isVisible ? 'block' : 'none';
            if (isVisible) visibleCount++;
        });
        if (noResults) {
            noResults.style.display = visibleCount === 0 ? 'block' : 'none';
        }
    });

    //3
    document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.overlay-btn').forEach(function(button) {
  button.addEventListener('click', function(e) {
    e.stopPropagation();

    const card = button.closest('.recipe-container').querySelector('.card');
    const title = card.querySelector('.card-title').innerText;
    const recipe = card.dataset.recipe || 'Tarif bilgisi yok';
    const ingredients = card.dataset.ingredients || 'Malzemeler bilgisi yok';

    const modalTitle = document.getElementById('tarifModalLabel');
    const modalBody = document.getElementById('tarifText');

    if (button.classList.contains('left-btn')) {
      modalTitle.innerText = title + ' - Malzemeler';
      modalBody.innerText = ingredients;
    } else {
      modalTitle.innerText = title + ' - Tarif';
      modalBody.innerText = recipe;
    }

    
    const modal = new bootstrap.Modal(document.getElementById('tarifModal'));
    modal.show();
  });
});


});
//4

const tarifler = [
    "Mercimek Çorbası", "Tarhana Çorbası", "Yoğurt Çorbası", "Pumpkin Spice Iced Latte", "Tavuklu Mantarlı Fettucini Alfredo",
    "Karnıyarık", "Brownie", "Waffle", "Künefe", "Kumpir", "Limonata", "Şeftali Aromalı Soğuk Çay"
  ];
  function suggestRecipe() {
    const rand = tarifler[Math.floor(Math.random() * tarifler.length)];
    const box = document.getElementById("suggestion");
    box.textContent = `Bugünkü önerimiz: ${rand}`;
    box.style.display = "block";
  }
  

  //5
  window.onload = function () {
    const now = new Date();
    document.getElementById("dateArea").textContent = now.toLocaleDateString('tr-TR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };


  

  //6
  function toggleTheme() {
    document.body.classList.toggle("siyah-mode");
  }
  //7
  const dailyRecipes = [
      "Pazar: Tavuklu Mantarlı Fettucini Alfredo - Limonata",
      "Pazartesi: Mercimek Çorbası - Karnıyarık",
      "Salı: Karnıyarık - Künefe",
      "Çarşamba: Tavuklu Mantarlı Fettucini Alfredo - Şeftali Aromalı Soğuk Çay",
      "Perşembe: Brownie - Pumpkin Spice Iced Latte",
      "Cuma: Künefe - Limonata",
      "Cumartesi: Kumpir - Şeftali Aromalı Soğuk Çay"
    ];

    const today = new Date().getDay(); 
    const recipe = dailyRecipes[today];

    document.getElementById("daily-recipe").textContent = `🍽️ ${recipe}`;

    
let comments = [];


function loadComments() {
  const commentList = document.getElementById("commentList");
  commentList.innerHTML = ""; 
  
  
  comments.forEach(comment => {
    const li = document.createElement("li");
    li.textContent = comment;
    commentList.appendChild(li);
  });
}


const commentForm = document.getElementById("commentForm");
const commentInput = document.getElementById("commentInput");


commentForm.addEventListener("submit", function (e) {
  e.preventDefault(); 
  
  const commentText = commentInput.value.trim(); 
  if (commentText) {
    comments.push(commentText); 
    loadComments(); 
    commentInput.value = ""; 
  }
});


loadComments();


const backToTopBtn = document.getElementById("backToTop");


window.onscroll = function () {
  if (document.body.scrollTop > 276 || document.documentElement.scrollTop > 276) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
};


backToTopBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

document.querySelectorAll('.like-btn').forEach(button => {
  button.addEventListener('click', () => {
    const countSpan = button.querySelector('.like-count');
    let count = parseInt(countSpan.textContent, 10);
    count++;
    countSpan.textContent = count;

    button.disabled = true; 
    button.style.opacity = 0.6; 
    button.textContent = `❤️ Beğenildi (${count})`; 
  });
});

document.querySelectorAll(".start-timer-btn").forEach(button => {
    button.addEventListener("click", function () {
      const duration = parseInt(button.getAttribute("data-time"));
      const display = button.nextElementSibling;

      let remaining = duration * 60;
      button.disabled = true;

      const interval = setInterval(() => {
        const minutes = Math.floor(remaining / 60);
        const seconds = remaining % 60;
        display.textContent = `${minutes} dakika ${seconds < 10 ? "0" : ""}${seconds} saniye`;

        if (remaining <= 0) {
          clearInterval(interval);
          display.textContent = "⏱️ Süre doldu!";
          button.disabled = false;
        }

        remaining--;
      }, 1000);
    });
  });




  