export function Layout() {
  const token = localStorage.getItem("token");
  const payload = token && JSON.parse(window.atob(token.split(".")[1]));
  return <h1>Placeholder for layout page. Welcome {payload.username}</h1>;
}
