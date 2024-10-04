import { Link, useLoaderData, useLocation, useFetcher } from "react-router-dom";
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
  const fetcher = useFetcher();
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
      <div className={styles.boardGrid}>
        {boards.map((el) => (
          <article className={styles.boardWrapper} key={el.id}>
            <img className={styles.boardImg} src={el.imgurl || notFoundImg} />
            <h2 className={styles.boardTitle}>{el.name}</h2>
            {!el.members.length ? (
              <fetcher.Form method="POST">
                <input type="hidden" value={el.id} />
                <button
                  className={styles.boardControl}
                  name="intent"
                  value={el.id}
                >
                  Join
                </button>
              </fetcher.Form>
            ) : (
              <>
                <p>You are a member</p>
                <Link
                  className={styles.boardControl}
                  to={`/dashboard/${el.id}`}
                >
                  Enter
                </Link>
              </>
            )}
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