import { combineReducers } from "redux";
function userReducer(state = {}, action) {
  switch (action.type) {
    case "SIGN_IN":
      return { ...state, ...action.payload };
    case "LOGOUT":
      return {};
    case "SELECTED":
      return { ...state, selected: action.payload };
    case "SIGN_UP":
      return { ...state, ...action.payload };
    case "USER_ANSWER":
      return { ...state, answers: { ...state.answers, ...action.payload } };
    default:
      return state;
  }
}
function questionsReducer(state = {}, action) {
  switch (action.type) {
    case "LOAD_QUESTIONS":
      return { ...state, ...action.payload };
    case "SAVE_QUESTION_ANSWER":
      return { ...state };
    case "SAVE_NEW_QUESTION":
      return { ...state };
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
export const rootReducer = combineReducers({
  user: userReducer,
  users: usersReducer,
  questions: questionsReducer,
});
