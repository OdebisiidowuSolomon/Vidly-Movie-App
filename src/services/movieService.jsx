import httpService from "./httpService";

const apiEndpoint = "/movies";

function movieUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getMovies() {
  return httpService.get(apiEndpoint);
}

export async function deleteMovie(id) {
  return httpService.delete(movieUrl(id));
}

export async function getMovie(id) {
  return httpService.get(movieUrl(id));
}
export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return httpService
      .put(movieUrl(movie._id), body)
      .then((res) => res)
      .catch((err) => {
        throw new Error(err);
      });
  }

  return httpService.post(apiEndpoint, movie);
}
