import { Card } from "./Card";
import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getQuestions, getUsers } from "./actions";
import { useHistory, useLocation } from "react-router";
// import { useHistory } from "react-router";

const UsersOptions = ({ users }) => {
  return Object.keys(users).map((userId) => (
    <option key={userId} value={userId}>
      {users[userId].name}
    </option>
  ));
};

export const SignIn = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const users = useSelector((state) => state.users);
  const [userId, setUserId] = useState("1");
  const [error, setError] = useState(false);
  useEffect(() => {
    dispatch(getUsers()).then(() => {
      if (Object.keys(users).length) {
        setUserId(users[Object.keys(users)[0]].id);
      }
    });
  }, [dispatch]);
  const handleInputChange = ({ target: { value } }) => {
    setError(false);
    setUserId(value);
  };
  const handleSubmit = (e) => {
    if (!userId) {
      setError(true);
      return;
    } else {
      dispatch(getQuestions());
      dispatch({ type: "SIGN_IN", payload: { ...users[userId] } });
      let { from } = location.state || { from: { pathname: "/" } };
      history.replace(from);
    }
  };
  return (
    <Card title="Sign In">
      <div>
        <div>
          <label htmlFor="name">Name</label>
          <select
            id="name"
            value={userId || users[Object.keys(users)[0]].id}
            onChange={handleInputChange}
          >
            {users && <UsersOptions users={users} />}
          </select>
          {error && <p>Please Type A User Name</p>}
        </div>
        <button onClick={handleSubmit} className={styles["submit-button"]}>
          Submit
        </button>
      </div>
    </Card>
  );
};
