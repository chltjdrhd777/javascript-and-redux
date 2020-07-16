import { createStore } from "redux";

export interface State {
  value: string;
  result: any[];
  loading: boolean;
}

export interface ActionDef {
  type: "searchList" | "submitted" | "nowLoading";
  typing: string;
  submittedResult: any;
}

const reducer = (
  state: State = {
    value: "",
    result: [],
    loading: false,
  },
  action: ActionDef
) => {
  switch (action.type) {
    case "searchList":
      return { ...state, value: action.typing };
    case "submitted":
      return { ...state, result: action.submittedResult, loading: false };
    case "nowLoading":
      return { ...state, loading: true };
    default:
      return state;
  }
};

export const store = createStore(reducer);
