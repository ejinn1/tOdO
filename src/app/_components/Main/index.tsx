import { useClickedDate } from "@/store/useClickedDate";
import styled from "styled-components";
import Todo, { TodoSpace } from "../Todo";

const DUMMY_TODOS: TodoSpace[] = [
  {
    id: 1,
    title: "투두 타이틀 1",
    todos: [
      {
        id: 1,
        content: "내용 1",
        complete: false,
        priority: "높음",
        subTasks: [
          { content: "서브 태스크 1", complete: false },
          { content: "서브 태스크 2", complete: true },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        content: "내용 2",
        complete: true,
        priority: "중간",
        subTasks: [{ content: "서브 태스크 3", complete: false }],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  },
  {
    id: 2,
    title: "투두 타이틀 2",
    todos: [
      {
        id: 3,
        content: "내용 3",
        complete: false,
        priority: "낮음",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        content: "내용 4",
        complete: true,
        priority: "높음",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  },
  {
    id: 3,
    title: "투두 타이틀 3",
    todos: [
      {
        id: 5,
        content: "내용 5",
        complete: false,
        priority: "중간",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  },
];

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
      {DUMMY_TODOS.map((todoSpace) => (
        <Todo key={todoSpace.id} todoSpace={todoSpace} />
      ))}
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
