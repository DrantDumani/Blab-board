const apiStr =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000/"
    : "INSERT_PROD_URL_HERE";

export const handleData = async (endPoint, input = null, method = "GET") => {
  const options = {
    mode: "cors",
    method: method,
    body: JSON.stringify(input),
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetch(apiStr + endPoint, options);
};
