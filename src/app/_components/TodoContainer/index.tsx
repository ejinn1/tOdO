"use client";

import { useClickedDate } from "@/store/useClickedDate";
import { createClient } from "@/utils/supabase/client";
import { FormEvent, useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import styled from "styled-components";
import Container from "../Container";
import { Todo, TodoCategory } from "../Main";
import TodoItem from "../TodoItem";

interface Props {
  category: TodoCategory;
}

export default function TodoContainer({ category }: Props) {
  const supabase = createClient();

  const { clickedDate } = useClickedDate();

  const [clickAddButton, setClickAddButton] = useState(false);
  const [content, setContent] = useState("");
  const [todos, setTodos] = useState<Todo[]>();

  const onClickAddTodo = async (e: FormEvent) => {
    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const newTodo = {
      content: content,
      complete: false,
      date: clickedDate,
      category_id: category.id,
      user_id: user.id,
    };

    const { data, error } = await supabase
      .from("todos")
      .insert(newTodo)
      .select();
    console.log(data);
    console.log(error);
  };

  useEffect(() => {
    const getTodos = async () => {
      const { data, error } = await supabase
        .from("todos")
        .select("*")
        .eq("category_id", category.id);
      if (data) {
        setTodos(data);
        console.log(data);
      }
      console.log(error);
    };

    getTodos();
  }, []);

  return (
    <Container>
      <Wrapper>
        <H3>{category.name}</H3>
        <AddWrapper onClick={() => setClickAddButton(true)}>
          <IoAdd size={24} color="gray" />
        </AddWrapper>
        <EmptyText>할 일이 없어요</EmptyText>
        <TodoWrapper>
          {todos && todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)}
          {clickAddButton && (
            <AddContainer>
              <AddInput
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <AddTodoButton size={20} onClick={onClickAddTodo} />
            </AddContainer>
          )}
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

const AddWrapper = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
`;

const EmptyText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.body};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.lightGray};
`;

const AddContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  gap: 2rem;
`;

const AddInput = styled.input`
  width: 100%;
  padding: 0.6rem;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.mediumGray};
  background: none;
  box-sizing: border-box;
  outline: none;
  color: ${({ theme }) => theme.colors.mediumGray};
  font-size: ${({ theme }) => theme.fontSizes.body};
`;

const AddTodoButton = styled(IoAdd)`
  size: 20;
  cursor: pointer;
`;
