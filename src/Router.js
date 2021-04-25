import { Route } from "react-router-dom";
import { Home } from "./components/Home";
import { NewQuestion } from "./components/NewQuestion";
import { SignIn } from "./components/SignIn";
import { SignUp } from "./components/SignUp";
import { ViewQuestion } from "./components/ViewQuestion";
import { LeaderBoard } from "./components/LeaderBoard";
import { Boardgame } from "./components/BoardGame";

const routes = [
  { path: "/", component: <Home /> },
  { path: "/add", component: <NewQuestion /> },
  { path: "/question/:id", component: <ViewQuestion /> },
  { path: "/leaderboard", component: <LeaderBoard /> },
  { path: "/signin", component: <SignIn /> },
  { path: "/signup", component: <SignUp /> },
  { path: "/boardgame", component: <Boardgame /> },
];
export const Router = (props) => {
  return (
    <>
      {routes.map(({ path, component }) => (
        <Route exact key={path} path={path}>
          {component}
        </Route>
      ))}
    </>
  );
};
