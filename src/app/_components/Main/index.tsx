"use client";

import { useClickedDate } from "@/store/useClickedDate";
import { supabase } from "@/utils/supabase/client";
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
  name: "todos" | "complete";
}

export default function Main() {
  const { clickedDate } = useClickedDate();
  const [categorys, setCategorys] = useState<TodoCategory[]>();

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from("category").select("*");

      if (data && data.length !== 0) {
        setCategorys(data);
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
        {categorys &&
          categorys?.map((category) => (
            <TodoContainer key={category.id} category={category} />
          ))}
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
