import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router";
import { AnsweredQuesion } from "./AnsweredQuestion";
import { Question } from "./Question";

export const ViewQuestion = (props) => {
  let { id } = useParams();
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  const questions = useSelector((state) => state.questions);
  const [author, setAuthor] = useState({});
  const question = questions[id];
  useEffect(() => {
    if (!question || !question.id) {
      history.push("/notfound");
    } else setAuthor(users[question.author]);
  }, [question, history, users]);
  const answered = () => {
    if (!user.answers[id] && (!question || !question.id)) {
      history.push("/notfound");
      return;
    }
    if (user.answers[id]) {
      return true;
    } else {
      return false;
    }
  };
  if (answered()) {
    return <AnsweredQuesion question={question} id={id} author={author} />;
  } else return <Question id={id} question={question} author={author} />;
};
