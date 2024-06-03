import { useClickedDate } from "@/store/useClickedDate";
import styled from "styled-components";
import TodoContainer from "../TodoContainer";

interface SubTask {
  id: number;
  content: string;
  complete: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Todo {
  id: number;
  content: string;
  complete: boolean;
  subTasks?: SubTask[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TodoCategory {
  todos: Todo[];
}

interface TodoList {
  id: number;
  date: Date;
  important: TodoCategory;
  normal: TodoCategory;
}

const todoList: TodoList = {
  id: 1,
  date: new Date(),
  important: {
    todos: [
      {
        id: 11,
        content: "내용 1",
        complete: true,
        subTasks: [
          {
            id: 111,
            content: "서브 태스크 3",
            complete: false,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 12,
        content: "내용 2",
        complete: true,
        subTasks: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 13,
        content: "내용 3",
        complete: false,
        subTasks: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  },
  normal: {
    todos: [
      {
        id: 14,
        content: "일반 내용 1",
        complete: false,

        subTasks: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 15,
        content: "일반 내용 2",
        complete: false,

        subTasks: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  },
};

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
      <TodoContainerWrapper>
        <TodoContainer category={todoList.important} title="Important" />
        <TodoContainer category={todoList.normal} title="Normal" />
      </TodoContainerWrapper>
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

const TodoContainerWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  width: 100%;
  max-width: 100rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
