import images from "./gallery-items.js";

//markup

const refs = {
    gallery: document.querySelector('.js-gallery'),
    lightbox: document.querySelector('.js-lightbox'),
    lightboxContent: document.querySelector('.lightbox__content'),
    lightboxImg: document.querySelector('.lightbox__image'),
    lightboxBtn: document.querySelector('[data-action="close-lightbox"]'),
    backdrop: document.querySelector('.lightbox__overlay')
}
const galleryItems = images.map(el => {
  return `<li class='gallery__item'>
    <a class='gallery__link' href='${el.original}'>
    <img class='gallery__image' data-source ='${el.original}' src='${el.preview}' alt='${el.description}'/>
    </a>
    </li>`;
}).join('');

refs.gallery.insertAdjacentHTML('afterbegin', galleryItems);

//open original image

refs.gallery.addEventListener('click', onImageClick);

function onImageClick(event) {
    event.preventDefault();
    if (event.target.nodeName !== 'IMG') return;
        refs.lightbox.classList.add('is-open');
        refs.lightboxImg.src = event.target.dataset.source;
    refs.lightboxImg.alt = event.target.alt;
}

//close modal on btn

refs.lightboxBtn.addEventListener('click', onCloseModal);

function onCloseModal() {
    refs.lightbox.classList.remove('is-open');
    refs.lightboxImg.src = '';
    refs.lightboxImg.alt = '';
}

//close modal on backdrop

refs.backdrop.addEventListener('click', onBackdropClick);

function onBackdropClick(event) {
    if (event.currentTarget === event.target) {
    onCloseModal();
  }
}

//close modal on Escape
window.addEventListener('keydown', onEscKeyPress);

function onEscKeyPress(event) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = event.code === ESC_KEY_CODE;

  if (isEscKey) {
    onCloseModal();
  }
}


//slider
document.addEventListener('keydown', event => {
    let newIndex;
  
    const currentId = images.findIndex(el => el.original === refs.lightboxImg.src);
  

    if (event.key === 'ArrowLeft') {
    newIndex = currentId - 1;
    if (newIndex === -1) {
      newIndex = images.length-1;
    }
  } else if (event.key === 'ArrowRight') {
    newIndex = currentId + 1;
        if (newIndex === images.length) {
            newIndex = 0;
        }
    } else if (typeof newIndex === 'undefined') {
        newIndex = currentId;
        }
  refs.lightboxImg.src = images[newIndex].original;
});




  

