import { Link, useLoaderData, useLocation, useFetcher } from "react-router-dom";
import { BoardForm } from "../../components/BoardForm/BoardForm";
import { useState } from "react";
import { CircleImage } from "../../components/CircleImage/CircleImage";
import { ModalWrapper } from "../../components/ModalWrapper/ModalWrapper";
import styles from "./Dashboard.module.css";

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
            <CircleImage src={el.imgurl} dimensions={200} />
            <h2 className={styles.boardTitle}>{el.name}</h2>
            {!el.members.length ? (
              <fetcher.Form method="POST">
                <input name="boardId" type="hidden" value={el.id} />
                <button
                  className={styles.boardControl}
                  name="intent"
                  value={`join_${el.id}`}
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
        <ModalWrapper toggleModalOff={toggleFormModalDisplay}>
          <BoardForm />
        </ModalWrapper>
      )}
    </div>
  );
}
