import { useModalStore } from "@/store/useModalStore";
import styled, { keyframes } from "styled-components";
import AddTodoModal from "../addTodo";

export default function ModalManager() {
  const { activeModal, closeModal } = useModalStore();

  if (activeModal === null) return null;

  return (
    <Wrapper $isVisible={activeModal !== null}>
      {activeModal === "addTodo" && (
        <ModalContent>
          <AddTodoModal />
          <CloseButton onClick={closeModal}>닫기</CloseButton>
        </ModalContent>
      )}
    </Wrapper>
  );
}

const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const Wrapper = styled.div<{ $isVisible: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${({ $isVisible }) => ($isVisible ? "100%" : "0")};
  display: flex;
  justify-content: center;
  align-items: flex-end;
  background: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  transition: height 0.3s ease-in-out;
  visibility: ${({ $isVisible }) => ($isVisible ? "visible" : "hidden")};
`;

const ModalContent = styled.div`
  background: white;
  width: 100%;
  max-width: 50rem;
  padding: 2rem;
  border-radius: 1rem 1rem 0 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  animation: ${slideUp} 0.3s ease-in-out;
`;

const CloseButton = styled.button`
  display: block;
  margin: 1rem auto 0;
  padding: 0.5rem 1rem;
  background: #0070f3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
`;
