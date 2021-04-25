import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Card } from "./Card";
import { saveNewUser } from "./actions";
import styles from "./styles.module.css";

export const SignUp = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [user, setUser] = useState({
    name: "",
    avatarURL: "",
  });
  const [error, setError] = useState(false);
  const handleInputChange = ({ target: { name, value } }) => {
    setError(false);
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = (e) => {
    if (!user.name) {
      setError(true);
      return;
    } else {
      dispatch(
        saveNewUser({
          id: user.name.toLowerCase().replace(/\s/g, ""),
          name: user.name,
          avatarURL: user.avatarURL ? user.avatarURL : "",
        })
      ).then(() => {
        history.push("/");
      });
    }
  };
  return (
    <Card title="Sign Up">
      <div>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            value={user.name}
            onChange={handleInputChange}
            placeholder="user name"
          />
          {error && <p>Please Type A User Name</p>}
        </div>
        <div>
          <label htmlFor="avatarURL">Avatar</label>
          <input
            id="avatarURL"
            name="avatarURL"
            value={user.avatarURL}
            onChange={handleInputChange}
            placeholder="avatar url"
          />
        </div>
        <button onClick={handleSubmit} className={styles["submit-button"]}>
          Submit
        </button>
      </div>
    </Card>
  );
};
