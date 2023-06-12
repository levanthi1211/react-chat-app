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
import { db } from "@/shared/infra/firebase";
import { auth } from "@/shared/infra/firebase";

export interface startConversationReq {
  emails: Array<string>;
}

export const startConversationService = async (
  req: startConversationReq
): Promise<any> => {
  try {
    const { emails } = req;
    const user = auth.currentUser;
    const userId = user?.uid;
    const type = emails.length === 1 ? "direct" : "group";

    const listUserById = await Promise.all(
      emails.map(async (email: string) => {
        const queryListUser = query(
          collection(db, "users"),
          where("email", "==", email)
        );
        const queryListUserSnapshot = await getDocs(queryListUser);
        let id: string | undefined;
        queryListUserSnapshot.forEach(
          (_doc: QueryDocumentSnapshot<DocumentData>) => {
            const { id: _id } = _doc;
            id = _id;
          }
        );
        return id;
      })
    );

    await addDoc(collection(db, "conversations"), {
      users: [...listUserById, userId],
      type,
    });
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message.toString(),
    };
  }
};
