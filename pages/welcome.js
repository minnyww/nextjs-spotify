/* eslint-disable @next/next/no-img-element */
import { signIn, signOut } from "next-auth/react";
import { memo } from "react";
import styled from "styled-components";

const PageContainer = styled.div`
  height: 100vh;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
`;

const SignInText = styled.h1`
  color: white;
  margin: 0;
  padding: 1.75rem;
  text-align: center;
`;

const SpotifyLogginButton = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  width: 100%;

  gap: 8px;
  background: #151d95;
  padding: 5px;
  border-radius: 12px;
`;

const Welcome = () => {
  return (
    <PageContainer>
      <SignInText>Signin</SignInText>
      <img
        width={200}
        alt="music"
        src="https://ouch-cdn2.icons8.com/oM4FjxKoUQMpFYcpHqAl7qkt-o19mVOsQm3T0s6O6EA/rs:fit:830:912/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvMTEw/LzA5YWExYTVmLTQ5/YTQtNGI1My1iZWMy/LTkxZDYxM2IxZTgz/My5zdmc.png"
      />
      <SpotifyLogginButton
        onClick={() => {
          signIn(null, { redirect: `${window.location.origin}/main` });
        }}
      >
        <img
          width={40}
          src="https://img.icons8.com/fluency/240/000000/spotify.png"
          alt="spotify"
        />
        <span>Sign in with spotify</span>
      </SpotifyLogginButton>
      {/* <h1 onClick={() => signOut()}>sign out</h1> */}
      {/* Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button> */}
    </PageContainer>
  );
};

export default memo(Welcome);
