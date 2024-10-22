import { Board } from "../Board/Board";
import { useParams, useOutletContext } from "react-router-dom";

export function BoardWrapper() {
  const { board_id } = useParams();
  const [user] = useOutletContext();

  return <Board key={board_id} user={user} board_id={board_id} />;
}
