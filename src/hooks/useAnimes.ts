import { useQuery, gql } from "@apollo/client";
import { AnimeListResponse } from "../types/AnimeListTypes";

const GET_ANIME_LIST = gql`
  query GetAnimeList($page: Int!, $perPage: Int!) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      media(type: ANIME) {
        id
        title {
          english
        }
        coverImage {
          extraLarge
          large
          medium
          color
        }
        trending
        averageScore
        countryOfOrigin
        genres
        seasonYear
      }
    }
  }
`;

const useAnimes = (page: number, perPage: number): AnimeListResponse => {
  const {
    error,
    data: animes,
    loading,
  } = useQuery(GET_ANIME_LIST, {
    variables: {
      page,
      perPage,
    },
  });

  return { error, animes, loading };
};

export default useAnimes;
