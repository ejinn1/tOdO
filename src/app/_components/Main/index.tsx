import { useClickedDate } from "@/store/useClickedDate";
import styled from "styled-components";
import Container from "../Container";

export default function Main() {
  const { clickedDate } = useClickedDate();
  return (
    <Wrapper>
      <Description>
        <div>
          {clickedDate.getMonth() + 1}월 {clickedDate.getDate()}일{" "}
        </div>
        <div>설명</div>
      </Description>
      <Container>
        <TodoContainer>
          <h1>투두 타이틀</h1>
          <Ul>
            <Li>내용 1</Li>
            <Li>내용 2</Li>
            <Li>내용 3</Li>
          </Ul>
        </TodoContainer>
      </Container>
    </Wrapper>
  );
}

const Description = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 1rem;
  font-size: ${({ theme }) => theme.fontSizes.body};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.mediumGray};
`;

const Wrapper = styled.article`
  width: 100%;
  max-width: 100rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TodoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  padding: 0 1rem;
`;

const Ul = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const Li = styled.li`
  margin-bottom: 0.5rem;
`;
