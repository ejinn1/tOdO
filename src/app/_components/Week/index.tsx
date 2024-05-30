import { useEffect } from "react";
import styled from "styled-components";
import { useWeekStore } from "../../../store/useWeekStore";
import Container from "../Container";

export default function Week() {
  const { week, setWeek } = useWeekStore();

  const getWeekDays = (date: Date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    const weekDays = Array.from({ length: 7 }).map((_, i) => {
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
  padding: 2rem;
  text-align: center;
  border-radius: 4px;
`;

const DayOfWeekBox = styled.div`
  font-size: 1.2rem;
`;

const DateBox = styled.div`
  font-size: 2rem;
`;
