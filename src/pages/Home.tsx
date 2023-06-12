import { Chat } from "@/modules/chat/chat";
import { Menu } from "@/modules/menu/components/menu";
import { getProfileInformationAction } from "@/modules/sidebar/components/profile/profileSlice";
import { Sidebar } from "@/modules/sidebar/components/sidebar";
import { useAppDispatch } from "@/shared/infra/redux/hooks";
import { supabase } from "@/shared/infra/supabase";
import { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

export const Home: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  supabase.auth.onAuthStateChange(
    async (event: AuthChangeEvent, session: Session | null) => {
      if (event === "SIGNED_IN" || (session && session.user)) {
        dispatch(getProfileInformationAction());
      } else if (event === "SIGNED_OUT") {
        navigate("/login");
      }
    }
  );
  return (
    <div className="w-full h-screen flex items-center justify-between">
      <div className="h-full flex item-centers">
        <Menu />
        <Sidebar />
      </div>
      {/* <Chat /> */}
    </div>
  );
};
