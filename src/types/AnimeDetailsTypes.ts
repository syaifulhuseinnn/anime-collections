export interface AnimeDetailsResponse {
  loading: boolean;
  error: any;
  anime: Data;
}

export interface Data {
  Media: Media;
}

export interface Media {
  id: number;
  title: Title;
  coverImage: CoverImage;
  bannerImage: null;
  description: string;
  genres: string[];
  averageScore: number;
  duration: number;
  seasonYear: number;
  episodes: number;
  characters: Characters;
  countryOfOrigin: string;
  __typename: string;
}

export interface Characters {
  nodes: Node[];
  __typename: string;
}

export interface Node {
  id: number;
  name: Name;
  image: Image;
  __typename: string;
}

export interface Image {
  medium: string;
  __typename: string;
}

export interface Name {
  full: string;
  __typename: string;
}

export interface CoverImage {
  extraLarge: string;
  color: string;
  __typename: string;
}

export interface Title {
  english: string;
  __typename: string;
}
