import styled from "styled-components";
import Container from "../Container";

interface SubTask {
  content: string;
  complete: boolean;
}

interface Todo {
  id: number;
  content: string;
  complete: boolean;
  priority: "높음" | "중간" | "낮음";
  subTasks?: SubTask[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TodoSpace {
  id: number;
  title: string;
  todos: Todo[];
}

interface TodoProps {
  todoSpace: TodoSpace;
}

export default function Todo({ todoSpace }: TodoProps) {
  return (
    <Container>
      <TodoContainer>
        <H3>{todoSpace.title}</H3>
        <Ul>
          {todoSpace.todos.map((todo) => (
            <Li key={todo.id}>
              <CheckBox />
              <Content>{todo.content}</Content>
            </Li>
          ))}
        </Ul>
      </TodoContainer>
    </Container>
  );
}

const TodoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  padding: 0 1rem;
`;

const H3 = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.subtitle};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const Ul = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const Li = styled.li`
  display: flex;
  justify-content: flex-start;
  align-content: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
  font-size: ${({ theme }) => theme.fontSizes.body};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
`;

const CheckBox = styled.div`
  width: 1.4rem;
  height: 1.4rem;
  border: 1px solid ${({ theme }) => theme.colors.paleGray};
`;

const Content = styled.div`
  line-height: 1.4rem;
`;
