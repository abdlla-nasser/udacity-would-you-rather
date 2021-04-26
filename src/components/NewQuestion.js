import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Card } from "./Card";
import { saveQuestion } from "./actions";

export const NewQuestion = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const [options, setOptions] = useState({});
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    if (options.optionOneText && options.optionTwoText) setDisabled(false);
  }, [options]);
  const handleInputChange = ({ target: { value, name } }) => {
    setOptions({ ...options, [name]: value });
  };
  const handleSubmit = () => {
    dispatch(saveQuestion({ ...options, author: user.id })).then((res) => {
      history.push("/");
    });
  };
  return (
    <Card title="Create New Question">
      <div>Complete The Question</div>
      <div>would you rather</div>
      <div>
        <div>
          <label htmlFor="optionOne">Option One</label>
          <input
            id="optionOne"
            name="optionOneText"
            value={options.optionOne}
            onChange={handleInputChange}
          />
        </div>
        <span>or</span>
        <div>
          <label htmlFor="optionTwo">Option Two</label>
          <input
            id="optionTwo"
            name="optionTwoText"
            value={options.optionTwo}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <button disabled={disabled} onClick={handleSubmit}>
        submit
      </button>
    </Card>
  );
};
