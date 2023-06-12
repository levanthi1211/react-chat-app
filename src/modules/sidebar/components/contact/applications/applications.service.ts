import {
  getDocs,
  collection,
  query,
  where,
  QueryDocumentSnapshot,
  DocumentData,
  getDoc,
  doc,
  updateDoc,
  addDoc,
  arrayUnion,
} from "firebase/firestore";
import { auth, db } from "@/shared/infra/firebase";

export interface RejectRequestReq {
  sender: string;
}

export interface AcceptRequestReq {
  sender: string;
}

export const getAllApplicationsService = async (): Promise<any> => {
  try {
    const user = auth.currentUser;
    const applications: any[] = [];
    if (!user) {
      return {
        success: false,
        message: "Something wrong. Please try again",
      };
    }

    const qApplications = query(
      collection(db, "applications"),
      where("reciever", "==", user?.uid)
    );
    const queryApplicationsSnapshot = await getDocs(qApplications);
    queryApplicationsSnapshot.forEach(
      async (_doc: QueryDocumentSnapshot<DocumentData>) => {
        applications.push(_doc.data());
      }
    );

    console.log(applications);

    const applicationUsers = await Promise.all(
      applications.map(async (application) => {
        const docRef = doc(db, "users", application.sender);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          return {
            ...docSnap.data(),
            id: application.sender,
            status: application.status,
            message: application.invitationMessage,
          };
        }
      })
    );

    return {
      success: true,
      message: "Get Applications successfully",
      data: {
        applications: applicationUsers,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message.toString(),
    };
  }
};

export const rejectRequestService = async (
  req: RejectRequestReq
): Promise<any> => {
  try {
    const { sender } = req;
    const user = auth.currentUser;

    const q = query(
      collection(db, "applications"),
      where("sender", "==", sender),
      where("reciever", "==", user?.uid)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (_doc: QueryDocumentSnapshot<DocumentData>) => {
      const { id } = _doc;
      await updateDoc(doc(db, "applications", id), {
        status: "REJECT",
      });
    });

    return {
      success: true,
      message: "Reject request successfully",
      sender: sender,
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message.toString(),
    };
  }
};

export const acceptRequestService = async (
  req: AcceptRequestReq
): Promise<any> => {
  try {
    const { sender } = req;
    const user = auth.currentUser;
    const qCurrentUser = query(
      collection(db, "users"),
      where("email", "==", user?.email)
    );
    const queryCurrentUserSnapshot = await getDocs(qCurrentUser);

    let id: string | undefined;
    queryCurrentUserSnapshot.forEach(
      async (_doc: QueryDocumentSnapshot<DocumentData>) => {
        const { id: _id } = _doc;
        id = _id;
      }
    );

    const q = query(
      collection(db, "applications"),
      where("sender", "==", sender),
      where("reciever", "==", user?.uid)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (_doc: QueryDocumentSnapshot<DocumentData>) => {
      const { id } = _doc;
      await updateDoc(doc(db, "applications", id), {
        status: "ACCEPT",
      });
    });
    await updateDoc(doc(db, "users", sender), {
      contacts: arrayUnion(id),
    });

    await updateDoc(doc(db, "users", `${id}`), {
      contacts: arrayUnion(sender),
    });

    return {
      success: true,
      message: "Accept request successfully",
      sender: sender,
    };
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message.toString(),
    };
  }
};
