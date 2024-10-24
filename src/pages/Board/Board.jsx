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
import { FriendModal } from "../../components/FriendModal/FriendModal";
import { Loading } from "../../components/Loading/Loading";
import { useState, useEffect, useRef } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { socket } from "../../socket";
import { handleData } from "../../utils/handleData";
import PropTypes from "prop-types";

export function Board({ user, board_id }) {
  const board = useLoaderData();
  const navigate = useNavigate();
  const [postList, setPostList] = useState(board.posts);
  const [showMembers, setShowMembers] = useState(false);
  const [labelTransform, setLabelTransform] = useState(false);
  const [isMessage, setIsMessage] = useState(false);
  const [showBoardSettings, setShowBoardSettings] = useState(false);
  const [showImageForm, setShowImageForm] = useState(false);
  const [showMemberInfo, setShowMemberInfo] = useState(false);
  const [editMsgId, setEditMsgId] = useState(NaN);
  const [usersOnline, setUsersOnline] = useState({});
  const [members, setMembers] = useState(board.members);
  const [isLoading, setIsLoading] = useState(false);
  const [currentMember, setCurrentMember] = useState({});
  const textPostRef = useRef();
  const postListRef = useRef();

  const creator = members.find((m) => m.id === board.creator_id);

  const toggleShowMembers = () => setShowMembers((t) => !t);
  const toggleBoardSettings = () => setShowBoardSettings((t) => !t);
  const toggleImageForm = () => setShowImageForm((t) => !t);
  const toggleShowMemberInfo = () => setShowMemberInfo((t) => !t);
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
    const resp = await handleData(`posts/${board_id}`, inputObj, "POST");
    if (resp.status === 401) {
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  const handlePostEdit = async (value) => {
    const inputObj = { text: value };
    const endPoint = `posts/${editMsgId}`;
    setEditMsgId(NaN);
    const resp = await handleData(endPoint, inputObj, "PUT");
    if (resp.status === 401) {
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  const handlePostDelete = async (postId) => {
    const endPoint = `posts/${postId}`;
    const resp = await handleData(endPoint, undefined, "DELETE");
    if (resp.status === 401) {
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  const handleImagePostSubmit = async (e, value) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("postImg", value);

    setShowImageForm(false);
    const resp = await handleData(
      `posts/image/${board_id}`,
      formData,
      "POST",
      "multipart/form-data"
    );
    if (resp.status === 401) {
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  const handleGetMemberInfo = async (memberId) => {
    setIsLoading(true);
    const resp = await handleData(`users/${memberId}`);
    if (resp.ok) {
      const data = await resp.json();
      setCurrentMember(data);
      setShowMemberInfo(true);
    } else if (resp.status === 401) {
      localStorage.removeItem("token");
      navigate("/");
    }
    setIsLoading(false);
  };

  const sendFriendRequest = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const resp = await handleData(
      `friends/${currentMember.id}`,
      undefined,
      "POST"
    );
    if (resp.ok) {
      const data = await resp.json();
      if (user.id > currentMember.id) {
        setCurrentMember((prev) => ({
          ...prev,
          friend_id: [{ status: data.status }],
        }));
      } else {
        setCurrentMember((prev) => ({
          ...prev,
          friends: [{ status: data.status }],
        }));
      }
    } else if (resp.status === 401) {
      localStorage.removeItem("token");
      navigate("/");
    }
    setIsLoading(false);
  };

  const acceptFriendReq = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const resp = await handleData(
      `friends/${currentMember.id}`,
      undefined,
      "PUT"
    );
    if (resp.ok) {
      const data = await resp.json();
      if (user.id > currentMember.id) {
        setCurrentMember((prev) => ({
          ...prev,
          friend_id: [{ status: data.status, board_id: data.board_id }],
        }));
      } else {
        setCurrentMember((prev) => ({
          ...prev,
          friends: [{ status: data.status, board_id: data.board_id }],
        }));
      }
    } else if (resp.status === 401) {
      localStorage.removeItem("token");
      navigate("/");
    }
    setIsLoading(false);
  };

  const deleteFriend = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const resp = await handleData(
      `friends/${currentMember.id}`,
      undefined,
      "DELETE"
    );
    if (resp.ok) {
      const data = await resp.json();
      console.log(data);
      if (user.id > currentMember.id) {
        setCurrentMember((prev) => ({
          ...prev,
          friend_id: [],
        }));
      } else {
        setCurrentMember((prev) => ({
          ...prev,
          friends: [],
        }));
      }
    } else if (resp.status === 401) {
      localStorage.removeItem("token");
      navigate("/");
    }
    setIsLoading(false);
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

    const onBoardMember = (userObj, actionStr) => {
      if (actionStr === "join") {
        setMembers((prev) =>
          [...prev, userObj].sort((a, b) => {
            return a.username < b.username ? -1 : 1;
          })
        );
      } else if (actionStr === "leave") {
        setMembers((prev) => prev.filter((u) => u.id !== userObj.id));
      }
    };

    const onRoomEnter = (userList) => {
      setUsersOnline(userList);
    };

    const onRoomLeave = (userId) => {
      setUsersOnline((prev) => {
        const newObj = { ...prev };
        delete newObj[userId];
        return newObj;
      });
    };

    socket.emit("joinRoom", { roomId: board_id, userId: user.id });
    socket.on("boardMsg", onBoardMsg);
    socket.on("usersOnline", onRoomEnter);
    socket.on("boardMember", onBoardMember);
    socket.on("userWentOffline", onRoomLeave);

    return () => {
      socket.off("boardMsg", onBoardMsg);
      socket.off("usersOnline", onRoomEnter);
      socket.off("userWentOffline", onRoomLeave);
      socket.off("boardMember", onBoardMember);
      socket.disconnect();
    };
  }, [board_id, user.id]);

  useEffect(() => {
    postListRef.current.scrollTo(0, postListRef.current.scrollHeight);
  }, [postList]);

  useEffect(() => {
    window.scrollTo(0, postListRef.current.scrollHeight);
  }, []);

  return (
    <>
      <div key={board_id} className={styles.boardControls}>
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
            <button
              onClick={() => handleGetMemberInfo(creator.id)}
              className={`${styles.userCard} ${styles.userCard__owner}`}
            >
              <CircleImage
                src={creator.pfp}
                dimensions={50}
                isOnline={!!usersOnline[creator.id]}
              />
              <span className={styles.userCard__username}>
                {creator.username}
              </span>
            </button>
          </div>
          {members
            .filter((el) => el.id !== board.creator_id)
            .map((el) => (
              <button
                onClick={() => handleGetMemberInfo(el.id)}
                className={styles.userCard}
                key={el.id}
              >
                <CircleImage
                  src={el.pfp}
                  dimensions={50}
                  isOnline={!!usersOnline[el.id]}
                />
                <span className={styles.userCard__username}>{el.username}</span>
              </button>
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
      {showMemberInfo && (
        <FriendModal
          toggleModalOff={toggleShowMemberInfo}
          sendFriendRequest={sendFriendRequest}
          acceptFriendReq={acceptFriendReq}
          deleteFriend={deleteFriend}
          userId={user.id}
          member={currentMember}
        />
      )}
      {isLoading && <Loading />}
    </>
  );
}

Board.propTypes = {
  user: PropTypes.object,
  board_id: PropTypes.string,
};
