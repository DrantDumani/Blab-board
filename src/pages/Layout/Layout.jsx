import { Outlet, useNavigation } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";
import { Loading } from "../../components/Loading/Loading";
import styles from "./Layout.module.css";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

const getDataFromToken = () => {
  const token = localStorage.getItem("token");
  return token ? jwtDecode(token) : null;
};

export function Layout() {
  const [user, setUser] = useState(getDataFromToken());
  const updateUser = () => setUser(getDataFromToken());

  const navigation = useNavigation();

  return (
    <div className={styles.layoutWrapper}>
      {navigation.state !== "idle" && <Loading />}
      <header className={styles.header}>
        <h1>Blab Board</h1>
        <Navbar />
      </header>
      <main className={styles.main}>
        <Outlet context={[user, updateUser]} />
      </main>
      <footer className={styles.footer}>
        <p>Created By Darnell</p>
      </footer>
    </div>
  );
}
