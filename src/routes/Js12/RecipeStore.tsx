export interface RecipeState {
  recipeOriginal: {};
  recipesData: [];
  loading: boolean;
}

export interface RecipeAction {
  type: "addRecipes" | "recipeLoading";
  resultRecipeObj: any;
  loadingCheck: boolean;
}

export default function recipesInfo(
  state: RecipeState = { recipeOriginal: {}, recipesData: [], loading: false },
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

        //? uniform units
        prevUnit.forEach((value, index) => {
          ingredient = ingredient
            .replace(value, changedUnit[index])
            .replace(/ *\([^)]*\) */g, " ");
        });

        //? seperate information into count, unit and ingredient
        const spliting = ingredient.split(" "); //array
        const unitIndex = spliting.findIndex((el) => changedUnit.includes(el)); //if there is a changed unit, return the index of it.

        //? if it is the case...
        let finalReturnValue = {};
        //there is a unit
        if (unitIndex > -1) {
          //! remember
          //! slice(<=,<) = return new array
          //! splice(from index, remove how many , optional) = it just modify original array
          const findFractionPart = spliting.slice(0, unitIndex);
          const findMinusFraction = findFractionPart[0].split("");
          const fuxxkingCount = (
            parseInt(findMinusFraction[0]) -
            parseInt(findMinusFraction[2]) / parseInt(findMinusFraction[4])
          ).toFixed(1);

          //? case1
          //const spliting = ["2","1/2","unit"......]
          //const findFractionPart = ["2","1/2"]
          if (findFractionPart.length === 2) {
            const fraction = findFractionPart[1].split("/"); // ["1","2"]
            finalReturnValue = {
              count:
                parseInt(findFractionPart[0]) +
                parseInt(fraction[0]) / parseInt(fraction[1]),
              unit: spliting[2],
              ingredient: spliting.slice(3).join(" "),
            };
          } else if (
            findFractionPart.length === 1 &&
            findFractionPart[0].split("").includes("-")
          ) {
            //? case2
            // const spliting = ["1-1/2","unit"....]
            // const findFractionPart = ["1-1/2"]
            finalReturnValue = {
              count: fuxxkingCount,
              unit: spliting[1],
              ingredient: spliting.slice(2).join(" "),
            };
          } else if (
            findFractionPart.length === 1 &&
            findFractionPart[0].split("").length === 1
          ) {
            //? case3
            //const spliting = ["1", "unit"....]
            // const findFractionPart = ["1"]
            finalReturnValue = {
              count: spliting[0],
              unit: spliting[1],
              ingredeint: spliting.slice(2).join(" "),
            };
          } else {
            //? case4
            //const spliting = ["1/2","unit"....]
            //const findFractionPart = ["1/2"]
            finalReturnValue = {
              count:
                parseInt(findMinusFraction[0]) / parseInt(findMinusFraction[2]),
              unit: spliting[1],
              ingredient: spliting.slice(2).join(" "),
            };
          }
        } else if (unitIndex === -1 && parseInt(spliting[0])) {
          //there is no unit but number in the first position
          finalReturnValue = {
            count: parseInt(spliting[0]),
            unit: "",
            ingredient: spliting.slice(1).join(" "),
          };
        } else if (unitIndex === -1) {
          //there is no unit and no number in the first position
          finalReturnValue = { count: 1, unit: "", ingredient };
        }

        return finalReturnValue;
      });
      return {
        ...state,
        recipeOriginal: action.resultRecipeObj,
        recipesData: newArray,
      };
    case "recipeLoading":
      return { ...state, loading: !state.loading };
    default:
      return state;
  }
}
