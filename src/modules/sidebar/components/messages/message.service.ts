import { User } from "@firebase/auth";
import {
  getDocs,
  collection,
  query,
  where,
  QueryDocumentSnapshot,
  DocumentData,
  onSnapshot,
  getDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "@/shared/infra/firebase";

export interface Conversations {
  id: string;
  users: Array<string>;
  type: string;
  messages?: Array<string>;
  photoURL?: string;
  name: string;
}

export interface ConversationMask {
  conversationId: string;
  photoURL: string;
  conversationName: string;
  status: string;
  lastSeen: any;
}

export const getAllConversationsService = async (): Promise<any> => {
  try {
    const user = auth.currentUser;

    const listConversations: Array<Conversations> = [];

    const queryConversations = query(
      collection(db, "conversations"),
      where("users", "array-contains", user?.uid)
    );

    const queryConversationsSnapshot = await getDocs(queryConversations);

    queryConversationsSnapshot.forEach(
      async (_doc: QueryDocumentSnapshot<DocumentData>) => {
        listConversations.push({
          id: _doc.id,
          ..._doc.data(),
        } as Conversations);
      }
    );

    const listConversationsWithConverter = await Promise.all(
      listConversations.map(async (conversations: Conversations) => {
        const { users } = conversations;
        const usersWithInformations: Array<any> = [];
        users.forEach(async (user: string) => {
          const userRef = doc(db, "users", user);
          const userDoc = await getDoc(userRef);
          usersWithInformations.push(userDoc.data());
        });
        return {
          ...conversations,
          users: usersWithInformations,
        };
      })
    );

    return {
      success: true,
      listConversations: listConversationsWithConverter,
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message.toString(),
    };
  }
};

export const getAllConversationMasksRealtime = (
  userId: string,
  callback: any,
  setData: any
) => {
  const queryConversations = query(
    collection(db, "conversations"),
    where("users", "array-contains", userId)
  );
  const listConversations: Array<Conversations> = [];
  return onSnapshot(queryConversations, async (querySnapshot) => {
    querySnapshot.docs.forEach((doc) => {
      listConversations.push({
        id: doc.id,
        ...doc.data(),
      } as Conversations);
    });

    const conversationMask = await callback(listConversations);
    setData(conversationMask.listConversationsMask);
  });
};

export const getAllConversationMasksService = async (): Promise<any> => {
  try {
    const user = auth.currentUser as User;
    const { uid } = user;

    const listConversations: Array<Conversations> = [];
    const queryConversations = query(
      collection(db, "conversations"),
      where("users", "array-contains", user?.uid)
    );

    const queryConversationsSnapshot = await getDocs(queryConversations);

    queryConversationsSnapshot.forEach(
      async (_doc: QueryDocumentSnapshot<DocumentData>) => {
        listConversations.push({
          id: _doc.id,
          ..._doc.data(),
        } as Conversations);
      }
    );

    const listConversationsMask = await Promise.all(
      listConversations.map(async (conversations: Conversations) => {
        const { users, type } = conversations;
        let conversationId, photoURL, conversationName, status, lastSeen;
        if (type === "direct") {
          const user = users.find((_user) => _user !== uid) as string;
          const userRef = doc(db, "users", user);
          const userDoc = await getDoc(userRef);
          conversationId = conversations.id;
          photoURL = userDoc.data()?.photoURL;
          conversationName = userDoc.data()?.name;
          status = userDoc.data()?.status;
          lastSeen = userDoc.data()?.lastSeen;
        } else if (type === "group") {
          conversationId = conversations.id;
          photoURL = conversations.photoURL;
          conversationName = conversations.name;
          status = null;
          lastSeen = null;
        }
        return {
          conversationId,
          photoURL,
          conversationName,
          status,
          lastSeen,
        };
      })
    );

    return {
      success: true,
      listConversationsMask,
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message.toString(),
    };
  }
};
