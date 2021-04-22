import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getQuestions } from "./store";
import { Card } from "./Card";

export const Home = (props) => {
  const dispatch = useDispatch();
  // const history = useHistory();
  const questions = useSelector((state) => state.questions);
  const users = useSelector((state) => state.users);
  // const user = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getQuestions);
  }, [dispatch]);
  return (
    questions &&
    users && (
      <Card>
        {Object.keys(questions).map((questionId) => {
          let question = questions[questionId];
          let author = users[question.author];
          return (
            <Card key={questionId} title={`${author?.name ?? ""} asks`}>
              <div>would you rather</div>
              <Link to={`/question/${questionId}`}>View Question</Link>
            </Card>
          );
        })}
      </Card>
    )
  );
};
