import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
const scopes = [
  "user-read-email",
  "playlist-read-private",
  "playlist-read-collaborative",
  "streaming",
  "user-read-private",
  "user-library-read",
  "user-top-read",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-follow-read",
].join(",");

const params = {
  scope: scopes,
};

// prod uri --> https://nextjs-spotify-6e4c9qcwn-minnyww.vercel.app/api/auth/callback/spotify
// dev uri ---> http://localhost:3000/api/auth/callback/spotify

const queryParamString = new URLSearchParams(params);
console.log("process.env  :", process.env);

export default NextAuth({
  providers: [
    SpotifyProvider({
      authorization: `https://accounts.spotify.com/authorize?${queryParamString}`,
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    }),
  ],
  secret: process.env.SECRET,
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.refresh_token;
      }
      return token;
    },
    async session(session, user) {
      session.user = user;
      return session;
    },
    redirect({ url, baseUrl }) {
      console.log("url : ", url);
      console.log("baseUrl : ", baseUrl);
      return baseUrl;
    },
  },
});
