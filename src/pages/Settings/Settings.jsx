import { useOutletContext } from "react-router-dom";
import { CircleImage } from "../../components/CircleImage/CircleImage";
import { useState, useId, useRef } from "react";
import { InputWrapper } from "../../components/InputWrapper/InputWrapper";
import styles from "./Settings.module.css";
import { FormError } from "../../components/FormError/FormError";
import { handleData } from "../../utils/handleData";
import { Loading } from "../../components/Loading/Loading";

export function Settings() {
  const [user, updateUser] = useOutletContext();
  const [showEdit, setShowEdit] = useState(false);
  const [fileSize, setFileSize] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const maxFileSize = 1048576;
  const aboutId = useId();
  const fileRef = useRef(null);
  const inputRef = useRef(null);

  const toggleShowEdit = () => setShowEdit((t) => !t);
  const handleChange = (e) => {
    const file = e.target.files[0];
    setFileSize(file.size);
  };

  const handleUserUpdate = async (e) => {
    e.preventDefault();
    if (fileSize > maxFileSize) return;
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("pfp", fileRef.current.files[0]);
    formData.append("about", inputRef.current.value);

    const resp = await handleData(
      "users",
      formData,
      "PUT",
      "multipart/form-data"
    );
    if (resp.ok) {
      const { token } = await resp.json();
      localStorage.setItem("token", token);
      updateUser();
      setIsSubmitting(false);
      setShowEdit(false);
    }
  };

  return (
    <div className={styles.settingsWrapper}>
      <div className={styles.settings}>
        <div className={styles.settings__header}>
          <CircleImage src={user.pfp} dimensions={150} />
          <h1>{user.username}</h1>
        </div>
        <div className={styles.settings__container}>
          <p className={styles.settings__aboutHeader}>About Me:</p>
          <p className={styles.settings__about}>{user.about}</p>
          <button
            className={`${styles.settings__btn} ${
              showEdit ? styles.redBtn : styles.yellowBtn
            }`}
            onClick={toggleShowEdit}
          >
            {!showEdit ? "Edit" : "Cancel"}
          </button>
        </div>
        {showEdit && (
          <form
            onSubmit={handleUserUpdate}
            className={styles.form}
            encType="multipart/form-data"
          >
            <InputWrapper
              ref={fileRef}
              name="pfp"
              label="Profile Pic:"
              type="file"
              onChange={handleChange}
              isRequired={false}
            />
            <div className={styles.form__textAreaWrapper}>
              <label className={styles.form__label} htmlFor={aboutId}>
                About Me:
              </label>
              <textarea
                name="about"
                ref={inputRef}
                className={styles.form__textArea}
                maxLength={200}
                id={aboutId}
                defaultValue={user.about}
              ></textarea>
            </div>
            {fileSize > maxFileSize && (
              <FormError text="File cannot exceed 1mb" />
            )}
            <button className={styles.form__submit}>Save</button>
          </form>
        )}
      </div>
      {isSubmitting && <Loading />}
    </div>
  );
}
