import { supabase } from "@/shared/infra/supabase";

export const changeEmailService = async (email: string): Promise<any> => {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.updateUser({ email });
    if (user && !error) {
      const { data, error } = await supabase
        .from("users")
        .update({ email })
        .eq("email", user.email);
      if (data && !error) {
        return {
          success: true,
          message: "Update email successfully.",
        };
      } else {
        return {
          success: false,
          message: error?.message,
        };
      }
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
