import client from "./client";

export async function getPlay(id) {
  const { data } = await client.get("/play", {
    params: {
      id,
    },
  });

  return data;
}