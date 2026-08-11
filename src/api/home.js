import client from "./client";

export async function getHome() {
  const { data } = await client.get("/home");
  return data;
}
