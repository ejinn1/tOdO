"use client";

import styled from "styled-components";

export default function Home() {
  return (
    <Container>
      <Title>tOdO</Title>
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
