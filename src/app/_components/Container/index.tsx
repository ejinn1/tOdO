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
  position: relative;
  width: inherit;
  height: inherit;
  background-color: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(3rem);
  -webkit-backdrop-filter: blur(3rem);
  box-shadow: 0.2rem 0.2rem 0.5rem ${({ theme }) => theme.colors.lightGray};
  border-radius: 1rem;
`;
