import { Link, useLoaderData, useLocation } from "react-router-dom";
import { AuthForm } from "../../components/Form/AuthForm";
import { InputWrapper } from "../../components/InputWrapper/InputWrapper";
import { useState } from "react";

const notFoundImg =
  (import.meta.env.MODE !== "production"
    ? "http://localhost:3000/"
    : "INSERT_PROD_URL_HERE") + "images/notFound.png";

export function Dashboard() {
  const boards = useLoaderData();
  console.log("boards", boards);
  const location = useLocation();
  const [showFormModal, setShowFormModal] = useState(false);

  const toggleFormModalDisplay = () => setShowFormModal((display) => !display);

  return (
    <div>
      <div>
        {location.pathname === "/dashboard" && (
          <Link to="your_boards">Your boards</Link>
        )}
        {location.pathname === "dashboard/your_boards" && (
          <Link to="/dashboard">All Boards</Link>
        )}
        <button onClick={toggleFormModalDisplay}>New Board</button>
      </div>
      <div>
        {boards.map((el) => (
          <article key={el.id}>
            <img src={el.imgurl || notFoundImg} />
            <h2>{el.name}</h2>
          </article>
        ))}
      </div>

      {showFormModal && (
        <div>
          <div>
            <button onClick={toggleFormModalDisplay}>Close</button>
            <AuthForm
              name={"newBoard"}
              intent={"create-board"}
              btnText={"Create Board"}
            >
              <InputWrapper
                name="name"
                label="Board Name:"
                maxLength={20}
                placeholder="Enter a board name"
              />

              <InputWrapper name="boardImg" label="Board Image:" type="file" />
            </AuthForm>
          </div>
        </div>
      )}
    </div>
  );
}
