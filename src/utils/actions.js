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
