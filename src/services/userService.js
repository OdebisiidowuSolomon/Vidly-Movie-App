import httpService from "./httpService";

const apiEndpoint = "/users";

function movieUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export async function register({ username, password, name }) {
  return httpService.post(apiEndpoint, {
    email: username,
    password,
    name,
  });
}

export async function getUser(id) {
  return httpService.get("/me");
}
