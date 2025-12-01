import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';
import {
  newGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';

const form = document.querySelector('.form');
const input = form.querySelector("input[name='search-text']");

form.addEventListener('submit', onSearch);

async function onSearch(e) {
  e.preventDefault();

  const query = input.value.trim();

  if (!query) {
    iziToast.error({
      message: 'Please enter a search query!',
      position: 'topRight',
    });
    return;
  }

  clearGallery();
  showLoader();

  try {
    const data = await getImagesByQuery(query);

    hideLoader();

    if (data.hits.length === 0) {
      iziToast.info({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    newGallery(data.hits);
  } catch (error) {
    hideLoader();
    iziToast.error({
      message: 'Error fetching data. Try again later.',
      position: 'topRight',
    });
  }
}
