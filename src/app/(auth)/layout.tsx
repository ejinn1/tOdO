import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

export default async function Layout({ children }: Props) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return <>{children}</>;
}
