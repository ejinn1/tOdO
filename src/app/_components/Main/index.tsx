"use client";

import { supabase } from "@/libs/supabaseClient";
import { useClickedDate } from "@/store/useClickedDate";
import { useEffect, useState } from "react";
import styled from "styled-components";
import TodoContainer from "../TodoContainer";

export interface Todo {
  id: number;
  todolist_id: string;
  user_id: string;
  category_id: string;
  content: string;
  complete: boolean;
  createdAt: Date;
}

export interface TodoCategory {
  id: string;
  name: "important" | "normal";
}

interface TodoList {
  id: number;
  date: Date;
  user_id: string;
  create_at: string;
}

export default function Main() {
  const { clickedDate } = useClickedDate();
  const [isEmpty, setIsEmpty] = useState(true);
  const [todos, setTodos] = useState<any>(null);

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase.from("todo_lists").select("*");
      console.log(data);
      if (data && data.length !== 0) {
        setIsEmpty(false);
        setTodos(data);
      }
    };

    getData();
  }, []);

  return (
    <Wrapper>
      <Description>
        <div>
          {clickedDate.getMonth() + 1}월 {clickedDate.getDate()}일{" "}
        </div>
        <div>설명</div>
      </Description>
      <TodoContainerWrapper>
        <TodoContainer todos={todos} title="Important" />
        <TodoContainer todos={todos} title="Normal" />
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
