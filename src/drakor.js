import client from "./client";

export async function getDrakorHome() {
  const { data } = await client.get("/drakor?action=home");
  return data;
}
export async function getDrakorList(page = 1) {
  const { data } = await client.get(`/drakor?action=list&page=${page}`);
  return data;
}
export async function getDrakorDetail(path) {
  const { data } = await client.get(`/drakor?action=detail&path=${encodeURIComponent(path)}`);
  return data;
}
export async function getDrakorPlay(id) {
  const { data } = await client.get(`/drakor?action=play&episode_id=${encodeURIComponent(id)}`);
  return data;
}
