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
    redirect({ baseUrl }) {
      return baseUrl;
    },
  },
});
