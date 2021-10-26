import refs from '../js/refs.js';
const basicLightbox = require('basiclightbox');
const {
  galleryListRef,
  modalContainer,
  modalCloseBtn,
  modalImageElement,
  overlay,
} = refs;

// Создание модалки
const galleryModal = basicLightbox.create(modalImageElement);

// Добавление слушателя событий 
galleryListRef.addEventListener('click', openModal);
modalCloseBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// Функции
// Функция, которая вызывается при открытом модальном окне
function openModal(event) {
  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const originalImageSource = event.target.dataset.source;
  modalImageElement.setAttribute('src', originalImageSource);

  galleryModal.show();

  modalContainer.classList.add('is-open');

  window.addEventListener('keydown', onPressEscape);
}

// Функция, которая вызывается при закрытии модального окна
function closeModal() {
  if (event.target.nodeName === 'IMG') {
    return;
  }

  modalImageElement.setAttribute('src', '');
  modalContainer.classList.remove('is-open');

  galleryModal.close();

  // Удаление слушателя событий
  window.removeEventListener('keydown', onPressEscape);
}

// Функция, которая закрывает модальное окно при нажатии клавиши 'Escape'
function onPressEscape(event) {
  if (event.code === 'Escape') {
    closeModal();
  }
}