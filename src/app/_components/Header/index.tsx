import styled from "styled-components";
import Container from "../Container";
import Eye from "../Eye";

export default function Header() {
  return (
    <Wrapper>
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
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
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
