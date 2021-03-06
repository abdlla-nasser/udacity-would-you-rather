import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "./reducers";
import thunk from "redux-thunk";

const middlewareEnhancer = applyMiddleware(thunk);

export let store = createStore(
  rootReducer,
  composeWithDevTools(middlewareEnhancer)
);
