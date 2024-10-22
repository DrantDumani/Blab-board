import {
  useLoaderData,
  useOutletContext,
  Link,
  useNavigate,
} from "react-router-dom";
import { CircleImage } from "../../components/CircleImage/CircleImage";
import styles from "./Friends.module.css";
import MessageIcon from "../../assets/icons/message-square-svgrepo-com.svg?react";
import CancelIcon from "../../assets/icons/cancel2-svgrepo-com.svg?react";
import CheckIcon from "../../assets/icons/checkmark-svgrepo-com.svg?react";
import { useState } from "react";
import { handleData } from "../../utils/handleData";
import { Loading } from "../../components/Loading/Loading";

export function Friends() {
  const friendData = useLoaderData();
  const [user] = useOutletContext();
  const [friends, setFriends] = useState(friendData);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpdateFriend = async (id, str) => {
    setIsLoading(true);
    const resp = await handleData(`friends/${id}`, undefined, str);

    if (resp.status === 401) {
      localStorage.removeItem("token");
      navigate("/");
    } else if (resp.ok) {
      const data = await resp.json();
      if (str === "PUT") {
        setFriends((prev) =>
          prev.map((f) =>
            f.id === id
              ? { ...f, status: "accepted", board_id: data.board_id }
              : f
          )
        );
      } else if (str === "DELETE") {
        setFriends((prev) => prev.filter((f) => f.id !== id));
      }
      setIsLoading(false);
    } else throw new Response("Error completing request");
  };

  return (
    <>
      <ul className={styles.friendList}>
        {friends.map((el) => {
          const userIsSender =
            (user.id > el.id && el.status === "pending_2_1") ||
            (user.id < el.id && el.status === "pending_1_2");

          return (
            <li className={styles.list_item} data-testid="friend" key={el.id}>
              <CircleImage src={el.pfp} dimensions={50} />
              <p className={styles.username}>{el.username}</p>
              {userIsSender && <p className={styles.pStatus}>Pending</p>}
              {!userIsSender && el.status !== "accepted" && (
                <div className={styles.controlWrapper}>
                  <button
                    onClick={() => handleUpdateFriend(el.id, "PUT")}
                    className={styles.btn}
                    title="Accept"
                    aria-label="Accept"
                  >
                    <CheckIcon />
                  </button>
                  <button
                    onClick={() => handleUpdateFriend(el.id, "DELETE")}
                    className={styles.btn}
                    title="Deny"
                    aria-label="Deny"
                  >
                    <CancelIcon />
                  </button>
                </div>
              )}
              {el.status === "accepted" && (
                <div className={styles.controlWrapper}>
                  <Link
                    className={styles.link}
                    to={`/dashboard/${el.board_id}`}
                    aria-label={`Direct Message ${el.username}`}
                  >
                    <MessageIcon />
                  </Link>
                  <button
                    className={styles.btn}
                    title="Remove"
                    aria-label="Remove"
                    onClick={() => handleUpdateFriend(el.id, "DELETE")}
                  >
                    <CancelIcon />
                  </button>
                </div>
              )}
            </li>
          );
        })}
      </ul>
      {isLoading && <Loading />}
    </>
  );
}
