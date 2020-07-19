export interface RecipeState {
  recipesData: {};
  loading: boolean;
}

export interface RecipeAction {
  type: "addRecipes" | "recipeLoading";
  resultRecipeAray: {};
  loadingCheck: boolean;
}

export default function recipesInfo(
  state: RecipeState = { recipesData: {}, loading: false },
  action: RecipeAction
) {
  switch (action.type) {
    case "addRecipes":
      return { ...state, recipesData: action.resultRecipeAray };
    case "recipeLoading":
      return { ...state, loading: !state.loading };
    default:
      return state;
  }
}
