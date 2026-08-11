import { useQuery } from "@tanstack/react-query";
import { getAnimeHome } from "../api/anime";
import { getFilmHome } from "../api/film";
import { getDrakorHome } from "../api/drakor";
import { normalizeCollection } from "../utils/normalize";

const loaders = {
  anime: getAnimeHome,
  film: getFilmHome,
  drakor: getDrakorHome,
};

export default function useCatalog(type) {
  return useQuery({
    queryKey: ["catalog", type],
    queryFn: async () => normalizeCollection(await loaders[type](), type),
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
