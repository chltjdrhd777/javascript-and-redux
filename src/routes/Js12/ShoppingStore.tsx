import uniqid from "uniqid";
export interface ShoppingState {
  items: [];
}

export interface ShoppingAction {
  type: "receiveThisShoppingList";
  updatedArr: [];
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
    default:
      return state;
  }
}
