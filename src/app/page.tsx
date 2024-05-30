"use client";

import styled from "styled-components";
import Header from "./_components/Header";
import Week from "./_components/Week";

export default function Home() {
  return (
    <MainContainer>
      <Header />
      <Week />
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
  background-color: ${({ theme }) => theme.colors.beige};
`;
