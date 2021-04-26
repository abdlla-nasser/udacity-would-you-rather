import { Redirect, Route, Switch } from "react-router-dom";
import { Home } from "./components/Home";
import { NewQuestion } from "./components/NewQuestion";
import { SignIn } from "./components/SignIn";
import { SignUp } from "./components/SignUp";
import { ViewQuestion } from "./components/ViewQuestion";
import { LeaderBoard } from "./components/LeaderBoard";
import { Boardgame } from "./components/BoardGame";
import { useSelector } from "react-redux";
import { NotFound } from "./components/NotFound";

const routes = [
  { path: "/", component: <Home />, exact: true },
  { path: "/add", component: <NewQuestion /> },
  { path: "/question/:id", component: <ViewQuestion /> },
  { path: "/leaderboard", component: <LeaderBoard /> },
  { path: "/signin", component: <SignIn />, isPublic: true },
  { path: "/signup", component: <SignUp />, isPublic: true },
  { path: "/boardgame", component: <Boardgame />, isPublic: true },
  { path: "*", component: <NotFound />, isPublic: true },
];

const PrivateRoute = ({ children, ...rest }) => {
  const user = useSelector((state) => state.user);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user.id ? (
          children
        ) : (
          <Redirect to={{ pathname: "/signin", state: { from: location } }} />
        )
      }
    />
  );
};

export const Router = (props) => {
  return (
    <Switch>
      {routes.map(({ path, component, isPublic, exact = false }) =>
        isPublic ? (
          <Route key={path} exact={exact} path={path}>
            {component}
          </Route>
        ) : (
          <PrivateRoute exact={exact} key={path} path={path}>
            {component}
          </PrivateRoute>
        )
      )}
    </Switch>
  );
};
