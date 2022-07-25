import React, { useReducer, Dispatch } from "react";

type Props = {
  children?: React.ReactNode;
};

type InitialStateType = {
  page: number;
};

type ACTIONTYPE =
  | { type: "NEXT_PAGE"; payload: number }
  | { type: "PREVIOUS_PAGE"; payload: number };

export const initialState = {
  page: 1,
};

const reducer = (state: typeof initialState, action: ACTIONTYPE) => {
  switch (action.type) {
    case "NEXT_PAGE":
      return {
        ...state,
        page: state.page + action.payload,
      };
    default:
      return state;
  }
};

const IndexContext = React.createContext<{
  state: InitialStateType;
  dispatch: Dispatch<ACTIONTYPE>;
}>({ state: initialState, dispatch: () => null });

const IndexProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <IndexContext.Provider value={{ state, dispatch }}>
      {children}
    </IndexContext.Provider>
  );
};

export { IndexContext, IndexProvider };
