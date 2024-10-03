import { Outlet, useNavigation } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";
import { Loading } from "../../components/Loading/Loading";
import styles from "./Layout.module.css";

export function Layout() {
  const token = localStorage.getItem("token");
  const user = token ? JSON.parse(window.atob(token.split(".")[1])) : null;

  const navigation = useNavigation();

  return (
    <>
      {navigation.state !== "idle" && <Loading />}
      <header className={styles.header}>
        <h1>Blab Board</h1>
        <Navbar />
      </header>
      <main className={styles.main}>
        <Outlet context={user} />
      </main>
      <footer></footer>
    </>
  );
}
