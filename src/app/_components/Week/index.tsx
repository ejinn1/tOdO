"use client";

import { useClickedDate } from "@/store/useClickedDate";
import { getWeekDays } from "@/utils/date";
import { useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import styled from "styled-components";
import { useWeekStore } from "../../../store/useWeekStore";
import Container from "../Container";

export default function Week() {
  const { week, setWeek } = useWeekStore();
  const { clickedDate, setClickedDate } = useClickedDate();
  const now = new Date();
  // const [clickedDate, setCLickedDate] = useState(now);

  const handleBackWeek = () => {
    const firstDayOfCurrentWeek = new Date(week[0]);
    const previousWeekStart = new Date(firstDayOfCurrentWeek);
    previousWeekStart.setDate(previousWeekStart.getDate() - 14);
    const previousWeekDays = getWeekDays(previousWeekStart);
    setWeek(previousWeekDays);
  };

  const handleNextWeek = () => {
    const lastDayOfCurrentWeek = new Date(week[week.length - 1]);
    const nextWeekStart = new Date(lastDayOfCurrentWeek);
    nextWeekStart.setDate(nextWeekStart.getDate() + 1);
    const nextWeekDays = getWeekDays(nextWeekStart);
    setWeek(nextWeekDays);
  };

  useEffect(() => {
    const weekDays = getWeekDays(new Date());
    setWeek(weekDays);
  }, [setWeek]);

  return (
    <Wrapper>
      <Container>
        <StyledArrowBack size={30} onClick={handleBackWeek} />
        <WeekWrapper>
          {week.map((day, index) => {
            const isToday =
              day.getDate() === now.getDate() &&
              day.getMonth() === now.getMonth() &&
              day.getFullYear() === now.getFullYear();
            const isClicked =
              day.getDate() === clickedDate.getDate() &&
              day.getMonth() === clickedDate.getMonth() &&
              day.getFullYear() === clickedDate.getFullYear();
            return (
              <DayContainer key={index} onClick={() => setClickedDate(day)}>
                <DayOfWeekBox $isclicked={isClicked}>
                  {day.toLocaleDateString("ko-KR", { weekday: "short" })}
                </DayOfWeekBox>
                <TodoBox />
                <DateBox $istoday={isToday}>{day.getDate()}</DateBox>
              </DayContainer>
            );
          })}
        </WeekWrapper>
        <StyledArrowForWrad size={30} onClick={handleNextWeek} />
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
  opacity: 0.3;
  transition: opacity 0.3s;
`;

const StyledArrowForWrad = styled(IoIosArrowForward)`
  position: absolute;
  top: 1/2;
  right: -2.5rem;
  color: ${({ theme }) => theme.colors.mediumGray};
  cursor: pointer;
  opacity: 0.3;
  transition: opacity 0.3s;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 100rem;

  &:hover ${StyledArrowBack} {
    opacity: 1;
  }
  &:hover ${StyledArrowForWrad} {
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

const DayOfWeekBox = styled.div<{ $isclicked: boolean }>`
  font-size: ${({ theme }) => theme.fontSizes.body};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  transition: background-color 0.3s;
  background-color: ${({ $isclicked, theme }) =>
    $isclicked && theme.colors.beige};
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

const DateBox = styled.div<{ $istoday: boolean }>`
  font-size: ${({ theme }) => theme.fontSizes.body};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  transition: background-color 0.3s;
  background-color: ${({ $istoday, theme }) =>
    $istoday && theme.colors.lightBlue};
`;
