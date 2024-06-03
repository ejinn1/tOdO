"use client";

import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { FaApple, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import styled from "styled-components";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailLabel, setEmailLabel] = useState("Email");
  const [passwordLabel, setPasswordLabel] = useState("Password");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleLogin = async (e: FormEvent) => {
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

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Login failed: " + error.message);
    } else {
      router.push("/");
    }
  };

  return (
    <Container>
      <H1>tOdO</H1>
      <SocailContainer>
        <h3>소셜 로그인</h3>
        <LogoWrapper>
          <LogoContainer>
            <FaGithub size={28} color="black" />
          </LogoContainer>
          <LogoContainer>
            <FaApple size={28} color="gray" />
          </LogoContainer>
          <LogoContainer>
            <FcGoogle size={28} />
          </LogoContainer>
        </LogoWrapper>
      </SocailContainer>
      <Form onSubmit={handleLogin}>
        <InputContainer>
          <Input
            type="email"
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
        <Button type="submit">로그인</Button>
      </Form>
      <Link href={"/signup"}>
        <SignupWrapper>
          <SignUpLink>회원가입</SignUpLink>
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

const SocailContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 2rem;
  color: ${({ theme }) => theme.colors.mediumGray};
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  width: 100%;
`;

const LogoContainer = styled.div`
  filter: drop-shadow(
    0.2rem 0.2rem 0.5rem ${({ theme }) => theme.colors.lightGray}
  );
  cursor: pointer;
  transition:
    transform 0.3s ease-in-out,
    filter 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
    filter: brightness(1.2)
      drop-shadow(0.2rem 0.2rem 0.8rem ${({ theme }) => theme.colors.lightGray});
  }
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

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.lightBlue};
  color: white;
  border: none;
  border-radius: 0.4rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const SignupWrapper = styled.div`
  width: 100%;
  padding: 2rem 0;
`;

const SignUpLink = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.caption};
  color: ${({ theme }) => theme.colors.lightGray};
`;
