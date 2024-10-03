const apiStr =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000/"
    : "INSERT_PROD_URL_HERE";

export const handleData = async (
  endPoint,
  input = undefined,
  method = "GET",
  ctype = "application/json"
) => {
  const token = localStorage.getItem("token");
  console.log(input);
  const options = {
    mode: "cors",
    method: method,
    body: JSON.stringify(input),
    headers: {
      // "Content-Type": ctype,
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  // input && (options.body = JSON.stringify(input));

  return fetch(apiStr + endPoint, options);
};
