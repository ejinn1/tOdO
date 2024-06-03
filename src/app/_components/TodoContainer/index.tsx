import styled from "styled-components";
import Container from "../Container";
import { TodoCategory } from "../Main";
import TodoItem from "../TodoItem";

interface Props {
  title: string;
  category: TodoCategory;
}

export default function TodoContainer({ title, category }: Props) {
  return (
    <Container>
      <Wrapper>
        <H3>{title}</H3>
        <TodoWrapper>
          {category.todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </TodoWrapper>
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
