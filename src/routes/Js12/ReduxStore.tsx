import { createStore } from "redux";

export interface State {
  value: string;
  result: [] | Promise<any>;
}

export interface ActionDef {
  type: "searchList" | "submitted";
  typing: string;
  submittedResult: any;
}

const reducer = (
  state: State = { value: "", result: [] },
  action: ActionDef
) => {
  switch (action.type) {
    case "searchList":
      return { ...state, value: action.typing };
    case "submitted":
      return { ...state, result: action.submittedResult };
    default:
      return state;
  }
};

export const store = createStore(reducer);
