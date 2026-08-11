import client from "./client";

export async function getFilmHome() {
  const { data } = await client.get("/film?action=home");
  return data;
}
export async function getFilmTrending(page = 1) {
  const { data } = await client.get(`/film?action=trending&page=${page}`);
  return data;
}
export async function searchFilm(keyword, page = 1) {
  const { data } = await client.get(`/film?action=search&keyword=${encodeURIComponent(keyword)}&page=${page}`);
  return data;
}
export async function getFilmDetail(detailPath, id = "") {
  const { data } = await client.get("/film?action=detail", {
    params: { detailPath, id },
  });
  return data;
}
export async function getFilmPlay(subjectId, detailPath, se = "", ep = "", lang = "in_id") {
  const { data } = await client.get("/film?action=play", {
    params: { subjectId, detailPath, se, ep, lang },
  });
  return data;
}
