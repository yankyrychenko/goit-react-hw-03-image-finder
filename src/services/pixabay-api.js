import axios from 'axios';

export function fetchImages(searchQuery, currentPage) {
  return axios
    .get(
      `https://pixabay.com/api/?q=${searchQuery}&page=${currentPage}&key=20084320-731f9d372c1a5afe5fa0892cc&image_type=photo&orientation=horizontal&per_page=12`,
    )
    .then(response => response.data.hits);
}
