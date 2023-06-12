import { supabase } from "@/shared/infra/supabase";

export interface registerReq {
  email: string;
  password: string;
}

export const signupService = async (req: registerReq): Promise<any> => {
  try {
    const { email, password } = req;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    const { user } = data;
    if (user && !error) {
      await supabase.from("users").insert([
        {
          email: user.email,
          last_seen: new Date(),
        },
      ]);
      return {
        user,
        message: "Create new user successfully",
      };
    } else {
      return {
        messsage: "An error occur when create a new user. Please try again.",
      };
    }
  } catch (error) {
    return {
      message: (error as Error).message.toString(),
    };
  }
};
