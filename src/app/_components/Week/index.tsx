import { useEffect } from "react";
import styled from "styled-components";
import { useWeekStore } from "../../../store/useWeekStore";
import Container from "../Container";

export default function Week() {
  const { week, setWeek } = useWeekStore();

  const getWeekDays = (date: Date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    const weekDays = Array.from({ length: 30 }).map((_, i) => {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      return day;
    });
    return weekDays;
  };

  useEffect(() => {
    const weekDays = getWeekDays(new Date());
    setWeek(weekDays);
  }, [setWeek]);

  return (
    <Wrapper>
      <Container>
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
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  max-width: 100rem;
`;

const WeekWrapper = styled.div`
  width: 100%;
  padding: 0 2rem;

  overflow-x: scroll;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  border-radius: 0.4px;
  overflow-x: scroll;
`;

const DayOfWeekBox = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.body};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
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
