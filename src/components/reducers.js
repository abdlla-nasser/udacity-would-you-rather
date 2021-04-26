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
      let questionToEdit = state[action.payload.id];
      let answerObj = questionToEdit[action.payload.answer];
      questionToEdit = {
        ...questionToEdit,
        [action.payload.answer]: {
          ...answerObj,
          votes: [...answerObj.votes, action.payload.authedUser],
        },
      };
      return { ...state, [action.paylaod.id]: { ...questionToEdit } };
    case "SAVE_NEW_QUESTION":
      return { ...state, [action.payload.id]: action.payload };
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
