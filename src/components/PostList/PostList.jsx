import PropTypes from "prop-types";
import styles from "./PostList.module.css";
import EditIcon from "../../assets/icons/edit-svgrepo-com.svg?react";
import DeleteIcon from "../../assets/icons/trash-bin-trash-svgrepo-com.svg?react";
import SaveIcon from "../../assets/icons/save-svgrepo-com.svg?react";
import CancelIcon from "../../assets/icons/cancel2-svgrepo-com.svg?react";
import { CircleImage } from "../CircleImage/CircleImage";
import { useRef, useEffect } from "react";

export function PostList({
  posts,
  userId,
  editId,
  toggleEditMsgId,
  handlePostEdit,
  handlePostDelete,
}) {
  const textAreaRef = useRef(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  }, [editId]);
  return (
    <div className={styles.postList}>
      {posts.map((post) => {
        const date = new Date(post.timestamp);
        return (
          <div
            key={post.id}
            data-testid="postWrapper"
            className={styles.postOuterWrapper}
          >
            <div className={styles.postFlex}>
              <CircleImage src={post.author.pfp} dimensions={50} />
              <div className={styles.postFlex__text}>
                <div className={styles.postHeader}>
                  <p className={styles.postHeader__bold}>
                    {post.author.username}
                  </p>
                  <p data-testid="date" className={styles.postHeader__bold}>
                    {`${(date.getMonth() + 1)
                      .toString()
                      .padStart(2, "0")}/${date
                      .getDate()
                      .toString()
                      .padStart(2, "0")}/${date.getFullYear()} ${date
                      .getHours()
                      .toString()
                      .padStart(2, "0")}:${date
                      .getMinutes()
                      .toString()
                      .padStart(2, "0")}`}
                    {post.is_edited && (
                      <span className={styles.postHeader__editReminder}>
                        {" "}
                        (edited)
                      </span>
                    )}
                  </p>
                  {editId !== post.id ? (
                    post.author_id === userId && (
                      <div className={styles.postFlex__userControls}>
                        {post.type === "text" && (
                          <button
                            title="Edit"
                            aria-label="Edit"
                            className={`${styles.svgBtn} ${styles.userControl}`}
                            onClick={() => toggleEditMsgId(post.id)}
                          >
                            <EditIcon />
                          </button>
                        )}
                        <button
                          onClick={() => handlePostDelete(post.id)}
                          className={`${styles.svgBtn}  ${styles.userControl}`}
                          title="Delete"
                          aria-label="Delete"
                        >
                          <DeleteIcon />
                        </button>
                      </div>
                    )
                  ) : (
                    <div className={styles.postFlex__userControls}>
                      <button
                        title="Save"
                        aria-label="Save"
                        className={`${styles.svgBtn} ${styles.userControl}`}
                        onClick={() =>
                          handlePostEdit(textAreaRef.current.value)
                        }
                      >
                        <SaveIcon />
                      </button>
                      <button
                        title="Cancel"
                        aria-label="Cancel"
                        className={`${styles.svgBtn} ${styles.userControl}`}
                        onClick={() => toggleEditMsgId(NaN)}
                      >
                        <CancelIcon />
                      </button>
                    </div>
                  )}
                </div>
                {editId !== post.id ? (
                  post.type === "text" ? (
                    <p data-testid="post" className={styles.post}>
                      {post.text}
                    </p>
                  ) : (
                    <img
                      data-testid="post"
                      height={600}
                      width={800}
                      className={styles.postImg}
                      src={post.text}
                      alt=""
                    />
                  )
                ) : (
                  <label className={styles.editWrapper}>
                    <span className={styles.editWrapper__labelText}>
                      Edit Message
                    </span>
                    <textarea
                      ref={textAreaRef}
                      maxLength={500}
                      className={styles.editWrapper__textarea}
                      defaultValue={post.text}
                    ></textarea>
                  </label>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

PostList.propTypes = {
  userId: PropTypes.number,
  editId: PropTypes.number,
  toggleEditMsgId: PropTypes.func,
  handlePostEdit: PropTypes.func,
  handlePostDelete: PropTypes.func,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      text: PropTypes.string,
      timestamp: PropTypes.string,
      author: PropTypes.objectOf(PropTypes.string),
    })
  ),
};
