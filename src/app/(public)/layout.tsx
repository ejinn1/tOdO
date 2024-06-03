"use client";

import styled from "styled-components";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return <Wrapper>{children}</Wrapper>;
}

const Wrapper = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  padding: 4rem 1rem;
  background-color: ${({ theme }) => theme.colors.lightBeige};
`;
