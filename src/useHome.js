import { useQueries } from "@tanstack/react-query";
import { getAnimeHome } from "../api/anime";
import { getFilmHome } from "../api/film";
import { getDrakorHome } from "../api/drakor";
import { normalizeCollection } from "../utils/normalize";

export default function useHome() {
  const queries = useQueries({
    queries: [
      { queryKey: ["home","anime"], queryFn: async () => getAnimeHome(), staleTime: 300000, retry: 1 },
      { queryKey: ["home","film"], queryFn: async () => getFilmHome(), staleTime: 300000, retry: 1 },
      { queryKey: ["home","drakor"], queryFn: async () => getDrakorHome(), staleTime: 300000, retry: 1 },
    ],
  });

  return {
    animeRaw: queries[0].data,
    filmRaw: queries[1].data,
    drakorRaw: queries[2].data,
    anime: normalizeCollection(queries[0].data, "anime"),
    film: normalizeCollection(queries[1].data, "film"),
    drakor: normalizeCollection(queries[2].data, "drakor"),
    isLoading: queries.some(q => q.isLoading),
    isError: queries.every(q => q.isError),
    errors: queries.map(q => q.error).filter(Boolean),
  };
}
