/* eslint-disable @next/next/no-img-element */
// import Head from "next/head";
// import Center from "../components/Center";
// import Player from "../components/Player";
// import Sidebar from "../components/Sidebar";
// import Image from "next/image";
// import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
// import useSWR from "swr";
// import { pausePlayback } from "../lib/spotify";
// import Welcome from "./welcome";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();
  console.log("session : ", session);

  useEffect(() => {
    if (!session) {
      router.push("/welcome");
    } else {
      router.push("/main");
    }
  }, [session, router]);
  // const [input, setInput] = useState("");
  // const fetcher = (url) => fetch(url).then((r) => r.json());
  // const { data } = useSWR("/api/nowplaying", fetcher);
  // const { data: playlists } = useSWR("/api/playlists", fetcher);
  // const { data: searchResult } = useSWR(`/api/search?q=${input}`, fetcher);
  // const { data: getDevices } = useSWR(`/api/getdevices`, fetcher);
  // const currentDeviceId = getDevices?.devices?.find(
  //   (device) => device?.is_active,
  // )?.id;

  if (!session) {
    return <></>;
  }
  return (
    <>
      <section>
        {/* <main>
          <h1>Search Result </h1>
          <button
            onClick={async () => {
              console.log("session : ", session);
              const { data } = await pausePlayback(
                session?.token?.accessToken,
                currentDeviceId,
              );
            }}
          >
            pause
          </button>
          {searchResult?.data?.tracks?.items?.map((track) => {
            return (
              <div
                key={track?.id}
                style={{ display: "flex", flexDirection: "row" }}
              >
                <img
                  width={50}
                  height={50}
                  alt="track cover"
                  src={track?.album?.images?.[1]?.url}
                />
                <h3>{track?.name}</h3>
                <button
                  onClick={async () => {
                    const { data } = await axios.put("/api/playtrack", {
                      trackId: track?.uri,
                      deviceId: currentDeviceId,
                    });
                  }}
                >
                  play
                </button>
              </div>
            );
          })}
          <div>
            <h1>Spotify Now Playing using Next.js</h1>
            <button onClick={() => signOut()}>sign out</button>
          </div>
          <input onChange={({ target: { value } }) => setInput(value)} />

          <div className="w-16">
            {data?.isPlaying ? (
              <img
                className="w-16 shadow-sm"
                src={data?.albumImageUrl}
                alt={data?.album}
              />
            ) : (
              <p>spotify</p>
            )}
          </div>

          <div className="flex-1">
            <p className="font-bold component">
              {data?.isPlaying ? data.title : "Not Listening"}
            </p>
            <p className="text-xs font-dark">
              {data?.isPlaying ? data.artist : "Spotify"}
            </p>
          </div>
          <div className="absolute bottom-1.5 right-1.5">
            <p>spotify</p>
          </div>
        </main> */}
      </section>
    </>
  );
}
