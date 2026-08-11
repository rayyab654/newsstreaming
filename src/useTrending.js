import { useQuery } from "@tanstack/react-query";

import { getHome } from "@/api/home";

import {
  normalizeTrending,
} from "@/utils/normalize";

export default function useTrending() {

  return useQuery({

    queryKey:["trending"],

    queryFn:async()=>{

      const data=await getHome();

      return normalizeTrending(

        data.providers.anime.data.sliders

      );

    },

    staleTime:1000*60*5,

  });

}