"use client";

import styled from "styled-components";
import Eye from "./_components/eye";

export default function Home() {
  return (
    <Container>
      <Title>
        T
        <EyeWrapper>
          <Eye />
        </EyeWrapper>
        D
        <EyeWrapper>
          <Eye />
        </EyeWrapper>
      </Title>
    </Container>
  );
}

const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
`;

const EyeWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  margin: 0 0.2rem;
`;
