import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card } from "./Card";
import styles from "./styles.module.css";
import { AvatarGenerator } from "random-avatar-generator";
const generator = new AvatarGenerator();

const scoreAndSort = (users) => {
  return Object.keys(users)
    .map((key) => {
      let user = users[key];
      user.answeredQuestions = Object.keys(user.answers).length;
      user.createdQuestions = user.questions.length;
      user.score = user.answeredQuestions + user.createdQuestions;
      return user;
    })
    .sort((a, b) => b.score - a.score);
};

export const LeaderBoard = (props) => {
  const users = useSelector((state) => state.users);
  const [leaderboard, setLeaderboard] = useState([]);
  useEffect(() => {
    if (Object.keys(users).length) {
      setLeaderboard(scoreAndSort(users));
    }
  }, [users]);
  return (
    <Card>
      {leaderboard.length > 0
        ? leaderboard.map((user) => (
            <Card key={user.id} title={`${user.name}`}>
              <div className={styles.answered}>
                <img
                  alt="user"
                  src={
                    user.avatarURL || generator.generateRandomAvatar(user.id)
                  }
                ></img>
                <p>Answered Question {user.answeredQuestions}</p>
                <p>Created Question {user.createdQuestions}</p>
                <p>Score {user.score}</p>
              </div>
            </Card>
          ))
        : null}
    </Card>
  );
};
