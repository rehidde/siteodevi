document.addEventListener('DOMContentLoaded', function () {
  console.log("Çiçekçi Blog yüklendi.");

  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Form başarıyla gönderildi!");
    });
  }

  document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("mouseenter", () => card.classList.add("shadow-lg"));
    card.addEventListener("mouseleave", () => card.classList.remove("shadow-lg"));
  });

  document.querySelectorAll(".card-title").forEach(title => {
    title.addEventListener("click", () => {
      alert("Seçilen çiçek: " + title.textContent);
    });
  });

  const h1 = document.querySelector("h1");
  if (h1) {
    h1.style.display = "none";
    setTimeout(() => {
      h1.style.display = "block";
      h1.style.opacity = 0;
      h1.style.transition = "opacity 2s";
      requestAnimationFrame(() => {
        h1.style.opacity = 1;
      });
    }, 0);
  }

  document.querySelectorAll("span").forEach(span => {
    span.addEventListener("mouseenter", () => {
      span.style.color = "black";
    });
  });

  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      console.log("Sayfa kaydırıldı");
    }
  });

  document.querySelectorAll(".card-img-top").forEach(img => {
    img.addEventListener("dblclick", () => {
      img.style.border = "2px solid red";
    });
  });

  document.querySelectorAll("input").forEach(input => {
    input.addEventListener("focus", () => {
      input.style.backgroundColor = "#e6ffe6";
    });
    input.addEventListener("blur", () => {
      input.style.backgroundColor = "white";
    });
  });
});

