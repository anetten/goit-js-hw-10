// import axios from 'axios';
// import SlimSelect from 'slim-select';
// import Notiflix from 'notiflix';
// import { fetchCatByBreed } from './cat-api.js';
// import { fetchBreeds } from './cat-api.js';

// const breedSelect = document.querySelector('.breed-select');
// const catInfo = document.querySelector('.cat-info');
// const loader = document.querySelector('.loader');
// const errorElement = document.querySelector('.error');

// const slim = new SlimSelect(breedSelect);

// fetchBreeds()
//   .then(breeds => {
//     hideLoader();
//     breeds.forEach(breed => {
//       slim.add({ text: breed.name, value: breed.id });
//     });
//   })
//   .catch(error => {
//     hideLoader();
//     Notiflix.Notify.warning('Error fetching cat breeds' + error.message);
//   });

// const showLoader = () => {
//   loader.style.display = 'block';
//   breedSelect.style.display = 'none';
//   catInfo.style.display = 'none';
//   errorElement.style.display = 'none';
// };

// const hideLoader = () => {
//   loader.style.display = 'none';
//   breedSelect.style.display = 'block';
//   catInfo.style.display = 'block';
//   errorElement.style.display = 'none';
// };

// const showError = message => {
//   errorElement.textContent = message;
//   errorElement.style.display = 'block';
// };

// showLoader();

// breedSelect.addEventListener('change', () => {
//   const selectedBreedId = slim.selected();
//   if (selectedBreedId) {
//     showLoader();
//     fetchCatByBreed(selectedBreedId)
//       .then(response => {
//         hideLoader();
//         errorElement.style.display = 'none';
//         const cat = response[0];

//         catInfo.innerHTML = `
//           <div class="cat-info-container">
//             <div class="cat-photo-container">
//               <img class="cat-photo" src="${cat.url}" alt="cat">
//             </div>
//             <div class="cat-details">
//               <h2>${cat.breeds[0].name}</h2>
//               <p>Description: ${cat.breeds[0].description}</p>
//               <p>Temperament: ${cat.breeds[0].temperament}</p>
//             </div>
//           </div>
//         `;
//       })
//       .catch(error => {
//         hideLoader();
//         showError('Error: ' + error.message);
//       });
//   }
// });

import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
let breeds = [];
let selectedBreed = null;
let catInfo = null;
const breedSelect = document.querySelector('.breed-select');
const catInfoDiv = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
breedSelect.addEventListener('change', handleBreedChange);
function showLoader() {
  loader.classList.add('show-loader');
}
function hideLoader() {
  loader.classList.remove('show-loader');
}
fetchBreeds()
  .then(data => {
    breeds = data;
    updateBreedSelectOptions();
    loader.style.display = 'none';
  })
  .catch(error => {
    Notiflix.Notify.failure(
      `Oops! Something went wrong! Try reloading the page!`
    );
  });
function updateBreedSelectOptions() {
  const elements = breeds.map(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.text = breed.name;
    return option;
  });
  breedSelect.append(...elements);
  breedSelect.style.display = 'flex';
  new SlimSelect({
    select: '#selected',
  });
}
function handleBreedChange(e) {
  selectedBreed = e.target.value;
  loader.style.display = 'block';
  catInfoDiv.style.display = 'none';
  fetchCatByBreed(selectedBreed)
    .then(data => {
      catInfo = data[0];
      updateCatInfoDiv();
    })
    .catch(error => {
      Notiflix.Notify.failure(
        `Oops! Something went wrong! Try reloading the page!`
      );
    })
    .finally(() => {
      loader.style.display = 'none';
    });
}
function updateCatInfoDiv() {
  catInfoDiv.innerHTML = `
    <img src="${catInfo.url}" alt="${catInfo.breeds[0].name}" style="width: 100%; height: 100%; object-fit: cover;" />
    <h2>${catInfo.breeds[0].name}</h2>
    <p>${catInfo.breeds[0].description}</p>
    <p><strong>Temperament:</strong> ${catInfo.breeds[0].temperament}</p>
  `;
  catInfoDiv.style.display = 'block';
}
