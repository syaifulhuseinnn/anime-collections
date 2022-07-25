import { gql, useQuery } from "@apollo/client";
import { AnimeDetailsResponse } from "../types/AnimeDetailsTypes";

const GET_ANIME_DETAILS = gql`
  query GetAnimeDetails($id: Int!) {
    Media(id: $id) {
      id
      title {
        english
      }
      coverImage {
        extraLarge
        color
      }
      bannerImage
      description
      genres
      averageScore
      duration
      seasonYear
      episodes
      characters(role: MAIN) {
        nodes {
          id
          name {
            full
          }
          image {
            medium
          }
        }
      }
    }
  }
`;

export default function useGetAnime(id: number): AnimeDetailsResponse {
  const {
    error,
    data: anime,
    loading,
  } = useQuery(GET_ANIME_DETAILS, {
    variables: {
      id,
    },
  });

  return { error, anime, loading };
}
