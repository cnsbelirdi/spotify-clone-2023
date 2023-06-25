import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useLoadImage = (_data: any) => {
  const supabaseClient = useSupabaseClient();

  if (!_data) {
    return null;
  }

  const { data: imageData } = supabaseClient.storage
    .from("images")
    .getPublicUrl(_data.image_path);

  return imageData.publicUrl;
};

export default useLoadImage;
