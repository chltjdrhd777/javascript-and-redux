import uniqid from "uniqid";
export interface ShoppingState {
  items: [];
}

export interface ShoppingAction {
  type: "receiveThisShoppingList" | "deleteList" | "addRecipes";
  updatedArr: [];
  id: string;
}

export default function shoppingList(
  state: ShoppingState = {
    items: [],
  },
  action: ShoppingAction
) {
  switch (action.type) {
    case "receiveThisShoppingList":
      const Idgranted = action.updatedArr.map((el: any) => {
        const newArr = { id: uniqid(), ...el };
        return newArr;
      });
      return { ...state, items: Idgranted };
    case "deleteList":
      const deleteUpdate = state.items.filter((el: any) => el.id !== action.id);
      return { ...state, items: deleteUpdate };

    case "addRecipes":
      return { ...state, items: [] };
    default:
      return state;
  }
}
