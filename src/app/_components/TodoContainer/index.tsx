"use client";

import { useClickedDate } from "@/store/useClickedDate";
import { useModalStore } from "@/store/useModalStore";
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
  const { openModal } = useModalStore();
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
    const date = `${clickedDate.getFullYear()}-${(clickedDate.getMonth() + 1).toString().padStart(2, "0")}-${clickedDate.getDate().toString().padStart(2, "0")}`;

    const getTodos = async () => {
      const { data } = await supabase
        .from("todos")
        .select("*")
        .eq("category_id", category.id)
        .eq("date", date);
      if (data) {
        setTodos(data);
        console.log(data);
      }
    };

    getTodos();
  }, [clickedDate]);

  return (
    <Container>
      <Wrapper>
        <H3 onClick={() => openModal("addTodo")}>{category.name}</H3>
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
              <CancelTodoButton
                size={20}
                onClick={() => setClickAddButton(false)}
              />
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
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.subtitle};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  transition: text-shadow 0.3s ease-in-out;
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

const AddContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  gap: 1rem;
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
  color: ${({ theme }) => theme.colors.lightBlue};
`;

const CancelTodoButton = styled(IoAdd)`
  size: 20;
  rotate: calc(45deg);
  cursor: pointer;
  color: ${({ theme }) => theme.colors.lightRed};
`;
