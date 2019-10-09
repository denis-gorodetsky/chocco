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

const slider = document.querySelector('.slider');
const list = document.querySelector('.product-list');
const countItems = list.children.length;
let currentSlide = 0;

slider.addEventListener('click', function (e) {
  const target = e.target;

  if (target.classList.contains('arrow--left')) {
    slideLeft();
  }

  if (target.classList.contains('arrow--right')) {

    sliderRight();

  }
})

function sliderRight() {
  if (currentSlide < countItems - 1) {
    currentSlide++;
    translateX(currentSlide);
  } else {
    currentSlide = 0;
    translateX(currentSlide);
  }
}

function slideLeft() {
  if (currentSlide > 0) {
    currentSlide--;
    translateX(currentSlide);
  } else {
    currentSlide = countItems - 1;
    translateX(currentSlide);
  }
}

function translateX(indexSlide) {
  list.style.transform = `translateX(${-indexSlide * 100}%)`;
}

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

// FORM
///////////////////////////////////////////////////////////////

const form = document.querySelector('#form');
const send = document.querySelector('#send');
const modulWindow = document.querySelector('#modul');

send.addEventListener('click', function (e) {
  e.preventDefault();

  if (validateForm(form)) {

    let formData = new FormData(form);
    formData.append("to", "gorodetsky.denis@gmail.com");

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
    xhr.send(formData);

    xhr.addEventListener('load', function () {
      modulWindow.style.display = 'flex';


      if (xhr.status == 200) {
        document.querySelector('#modul span').innerHTML = xhr.response.message;
      } else {
        document.querySelector('#modul span').innerHTML = ('Произошла ошибка - ' + xhr.status);
      }
    })

  }
});


function validateForm(f) {
  let valid = true;
  if (!validateField(f.elements.name)) {
    valid = false
  }
  if (!validateField(f.elements.phone)) {
    valid = false
  }
  if (!validateField(f.elements.comment)) {
    valid = false
  }

  return valid;
}

function validateField(field) {
  if (field.validationMessage) {
    field.style.border = '1px solid red';
    field.setAttribute('placeholder', field.validationMessage);
  } else {
    field.style.border = '';
  }

  return field.checkValidity();
}

const closeModul = document.querySelector('#close-modul');

closeModul.addEventListener('click', function (e) {
  e.preventDefault();

  modulWindow.style.display = 'none';
  document.querySelector('.form__refresh').click();
})

// VIDEO
///////////////////////////////////////////////////////////////

const videoModule = (function () {
	const video = document.getElementById('video');
	const playBtn = document.querySelectorAll('.play');
	const videoPlayBtn = document.querySelector('.video__play');
	const durationControl = document.getElementById('videoDuration');
	const soundControl = document.getElementById('videoVolume');
	const switchSound = document.getElementById('soundOnOff');
	let intervalId;

	const init = function () {
		_setUpListners();
		durationControl.min = 0;
		durationControl.value = 0;
		soundControl.min = 0;
		soundControl.max = 10;
		soundControl.value = soundControl.max;
	};

	const _setUpListners = function () {
		video.addEventListener('click', _play);
		playBtn.forEach(function (elem) {
			elem.addEventListener('click', _play);
		});
		switchSound.addEventListener('click', _soundOff);
		soundControl.addEventListener('click', _changeSoundVolume);
		soundControl.addEventListener('mousedown', _changeSoundVolume);
		durationControl.addEventListener('mousedown', _stopInterval);
		durationControl.addEventListener('click', _setVideoDuration);
	};

	let _play = function () {
		videoPlayBtn.classList.toggle('active');
		durationControl.max = video.duration;
		if (video.paused) {
			video.play();
			intervalId = setInterval(_updateDuration, 15);
		} else {
			video.pause();
			clearInterval(intervalId);
		}
	}

	let _updateDuration = function () {
		durationControl.value = video.currentTime;
	}

	let _soundOff = function () {
		if (video.volume === 0) {
			video.volume = soundLevel;
			soundControl.value = soundLevel * 10;
		} else {
			soundLevel = video.volume;
			video.volume = 0;
			soundControl.value = 0;
		}
	}

	let _changeSoundVolume = function () {
		video.volume = soundControl.value / 10;
	}

	let _stopInterval = function () {
		video.pause();
		clearInterval(intervalId);
	}

	let _setVideoDuration = function () {
		if (video.paused) {
			video.play();
		} else {
			video.pause();
		}

		video.currentTime = durationControl.value;
		intervalId = setInterval(_updateDuration, 15);
	}


	return {
		init: init
	}
})();

document.addEventListener('DOMContentLoaded', videoModule.init());

//MAP
///////////////////////////////////////////////////////////////

ymaps.ready(init);

var placemarks = [{
    latitude: 55.7464,
    longitude: 37.5989,
    hintContent: '<div class="somehtml" style="color:red">street.somestreet</div>',
    balloonContent: [
      '<div>',
      '</img>',
      'text',
      '</div>'
    ]
  },
  {
    latitude: 55.7342,
    longitude: 37.6207,
    hintContent: '<div class="somehtml" style="color:red">street.somestreet</div>',
    balloonContent: [
      '<div>',
      '</img>',
      'text',
      '</div>'
    ]
  },
  {
    latitude: 55.7612,
    longitude: 37.6089,
    hintContent: '<div class="somehtml" style="color:red">street.somestreet</div>',
    balloonContent: [
      '<div>',
      '</img>',
      'text',
      '</div>'
    ]
  },
  {
    latitude: 55.7578,
    longitude: 37.5641,
    hintContent: '<div class="somehtml" style="color:red">street.somestreet</div>',
    balloonContent: [
      '<div>',
      '</img>',
      'text',
      '</div>'
    ]
  }
]

geoObjects = [];

function init() {
  var map = new ymaps.Map('map', {
    center: [55.75, 37.61],
    zoom: 12,
    controls: ['zoomControl'],
    behaviors: ['drag']
  });

  for (var i = 0; i < placemarks.length; i++) {

    geoObjects[i] = new ymaps.Placemark([placemarks[i].latitude, placemarks[i].longitude], {
      hintContent: placemarks[i].hintContent,
      hintContent: ' this is hint',
      balloonContent: placemarks[i].balloonContent.join('')
    }, {
      iconLayout: 'default#image',
      iconImageHref: 'https://denis-gorodetsky.github.io/chocco/img/png/map-marker.png',
      iconImageSize: [46, 57],
      iconImageOffset: [-23, -57]
    });

  }

  var clusterer = new ymaps.Clusterer({
    clusterIcons: [{
      href: 'https://denis-gorodetsky.github.io/chocco/img/png/map-marker.png',
      size: [46, 57],
      offset: [-23, -57]
    }],
    clusterIconContentLayout: null
  });

  map.geoObjects.add(clusterer);
  clusterer.add(geoObjects);

}

// ONE PAGE SCROLL
///////////////////////////////////////////////////////////////

(function () {
  const onePageScroll = document.querySelector('.maincontent'),
    sections = document.querySelectorAll('.section'),
    sectionsLength = sections.length,
    headMenuItem = document.querySelectorAll('.head-menu__item'),
    headMenuItemLength = headMenuItem.length,
    fixedNavItem = document.querySelectorAll('.fixed-nav__item'),
    fixedNavItemLength = fixedNavItem.length;

  for (let i = 0; i < headMenuItemLength; ++i) {
    headMenuItem[i].addEventListener('click', function (e) {
      for(let j = 0; j < fixedNavItemLength; ++j) {
        fixedNavItem[j].classList.remove('fixed-nav__item--active')
      }
      onePageScroll.style.transform = `translateY(-${step * i}%)`;
      fixedNavItem[i + 1].classList.add('fixed-nav__item--active');
    });
  }

  for(let i = 0; i < fixedNavItemLength; ++i) {
    fixedNavItem[i].addEventListener('click', function (e) {
      for(let j = 0; j < fixedNavItemLength; ++j) {
        fixedNavItem[j].classList.remove('fixed-nav__item--active');
      }
      onePageScroll.style.transform = `translateY(-${step * i}%)`;
      fixedNavItem[i].classList.add('fixed-nav__item--active');
    });
  }

  const transitionDelayOPS = getComputedStyle(onePageScroll).transitionDuration,
    delay = (+transitionDelayOPS.slice(0, transitionDelayOPS.length - 1)) * 1500; //Преобразование в число и получение числа в ms

  let count = 0,
    step = 100;

  let transformFlag = true;
  window.addEventListener('wheel', function (e) {

    if (e.deltaY > 0) {
      if (transformFlag && count < sectionsLength - 1) {
        for(let i = 0; i < fixedNavItemLength; ++i) {
          fixedNavItem[i].classList.remove('fixed-nav__item--active');
        }
        ++count;
        onePageScroll.style.transform = `translateY(-${count * step}%)`;
        fixedNavItem[count].classList.add('fixed-nav__item--active');
        transformFlag = false;
        setTimeout(function () {
          transformFlag = true;
        }, delay);
      }
    }

    if (e.deltaY < 0) {
      if (transformFlag && count > 0) {
        for(let i = 0; i < fixedNavItemLength; ++i) {
          fixedNavItem[i].classList.remove('fixed-nav__item--active');
        }
        --count;
        onePageScroll.style.transform = `translateY(-${count * step}%)`;
        fixedNavItem[count].classList.add('fixed-nav__item--active');
        transformFlag = false;
        setTimeout(function () {
          transformFlag = true;
        }, delay);
      }
    }
  });

  let currentPosition;
  window.addEventListener('touchstart', function(e) {
    currentPosition = e.targetTouches[0].pageY;
  });

  let lastPosition;
  window.addEventListener('touchmove', function (e) {

    lastPosition = e.changedTouches[0].pageY;

    if (currentPosition > lastPosition) {
      if (transformFlag && count < sectionsLength - 1) {
        for(let i = 0; i < fixedNavItemLength; ++i) {
          fixedNavItem[i].classList.remove('fixed-nav__item--active');
        }
        ++count;
        onePageScroll.style.transform = `translateY(-${count * step}%)`;
        fixedNavItem[count].classList.add('fixed-nav__item--active');
        transformFlag = false;
        setTimeout(function () {
          transformFlag = true;
        }, delay);
      }
    }

    if (currentPosition < lastPosition) {
      if (transformFlag && count > 0) {
        for(let i = 0; i < fixedNavItemLength; ++i) {
          fixedNavItem[i].classList.remove('fixed-nav__item--active');
        }
        --count;
        onePageScroll.style.transform = `translateY(-${count * step}%)`;
        fixedNavItem[count].classList.add('fixed-nav__item--active');
        transformFlag = false;
        setTimeout(function () {
          transformFlag = true;
        }, delay);
      }
    }
  });
})()
