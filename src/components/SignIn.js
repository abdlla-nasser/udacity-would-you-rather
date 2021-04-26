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
  const [userId, setUserId] = useState("");
  const [error, setError] = useState(false);
  useEffect(() => {
    dispatch(getUsers()).then((res) => {
      if (Object.keys(res).length) {
        setUserId(res[Object.keys(res)[0]].id);
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
      dispatch({ type: "SIGN_IN", payload: users[userId] });
      dispatch(getQuestions()).then((res) => {
        let { from } = location.state || { from: { pathname: "/" } };
        from
          ? from.pathname === "/notfound"
            ? history.push("/notfound")
            : history.replace(from)
          : history.push("/");
      });
    }
  };
  return (
    <Card title="Sign In">
      <div>
        <div>
          <label htmlFor="name">Name</label>
          <select id="name" value={userId} onChange={handleInputChange}>
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
