import styled from "styled-components";

interface Prop {
  children: React.ReactNode;
}

export default function Container({ children }: Prop) {
  return <StyledContainer>{children}</StyledContainer>;
}

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: inherit;
  height: inherit;
  background-color: ivory;
  border: 1px solid black;
  border-radius: 1rem;
`;
