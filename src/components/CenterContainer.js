import styles from "./styles.module.css";
export const CenterContainer = (props) => {
  return <div className={styles.container}>{props.children}</div>;
};
