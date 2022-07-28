import React, { useReducer, Dispatch } from "react";
import { Collections } from "../types/CollectionTypes";
import { Media, Data } from "../types/AnimeDetailsTypes";

type Props = {
  children?: React.ReactNode;
};

type InitialStateTypes = {
  modals: {
    addToCollection: boolean;
  };
  collections: Collections[];
};

type ACTIONTYPE =
  | { type: "HIDE_MODAL_ADD_TO_COLLECTION" }
  | { type: "SHOW_MODAL_ADD_TO_COLLECTION" }
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
  | { type: "ADD_ANIME_TO_COLLECTION"; payload: { id: string; data: Data } };

export const initialState: InitialStateTypes = {
  modals: {
    addToCollection: false,
  },
  collections: [],
};

const reducer = (state: typeof initialState, action: ACTIONTYPE) => {
  switch (action.type) {
    case "SHOW_MODAL_ADD_TO_COLLECTION":
      console.warn("TERPANGGIL 1");
      return {
        ...state,
        modals: {
          addToCollection: true,
        },
      };
    case "HIDE_MODAL_ADD_TO_COLLECTION":
      console.warn("TERPANGGIL 2");

      return {
        ...state,
        modals: {
          addToCollection: false,
        },
      };
    case "CREATE_A_NEW_COLLECTION":
      console.warn("TERPANGGIL 3");

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
      console.warn("TERPANGGIL 4");

      let collections = localStorage.getItem("collections");
      if (collections) {
        console.log("ada");
        return {
          ...state,
          collections: JSON.parse(collections),
        };
      } else {
        console.log("gkada");

        return state;
      }
    case "ADD_ANIME_TO_COLLECTION":
      console.warn("TERPANGGIL 5");

      const indexCollection = state.collections.findIndex(
        (collection) => collection.id === action.payload.id
      );
      // console.log(action.payload);
      let updatedCollections = [...state.collections];
      updatedCollections[indexCollection].data.push(action.payload.data);
      localStorage.setItem("collections", JSON.stringify(updatedCollections));

      return {
        ...state,
        collections: updatedCollections,
      };
    default:
      console.warn("TERPANGGIL 6");
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
