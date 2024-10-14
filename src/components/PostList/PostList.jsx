import PropTypes from "prop-types";
import styles from "./PostList.module.css";
import EditIcon from "../../assets/icons/edit-svgrepo-com.svg?react";
import DeleteIcon from "../../assets/icons/trash-bin-trash-svgrepo-com.svg?react";
import { CircleImage } from "../CircleImage/CircleImage";

export function PostList({ posts, userId }) {
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
                  <p
                    data-testid="date"
                    className={styles.postHeader__bold}
                  >{`${(date.getMonth() + 1).toString().padStart(2, "0")}/${date
                    .getDate()
                    .toString()
                    .padStart(2, "0")}/${date.getFullYear()} ${date
                    .getHours()
                    .toString()
                    .padStart(2, "0")}:${date
                    .getMinutes()
                    .toString()
                    .padStart(2, "0")}`}</p>
                  {post.author_id === userId && (
                    <div className={styles.postFlex__userControls}>
                      <button
                        title="Edit"
                        aria-label="Edit"
                        className={`${styles.svgBtn} ${styles.userControl}`}
                      >
                        <EditIcon />
                      </button>
                      <button
                        className={`${styles.svgBtn}  ${styles.userControl}`}
                        title="Delete"
                        aria-label="Delete"
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  )}
                </div>
                <p data-testid="post" className={styles.post}>
                  {post.text}
                </p>
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
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      text: PropTypes.string,
      timestamp: PropTypes.number,
      author: PropTypes.objectOf(PropTypes.string),
    })
  ),
};
