import {
  getDocs,
  collection,
  query,
  where,
  QueryDocumentSnapshot,
  QuerySnapshot,
  DocumentData,
  addDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "@/shared/infra/firebase";
import { supabase } from "@/shared/infra/supabase";

export interface requestContactReq {
  email: string;
  invitationMessage: string;
}

export interface searchContactReq {
  keyword: string;
}

export const requestContactService = async (
  req: requestContactReq
): Promise<any> => {
  try {
    const errors: string[] = [];
    const { email, invitationMessage } = req;
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return {
        success: false,
        message: "Something wrong. Please try again",
      };
    }

    const { data, error } = await supabase
      .from("applications")
      .select("id")
      .match({ sender: user?.email, receiver: email });

    if (error) {
      errors.push(error.message);
    }

    if (data && data?.length > 0) {
      const { error: updateApplicationError } = await supabase
        .from("applications")
        .update({
          status: "PENDING",
          invitation_message: invitationMessage,
          created_at: new Date(),
        })
        .eq("id", data?.[0].id);
      if (updateApplicationError) {
        errors.push(updateApplicationError.message);
      }
    } else {
      const { error: updateApplicationError } = await supabase
        .from("applications")
        .insert({
          sender: user?.email,
          receiver: email,
          invitation_message: invitationMessage,
          status: "PENDING",
          created_at: new Date(),
        });
      if (updateApplicationError) {
        errors.push(updateApplicationError.message);
      }
    }
    if (errors.length > 0) {
      return {
        success: false,
        message: errors.join(". "),
      };
    }
    return {
      success: true,
      message: "Update cover image successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message.toString(),
    };
  }
};

export const searchContactService = async (
  req: searchContactReq
): Promise<any> => {
  try {
    const { keyword } = req;
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data: contacts, error } = await supabase
      .from("users")
      .select("*")
      .ilike("email", `%${keyword}%`)
      .not("email", "ilike", `%${user?.email}%`);
    if (contacts && contacts.length > 0 && !error)
      return {
        success: true,
        message: "Search contacts successfully",
        data: {
          contacts,
        },
      };
    else
      return {
        success: false,
        message: "Can not find contacts",
      };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message.toString(),
    };
  }
};
