import { supabase } from "@/shared/infra/supabase";

export interface editSignatureReq {
  signature: string;
}

export const editSignatureService = async (
  req: editSignatureReq
): Promise<any> => {
  try {
    const { signature } = req;
    const userResponse = await supabase.auth.getUser();
    const {
      data: { user },
    } = userResponse;
    if (user) {
      const { data, error } = await supabase
        .from("users")
        .update({ signature })
        .eq("email", user.email);
      console.log(data, error);
      if (!error)
        return {
          success: true,
          message: "Update signature successfully.",
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
