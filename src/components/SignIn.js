import { Card } from "./Card";
import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "./actions";
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
  const users = useSelector((state) => state.users);
  const [user, setUser] = useState({ id: "" });
  const [error, setError] = useState(false);
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  const handleInputChange = ({ target: { value } }) => {
    setError(false);
    setUser(users[value]);
  };
  const handleSubmit = (e) => {
    if (!user) {
      setError(true);
      return;
    } else {
      dispatch({ type: "SIGN_IN", payload: { ...user } });
    }
  };
  return (
    <Card title="Sign In">
      <div>
        <div>
          <label htmlFor="name">Name</label>
          <select id="name" value={user.id} onChange={handleInputChange}>
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
