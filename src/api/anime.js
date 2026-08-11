import client from "./client";

export async function getAnimeHome() {
  const { data } = await client.get("/anime?action=home");
  return data;
}
export async function getAnimeSchedule() {
  const { data } = await client.get("/anime?action=schedule");
  return data;
}
export async function getAnimeGenres() {
  const { data } = await client.get("/anime?action=genres");
  return data;
}
export async function getAnimeList(page = 1) {
  const { data } = await client.get(`/anime?action=list&page=${page}`);
  return data;
}
export async function getAnimeDetail(path) {
  const { data } = await client.get(`/anime?action=detail&path=${encodeURIComponent(path)}`);
  return data;
}
export async function getAnimePlay(id) {
  const { data } = await client.get(`/anime?action=play&episode_id=${encodeURIComponent(id)}`);
  return data;
}
