export interface State {
  value: string;
  result: any[];
  loading: boolean;
  resultPage: { presentPage: number; totalPage: any[] };
}

export interface ActionDef {
  type:
    | "searchList"
    | "submitted"
    | "nowLoading"
    | "increasePage"
    | "decreasePage";
  typing: string;
  submittedResult: any;
}

export const reducer = (
  state: State = {
    value: "",
    result: [],
    loading: false,
    resultPage: { presentPage: 0, totalPage: [] },
  },
  action: ActionDef
) => {
  switch (action.type) {
    case "searchList":
      return { ...state, value: action.typing };

    case "submitted":
      const resultPageArray: any[] = [];
      for (
        let i = 0;
        i < Math.floor(action.submittedResult.length / 7 + 1);
        i++
      ) {
        const slicing = action.submittedResult.slice(i * 7, (i + 1) * 7);
        if (slicing.length !== 0) {
          resultPageArray.push(slicing);
        }
      }
      return {
        ...state,
        result: action.submittedResult,
        resultPage: { ...state.resultPage, totalPage: resultPageArray },
        loading: false,
      };

    case "nowLoading":
      return { ...state, loading: true };

    case "decreasePage":
      return {
        ...state,
        resultPage: {
          ...state.resultPage,
          presentPage: state.resultPage.presentPage - 1,
        },
      };
    case "increasePage":
      return {
        ...state,
        resultPage: {
          ...state.resultPage,
          presentPage: state.resultPage.presentPage + 1,
        },
      };
    default:
      return state;
  }
};
