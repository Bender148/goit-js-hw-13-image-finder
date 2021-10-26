// Импорт необходимых ресурсов
import refs from './refs.js';
import galleryCardTpl from '../templates/galleryItem.hbs';
import pixabayApi from './apiService.js';
import markupApi from './markup.js';
import loadMoreBtnApi from './loadMoreBtn.js';
import showError from './notifications.js';

// Деструктуризация
const { galleryListRef, searchFormRef, loadMoreBtnRef } = refs;
const { markupRender, clearGallery } = markupApi;
const errorMessage = 'No matches were found! Check your spelling :)';

// Скрытие кнопки 'Загрузить еще'
loadMoreBtnApi.hide();

// Добавление слушателя событий
searchFormRef.addEventListener('submit', onImageSearch);
// Добавление слушателя событий к кнопке 'Загрузить еще'
loadMoreBtnRef.addEventListener('click', onLoadMore);

// Функция
// Функция, которая обрабатывает полученные данные
function showSearchResult() {
  pixabayApi
    .fetchImages()
    .then(dataArray => galleryCardTpl(dataArray))
    .then(markup => {
      markupRender(markup, galleryListRef);
      // Условие предотвращения прокрутки страницы на самом первом пакете изображений
      if (pixabayApi.pageNumber > 2) {
        window.scrollBy({
          // Страница прокручивается по высоте окна
          top: window.innerHeight - 110,
          behavior: 'smooth',
        });
      }
      if (pixabayApi.isLastPage) {
        loadMoreBtnApi.hide();
      } else {
        loadMoreBtnApi.show();
        loadMoreBtnApi.enable();
      }
    })
    .catch(er => {
      loadMoreBtnApi.hide();
      showError(er);
    });
}

// Функция, которая обрабатывает отправку формы поиска
function onImageSearch(event) {
  event.preventDefault();

  pixabayApi.query = searchFormRef.elements.query.value;

  clearGallery(galleryListRef);
  pixabayApi.resetPage();

  showSearchResult();

  searchFormRef.reset();
}

// Функция, обрабатывающая нажатие кнопки 'Загрузить еще'
function onLoadMore() {
  loadMoreBtnApi.disable();
  showSearchResult();
}