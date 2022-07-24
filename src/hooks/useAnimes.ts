import { useQuery, gql } from "@apollo/client";

const GET_ANIME_LIST = gql`
  query {
    Page(page: 1, perPage: 10) {
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

const useAnimes = () => {
  const { error, data: animes, loading } = useQuery(GET_ANIME_LIST);

  return { error, animes, loading };
};

export default useAnimes;
