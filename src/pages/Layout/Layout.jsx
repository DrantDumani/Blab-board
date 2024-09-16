export function Layout() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(window.atob(token.split(".")[1]));

  return <h1>Placeholder for layout page. Welcome {user.username}</h1>;
}
