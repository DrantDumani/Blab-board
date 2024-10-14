import styles from "./Board.module.css";
import SettingsIcon from "../../assets/icons/settings-svgrepo-com.svg?react";
import MemberIcon from "../../assets/icons/friend-svgrepo-com.svg?react";
import ImageIcon from "../../assets/icons/image-circle-svgrepo-com.svg?react";
import SendIcon from "../../assets/icons/send-svgrepo-com.svg?react";
import MessageIcon from "../../assets/icons/message-square-svgrepo-com.svg?react";
import { CircleImage } from "../../components/CircleImage/CircleImage";
import { BoardSettings } from "../../components/BoardSettings/BoardSettings";
import { PostList } from "../../components/PostList/PostList";
import { useState } from "react";
import { useOutletContext, useLoaderData } from "react-router-dom";

export function Board() {
  const user = useOutletContext();
  const [showMembers, setShowMembers] = useState(false);
  const [labelTransform, setLabelTransform] = useState(false);
  const [isMessage, setIsMessage] = useState(false);
  const [showBoardSettings, setShowBoardSettings] = useState(false);
  const board = useLoaderData();
  const creator = board.members.find((m) => m.id === board.creator_id);

  const toggleShowMembers = () => setShowMembers((t) => !t);
  const toggleBoardSettings = () => setShowBoardSettings((t) => !t);
  const handleInputChange = (e) => {
    setIsMessage(!!e.target.value);
  };

  const boardSettings = {
    name: board.name,
    id: board.id,
    creator_id: board.creator_id,
    imgurl: board.imgurl,
    img_id: board.img_id,
    created_at: board.created_at,
  };

  return (
    <>
      <div className={styles.boardControls}>
        {board.type === "public" && (
          <button
            title="Settings"
            aria-label="Settings"
            className={styles.svgBtn}
            onClick={toggleBoardSettings}
          >
            <SettingsIcon />
          </button>
        )}
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
          <PostList posts={board.posts} userId={Number(user.id)} />
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
              <CircleImage src={creator.pfp} dimensions={50} />
              <p className={styles.userCard__username}>{creator.username}</p>
            </div>
          </div>
          {board.members
            .filter((el) => el.id !== board.creator_id)
            .map((el) => (
              <div className={styles.userCard} key={el.id}>
                <CircleImage src={el.pfp} dimensions={50} />
                <p className={styles.userCard__username}>{el.username}</p>
              </div>
            ))}
        </section>
      </div>
      {showBoardSettings && (
        <BoardSettings
          toggleModalOff={toggleBoardSettings}
          userIsCreator={user.id === creator.id}
          boardData={boardSettings}
        />
      )}
    </>
  );
}
