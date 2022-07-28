import React, { useReducer, Dispatch } from "react";
import { Collections } from "../types/CollectionTypes";
import { Media, Data } from "../types/AnimeDetailsTypes";

type Props = {
  children?: React.ReactNode;
};

type InitialStateTypes = {
  modals: {
    add_to_collection: boolean;
    remove_collection_modal: boolean;
  };
  collections: Collections[];
};

type ACTIONTYPE =
  | { type: "HIDE_MODAL_ADD_TO_COLLECTION" }
  | { type: "SHOW_MODAL_ADD_TO_COLLECTION" }
  | { type: "HIDE_REMOVE_COLLECTION_MODAL" }
  | { type: "SHOW_REMOVE_COLLECTION_MODAL" }
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
  | { type: "REMOVE_COLLECTION"; payload: { collection_id: string } };

export const initialState: InitialStateTypes = {
  modals: {
    add_to_collection: false,
    remove_collection_modal: false,
  },
  collections: [],
};

const reducer = (state: typeof initialState, action: ACTIONTYPE) => {
  switch (action.type) {
    case "SHOW_MODAL_ADD_TO_COLLECTION":
      return {
        ...state,
        modals: {
          add_to_collection: true,
          remove_collection_modal: state.modals.remove_collection_modal,
        },
      };
    case "HIDE_MODAL_ADD_TO_COLLECTION":
      return {
        ...state,
        modals: {
          add_to_collection: false,
          remove_collection_modal: state.modals.remove_collection_modal,
        },
      };
    case "SHOW_REMOVE_COLLECTION_MODAL":
      return {
        ...state,
        modals: {
          add_to_collection: state.modals.add_to_collection,
          remove_collection_modal: true,
        },
      };
    case "HIDE_REMOVE_COLLECTION_MODAL":
      return {
        ...state,
        modals: {
          add_to_collection: state.modals.add_to_collection,
          remove_collection_modal: false,
        },
      };
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
