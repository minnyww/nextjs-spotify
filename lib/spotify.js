import axios from "axios";

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const SEARCH_ENDPOINT = `https://api.spotify.com/v1/search`;
const PLAY_TRACK = "	https://api.spotify.com/v1/me/player/play";
const GET_DEVICES_ENDPOINT = "https://api.spotify.com/v1/me/player/devices";
const PAUSE_PLAYBACK_ENDPOINT = "https://api.spotify.com/v1/me/player/pause";
const GET_PLAYBACK_STATE_ENDPOINT = "https://api.spotify.com/v1/me/player";

const getAccessToken = async (refresh_token) => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });

  return response.json();
};

export const getUsersPlaylists = async (refresh_token) => {
  const { access_token } = await getAccessToken(refresh_token);
  return fetch(PLAYLISTS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getPlaybackState = async (refresh_token) => {
  const { access_token } = await getAccessToken(refresh_token);
  return axios.get(GET_PLAYBACK_STATE_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getNowPlaying = async (refresh_token) => {
  const { access_token } = await getAccessToken(refresh_token);

  return fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getSearch = async (refresh_token, searchQuery) => {
  const { access_token } = await getAccessToken(refresh_token);
  return fetch(`${SEARCH_ENDPOINT}?q=${searchQuery}&type=track`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getAvailableDevices = async (refresh_token, searchQuery) => {
  const { access_token } = await getAccessToken(refresh_token);

  return axios.get(GET_DEVICES_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const pausePlayback = async (refresh_token, deviceId) => {
  console.log("refresh_token : ,mmm", refresh_token);
  const { access_token } = await getAccessToken(refresh_token);
  return axios.put(`${PAUSE_PLAYBACK_ENDPOINT}/?device_id=${deviceId}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const playTrack = async (refresh_token, trackId, deviceId) => {
  const { access_token } = await getAccessToken(refresh_token);

  return axios
    .put(
      `${PLAY_TRACK}/?device_id=${deviceId}`,
      {
        uris: [trackId], // context_uri  :  "spotify:album:5ht7ItJgpBH7W6vJ5BqpPr"
        position_ms: 0,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      },
    )
    .catch((error) => {
      console.log("error : ", error?.response?.data?.error?.message);
      return error;
    });
};
