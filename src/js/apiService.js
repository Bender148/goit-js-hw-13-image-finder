const apiKey = '24042755-bf22cff341e4e7dedcdedf3c3';
const BASE_URL = 'https://pixabay.com/api/';
const errorMessage = 'No pictures find. Try another one.';

// Обработка запроса
export default {
  searchQuery: '',
  pageNumber: 1,
  perPage: 12,
  totalPages: 0,
  isLastPage: false,

  fetchImages() {
    const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.pageNumber}&per_page=${this.perPage}&key=${apiKey}`;
    return fetch(url)
      .then(response => response.json())
      .then(({ hits, totalHits }) => {
        this.totalPages = Math.ceil(totalHits / this.perPage);

        // Проверка последней страницей
        if (this.totalPages === this.pageNumber) {
          this.isLastPage = true;
        } else {
          this.isLastPage = false;
        }
        // Если ничего не найдено
        if (!this.totalPages) {
          return Promise.reject(errorMessage);
        }

        this.incrementPage();
        return hits;
      });
  },
  resetPage() {
    this.pageNumber = 1;
  },
  incrementPage() {
    this.pageNumber += 1;
  },
  get query() {
    return this.searchQuery;
  },
  set query(newSearchQuery) {
    this.searchQuery = newSearchQuery;
  },
};