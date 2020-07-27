import { createStore } from "redux";
import { combineReducers } from "redux";
import { reducer } from "./SearchStore";
import recipesInfo from "./RecipeStore";
import shoppingList from "./ShoppingStore";

const combinedReducer = combineReducers({ reducer, recipesInfo, shoppingList });

export const store = createStore(combinedReducer);
