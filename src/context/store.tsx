import React, { useReducer, Dispatch } from "react";
import { Collections } from "../types/CollectionTypes";
import { Data } from "../types/AnimeDetailsTypes";

type Props = {
  children?: React.ReactNode;
};

type InitialStateTypes = {
  collections: Collections[];
};

type ACTIONTYPE =
  | {
      type: "CREATE_A_NEW_COLLECTION";
      payload: {
        id: string;
        collection_name: string;
        cover_image: string;
        data: [];
      };
    }
  | {
      type: "GET_COLLECTIONS";
    }
  | { type: "ADD_ANIME_TO_COLLECTION"; payload: { id: string; data: Data } }
  | { type: "REMOVE_COLLECTION"; payload: { collection_id: string } }
  | {
      type: "REMOVE_ANIME_FROM_COLLECTION";
      payload: { collection_id: string; anime_id: number };
    };

export const initialState: InitialStateTypes = {
  collections: [],
};

const reducer = (state: typeof initialState, action: ACTIONTYPE) => {
  switch (action.type) {
    case "CREATE_A_NEW_COLLECTION":
      const newCollectionsState = [...state.collections, action.payload];
      localStorage.setItem("collections", JSON.stringify(newCollectionsState));
      return {
        ...state,
        collections: [
          ...state.collections,
          {
            id: action.payload.id,
            collection_name: action.payload.collection_name,
            cover_image: action.payload.cover_image,
            data: [],
          },
        ],
      };
    case "GET_COLLECTIONS":
      let collections = localStorage.getItem("collections");
      if (collections) {
        return {
          ...state,
          collections: JSON.parse(collections),
        };
      } else {
        return state;
      }
    case "ADD_ANIME_TO_COLLECTION":
      const addIndex = state.collections.findIndex(
        (collection) => collection.id === action.payload.id
      );
      let updatedCollections = [...state.collections];
      updatedCollections[addIndex].data.push(action.payload.data);
      localStorage.setItem("collections", JSON.stringify(updatedCollections));

      return {
        ...state,
        collections: updatedCollections,
      };
    case "REMOVE_COLLECTION":
      const deleteIndex = state.collections.findIndex(
        (collection) => collection.id === action.payload.collection_id
      );
      let deletedCollection = [...state.collections];
      deletedCollection.splice(deleteIndex, 1);
      localStorage.setItem("collections", JSON.stringify(deletedCollection));

      return {
        ...state,
        collections: deletedCollection,
      };
    case "REMOVE_ANIME_FROM_COLLECTION":
      let removedAnime = [...state.collections];
      const findIndexCollection = state.collections.findIndex(
        (collection) => collection.id === action.payload.collection_id
      );
      const findAnimeIndex = removedAnime[findIndexCollection].data.findIndex(
        (anime) => anime.Media.id === action.payload.anime_id
      );
      removedAnime[findIndexCollection].data.splice(findAnimeIndex, 1);
      localStorage.setItem("collections", JSON.stringify(removedAnime));

      return {
        ...state,
        collections: removedAnime,
      };
    default:
      return state;
  }
};

const Context = React.createContext<{
  state: InitialStateTypes;
  dispatch: Dispatch<ACTIONTYPE>;
}>({ state: initialState, dispatch: () => null });

const Provider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export { Context, Provider };
