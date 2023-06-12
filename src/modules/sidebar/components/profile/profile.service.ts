import { supabase } from "@/shared/infra/supabase";

export const getProfileInformationService = async (): Promise<any> => {
  try {
    const response = await supabase.auth.getUser();
    const {
      data: { user },
    } = response;
    if (user) {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", user.email);

      if (data && !error) {
        console.log(data);
        return {
          success: true,
          message: "Get profile information successfully",
          data: {
            profile: data[0],
          },
        };
      }
      return {
        success: false,
        message: "Something wrong. Please try again",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message.toString(),
    };
  }
};
