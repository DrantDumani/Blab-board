import { handleData } from "./handleData";
import { redirect } from "react-router-dom";

export async function authAction({ request }) {
  const formData = await request.formData();
  const inputObj = Object.fromEntries(formData);
  const intent = formData.get("intent");

  if (intent === "signUp") {
    const resp = await handleData("users", inputObj, "POST");
    const data = await resp.json();

    if (resp.ok) {
      localStorage.setItem("token", data.token);
      return redirect("/dashboard");
    } else if (resp.status === 400) {
      return data.err;
    } else throw new Response("Error completing request");
  } else if (intent === "login") {
    const resp = await handleData("users/auth", inputObj, "POST");

    if (resp.ok) {
      const data = await resp.json();
      localStorage.setItem("token", data.token);
      return redirect("/dashboard");
    } else if (resp.status === 401) {
      return "Invalid Credentials";
    } else throw new Response("Error completing request");
  }
}

export async function dashBoardAction({ request }) {
  const formData = await request.formData();
  const intent = formData.get("intent");

  // creating a board
  if (intent === "save-board") {
    const resp = await handleData(
      "boards",
      formData,
      "POST",
      "multipart/form-data"
    );
    if (resp.ok) {
      const data = await resp.json();
      const { newBoard_id } = data;

      return redirect(`/dashboard/${newBoard_id}`);
    } else if (resp.status === 401) {
      localStorage.removeItem("token");
      return redirect("/");
    } else throw new Response("Error creating board");
  }

  // joining a board
  if (intent.match(/^join_\d+?/)) {
    const board_id = formData.get("boardId");
    const resp = await handleData(`members/${board_id}`, undefined, "POST");

    if (resp.ok) {
      const data = await resp.json();
      const { board_id } = data;

      return redirect(`/dashboard/${board_id}`);
    } else if (resp.status === 401) {
      localStorage.removeItem("token");
      return redirect("/");
    } else if (resp.status === 404) {
      throw new Response("Board not found");
    }
  }
}

export async function boardAction({ request, params }) {
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "save-board") {
    const resp = await handleData(
      `boards/${params.board_id}`,
      formData,
      "PUT",
      "multipart/form-data"
    );

    if (resp.ok) {
      return "Board info successfully updated!";
    } else if (resp.status === 401) {
      localStorage.removeItem("token");
      return redirect("/");
    } else throw new Response("Unable to edit board");
  } else if (intent === "delete-board") {
    const resp = await handleData(
      `boards/${params.board_id}`,
      undefined,
      "DELETE"
    );

    if (resp.ok) {
      return redirect("/dashboard");
    } else if (resp.status === 401) {
      localStorage.removeItem("token");
      return redirect("/");
    } else throw new Response("Unable to delete board");
  } else if (intent === "leave-board") {
    const resp = await handleData(
      `members/${params.board_id}`,
      undefined,
      "DELETE"
    );

    if (resp.ok) {
      return redirect("/dashboard");
    } else if (resp.status === 401) {
      localStorage.removeItem("token");
      return redirect("/");
    } else throw new Response("Error completing action");
  }
}
