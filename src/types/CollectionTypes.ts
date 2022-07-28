import { Media, Data } from "./AnimeDetailsTypes";

export interface Collections {
  id: string;
  collection_name: string;
  cover_image: string;
  data: Data[];
}
