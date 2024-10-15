import { InputWrapper } from "../InputWrapper/InputWrapper";
import { ModalWrapper } from "../ModalWrapper/ModalWrapper";
import styles from "./ImageForm.module.css";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";

export function ImageForm({ user, toggleModalOff }) {
  const [fileSize, setFileSize] = useState(0);
  const maxFileSize = 1048576;

  const handleChange = (e) => {
    const file = e.target.files[0];
    setFileSize(file.size);
  };
  return (
    <ModalWrapper toggleModalOff={toggleModalOff}>
      <form className={styles.imgForm}>
        <fieldset className={styles.imgForm__fieldset}>
          <legend className={styles.imgForm__legend}>Image Post</legend>
          <InputWrapper
            name={"postImg"}
            label="Image:"
            type="file"
            onChange={handleChange}
          />
        </fieldset>
        <button className={styles.imgForm__submit}>Upload</button>
      </form>
    </ModalWrapper>
  );
}
