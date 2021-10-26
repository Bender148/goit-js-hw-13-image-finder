// Функции обработки разметки
function markupRender(markup, place) {
    place.insertAdjacentHTML('beforeend', markup);
  }
  
  function clearGallery(place) {
    place.innerHTML = '';
  }
  
  export default { markupRender, clearGallery };