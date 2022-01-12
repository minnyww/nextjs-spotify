/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { useSession } from "next-auth/react";
import { memo } from "react";
import { useState } from "react";
import styled from "styled-components";
import useSWR from "swr";
import useDebounce from "../lib/useDebounce";

const PageContainer = styled.div`
  padding: 1rem;
`;

const HelloText = styled.h2`
  margin-bottom: 0px;
`;

const GreetingMessage = styled.h5`
  margin-top: 0.5rem;
`;

const InputBox = styled.input`
  height: 50px;
  width: 100%;
  border-radius: 12px;
  border: none;
  background: #12103c;
  color: white;
  padding-left: 1rem;
  font-size: 1.25em;
  ::placeholder {
    color: #afafaf;
  }
  :focus {
    outline: none !important;
  }
`;

const TrackContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: center;
`;

const TrackInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TrackContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 1.5rem;
`;

const NowPlayingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem;
`;

const ProgressBar = styled.progress``;

const fetcher = (url) => fetch(url).then((r) => r.json());

const TrackCard = ({ trackName, cover, artist, onClick = () => {} }) => {
  return (
    <TrackContent onClick={onClick}>
      <img src={cover} width={80} height={80} alt="track cover" />
      <TrackInfo>
        <div>
          <span>{trackName}</span>
        </div>
        <div>
          <small>{artist}</small>
        </div>
      </TrackInfo>
    </TrackContent>
  );
};

// const share = async () => {
//   const shareData = {
//     title: "หาเตียง",
//     text: "ข้อมูลสำหรับผู้ป่วยต้องการเตียง",
//     url: "https://findbed-covid.vercel.app/",
//   };
//   if (navigator.share) {
//     await navigator.share(shareData);
//   } else {
//     message.info({
//       content: "บราวเซอร์ไม่รองรับ copy ลิงก์แทนก่อนน้า",
//     });
//   }
// };

const NowPlaying = ({ cover, trackName, progress = 0 }) => {
  return (
    <NowPlayingContainer>
      <img
        width={300}
        alt="empty"
        src={cover}
        style={{ borderRadius: "12px", margin: "0 auto" }}
      />
      <h3 style={{ textAlign: "center", marginTop: "0.5rem" }}>{trackName}</h3>
      <ProgressBar value={progress} max="100"></ProgressBar>
    </NowPlayingContainer>
  );
};

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const searchDebounceValue = useDebounce(searchQuery);
  const { data: session } = useSession();
  const { data: searchResult } = useSWR(
    `/api/search?q=${searchDebounceValue}`,
    fetcher,
  );
  const { data: getPlaybackState } = useSWR(
    `/api/get-playback-state`,
    fetcher,
    {
      refreshInterval: 2500,
    },
  );
  const { data: nowPlaying } = useSWR("/api/nowplaying", fetcher);

  const playingProgress =
    (getPlaybackState?.progress_ms * 100) / getPlaybackState?.item?.duration_ms;

  const { data: getDevices } = useSWR(`/api/getdevices`, fetcher);
  const currentDeviceId = getDevices?.devices?.find(
    (device) => device?.is_active,
  )?.id;
  const trackList = searchResult?.data?.tracks?.items || [];
  return (
    <PageContainer>
      <HelloText>Hello {session?.token?.name}</HelloText>
      <GreetingMessage>What you want to here today?</GreetingMessage>
      <InputBox
        placeholder="Search"
        onChange={({ target: { value } }) => setSearchQuery(value)}
      />
      <TrackContainer>
        <NowPlaying
          cover={nowPlaying?.albumImageUrl}
          trackName={nowPlaying?.title}
          progress={playingProgress}
        />

        {trackList?.map((track) => {
          return (
            <TrackCard
              key={track.id}
              cover={track?.album?.images?.[0]?.url}
              trackName={track?.name}
              artist={track?.artists?.[0]?.name}
              onClick={async () => {
                const { data } = await axios.put("/api/playtrack", {
                  trackId: track?.uri,
                  deviceId: currentDeviceId,
                });
              }}
            />
          );
        })}
      </TrackContainer>
    </PageContainer>
  );
};

export default memo(Home);
