import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { AnsweredQuesion } from "./AnsweredQuestion";
import { Question } from "./Question";

export const ViewQuestion = (props) => {
  let { id } = useParams();
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  const questions = useSelector((state) => state.questions);
  const question = questions[id];
  console.log(questions, id);
  const author = users[question.author];
  const answered = user.answers[id];
  if (answered && question.author) {
    return <AnsweredQuesion question={question} id={id} author={author} />;
  } else return <Question id={id} question={question} author={author} />;
};
