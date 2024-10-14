import { ModalWrapper } from "../ModalWrapper/ModalWrapper";
import { CircleImage } from "../CircleImage/CircleImage";
import PropTypes from "prop-types";
import styles from "./BoardSettings.module.css";
import { useState } from "react";
import { BoardForm } from "../BoardForm/BoardForm";

export function BoardSettings({ toggleModalOff, boardData, userIsCreator }) {
  const [showOwnerForm, setShowOwnerForm] = useState(false);

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
              <button className={`${styles.settingsBtn} ${styles.btnRed}`}>
                Leave Board
              </button>
            )}
            {userIsCreator && (
              <>
                <button
                  className={`${styles.settingsBtn} ${styles.btnYellow}`}
                  onClick={toggleOwnerForm}
                >
                  Edit Board
                </button>
                <button className={`${styles.settingsBtn} ${styles.btnRed}`}>
                  Delete Board
                </button>
              </>
            )}
          </div>
        </div>
      ) : (
        <BoardForm defValue={boardData.name} />
      )}
    </ModalWrapper>
  );
}

BoardSettings.propTypes = {
  toggleModalOff: PropTypes.func,
};
