import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function ModalProvider({ children }: Props) {
  return <div>{children}</div>;
}
