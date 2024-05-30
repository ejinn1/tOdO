"use client";

import { getWeekDays } from "@/utils/date";
import { useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styled from "styled-components";
import { useWeekStore } from "../../../store/useWeekStore";
import Container from "../Container";

export default function Week() {
  const { week, setWeek } = useWeekStore();

  const handleNextWeek = () => {};

  useEffect(() => {
    const weekDays = getWeekDays(new Date());
    setWeek(weekDays);
  }, [setWeek]);

  return (
    <Wrapper>
      <Container>
        <StyledArrowBack size={30} />
        <WeekWrapper>
          {week.map((day, index) => (
            <DayContainer key={index}>
              <DayOfWeekBox>
                {day.toLocaleDateString("ko-KR", { weekday: "short" })}
              </DayOfWeekBox>
              <TodoBox />
              <DateBox>{day.getDate()}</DateBox>
            </DayContainer>
          ))}
        </WeekWrapper>
        <StyledArrowForWrad size={30} />
      </Container>
    </Wrapper>
  );
}

const StyledArrowBack = styled(IoIosArrowBack)`
  position: absolute;
  top: 1/2;
  left: -2.5rem;
  color: ${({ theme }) => theme.colors.mediumGray};
  cursor: pointer;
  visibility: hidden;
  opacity: 0;
  transition:
    opacity 0.3s,
    visibility 0.3s;
`;

const StyledArrowForWrad = styled(IoIosArrowForward)`
  position: absolute;
  top: 1/2;
  right: -2.5rem;
  color: ${({ theme }) => theme.colors.mediumGray};
  cursor: pointer;
  visibility: hidden;
  opacity: 0;
  transition:
    opacity 0.3s,
    visibility 0.3s;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 100rem;

  &:hover ${StyledArrowBack} {
    visibility: visible;
    opacity: 1;
  }
  &:hover ${StyledArrowForWrad} {
    visibility: visible;
    opacity: 1;
  }
`;

const WeekWrapper = styled.div`
  width: 100%;
  overflow-x: scroll;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DayOfWeekBox = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.body};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  /* background-color: white; */
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  transition: background-color 0.3s;
`;

const DayContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-width: 6rem;
  padding: 1rem;
  gap: 1rem;
  text-align: center;
  border-radius: 0.4rem;

  &:hover {
    cursor: pointer;
  }

  &:hover ${DayOfWeekBox} {
    background-color: ${({ theme }) => theme.colors.beige};
  }
`;

// todo 색으로 교체
const TodoBox = styled.div`
  width: 2rem;
  height: 2rem;
  background-color: ${({ theme }) => theme.colors.lightGray};
  border-radius: 0.2rem;
`;

const DateBox = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.body};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;
