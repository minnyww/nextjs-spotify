import { getSearch } from "../../lib/spotify";
import { getSession } from "next-auth/react";

const handler = async (req, res) => {
  const { q } = req.query;
  const {
    token: { accessToken },
  } = await getSession({ req });
  const response = await getSearch(accessToken, q);
  //   const { items } = await response.json();
  const data = await response.json();

  return res.status(200).json({ data });
};

export default handler;
