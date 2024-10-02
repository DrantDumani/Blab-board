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
