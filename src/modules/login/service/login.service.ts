import { supabase } from "@/shared/infra/supabase";
import { User } from "@supabase/supabase-js";

export interface loginReq {
  username: string;
  password: string;
}

export const loginService = async (req: loginReq): Promise<any> => {
  try {
    const { username, password } = req;
    const { data, error } = await supabase.auth.signInWithPassword({
      email: username,
      password,
    });
    const user: User | null = data.user;
    if (user && !error) {
      await supabase.from("users").update("");
      return {
        user,
        success: true,
        message: "Login user successfully",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message.toString(),
    };
  }
};

export const logoutService = async (): Promise<any> => {
  try {
    const { data, error } = await supabase.auth.getUser();
    const { user } = data;
    if (user) {
      await supabase.auth.signOut();
      return {
        success: true,
        message: "Logout successfully",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message.toString(),
    };
  }
};
