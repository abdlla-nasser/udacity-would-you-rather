import {
  _getQuestions,
  _getUsers,
  _saveNewUser,
  _saveQuestion,
  _saveQuestionAnswer,
} from "../_Data";
export function getUsers() {
  return function (dispatch) {
    return _getUsers().then((res) => {
      dispatch({ type: "LOAD_USERS", payload: res });
      return res;
    });
  };
}
export function saveQuestionAnswer(question) {
  return function (dispatch) {
    return _saveQuestionAnswer(question).then((res) => {
      dispatch({
        type: "SAVE_QUESTION_ANSWER",
        payload: {
          ...question,
        },
      });
      dispatch({
        type: "USER_ANSWER",
        payload: { [question.qid]: question.answer },
      });
      dispatch(getQuestions);
    });
  };
}
export function saveQuestion(question) {
  return function (dispatch) {
    return _saveQuestion(question).then(async (res) => {
      await dispatch({ type: "SAVE_NEW_QUESTION", payload: res });
      return res;
    });
  };
}
export function saveNewUser(user) {
  return function (dispatch) {
    return _saveNewUser(user).then((res) => {
      console.log(res);
      dispatch({ type: "SIGN_UP", payload: { ...res[user.id] } });
      dispatch(getUsers);
    });
  };
}
export function getQuestions() {
  return function (dispatch) {
    return _getQuestions().then((res) => {
      dispatch({ type: "LOAD_QUESTIONS", payload: res });
    });
  };
}
