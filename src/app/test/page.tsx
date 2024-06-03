import { createClient } from "@/utils/supabase/server";

export default async function TestPage() {
  const supabase = createClient();
  const { data: test } = await supabase.from("test").select();

  return (
    <div>
      <pre>{JSON.stringify(test, null, 2)}</pre>
    </div>
  );
}
