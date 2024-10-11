import styles from "./Board.module.css";
import SettingsIcon from "../../assets/icons/settings-svgrepo-com.svg?react";
import MemberIcon from "../../assets/icons/friend-svgrepo-com.svg?react";
import EditIcon from "../../assets/icons/edit-svgrepo-com.svg?react";
import DeleteIcon from "../../assets/icons/trash-bin-trash-svgrepo-com.svg?react";
import ImageIcon from "../../assets/icons/image-circle-svgrepo-com.svg?react";
import SendIcon from "../../assets/icons/send-svgrepo-com.svg?react";
import MessageIcon from "../../assets/icons/message-square-svgrepo-com.svg?react";
import { useState } from "react";

export function Board() {
  const token = localStorage.getItem("token");
  const user = token ? JSON.parse(window.atob(token.split(".")[1])) : null;
  const [showMembers, setShowMembers] = useState(false);
  const [labelTransform, setLabelTransform] = useState(false);
  const [isMessage, setIsMessage] = useState(false);

  const toggleShowMembers = () => setShowMembers((t) => !t);
  const handleInputChange = (e) => {
    setIsMessage(!!e.target.value);
  };

  const board = {
    name: "Filler",
    creator: {
      username: "foo",
      pfp: "",
      id: 1,
    },
    members: [
      {
        username: "baz",
        pfp: "",
        id: 2,
      },
      {
        username: "bar",
        pfp: "",
        id: 3,
      },
      {
        username: "abra",
        pfp: "",
        id: 4,
      },
    ],
  };
  const postList = [
    {
      id: 1,
      author_id: 1,
      text: "Do, a deer. A female deer",
      timestamp: Date.now(),
      is_edited: true,
      author: {
        username: "foo",
        pfp: "",
      },
    },
    {
      id: 2,
      author_id: 1,
      text: "The first album is better than the first album",
      timestamp: Date.now(),
      is_edited: false,
      author: {
        username: "bar",
        pfp: "",
      },
    },
    {
      id: 3,
      author_id: 1,
      text: "Three minutes and 33 seconds before mammalians return",
      timestamp: Date.now(),
      is_edited: false,
      author: {
        username: "foo",
        pfp: "",
      },
    },
  ];

  const notFoundImg =
    (import.meta.env.MODE !== "production"
      ? "http://localhost:3000/"
      : "INSERT_PROD_URL_HERE") + "images/notFound.png";

  return (
    <>
      <div className={styles.boardControls}>
        <button
          title="Settings"
          aria-label="Settings"
          className={styles.svgBtn}
        >
          <SettingsIcon />
        </button>
        {!showMembers && (
          <button
            className={`${styles.svgBtn} ${styles.mobileOnly}`}
            title="Members"
            aria-label="Members"
            onClick={toggleShowMembers}
          >
            <MemberIcon />
          </button>
        )}
        {showMembers && (
          <button
            className={`${styles.svgBtn} ${styles.mobileOnly}`}
            title="Messages"
            aria-label="Messages"
            onClick={toggleShowMembers}
          >
            <MessageIcon />
          </button>
        )}
      </div>
      <div className={styles.board_member_wrapper}>
        <section className={styles.boardWrapper}>
          <div className={styles.postList}>
            {postList.map((post) => {
              const date = new Date(post.timestamp);
              return (
                <div key={post.id} className={styles.postOuterWrapper}>
                  <div className={styles.postFlex}>
                    <img
                      className={styles.postFlex__userImg}
                      src={post.author.pfp || notFoundImg}
                      alt=""
                    />
                    <div className={styles.postFlex__text}>
                      <div className={styles.postHeader}>
                        <p className={styles.postHeader__bold}>
                          {post.author.username}
                        </p>
                        <p className={styles.postHeader__bold}>{`${
                          date.getMonth() + 1
                        }/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date
                          .getMinutes()
                          .toString()
                          .padStart(2, "0")}`}</p>
                        {post.id === Number(user.id) && (
                          <div className={styles.postFlex__userControls}>
                            <button
                              className={`${styles.svgBtn} ${styles.userControl}`}
                            >
                              <EditIcon />
                            </button>
                            <button
                              className={`${styles.svgBtn}  ${styles.userControl}`}
                            >
                              <DeleteIcon />
                            </button>
                          </div>
                        )}
                      </div>
                      <p className={styles.post}>{post.text}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.postOptions}>
            {/* Opens a form for posting images */}
            <button
              title="Image"
              aria-label="Image"
              className={`${styles.svgBtn} ${styles.postOptions__postControls}`}
            >
              <ImageIcon />
            </button>
            {/* Wrap input and button in a form */}
            <label className={styles.postOptions__label}>
              <span
                className={`${styles.postOptions__labelText} 
              ${
                (labelTransform || isMessage) &&
                styles.postOptions__labelTextSmall
              }`}
              >
                Post a message
              </span>
              <input
                required
                maxLength={500}
                className={styles.postOptions__postInput}
                onChange={handleInputChange}
                onFocus={() => setLabelTransform(true)}
                onBlur={() => setLabelTransform(false)}
              />
            </label>
            <button
              title="Send"
              aria-label="Send"
              className={`${styles.svgBtn} ${styles.postOptions__postControls}`}
            >
              <SendIcon />
            </button>
          </div>
        </section>

        <section
          className={`${styles.memberWrapper} ${
            showMembers && styles.memberWrapperActive
          }`}
        >
          <div className={styles.memberHeader}>
            <h3 className={styles.boardTitle}>{board.name}</h3>
            <h4 className={styles.boardOwner}>OWNER</h4>
            <div className={`${styles.userCard} ${styles.userCard__owner}`}>
              <img
                className={styles.userCard__userImg}
                src={board.creator.pfp || notFoundImg}
                alt=""
              />
              <p className={styles.userCard__username}>
                {board.creator.username}
              </p>
            </div>
          </div>
          {board.members
            .filter((el) => el.id !== board.creator.id)
            .map((el) => (
              <div className={styles.userCard} key={el.id}>
                <img
                  className={styles.userCard__userImg}
                  src={el.pfp || notFoundImg}
                  alt=""
                />
                <p className={styles.userCard__username}>{el.username}</p>
              </div>
            ))}
        </section>
      </div>
    </>
  );
}
