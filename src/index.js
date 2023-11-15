import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_Xf6ifD60kI1Ix8AE25VmVrHQKN6wClRlrefL7AaQaQMXLBG2r4MCA1hB7x2lEe5v';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import { fetchCatByBreed } from './cat-api.js';
import { fetchBreeds } from './cat-api.js';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const errorElement = document.querySelector('.error');

const slim = new SlimSelect(breedSelect);

fetchBreeds()
  .then(breeds => {
    hideLoader();
    const data = breeds.map(breed => ({ text: breed.name, value: breed.id }));
    slim.setData(data);
    // breeds.forEach(breed => {
    //   slim.add({ text: breed.name, value: breed.id });
    // });
  })
  .catch(error => {
    hideLoader();
    Notiflix.Notify.warning('Error fetching cat breeds' + error.message);
  });

const showLoader = () => {
  loader.style.display = 'block';
  breedSelect.style.display = 'none';
  catInfo.style.display = 'none';
  errorElement.style.display = 'none';
};

const hideLoader = () => {
  loader.style.display = 'none';
  breedSelect.style.display = 'block';
  catInfo.style.display = 'block';
  errorElement.style.display = 'none';
};

const showError = message => {
  errorElement.textContent = message;
  errorElement.style.display = 'block';
};

breedSelect.addEventListener('change', () => {
  // const selectedBreedId = slim.selected();
  const selectedBreedId = slim.selected();
  const selectedBreedIdValue = selectedBreedId ? selectedBreedId.value : null;

  if (selectedBreedId) {
    showLoader();
    fetchCatByBreed(selectedBreedIdValue)
      .then(response => {
        hideLoader();
        errorElement.style.display = 'none';
        const cat = response[0];

        catInfo.innerHTML = `
          <div class="cat-info-container">
            <div class="cat-photo-container">
              <img class="cat-photo" src="${cat.url}" alt="cat">
            </div>
            <div class="cat-details">
              <h2>${cat.breeds[0].name}</h2>
              <p>Description: ${cat.breeds[0].description}</p>
              <p>Temperament: ${cat.breeds[0].temperament}</p>
            </div>
          </div>
        `;
      })
      .catch(error => {
        hideLoader();
        showError('Error: ' + error.message);
      });
  }
});
