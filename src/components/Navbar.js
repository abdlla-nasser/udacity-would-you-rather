import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import styles from "./styles.module.css";
const Links = ({ pathname, links, user }) => {
  return links.map((link) => {
    if (user.id && (link.to === "/signin" || link.to === "/signup"))
      return null;
    if (
      ["/", "/leaderboard", "/newquestion", "/question", "/logout"].includes(
        link.to
      ) &&
      !user.id
    )
      return null;
    return (
      <Link
        to={link.to}
        key={link.to}
        className={`${styles.link} && ${
          link.to === pathname ? styles.activeLink : ""
        }`}
      >
        {link.text}
      </Link>
    );
  });
};
const linksArray = [
  {
    to: "/",
    text: "Home",
  },
  {
    to: "/newquestion",
    text: "New Question",
  },
  {
    to: "/leaderboard",
    text: "Leader Board",
  },
  {
    to: "/signin",
    text: "Sign IN",
  },
  {
    to: "/signup",
    text: "Sign Up",
  },
  {
    to: "/logout",
    text: "Logout",
  },
];
export const Navbar = (props) => {
  const { pathname } = useLocation();
  const user = useSelector((state) => state.user);
  return (
    <div className={styles.navigation}>
      <Links links={linksArray} pathname={pathname} user={user} />
    </div>
  );
};
