import { getAvailableDevices } from "../../lib/spotify";
import { getSession } from "next-auth/react";

const handler = async (req, res) => {
  const { trackId } = req.body;
  const {
    token: { accessToken },
  } = await getSession({ req });
  const { data } = await getAvailableDevices(accessToken, trackId);
  console.log("data : ", data);
  return res.status(200).json(data);
};

export default handler;
