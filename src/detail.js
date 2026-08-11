import client from "./client";

export async function getDetail(id) {
  const { data } = await client.get("/detail", {
    params: {
      id,
    },
  });

  return data;
}