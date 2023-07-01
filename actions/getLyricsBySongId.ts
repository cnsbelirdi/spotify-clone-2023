import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { Lyrics } from "@/types";

const getLyricsBySongId = async (id: string): Promise<Lyrics> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data, error } = await supabase
    .from("lyrics")
    .select("*")
    .eq("song_id", id)
    .single();

  if (error) {
    console.log(error.message);
  }

  return (data as any) || null;
};

export default getLyricsBySongId;
