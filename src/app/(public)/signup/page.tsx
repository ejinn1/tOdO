"use client";

import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import styled from "styled-components";

export default function SignUpPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailLabel, setEmailLabel] = useState("Email");
  const [passwordLabel, setPasswordLabel] = useState("Password");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    setEmailError(false);
    setPasswordError(false);

    if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      setEmailError(true);
      return;
    }

    if (!password.match(/^(?=.*[!@#$%^&*])(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/)) {
      setPasswordError(true);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert("Sign up failed: " + error.message);
    } else {
      router.push("/");
    }
  };

  return (
    <Container>
      <H1>회원가입</H1>
      <Form onSubmit={handleSignUp}>
        <InputContainer>
          <Input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=" "
            onFocus={() => {
              setEmailLabel("아이디");
              setEmailError(false);
            }}
            onBlur={() => email === "" && setEmailLabel("Email")}
            $isValid={emailError}
          />
          <InputLabel>{emailLabel}</InputLabel>
        </InputContainer>
        <InputContainer>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=" "
            onFocus={() => {
              setPasswordLabel("비밀번호");
              setPasswordError(false);
            }}
            onBlur={() => password === "" && setPasswordLabel("Password")}
            $isValid={passwordError}
          />
          <InputLabel>{passwordLabel}</InputLabel>
        </InputContainer>
        <Button type="submit" $isEmpty={email === "" || password === ""}>
          회원가입
        </Button>
      </Form>
      <Link href={"/login"}>
        <SignupWrapper>
          <SignUpLink>뒤로가기</SignUpLink>
        </SignupWrapper>
      </Link>
    </Container>
  );
}

const H1 = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.largeTitle};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.darkGray};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 60rem;
  height: 100%;
  padding-bottom: 2rem;
`;

const Form = styled.form`
  width: 100%;
  max-width: 28rem;
`;

const InputContainer = styled.div`
  position: relative;
  margin-bottom: 2rem;
  width: 100%;

  &:focus-within label,
  input:not(:placeholder-shown) + label {
    top: -1.5rem;
    left: 0rem;
    font-size: ${({ theme }) => theme.fontSizes.caption};
    color: ${({ theme }) => theme.colors.mediumGray};
    padding: 0 0.4rem;
  }
`;

const Input = styled.input<{ $isValid: boolean }>`
  width: 100%;
  padding: 1.2rem 1rem;
  border: 1px solid
    ${({ $isValid, theme }) =>
      $isValid ? theme.colors.lightRed : theme.colors.lightGray};
  border-radius: 0.4rem;
  box-sizing: border-box;
  outline: none;
  color: ${({ theme }) => theme.colors.mediumGray};
  font-size: ${({ theme }) => theme.fontSizes.body};
  background-color: ${({ theme }) => theme.colors.white};
`;

const InputLabel = styled.label`
  position: absolute;
  top: 1rem;
  left: 1rem;
  font-size: ${({ theme }) => theme.fontSizes.body};
  color: ${({ theme }) => theme.colors.lightGray};
  pointer-events: none;
  transition: 0.2s ease all;
`;

const Button = styled.button<{ $isEmpty: boolean }>`
  width: 100%;
  padding: 1rem;
  background-color: ${({ $isEmpty, theme }) =>
    $isEmpty ? theme.colors.lightGray : theme.colors.lightBlue};
  color: white;
  border: none;
  border-radius: 0.4rem;
  font-size: ${({ theme }) => theme.fontSizes.caption};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: filter 0.3s ease-in-out;

  ${({ $isEmpty }) =>
    !$isEmpty &&
    `
      &:hover {
    filter: brightness(1.2);
  }
  `}
`;

const SignupWrapper = styled.div`
  width: 100%;
  padding: 2rem 0;
`;

const SignUpLink = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.caption};
  color: ${({ theme }) => theme.colors.lightGray};
`;
