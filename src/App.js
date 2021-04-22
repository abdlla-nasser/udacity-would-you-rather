import { useHistory, useLocation } from "react-router-dom";
import { Router } from "./Router";
import { Navbar } from "./components/Navbar";
import { CenterContainer } from "./components/CenterContainer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  useEffect(() => {
    console.log(pathname);
    if (
      ["/", "/leaderboard", "/newquestion", "/question"].includes(pathname) &&
      !user.id
    )
      history.push("/signin");
    if (pathname === "/signin" && user.id) history.push("/");
    if (pathname === "/logout") {
      dispatch({ type: "LOGOUT" });
    }
  }, [pathname, dispatch, history, user.id]);
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
