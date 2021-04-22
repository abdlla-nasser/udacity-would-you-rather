import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { _saveQuestionAnswer } from "../_Data";
import { Card } from "./Card";

export const ViewQuestion = (props) => {
  const [selected, setSelected] = useState("");
  const [answered, setAnswered] = useState();
  const user = useSelector((state) => state.user);
  let { id } = useParams();
  const questions = useSelector((state) => state.questions);
  const question = questions[id];
  const handleSubmit = () => {
    _saveQuestionAnswer({ authedUser: user.id, qid: id, answer: selected });
    setAnswered(true);
  };
  useEffect(() => {
    if (user.answers[id]) setAnswered(true);
    else setAnswered(false);
  }, []);
  if (answered) {
    return (
      <Card title={`Asked by ${question.author}`}>
        <div>Results</div>
        <div>
          <p>Would you rather be {question.optionOne.text}</p>
          <div
            className={
              user.answers[id] === "optionOne" ? "selected-answer" : ""
            }
          >
            {(question.optionOne.votes.length /
              (question.optionOne.votes.length +
                question.optionTwo.votes.length)) *
              100 +
              `%`}
            <p>total votes {question.optionOne.votes.length}</p>
          </div>
        </div>
        <div
          className={user.answers[id] === "optionTwo" ? "selected-answer" : ""}
        >
          <p>Would you rather be {question.optionTwo.text}</p>
          <div>
            {(question.optionTwo.votes.length /
              (question.optionOne.votes.length +
                question.optionTwo.votes.length)) *
              100 +
              `%`}
            <p>total votes {question.optionTwo.votes.length}</p>
          </div>
        </div>
      </Card>
    );
  } else
    return (
      <Card title={`${question.author} asks`}>
        <div>would you rather</div>
        <div>
          <input
            type="radio"
            id="optionone"
            name="optionOne"
            value={question.optionOne.text}
            onChange={(e) => setSelected(e.target.name)}
          />
          <label htmlFor="optionone">{question.optionOne.text}</label>
        </div>
        <div>
          <input
            type="radio"
            id="optiontwo"
            name="optionTwo"
            value={question.optionTwo.text}
            onChange={(e) => setSelected(e.target.name)}
          />
          <label htmlFor="optionTwo">{question.optionTwo.text}</label>
        </div>
        <button onClick={handleSubmit}>submit</button>
      </Card>
    );
};
