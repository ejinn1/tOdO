import styled from "styled-components";

export default function AddTodoModal() {
  return (
    <Container>
      <Content>투두 추가 모달</Content>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
`;

const Content = styled.div`
  height: 20rem;
`;
