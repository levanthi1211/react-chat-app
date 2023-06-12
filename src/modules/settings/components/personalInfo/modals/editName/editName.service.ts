import { supabase } from "@/shared/infra/supabase";

export interface editNameReq {
  name: string;
}

export const editNameService = async (req: editNameReq): Promise<any> => {
  try {
    const { name } = req;
    const userResponse = await supabase.auth.getUser();
    const {
      data: { user },
    } = userResponse;
    if (user) {
      const { data, error } = await supabase
        .from("users")
        .update({ name })
        .eq("email", user.email);
      if (data && !error)
        return {
          success: true,
          message: "Update name successfully.",
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
