import styles from "./styles.module.css";
export const Card = ({ children, title }) => {
  return (
    <div className={styles.card}>
      {typeof title === "string" && title && (
        <div className={styles["card-header"]}>
          <h1>{title}</h1>
        </div>
      )}
      {typeof title === "object" && title}
      {children}
    </div>
  );
};
