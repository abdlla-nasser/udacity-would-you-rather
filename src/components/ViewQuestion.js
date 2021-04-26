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
  const [question, setQuestion] = useState({
    optionOne: { text: "", votes: [] },
    optionTwo: { text: "", votes: [] },
  });
  useEffect(() => {
    if (id && Object.keys(questions).length) {
      let question = questions[id];
      let author = users[question.author];
      setQuestion(question);
      setAuthor(author);
    }
    if (question && question.id) {
      setAuthor(users[question.author]);
    }
  }, [id, questions, users]);
  const answered = () => {
    if (!user.answers[id] && (question || question.id)) {
      return false;
    }
    if (user.answers[id]) {
      return true;
    } else {
      history.push("/notfound");
    }
  };
  if (answered()) {
    return <AnsweredQuesion question={question} id={id} author={author} />;
  } else return <Question id={id} question={question} author={author} />;
};
