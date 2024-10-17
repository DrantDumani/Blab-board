import { InputWrapper } from "../InputWrapper/InputWrapper";
import { ModalWrapper } from "../ModalWrapper/ModalWrapper";
import { FormError } from "../FormError/FormError";
import styles from "./ImageForm.module.css";
import { useRef, useState } from "react";
import PropTypes from "prop-types";

export function ImageForm({ handleSubmit, toggleModalOff }) {
  const [fileSize, setFileSize] = useState(0);
  const maxFileSize = 1048576;
  const isSubmitDisabled = fileSize >= maxFileSize;
  const fileInputRef = useRef();

  const handleChange = (e) => {
    const file = e.target.files[0];
    setFileSize(file.size);
  };
  return (
    <ModalWrapper toggleModalOff={toggleModalOff}>
      <form
        onSubmit={(e) => handleSubmit(e, fileInputRef.current.files[0])}
        className={styles.imgForm}
        encType="multipart/form-data"
      >
        <fieldset className={styles.imgForm__fieldset}>
          <legend className={styles.imgForm__legend}>Image Post</legend>
          <InputWrapper
            name={"postImg"}
            label="Image:"
            type="file"
            onChange={handleChange}
            ref={fileInputRef}
          />
        </fieldset>
        <button className={styles.imgForm__submit} disabled={isSubmitDisabled}>
          Upload
        </button>
        {isSubmitDisabled && (
          <FormError text="Image size must be 1mb or less" />
        )}
      </form>
    </ModalWrapper>
  );
}

ImageForm.propTypes = {
  handleSubmit: PropTypes.func,
  toggleModalOff: PropTypes.func,
};
