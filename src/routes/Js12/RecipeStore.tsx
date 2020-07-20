export interface RecipeState {
  recipesData: {};
  loading: boolean;
}

export interface RecipeAction {
  type: "addRecipes" | "recipeLoading";
  resultRecipeObj: any;
  loadingCheck: boolean;
}

export default function recipesInfo(
  state: RecipeState = { recipesData: {}, loading: false },
  action: RecipeAction
) {
  switch (action.type) {
    case "addRecipes":
      const prevUnit = [
        "tablespoons",
        "tablespoon",
        "ounces",
        "ounce",
        "teaspoons",
        "teaspoon",
        "cups",
        "pounds",
      ];
      const changedUnit = [
        "tbsp",
        "tbsp",
        "oz",
        "oz",
        "tsp",
        "tsp",
        "cup",
        "pound",
      ];
      const newArray = action.resultRecipeObj.ingredients.map((el: string) => {
        let ingredient = el.toLowerCase();
        prevUnit.forEach((value, index) => {
          ingredient = ingredient
            .replace(value, changedUnit[index])
            .replace(/ *\([^)]*\) */g, " ");
        });
        return ingredient;
      });
      return { ...state, recipesData: newArray };
    case "recipeLoading":
      return { ...state, loading: !state.loading };
    default:
      return state;
  }
}
