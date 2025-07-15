import axios from "axios";

export const loginRequest = async (username: string, password: string) => {
  const res = await axios.post("https://b9dc873d-8270-4fea-94e2-ae73423cb865.mock.pstmn.io/oauth/token", {
    username,
    password,
    grant_type: "password",
  });
  return res.data;
};
