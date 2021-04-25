import { useHistory, useLocation } from "react-router-dom";
import { Router } from "./Router";
import { Navbar } from "./components/Navbar";
import { CenterContainer } from "./components/CenterContainer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const { pathname } = location;
  useEffect(() => {
    if (pathname === "/logout") {
      dispatch({ type: "LOGOUT" });
      history.push("/signin");
    }
  }, [pathname, dispatch, history]);
  return (
    <>
      <Navbar />
      <CenterContainer>
        <Router />
      </CenterContainer>
    </>
  );
}

export default App;
