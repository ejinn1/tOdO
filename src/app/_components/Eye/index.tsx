import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface Position {
  x: number;
  y: number;
}

interface PupilProps {
  x: number;
  y: number;
}

export default function Eye() {
  const eyeRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent) => {
    if (eyeRef.current) {
      const eye = eyeRef.current.getBoundingClientRect();
      const eyeX = eye.left + eye.width / 2;
      const eyeY = eye.top + eye.height / 2;
      const radian = Math.atan2(e.clientY - eyeY, e.clientX - eyeX);
      const distance = Math.min(eye.width / 4, eye.height / 4);
      setPosition({
        x: Math.cos(radian) * distance,
        y: Math.sin(radian) * distance,
      });
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <EyeContainer ref={eyeRef}>
      <Pupil x={position.x} y={position.y} />
    </EyeContainer>
  );
}

const EyeContainer = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: white;
  border: 2px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Pupil = styled.div.attrs<PupilProps>((props) => ({
  style: {
    transform: `translate(${props.x}px, ${props.y}px)`,
  },
}))`
  position: absolute;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: black;
  transition: transform 0.3s ease;
`;
