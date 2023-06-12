import { supabase } from "@/shared/infra/supabase";

export interface uploadCoverImageReq {
  coverImageUrl: string;
}

export const uploadAvatarService = async (avatarURL: string): Promise<any> => {
  try {
    const userResponse = await supabase.auth.getUser();
    const {
      data: { user },
    } = userResponse;
    if (user) {
      const { data, error } = await supabase
        .from("users")
        .update({ avatar_url: avatarURL })
        .eq("email", user.email);
      if (data && !error)
        return {
          success: true,
          message: "Update avatar successfully.",
        };
    } else {
      return {
        success: false,
        message: "Something wrong. Please try again.",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message.toString(),
    };
  }
};
