import { supabase } from "@/shared/infra/supabase";

export interface uploadCoverImageReq {
  coverImageUrl: string;
}

export const uploadCoverImageService = async (
  req: uploadCoverImageReq
): Promise<any> => {
  try {
    const { coverImageUrl } = req;
    const userResponse = await supabase.auth.getUser();
    const {
      data: { user },
    } = userResponse;
    if (user) {
      const { data, error } = await supabase
        .from("users")
        .update({ cover_image_url: coverImageUrl })
        .eq("email", user.email);
      if (data && !error)
        return {
          success: true,
          message: "Update cover image successfully.",
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
