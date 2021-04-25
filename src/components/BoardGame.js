import { useEffect, useState } from "react";
import styles from "./boardgame.module.css";

function canMove(indexOfZero, indexOfNum) {
  if (indexOfZero === 0 && [1, 4].includes(indexOfNum)) return true;
  if (indexOfZero === 3 && [2, 7].includes(indexOfNum)) return true;
  if (indexOfZero === 12 && [8, 13].includes(indexOfNum)) return true;
  if (indexOfZero === 15 && [14, 11].includes(indexOfNum)) return true;
  if (indexOfZero === 1 && [0, 2, 5].includes(indexOfNum)) return true;
  if (indexOfZero === 2 && [1, 3, 6].includes(indexOfNum)) return true;
  if (indexOfZero === 13 && [9, 12, 14].includes(indexOfNum)) return true;
  if (indexOfZero === 14 && [10, 15, 13].includes(indexOfNum)) return true;
  if (indexOfZero === 4 && [0, 5, 8].includes(indexOfNum)) return true;
  if (indexOfZero === 8 && [4, 9, 12].includes(indexOfNum)) return true;
  if (indexOfZero === 7 && [3, 6, 11].includes(indexOfNum)) return true;
  if (indexOfZero === 11 && [7, 10, 15].includes(indexOfNum)) return true;
  if (indexOfZero === 5 && [1, 4, 6, 9].includes(indexOfNum)) return true;
  if (indexOfZero === 6 && [2, 5, 7, 10].includes(indexOfNum)) return true;
  if (indexOfZero === 9 && [5, 8, 13, 10].includes(indexOfNum)) return true;
  if (indexOfZero === 10 && [6, 9, 14, 11].includes(indexOfNum)) return true;
  else return false;
}

export const Boardgame = ({
  initConfig = [1, 0, 4, 5, 6, 8, 10, 12, 13, 14, 2, 3, 7, 9, 15, 11],
}) => {
  const [config, setConfig] = useState([...initConfig]);
  const correct = [...config].sort((a, b) => a - b);
  correct.shift();
  correct.push(0);
  useEffect(() => {
    if (JSON.stringify(correct) === JSON.stringify(config)) {
      alert("good job");
    }
  });
  const handleClick = (indexOfZero, indexOfNum, num) => {
    if (canMove(indexOfZero, indexOfNum)) {
      config[indexOfZero] = num;
      config[indexOfNum] = 0;
      setConfig([...config]);
    }
  };
  return (
    <div className={styles.board}>
      {config.map((num) => {
        if (num === 0)
          return <div className={styles.tile && styles.empty}></div>;
        return (
          <div
            onClick={() =>
              handleClick(config.indexOf(0), config.indexOf(num), num)
            }
            className={styles.tile}
          >
            {num}
          </div>
        );
      })}
    </div>
  );
};
