import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card } from "./Card";
import styles from "./styles.module.css";
import { AvatarGenerator } from "random-avatar-generator";
const generator = new AvatarGenerator();

const Tabs = () => {
  const { selected } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleClick = (e) => {
    dispatch({ type: "SELECTED", payload: e.target.name });
  };
  return (
    <div className={styles.tabs}>
      <button
        disabled={selected === "answered"}
        name="answered"
        onClick={handleClick}
      >
        Answered Questions
      </button>
      <button
        disabled={selected === "notAnswered" || selected !== "answered"}
        name="notAnswered"
        onClick={handleClick}
      >
        Unanswered Questions
      </button>
    </div>
  );
};

const renderQuestions = (questions, users, text) => {
  questions = questions.sort((a, b) => b.timestamp - a.timestamp);
  return questions.map((question) => {
    let author = users[question.author];
    return (
      <Card key={question.id} title={`${author?.name ?? ""} asks`}>
        <div className={styles.question}>
          <img
            src={author.avatarURL || generator.generateRandomAvatar(author.id)}
            alt="user"
          />
          <div>
            <div>would you rather</div>
            <Link to={`/question/${question.id}`}>View Question</Link>
          </div>
        </div>
      </Card>
    );
  });
};

export const Home = (props) => {
  const questions = useSelector((state) => state.questions);
  const users = useSelector((state) => state.users);
  const user = useSelector((state) => state.user);
  const [answeredQuestions, setAnswered] = useState([]);
  const [notAnswered, setNotAnswered] = useState([]);
  useEffect(() => {
    if (questions && user.id && user) {
      setAnswered(Object.keys(user.answers).map((key) => questions[key]));
      setNotAnswered(
        Object.keys(questions)
          .map((key) => {
            if (!user.answers[key]) return questions[key];
            else return null;
          })
          .filter((item) => item)
      );
    }
  }, [questions, user]);
  return (
    questions &&
    users && (
      <Card title={<Tabs />}>
        {user.selected === "notAnswered"
          ? renderQuestions(notAnswered, users, "not")
          : user.selected === "answered"
          ? renderQuestions(answeredQuestions, users, "answered")
          : renderQuestions(notAnswered, users, "not final")}
      </Card>
    )
  );
};
