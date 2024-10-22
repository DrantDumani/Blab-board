import { handleData } from "./handleData";
import { redirect } from "react-router-dom";

export async function fetchPublicBoards() {
  const resp = await handleData("boards");

  if (resp.ok) {
    const boardArr = await resp.json();
    return boardArr;
  } else if (resp.status === 401) {
    localStorage.removeItem("token");
    return redirect("/");
  } else throw new Response("Error completing request");
}

export async function fetchYourBoards() {
  const resp = await handleData("boards/isMember");

  if (resp.ok) {
    const boardArr = await resp.json();
    return boardArr;
  } else if (resp.status === 401) {
    localStorage.removeItem("token");
    return redirect("/");
  } else throw new Response("Error completing request");
}

export async function fetchAllBoardInfo({ params }) {
  const resp = await handleData(`boards/${params.board_id}`);

  if (resp.ok) {
    const boardInfo = await resp.json();
    return boardInfo;
  } else if (resp.status === 401) {
    localStorage.removeItem("token");
    return redirect("/");
  } else throw new Response("Error completing request");
}

export async function getAllFriends() {
  const resp = await handleData(`friends`);

  if (resp.ok) {
    const friends = await resp.json();
    return friends;
  } else if (resp.status === 401) {
    localStorage.removeItem("token");
    return redirect("/");
  } else throw new Response("Error completing request");
}
