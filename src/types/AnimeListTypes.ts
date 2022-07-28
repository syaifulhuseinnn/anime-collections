export interface AnimeListResponse {
  loading: boolean;
  error: any;
  animes: Data;
}

export interface Data {
  Page: Page;
}

export interface Page {
  pageInfo: PageInfo;
  media: Media[];
  __typename: string;
}

export interface Media {
  id: number;
  title: Title;
  coverImage: CoverImage;
  trending: number;
  averageScore: number;
  countryOfOrigin: CountryOfOrigin;
  genres: string[];
  seasonYear: number;
  __typename: MediaTypename;
}

export enum MediaTypename {
  Media = "Media",
}

export enum CountryOfOrigin {
  Jp = "JP",
}

export interface CoverImage {
  extraLarge: string;
  large: string;
  medium: string;
  color: null | string;
  __typename: CoverImageTypename;
}

export enum CoverImageTypename {
  MediaCoverImage = "MediaCoverImage",
}

export interface Title {
  english: null | string;
  __typename: TitleTypename;
}

export enum TitleTypename {
  MediaTitle = "MediaTitle",
}

export interface PageInfo {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  hasNextPage: boolean;
  __typename: string;
}
