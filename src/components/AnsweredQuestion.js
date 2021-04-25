import { AvatarGenerator } from "random-avatar-generator";
import { useSelector } from "react-redux";
import { Card } from "./Card";
import styles from "./styles.module.css";
const generator = new AvatarGenerator();

export function AnsweredQuesion({ question, id, author }) {
  const user = useSelector((state) => state.user);
  const optionOneVotes = question.optionOne.votes.length;
  const optionTwoVotes = question.optionTwo.votes.length;
  const getPercent = (optionOneVotes, optionTwoVotes) => {
    let num = parseFloat(
      ((optionOneVotes / (optionOneVotes + optionTwoVotes)) * 100).toFixed(2)
    );
    return num + "%";
  };
  return (
    <Card title={`Asked by ${author.name || ""}`}>
      <div className={styles.answered}>
        <img
          alt="user"
          src={author.avatarURL || generator.generateRandomAvatar(author.id)}
        ></img>
        <div>
          <div>Results</div>
          <div
            className={
              user.answers[id] === "optionOne" ? styles["selected-answer"] : ""
            }
          >
            <p>Would you rather {question.optionOne.text}</p>
            <div className={styles.greydiv}>
              <div
                className={styles.coloreddiv}
                style={{
                  width: getPercent(optionOneVotes, optionTwoVotes),
                }}
              >
                {getPercent(optionOneVotes, optionTwoVotes)}
              </div>
            </div>
            <p>total votes {question.optionOne.votes.length}</p>
          </div>
          <div
            className={
              user.answers[id] === "optionTwo" ? styles["selected-answer"] : ""
            }
          >
            <p>Would you rather {question.optionTwo.text}</p>
            <div className={styles.greydiv}>
              <div
                className={styles.coloreddiv}
                style={{
                  width: getPercent(optionTwoVotes, optionOneVotes),
                }}
              >
                {getPercent(optionTwoVotes, optionOneVotes)}
              </div>
            </div>
            <p>total votes {question.optionTwo.votes.length}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
