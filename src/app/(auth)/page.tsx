"use client";

import styled from "styled-components";
import Header from "../_components/Header";
import Main from "../_components/Main";
import Week from "../_components/Week";

export default function Home() {
  return (
    <MainContainer>
      <Header />
      <Week />
      <Main />
    </MainContainer>
  );
}

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  gap: 2rem;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.lightBeige};
  overflow-y: scroll;
  overflow-x: hidden;
`;
