import styles from "./Board.module.css";
import SettingsIcon from "../../assets/icons/settings-svgrepo-com.svg?react";
import MemberIcon from "../../assets/icons/friend-svgrepo-com.svg?react";
import ImageIcon from "../../assets/icons/image-circle-svgrepo-com.svg?react";
import SendIcon from "../../assets/icons/send-svgrepo-com.svg?react";
import MessageIcon from "../../assets/icons/message-square-svgrepo-com.svg?react";
import { CircleImage } from "../../components/CircleImage/CircleImage";
import { BoardSettings } from "../../components/BoardSettings/BoardSettings";
import { PostList } from "../../components/PostList/PostList";
import { ImageForm } from "../../components/ImageForm/ImageForm";
import { useState, useEffect, useRef } from "react";
import { useOutletContext, useLoaderData, useParams } from "react-router-dom";
import { socket } from "../../socket";
import { handleData } from "../../utils/handleData";

export function Board() {
  const user = useOutletContext();
  const board = useLoaderData();
  const { board_id } = useParams();
  const [postList, setPostList] = useState(board.posts);
  const [showMembers, setShowMembers] = useState(false);
  const [labelTransform, setLabelTransform] = useState(false);
  const [isMessage, setIsMessage] = useState(false);
  const [showBoardSettings, setShowBoardSettings] = useState(false);
  const [showImageForm, setShowImageForm] = useState(false);
  const [editMsgId, setEditMsgId] = useState(NaN);
  const textPostRef = useRef();
  const postListRef = useRef();

  const creator = board.members.find((m) => m.id === board.creator_id);

  const toggleShowMembers = () => setShowMembers((t) => !t);
  const toggleBoardSettings = () => setShowBoardSettings((t) => !t);
  const toggleImageForm = () => setShowImageForm((t) => !t);
  const toggleEditMsgId = (num) => setEditMsgId(num);
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

  const handleTextPostSubmit = async (e) => {
    e.preventDefault();
    const inputObj = { text: textPostRef.current.value };
    textPostRef.current.value = "";
    setLabelTransform(false);
    setIsMessage(false);
    await handleData(`posts/${board_id}`, inputObj, "POST");
  };

  const handlePostEdit = async (value) => {
    const inputObj = { text: value };
    const endPoint = `posts/${editMsgId}`;
    setEditMsgId(NaN);
    await handleData(endPoint, inputObj, "PUT");
  };

  const handlePostDelete = async (postId) => {
    const endPoint = `posts/${postId}`;
    await handleData(endPoint, undefined, "DELETE");
  };

  const handleImagePostSubmit = async (e, value) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("postImg", value);

    setShowImageForm(false);
    await handleData(
      `posts/image/${board_id}`,
      formData,
      "POST",
      "multipart/form-data"
    );
  };

  useEffect(() => {
    socket.connect();

    const onBoardMsg = (postObj, actionStr) => {
      const { post, author } = postObj;
      post.author = author;
      if (actionStr === "create") {
        setPostList((prev) => [...prev, post]);
      } else if (actionStr === "edit") {
        setPostList((prev) => {
          return prev.map((el) => (el.id === post.id ? post : el));
        });
      } else if (actionStr === "delete") {
        setPostList((prev) => prev.filter((el) => el.id !== post.id));
      }
    };

    socket.emit("joinRoom", board_id);
    socket.on("boardMsg", onBoardMsg);

    return () => {
      socket.off("boardMsg", onBoardMsg);
      socket.disconnect();
    };
  }, [board_id]);

  useEffect(() => {
    postListRef.current.scrollTop = postListRef.current.scrollHeight;
  }, [postList]);

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
        <section ref={postListRef} className={styles.boardWrapper}>
          <PostList
            editId={editMsgId}
            posts={postList}
            userId={Number(user.id)}
            toggleEditMsgId={toggleEditMsgId}
            handlePostEdit={handlePostEdit}
            handlePostDelete={handlePostDelete}
          />
          <div className={styles.postOptions}>
            {/* Opens a form for posting images */}
            <button
              title="Image"
              aria-label="Image"
              className={`${styles.svgBtn} ${styles.postOptions__postControls}`}
              onClick={toggleImageForm}
            >
              <ImageIcon />
            </button>

            <form
              onSubmit={handleTextPostSubmit}
              className={styles.postOptions__form}
            >
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
                  ref={textPostRef}
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
            </form>
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
      {showImageForm && (
        <ImageForm
          handleSubmit={handleImagePostSubmit}
          board_id={board_id}
          toggleModalOff={toggleImageForm}
        />
      )}
    </>
  );
}
