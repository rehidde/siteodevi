function fadeIn(element) {
  element.classList.add('visible');
}
function onScrollFade() {
  document.querySelectorAll('.fade-in').forEach(el => {
    const rect = el.getBoundingClientRect();
    if(rect.top < window.innerHeight - 100) {
      fadeIn(el);
    }
  });
}
function greet() {
  alert('CV RAYZO Sitesine Hoşgeldiniz!');
}
function changeTitle() {
  document.title ="CV RAYZO";
}
function toggleHighlight() {
  document.querySelectorAll('span.highlight').forEach(el => {
    el.style.color = el.style.color === 'green' ? '#558ecc' : 'green';
  });
}
function addProject() {
  const projects = document.getElementById('projects').querySelector('.d-flex');
  const div = document.createElement('div');
  div.className = 'card';
  div.style.width = '18rem';
  div.innerHTML = '<div class="card-body"><h5 class="card-title"><span>Yeni Proje</span></h5><p class="card-text"><span>Yeni eklenen proje açıklaması.</span></p></div>';
  projects.appendChild(div);
}
function removeLastProject() {
  const projects = document.getElementById('projects').querySelector('.d-flex');
  if(projects.children.length > 0) {
    projects.removeChild(projects.lastChild);
  }
}
function scrollToInfo() {
  document.getElementById('info').scrollIntoView({behavior:'smooth'});
}
function toggleTable() {
  const table = document.querySelector('table');
  table.style.display = table.style.display === 'none' ? 'table' : 'none';
}
window.addEventListener('scroll', onScrollFade);
window.addEventListener('load', () => {
  greet();
  changeTitle();
  onScrollFade();
});
$(document).ready(function(){
  $('h1').click(function(){ toggleHighlight(); });
  $('#projects').dblclick(function(){ addProject(); });
  $('#info').hover(function(){ removeLastProject(); });
  $('table').click(function(){ toggleTable(); });
  $('nav').click(function(){ scrollToInfo(); });
  $('.card-title span').click(function(){ $(this).fadeOut(300).fadeIn(300); });
  $('.card-text span').dblclick(function(){ $(this).toggleClass('highlight'); });
  $('body').keydown(function(e){ if(e.key === 't') toggleTable(); });
});

function temayiDegistirMorlu() {
  const body = document.body;

  if (body.classList.contains('koyu-mod')) {
    body.classList.remove('koyu-mod');
    body.classList.add('mor-mod');
  } else if (body.classList.contains('mor-mod')) {
    body.classList.remove('mor-mod');
  } else {
    body.classList.add('koyu-mod');
  }
}


