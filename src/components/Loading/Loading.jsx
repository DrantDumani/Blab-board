import { useState, useEffect } from "react";
import styles from "./Loading.module.css";

const letters = ["L", "o", "a", "d", "i", "n", "g", ".", ".", "."];

export function Loading() {
  const [animateIndex, setAnimateIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setAnimateIndex((n) => (n + 1) % letters.length);
    }, 100);

    return () => clearInterval(id);
  }, []);

  return (
    <div className={styles.loadingWrapper}>
      {letters.map((c, ind) => (
        <span
          className={`${styles.letter} ${
            ind === animateIndex && `${styles.anim}`
          }`}
          key={ind}
        >
          {c}
        </span>
      ))}
    </div>
  );
}
