const apiStr =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000/"
    : "https://blab-board-api.onrender.com/";

export const handleData = async (
  endPoint,
  input = undefined,
  method = "GET",
  ctype = "application/json"
) => {
  const token = localStorage.getItem("token");
  const options = {
    mode: "cors",
    method: method,
    body: ctype === "application/json" ? JSON.stringify(input) : input,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  if (ctype === "application/json") {
    options.headers["Content-Type"] = ctype;
  }

  return fetch(apiStr + endPoint, options);
};
