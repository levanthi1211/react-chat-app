import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  increment,
  getDoc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";
import { db } from "@/shared/infra/firebase";
import { auth } from "@/shared/infra/firebase";
import { User } from "firebase/auth";

export interface SendMessageServiceReq {
  conversationId: string;
  message: any;
  files?: string[];
}

export interface ReactMessageReq {
  messageId: string;
  iconId: string;
  conversationId: string;
}

export const sendMessageService = async (
  req: SendMessageServiceReq
): Promise<any> => {
  try {
    const user = auth.currentUser as User;
    const { message, conversationId, files } = req;

    const messageRef = await addDoc(collection(db, "messages"), {
      conversationId,
      message,
      time: serverTimestamp(),
      userId: user.uid,
      ...(files && { files }),
    });

    const messageId = messageRef.id;

    const conversationRef = doc(db, "conversations", conversationId);

    await updateDoc(conversationRef, {
      messages: arrayUnion(messageId),
    });
    return {
      success: true,
      message: "Send message successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message.toString(),
    };
  }
};

export const getConversaionDetaiRealtime = (
  conversationId: string,
  callback: any,
  setData: any
) => {
  const conversationRef = doc(db, "conversations", conversationId);
  return onSnapshot(conversationRef, async (doc) => {
    const conversationDetail = await callback(doc.data());
    setData(conversationDetail);
  });
};

export const reactionMessageService = async (req: ReactMessageReq) => {
  try {
    const user = auth.currentUser as User;
    const { messageId, iconId, conversationId } = req;
    const messageRef = doc(db, "messages", messageId);
    await updateDoc(messageRef, {
      reactions: arrayUnion({
        userId: user.uid,
        iconId,
      }),
    });
    await updateDoc(doc(db, "conversations", conversationId), {
      reactionsCount: increment(1),
    });
    return {
      success: true,
      message: "Reaction to message successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message.toString(),
    };
  }
};

export const getConversationDetail = async (
  conversationDetail: any
): Promise<any> => {
  const user = auth.currentUser as User;
  const currentUserId = user.uid;

  const messagesById = conversationDetail?.messages;
  if (messagesById) {
    const messagesDetail = await Promise.all(
      messagesById.map(async (messageId: string) => {
        const messageRef = doc(db, "messages", messageId);
        const messageSnap = await getDoc(messageRef);
        const messageDetail = messageSnap.data();
        const userId = messageDetail?.userId;
        if (userId !== currentUserId) {
          const userRef = doc(db, "users", userId);
          const userSnap = await getDoc(userRef);
          const userDetail = userSnap.data();
          return { ...messageDetail, messageId, userDetail, self: false };
        } else {
          return {
            ...messageDetail,
            messageId,
            self: true,
          };
        }
      })
    );
    return {
      ...conversationDetail,
      messages: messagesDetail,
    };
  }
  return {
    ...conversationDetail,
    messages: [],
  };
};
