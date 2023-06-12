import { supabase } from "..";

export const getAvatar = (path: string) => {
  const { data } = supabase.storage.from("avatars").getPublicUrl(path);
  return data.publicUrl;
};

export const getCoverImage = (path: string) => {
  const { data } = supabase.storage.from("cover-images").getPublicUrl(path);
  return data.publicUrl;
};
