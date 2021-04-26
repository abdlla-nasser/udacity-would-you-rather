import { useDispatch, useSelector } from "react-redux";
import { Card } from "./Card";
import { AvatarGenerator } from "random-avatar-generator";
import { saveQuestionAnswer } from "./actions";
import { useState } from "react";
import { useHistory } from "react-router";
const generator = new AvatarGenerator();

export function Question({
  question = { optionOne: { text: "" }, optionTwo: { text: "" } },
  id,
  author,
}) {
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const [selected, setSelected] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(
      saveQuestionAnswer({ authedUser: user.id, qid: id, answer: selected })
    ).then(() => {
      history.push("/");
    });
  };
  return (
    <Card title={`${author.name} asks`}>
      <div>
        <img
          alt="user"
          src={author.avatarURL || generator.generateRandomAvatar(user.id)}
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
}
