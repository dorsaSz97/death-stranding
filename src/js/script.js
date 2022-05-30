'use strict';

//////////////////////////////////// DONE
// Header section trailer button events
const header = document.querySelector('.header');
const playBtns = document.querySelectorAll('.btn--play');
const videoTrailer = document.getElementById('trailer-video');
let playBtnIsClicked = false;

playBtns.forEach(playBtn => {
  playBtn.addEventListener('click', e => {
    playBtnIsClicked = !playBtnIsClicked;

    const playBtnClicked = e.target.closest('.btn--play');

    if (!playBtnClicked) return;

    if (playBtnIsClicked) {
      header.classList.add('is-playing');
      playBtnClicked.innerHTML = '&#10060;';
      setTimeout(() => {
        videoTrailer.play();
        videoTrailer.style.opacity = '1';
      }, 600);
    }

    if (!playBtnIsClicked) {
      videoTrailer.style.opacity = '0';
      header.classList.remove('is-playing');

      if (
        // if we are on mobile
        playBtnClicked.closest('.trailer').classList.contains('hide-desktop')
      ) {
        playBtnClicked.innerHTML = `<img src="assets/img/Logo/play-button.svg" alt="play sign" /> play trailer`;
      } else {
        // if we are on desktop
        playBtnClicked.innerHTML = `<img src="assets/img/Logo/play-button.svg" alt="play sign" />`;
      }
      videoTrailer.pause();
      setTimeout(() => {
        videoTrailer.currentTime = 0;
        videoTrailer.style.opacity = '0';
      }, 800);
    }
  });
});

//////////////////////////////////// DONE
// Gallery section click events
const tabsContainer = document.querySelector('.media__tabs-container');
const tabs = document.querySelectorAll('.tab');
const tabsInner = document.querySelectorAll('.media__gallery');
let activeMediaGallery, activeExtraImages, activeMainImage, activeExtraFig;

// update the active gallery each time one tab is clicked
const updateActiveGallery = () => {
  activeMediaGallery = document.querySelector('.media__gallery.active');
  activeExtraImages = activeMediaGallery.querySelector('.extra-images');
  activeMainImage = activeMediaGallery.querySelector('.main-image');
  activeExtraFig = activeExtraImages.querySelectorAll('figure')[0];

  // activating the first figure in extra images
  activeExtraImages
    .querySelectorAll('figure')
    .forEach(activeExtraFig => activeExtraFig.classList.remove('is-showing'));
  activeExtraFig.classList.add('is-showing');

  // show the active extra image in the main image area
  activeMainImage
    .querySelector('img')
    .setAttribute('src', activeExtraFig.querySelector('img').src);

  // click events on active extra images
  activeExtraImages.addEventListener('click', e => {
    activeExtraImages
      .querySelectorAll('figure')
      .forEach(activeExtraFig => activeExtraFig.classList.remove('is-showing'));

    const clicked = e.target.closest('figure');

    if (!clicked) return;

    clicked.classList.add('is-showing');

    activeMainImage
      .querySelector('img')
      .setAttribute('src', clicked.querySelector('img').src);
  });
};

updateActiveGallery();

// making the tabs color change and make it the active one
tabsContainer.addEventListener('click', e => {
  const clicked = e.target.closest('.tab');

  if (!clicked) return;

  tabs.forEach(tab => tab.classList.remove('active'));

  clicked.classList.add('active');

  tabsInner.forEach(inner => inner.classList.remove('active'));

  document
    .querySelector(`.media__gallery--${clicked.dataset.tab}`)
    .classList.add('active');

  updateActiveGallery();
});

//////////////////////////////////// DONE
//  Characters section hover effect
const charactersContainer = document.querySelector('.characters');
const characters = document.querySelectorAll('.character');

charactersContainer.addEventListener('mouseover', e => {
  const hovered = e.target.closest('.character');

  if (!hovered) return;

  characters.forEach(character => character.classList.add('inactive'));
  hovered.classList.remove('inactive');
});

charactersContainer.addEventListener('mouseout', () => {
  characters.forEach(character => character.classList.remove('inactive'));
});

//////////////////////////////////// DONE
// Characters section modal
const inkLayer = document.querySelector('.ink-transition-layer');
const inkBackground = document.querySelector('.ink-bg');
const detail = document.querySelector('.character-details');
const closeModalBtn = document.querySelector('.modal-close');
const characterArts = [
  'assets/img/Characters/sam.jpg',
  'assets/img/Characters/mama.webp',
  'assets/img/Characters/cliff.jpg',
  'assets/img/Characters/fragile.jpg',
  'assets/img/Characters/deadman.jpg',
  'assets/img/Characters/diehardman.webp',
  'assets/img/Characters/heartman.webp',
  'assets/img/Characters/higgs.jpg',
];

characters.forEach((character, i) =>
  character.addEventListener('click', e => {
    e.preventDefault();
    detail.querySelector('img').src = characterArts[i];
    inkLayer.classList.add('visible', 'showing');
    // the time is equal to the animation duration of the inkLayer (kinda)
    setTimeout(() => {
      detail.classList.add('visible');
    }, 950);
  })
);

closeModalBtn.addEventListener('click', e => {
  e.preventDefault();
  inkLayer.classList.remove('showing');
  detail.classList.remove('visible');
  inkLayer.classList.add('hiding');
  setTimeout(() => {
    inkLayer.classList.remove('visible');
    inkLayer.classList.remove('hiding');
  }, 1500);
});

//////////////////////////////////// DONE
// Keeping the ratio of the effect image when we resize the window
const frameRatio = 1.78; // aspect ratio of one frame of the effect image (w/h)
const framesCount = 25; // number of frames in our effect image
let resize = false;

const setLayerDimensions = () => {
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;
  let layerHeight, layerWidth;

  if (windowWidth / windowHeight > frameRatio) {
    // windows w is bigger than the original w of one frame
    layerWidth = windowWidth;
    layerHeight = layerWidth / frameRatio;
  } else {
    // windows h is bigger than the original h of one frame
    layerHeight = windowHeight;
    layerWidth = layerHeight * frameRatio;
  }

  inkBackground.style.width = `${layerWidth * framesCount}px`;
  inkBackground.style.height = `${layerHeight}px`;

  resize = false;
};

setLayerDimensions();

window.addEventListener('resize', () => {
  // this will stop more thanone request from happening and waits for one to finish
  if (!resize) {
    resize = true;
    !window.requestAnimationFrame
      ? setTimeout(setLayerDimensions, 300)
      : window.requestAnimationFrame(setLayerDimensions);
  }
});
