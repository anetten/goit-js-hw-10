// export function fetchBreeds() {
//   const BASE_URL = 'https://api.thecatapi.com/v1';
//   const END_POINT = '/breeds';
//   const PARAMS = `breeds`;
//   const url = BASE_URL + END_POINT + PARAMS;
//   const options = {
//     headers: {
//       'x-api-key':
//         'live_Xf6ifD60kI1Ix8AE25VmVrHQKN6wClRlrefL7AaQaQMXLBG2r4MCA1hB7x2lEe5v',
//     },
//   };
//   return fetch(url, options).then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   });
// }

// export function fetchCatByBreed(breedId) {
//   const BASE_URL = 'https://api.thecatapi.com/v1';
//   const END_POINT = '/images/search';
//   const PARAMS = `?breed_ids=${breedId}`;
//   const url = BASE_URL + END_POINT + PARAMS;
//   const options = {
//     headers: {
//       'x-api-key':
//         'live_Xf6ifD60kI1Ix8AE25VmVrHQKN6wClRlrefL7AaQaQMXLBG2r4MCA1hB7x2lEe5v',
//     },
//   };
//   return fetch(url, options).then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   });
// }

import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_Xf6ifD60kI1Ix8AE25VmVrHQKN6wClRlrefL7AaQaQMXLBG2r4MCA1hB7x2lEe5v';

export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}
