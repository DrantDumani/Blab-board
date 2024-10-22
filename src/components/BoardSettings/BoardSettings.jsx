import { ModalWrapper } from "../ModalWrapper/ModalWrapper";
import { CircleImage } from "../CircleImage/CircleImage";
import PropTypes from "prop-types";
import styles from "./BoardSettings.module.css";
import { useState } from "react";
import { BoardForm } from "../BoardForm/BoardForm";
import { useFetcher } from "react-router-dom";

export function BoardSettings({ toggleModalOff, boardData, userIsCreator }) {
  const [showOwnerForm, setShowOwnerForm] = useState(false);
  const boardAdminFetcher = useFetcher();
  const boardMemberFetcher = useFetcher();

  const toggleOwnerForm = () => setShowOwnerForm((t) => !t);
  const originDate = new Date(boardData.created_at);
  return (
    <ModalWrapper toggleModalOff={toggleModalOff}>
      {!showOwnerForm ? (
        <div className={styles.settingsWrapper}>
          <h2>Board Settings</h2>
          <CircleImage src={boardData.imgurl} dimensions={200} />
          <h3 className={styles.boardTitle}>{boardData.name}</h3>
          <p>
            Created:{" "}
            {`${(originDate.getMonth() + 1)
              .toString()
              .padStart(2, "0")}/${originDate
              .getDate()
              .toString()
              .padStart(2, "0")}/${originDate.getFullYear()}`}
          </p>
          <div className={styles.btnContainer}>
            {!userIsCreator && (
              <boardMemberFetcher.Form method="DELETE">
                <button
                  name="intent"
                  value="leave-board"
                  className={`${styles.settingsBtn} ${styles.btnRed}`}
                >
                  Leave Board
                </button>
              </boardMemberFetcher.Form>
            )}
            {userIsCreator && (
              <>
                <button
                  className={`${styles.settingsBtn} ${styles.btnYellow}`}
                  onClick={toggleOwnerForm}
                >
                  Edit Board
                </button>
                <boardAdminFetcher.Form method="DELETE">
                  <button
                    name="intent"
                    value="delete-board"
                    className={`${styles.settingsBtn} ${styles.btnRed}`}
                  >
                    Delete Board
                  </button>
                </boardAdminFetcher.Form>
              </>
            )}
          </div>
        </div>
      ) : (
        <BoardForm defValue={boardData.name} img_id={boardData.img_id} />
      )}
    </ModalWrapper>
  );
}

BoardSettings.propTypes = {
  toggleModalOff: PropTypes.func,
  boardData: PropTypes.object,
  userIsCreator: PropTypes.bool,
};
