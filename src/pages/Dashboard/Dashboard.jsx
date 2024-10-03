import { Link, useLoaderData, useLocation } from "react-router-dom";
import { AuthForm } from "../../components/Form/AuthForm";
import { InputWrapper } from "../../components/InputWrapper/InputWrapper";
import { useState } from "react";
import styles from "./Dashboard.module.css";

const notFoundImg =
  (import.meta.env.MODE !== "production"
    ? "http://localhost:3000/"
    : "INSERT_PROD_URL_HERE") + "images/notFound.png";

export function Dashboard() {
  const boards = useLoaderData();
  const location = useLocation();
  const [showFormModal, setShowFormModal] = useState(false);

  const toggleFormModalDisplay = () => setShowFormModal((display) => !display);

  return (
    <div className={styles.dashboard}>
      <div className={styles.boardUI}>
        {location.pathname === "/dashboard" && (
          <Link
            className={`${styles.boardBtn} ${styles.linkBtn}`}
            to="your_boards"
          >
            Your boards
          </Link>
        )}
        {location.pathname === "/dashboard/your_boards" && (
          <Link
            className={`${styles.boardBtn} ${styles.linkBtn}`}
            to="/dashboard"
          >
            All Boards
          </Link>
        )}
        <button
          className={`${styles.boardBtn} ${styles.greenBtn}`}
          onClick={toggleFormModalDisplay}
        >
          New Board
        </button>
      </div>
      <div>
        {boards.map((el) => (
          <article key={el.id}>
            <img src={el.imgurl || notFoundImg} />
            <h2>{el.name}</h2>
          </article>
        ))}
      </div>

      {showFormModal && (
        <div className={styles.formModal}>
          <button
            className={styles.boardFormBtn}
            onClick={toggleFormModalDisplay}
          >
            Close
          </button>
          <AuthForm
            name={"newBoard"}
            intent={"create-board"}
            btnText={"Create Board"}
            enctype="multipart/form-data"
          >
            <InputWrapper
              name="name"
              label="Board Name:"
              maxLength={20}
              placeholder="Enter a board name"
            />

            <InputWrapper
              name="boardImg"
              label="Board Image:"
              type="file"
              isRequired={false}
            />
          </AuthForm>
        </div>
      )}
    </div>
  );
}
