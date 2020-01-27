// API/TMDBApi.js

const API_TOKEN ="cb42c5a0c76c0767a767cc77c7ebda08";

export function getFilmsFromApiWithSearchedText (text) {
  const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function getImageFromApi (name)
{
  return 'https://image.tmdb.org/t/p/w300' + name
}
