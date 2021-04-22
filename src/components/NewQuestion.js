import { useState } from "react";
import { useSelector } from "react-redux";
import { _saveQuestion } from "../_Data";
import { Card } from "./Card";

export const NewQuestion = (props) => {
  const user = useSelector((state) => state.user);
  const [options, setOptions] = useState({});
  const handleInputChange = ({ target: { value, name } }) => {
    setOptions({ ...options, [name]: value });
  };
  const handleSubmit = () => {
    _saveQuestion({ ...options, author: user.id });
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
      <button onClick={handleSubmit}>submit</button>
    </Card>
  );
};
