import { Outlet } from "react-router-dom";

export function Layout() {
  const token = localStorage.getItem("token");
  const user = token ? JSON.parse(window.atob(token.split(".")[1])) : null;

  return (
    <>
      <header></header>
      <main>
        <Outlet context={user} />
      </main>
      <footer></footer>
    </>
  );
}
