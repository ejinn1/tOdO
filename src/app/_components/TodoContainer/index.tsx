import styled from "styled-components";
import Container from "../Container";

import { Todo } from "../Main";
import TodoItem from "../TodoItem";

interface Props {
  title: string;
  todos: Todo[];
}

export default function TodoContainer({ title, todos }: Props) {
  return (
    <Container>
      <Wrapper>
        <H3>{title}</H3>
        <span>
          <button>추가버튼</button>
        </span>
        {todos ? (
          <TodoWrapper>
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </TodoWrapper>
        ) : (
          <EmptyText>할 일이 없어요</EmptyText>
        )}
      </Wrapper>
    </Container>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: inherit;
  position: relative;
`;

const H3 = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.subtitle};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`;

const TodoWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;
  width: inherit;
  padding: 1rem;
  list-style-type: none;
`;

const EmptyText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.body};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.lightGray};
`;
