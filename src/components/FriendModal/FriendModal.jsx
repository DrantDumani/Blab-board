import PropTypes from "prop-types";
import { ModalWrapper } from "../ModalWrapper/ModalWrapper";
import { CircleImage } from "../CircleImage/CircleImage";
import { Link } from "react-router-dom";
import styles from "./FriendModal.module.css";

export function FriendModal({
  member,
  userId,
  toggleModalOff,
  sendFriendRequest,
  acceptFriendReq,
  deleteFriend,
}) {
  const areUsersFriends = member.friends.length || member.friend_id.length;
  const friendInfo = member.friends.length
    ? member.friends[0]
    : member.friend_id[0];

  const userIsSender =
    friendInfo &&
    ((userId > member.id && friendInfo.status === "pending_2_1") ||
      (userId < member.id && friendInfo.status === "pending_1_2"));

  return (
    <ModalWrapper toggleModalOff={toggleModalOff}>
      <article className={styles.memberWrapper}>
        <div className={styles.memberHeader}>
          <CircleImage src={member.pfp} dimensions={150} />
          <h4 className={styles.memberName}>{member.username}</h4>
        </div>
        <p className={styles.aboutTitle}>About Me:</p>
        <p className={styles.about}>{member.about}</p>
        {userId !== member.id &&
          (!areUsersFriends ? (
            <form onSubmit={sendFriendRequest} className={styles.friendForm}>
              <button className={styles.submitBtn}>Friend Request</button>
            </form>
          ) : (
            <>
              <p className={styles.reqStatus}>
                Friend Request:{" "}
                {friendInfo.status !== "accepted" ? (
                  <span className={styles.reqStatusYellow}>Pending</span>
                ) : (
                  <span className={styles.reqStatusGreen}>Accepted</span>
                )}
              </p>
              {!userIsSender && friendInfo.status !== "accepted" && (
                <form className={styles.reqForm}>
                  <button
                    onClick={acceptFriendReq}
                    className={styles.submitBtn}
                  >
                    Accept
                  </button>
                  <button onClick={deleteFriend} className={styles.denyBtn}>
                    Deny
                  </button>
                </form>
              )}
              {friendInfo.board_id && (
                <div className={styles.linkWrapper}>
                  <Link
                    className={styles.dmLink}
                    to={`/dashboard/${friendInfo.board_id}`}
                  >
                    Message
                  </Link>
                </div>
              )}
            </>
          ))}
      </article>
    </ModalWrapper>
  );
}

FriendModal.propTypes = {
  toggleModalOff: PropTypes.func,
  userId: PropTypes.number,
  member: PropTypes.shape({
    username: PropTypes.string,
    id: PropTypes.number,
    pfp: PropTypes.string,
    about: PropTypes.string,
    board_id: PropTypes.oneOf([PropTypes.number]),
    friends: PropTypes.array,
    friend_id: PropTypes.array,
  }),
  sendFriendRequest: PropTypes.func,
  acceptFriendReq: PropTypes.func,
  deleteFriend: PropTypes.func,
};
