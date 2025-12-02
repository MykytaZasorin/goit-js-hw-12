import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

const form = document.querySelector('.form');
const input = form.querySelector("input[name='search-text']");
const loadMoreBtn = document.querySelector('.js-load-more');

hideLoadMoreButton();

let query = '';
let page = 1;
let totalPages = 0;

form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(e) {
  e.preventDefault();

  query = input.value.trim();

  if (!query) {
    iziToast.error({
      message: 'Please enter a search query!',
      position: 'topRight',
    });
    return;
  }

  page = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);

    hideLoader();

    if (!data || data.hits.length === 0) {
      iziToast.info({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);
    totalPages = Math.ceil(data.totalHits / 15);

    if (page < totalPages) {
      showLoadMoreButton();
    }
  } catch (error) {
    hideLoader();
    iziToast.error({
      message: 'Error fetching data. Try again later.',
      position: 'topRight',
    });
  }
}

async function onLoadMore() {
  page += 1;

  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);

    hideLoader();
    createGallery(data.hits);
    smoothScroll();

    if (page >= totalPages) {
      iziToast.info({
        message: `We're sorry, but you've reached the end of search results.`,
        position: 'topRight',
      });
      hideLoadMoreButton();
    } else {
      showLoadMoreButton();
    }
  } catch (err) {
    hideLoader();
    iziToast.error({
      message: 'Error fetching additional images.',
      position: 'topRight',
    });
  }
}

function smoothScroll() {
  const galleryItem = document
    .querySelector('.gallery-item')
    .getBoundingClientRect().height;

  window.scrollBy({
    top: galleryItem * 2,
    behavior: 'smooth',
  });
}
