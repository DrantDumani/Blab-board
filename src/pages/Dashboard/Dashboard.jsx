import { Link, useLoaderData, useLocation } from "react-router-dom";

const notFoundImg =
  (import.meta.env.MODE !== "production"
    ? "http://localhost:3000/"
    : "INSERT_PROD_URL_HERE") + "images/notFound.png";

export function Dashboard() {
  const boards = useLoaderData();
  const location = useLocation();

  return (
    <div>
      <div>
        {location.pathname === "/dashboard" && (
          <Link to="your_boards">Your boards</Link>
        )}
        {location.pathname === "dashboard/your_boards" && (
          <Link to="/dashboard">All Boards</Link>
        )}
      </div>
      <div>
        {boards.map((el) => (
          <article key={el.id}>
            <img src={el.imgurl || notFoundImg} />
            <h2>{el.name}</h2>
          </article>
        ))}
      </div>
    </div>
  );
}
