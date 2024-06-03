import styled from "styled-components";
import { Todo } from "../Main";

interface Props {
  todo: Todo;
}
export default function TodoItem({ todo }: Props) {
  return (
    <Li>
      <CheckBox />
      <Content>{todo.content}</Content>
    </Li>
  );
}

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
