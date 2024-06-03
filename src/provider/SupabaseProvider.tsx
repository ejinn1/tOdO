// import { createBrowserClient } from "@supabase/ssr";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// interface Props {
//   children: React.ReactNode;
// }

// export default async function SupabaseProvider({ children }: Props) {
//   const supabase = createBrowserClient();
//   const router = useRouter();

//   useEffect(() => {
//     async function checkAuth() {
//       const { data, error } = await supabase.auth.getUser();
//       if (error || !data?.user) {
//         router.push("/login");
//       }
//     }

//     checkAuth();
//   }, [router, supabase]);

//   return <>{children}</>;
// }
