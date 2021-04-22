import { useEffect } from "react";
import { useHistory } from "react-router";

export const Logout = () => {
  const history = useHistory();
  useEffect(() => {
    history.push("/");
  });
  return null;
};
