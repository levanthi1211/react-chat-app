import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/shared/components/layouts/Header";
import { paths } from "@/shared/routes/RoutersConfig";
import { Signup } from "@/modules/signup/components/signup";
import { supabase } from "@/shared/infra/supabase";
import { AuthChangeEvent, Session } from "@supabase/supabase-js";

export const SignupPage: FC = () => {
  const navigate = useNavigate();

  supabase.auth.onAuthStateChange(
    async (event: AuthChangeEvent, _session: Session | null) => {
      if (event === "SIGNED_IN") {
        navigate(paths.home);
      }
    }
  );

  return (
    <div className="w-full h-screen bg-primary flex items-center p-6 justify-end">
      <div className="w-1/4 h-full mr-6">
        <Header />
      </div>
      <div className="bg-white w-3/4 h-full rounded-xl flex justify-center items-center shadow-xl">
        <Signup />
      </div>
    </div>
  );
};
