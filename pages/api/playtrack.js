import { playTrack } from "../../lib/spotify";
import { getSession } from "next-auth/react";

const handler = async (req, res) => {
  const { trackId, deviceId } = req.body;
  const {
    token: { accessToken },
  } = await getSession({ req });
  const { data } = await playTrack(accessToken, trackId, deviceId);
  return res.status(200);
};

export default handler;
