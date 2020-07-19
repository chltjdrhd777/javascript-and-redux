import { createStore } from "redux";
import { combineReducers } from "redux";
import { reducer } from "./SearchStore";
import recipesInfo from "./RecipeStore";

const combinedReducer = combineReducers({ reducer, recipesInfo });

export const store = createStore(combinedReducer);
