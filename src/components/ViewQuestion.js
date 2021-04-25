import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { Card } from "./Card";
import { saveQuestionAnswer } from "./actions";
import styles from "./styles.module.css";
import { AvatarGenerator } from "random-avatar-generator";
const generator = new AvatarGenerator();

export const ViewQuestion = (props) => {
  const user = useSelector((state) => state.user);
  const history = useHistory();
  useEffect(() => {
    if (!user.id) {
      console.log("user", user);
      history.push("/signin");
    }
  });
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("");
  const [answered, setAnswered] = useState();
  let { id } = useParams();
  const questions = useSelector((state) => state.questions);
  const question = questions[id];
  const handleSubmit = () => {
    dispatch(
      saveQuestionAnswer({ authedUser: user.id, qid: id, answer: selected })
    ).then(() => {
      setAnswered(true);
    });
  };
  useEffect(() => {
    if (user && user.answers && user.answers[id]) setAnswered(true);
    else setAnswered(false);
  }, [id, user]);
  if (answered && question.author) {
    return (
      <Card title={`Asked by ${question.author || ""}`}>
        <div className={styles.answered}>
          <img
            alt="user"
            src={user.avatarURL || generator.generateRandomAvatar(user.id)}
          ></img>
          <div>
            <div>Results</div>
            <div
              className={
                user.answers[id] === "optionOne"
                  ? styles["selected-answer"]
                  : ""
              }
            >
              <p>Would you rather {question.optionOne.text}</p>
              <div>
                {parseFloat(
                  (
                    (question.optionOne.votes.length /
                      (question.optionOne.votes.length +
                        question.optionTwo.votes.length)) *
                    100
                  ).toFixed(2)
                ) + `%`}
                <p>total votes {question.optionOne.votes.length}</p>
              </div>
            </div>
            <div
              className={
                user.answers[id] === "optionTwo"
                  ? styles["selected-answer"]
                  : ""
              }
            >
              <p>Would you rather {question.optionTwo.text}</p>
              <div>
                {parseFloat(
                  (
                    (question.optionTwo.votes.length /
                      (question.optionOne.votes.length +
                        question.optionTwo.votes.length)) *
                    100
                  ).toFixed(2)
                ) + `%`}
                <p>total votes {question.optionTwo.votes.length}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  } else if (question && question.author)
    return (
      <Card title={`${question.author} asks`}>
        <div>
          <img
            alt="user"
            src={user.avatarURL || generator.generateRandomAvatar(user.id)}
          ></img>
          <div>
            <div>would you rather</div>
            <div>
              <input
                type="radio"
                id="optionOne"
                name="option"
                value={question.optionOne.text}
                onChange={(e) => setSelected(e.target.id)}
              />
              <label htmlFor="optionone">{question.optionOne.text}</label>
            </div>
            <div>
              <input
                type="radio"
                id="optionTwo"
                name="option"
                value={question.optionTwo.text}
                onChange={(e) => setSelected(e.target.id)}
              />
              <label htmlFor="optionTwo">{question.optionTwo.text}</label>
            </div>
            <button onClick={handleSubmit}>submit</button>
          </div>
        </div>
      </Card>
    );
  else return <div></div>;
};
