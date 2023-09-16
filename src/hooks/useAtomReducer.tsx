import { PeopleResult } from "@/types";
import { TYPES } from "@/utils/enum";
import { atom, useAtom } from "jotai";

interface State {
  peopleList: PeopleResult[] | null;
}

interface Action {
  type: TYPES;
  payload: State;
}

const initialState: State = {
  peopleList: []
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case TYPES.CHARACTER_LIST:
      return {
        ...state,
        peopleList: action.payload
      };

    default:
      return state;
  }
};

const reducerAtom = atom(initialState, (get, set, action) => {
  set(reducerAtom, reducer(get(reducerAtom), action as Action));
});

const useItemList = (type: TYPES) => {
  const [items, dispatch] = useAtom(reducerAtom);

  const itemList = (payload: any) => {
    dispatch({
      type,
      payload
    });
  };

  return {
    items,
    itemList
  };
};

export default useItemList;
