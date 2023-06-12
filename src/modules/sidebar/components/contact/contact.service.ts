import { User } from "@firebase/auth";
import { arrayRemove, deleteDoc, updateDoc } from "@firebase/firestore";
import {
  getDocs,
  collection,
  query,
  where,
  QueryDocumentSnapshot,
  DocumentData,
  getCountFromServer,
  getDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "@/shared/infra/firebase";

export const getListContactsService = async (): Promise<any> => {
  try {
    const user = auth.currentUser;
    const q = query(collection(db, "users"), where("email", "==", user?.email));
    const querySnapshot = await getDocs(q);
    let listContactsById: Array<any> = [];
    const listContacts: Array<any> = [];
    querySnapshot.forEach(async (_doc: QueryDocumentSnapshot<DocumentData>) => {
      listContactsById = _doc.data().contacts;
    });
    for (let i = 0; i < listContactsById.length; i++) {
      const userRef = doc(db, "users", listContactsById[i]);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        listContacts.push({
          id: docSnap.id,
          ...docSnap.data(),
        });
      }
    }

    return {
      success: true,
      message: "Get list contact successfully",
      listContacts,
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message.toString(),
    };
  }
};

export const getNumberOfApplicationsService = async (): Promise<any> => {
  try {
    const user = auth.currentUser;
    const q = query(collection(db, "users"), where("email", "==", user?.email));
    const querySnapshot = await getDocs(q);
    let id;
    querySnapshot.forEach(async (_doc: QueryDocumentSnapshot<DocumentData>) => {
      const { id: _id } = _doc;
      id = _id;
    });
    const qContacts = query(
      collection(db, "contacts"),
      where("reciever", "==", id)
    );
    const snapshot = await getCountFromServer(qContacts);
    const count = snapshot.data().count;

    return {
      success: true,
      message: "Get count of applications successfully",
      count,
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message.toString(),
    };
  }
};

export const deleteContactService = async (userId: string): Promise<any> => {
  try {
    const user: User | null = auth.currentUser;
    if (!user) {
      return {
        success: false,
        message: "Something wrong. Please try again",
      };
    }
    await updateDoc(doc(db, "users", userId), {
      contacts: arrayRemove(user.uid),
    });

    await updateDoc(doc(db, "users", user.uid), {
      contacts: arrayRemove(userId),
    });
    const qApplications = query(
      collection(db, "contacts"),
      where("reciever", "==", user.uid)
    );
    const queryApplicationsSnapshot = await getDocs(qApplications);
    queryApplicationsSnapshot.forEach(
      async (_doc: QueryDocumentSnapshot<DocumentData>) => {
        if (_doc.data().sender === userId) {
          await deleteDoc(doc(db, "contacts", _doc.id));
        }
      }
    );
    return {
      success: true,
      message: "Remove contact successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message.toString(),
    };
  }
};
