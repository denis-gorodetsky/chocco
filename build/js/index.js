// HAMBURGER MENU
///////////////////////////////////////////////////////////////

const menu = document.querySelector("#burger-menu");
const nav = document.querySelector("nav");
const body = document.querySelector('body');


menu.addEventListener('click', function () {

  let navDisplay = getComputedStyle(nav).display;

  if (navDisplay == 'none') {
    nav.style.display = 'flex';
    nav.style.opacity = '.99';
    body.style.overflow = 'hidden';
  }
  if (navDisplay == 'flex') {
    nav.style.display = 'none';
    nav.style.opacity = '0';
    body.style.overflow = 'visible';
  }
});

menu.addEventListener('click', function (menuDefault) {
  menuDefault.preventDefault();

  let className = menu.getAttribute("class");

  if (className == "burger-menu") {
    menu.classList.add('burger-menu--active');
  } else {
    menu.classList.remove('burger-menu--active');
  }
});

// PRODUCT
///////////////////////////////////////////////////////////////


// TEAM
///////////////////////////////////////////////////////////////

const team = document.querySelector('#team');
const ulTeam = document.querySelector('#team').children;

team.addEventListener('click', function (e) {
  let li = e.target.closest('li');

  if (!li.classList.contains("team-accordeon__item--active")) {
    for (i = 0; i < ulTeam.length; i++) {
      ulTeam[i].classList.remove('team-accordeon__item--active');
    }
    li.classList.add('team-accordeon__item--active');
  } else {
    li.classList.remove('team-accordeon__item--active');
  }
});

// MENU
///////////////////////////////////////////////////////////////

const menuAcc = document.querySelector('#accordeon');
const menuAccList = document.querySelector('.accordeon__list').children;

menuAcc.addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.closest('button')) {
    let li = e.target.closest('li');

    if (!li.classList.contains("accordeon__item--active")) {
      for (i = 0; i < menuAccList.length; i++) {
        menuAccList[i].classList.remove('accordeon__item--active');
        console.log(menuAccList[i])
      }
      li.classList.add('accordeon__item--active');
    } else {
      li.classList.remove('accordeon__item--active');
    }
  }
});

// REVIEWS
///////////////////////////////////////////////////////////////

const reviewsLi = document.querySelector('#reviews').children;
const carouselLi = document.querySelector('#carousel').children;
const carousel = document.querySelector('#carousel');

carousel.addEventListener('click', function (e) {
  e.preventDefault();
  let li = e.target.closest('li');

  for (let i = 0; i < carouselLi.length; i++) {
    carouselLi[i].classList.remove('carousel__item--active');
    if (carouselLi[i] == li) {
      reviewsLi[i].classList.add('article--active');
    } else {
      reviewsLi[i].classList.remove('article--active');
    }
  }
  li.classList.add('carousel__item--active')
})

// ONE PAGE SCROLL
///////////////////////////////////////////////////////////////

