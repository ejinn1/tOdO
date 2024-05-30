"use client"; // 클라이언트 컴포넌트로 지정

import { theme } from "@/theme";
import React from "react";
import { ThemeProvider } from "styled-components";

interface Prop {
  children: React.ReactNode;
}

export default function StyledThemeProvider({ children }: Prop) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
