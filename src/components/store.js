import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { _getQuestions, _getUsers } from "../_Data";
import thunk from "redux-thunk";

function userReducer(state = {}, action) {
  switch (action.type) {
    case "SIGN_IN":
      return { ...state, ...action.payload };
    case "LOGOUT":
      return {};
    default:
      return state;
  }
}
function questionsReducer(state = {}, action) {
  switch (action.type) {
    case "LOAD_QUESTIONS":
      return { ...state, ...action.payload };
    // case "CREATE_QUESTION":
    default:
      return state;
  }
}
function usersReducer(state = {}, action) {
  switch (action.type) {
    case "LOAD_USERS":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
const middlewareEnhancer = applyMiddleware(thunk);
export function getUsers(dispatch) {
  return _getUsers().then((res) =>
    dispatch({ type: "LOAD_USERS", payload: res })
  );
}
// export function createQuestion(question) {
//   return (dispatch) => {
//     _saveQuestion(question).then(() => {
//       dispatch({})
//     })
//   }
// }
export function getQuestions(dispatch) {
  return _getQuestions().then((res) => {
    dispatch({ type: "LOAD_QUESTIONS", payload: res });
  });
}
const rootReducer = combineReducers({
  user: userReducer,
  users: usersReducer,
  questions: questionsReducer,
});
export let store = createStore(
  rootReducer,
  composeWithDevTools(middlewareEnhancer)
);
