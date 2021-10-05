import httpService from "./httpService";

export async function getGenres() {
  return httpService.get("/genres");
}
