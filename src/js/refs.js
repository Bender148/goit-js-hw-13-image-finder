// Ссылки на элементы DOMa
export default {
    galleryListRef: document.querySelector('.gallery'),
    searchFormRef: document.getElementById('search-form'),
    loadMoreBtnRef: document.querySelector('[data-action="load-more"]'),
    modalContainer: document.querySelector('div.lightbox'),
    modalCloseBtn: document.querySelector('button[data-action="close-lightbox"]'),
    modalImageElement: document.querySelector('.lightbox__image'),
    overlay: document.querySelector('div.lightbox__overlay'),
  };