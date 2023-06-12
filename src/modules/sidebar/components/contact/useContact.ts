import { getContactAction, selectContact } from "./contactSlice";
import {
  getAllApplicationsAction,
  selectApplications,
} from "./applications/applicationsSlice";
import { useAppDispatch, useAppSelector } from "@/shared/infra/redux/hooks";
import {
  getNumberOfApplicationsService,
  deleteContactService,
} from "./contact.service";
import { useState, useEffect, useCallback } from "react";
import _ from "lodash";
import { loadingState } from "@/shared/constants/loadingState";

const aToZArray = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "#",
];

export const useContact = () => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<loadingState>("IDLE");
  const [count, setCount] = useState<number | undefined>();
  const dispatch = useAppDispatch();

  const [contactLoading, setContactLoading] = useState<loadingState>("IDLE");
  const [searchedContacts, setSearchedContacts] = useState<any>([]);

  const applicationsState = useAppSelector(selectApplications);
  const { applications } = applicationsState;
  const contactState = useAppSelector(selectContact);
  const { contacts, loadingState } = contactState;
  const [convertedContacts, setConvertedContacts] = useState<Array<any>>([]);

  useEffect(() => {
    dispatch(getAllApplicationsAction());
  }, []);

  useEffect(() => {
    const getCountOfApplications = async () => {
      setLoading("LOADING");
      const response = await getNumberOfApplicationsService();
      if (response && response.success) {
        setCount(response.count);
      } else {
        setError("Something wrong: " + response.message);
      }
      setLoading("COMPLETE");
    };
    getCountOfApplications();
  }, []);

  useEffect(() => {
    dispatch(getContactAction());
  }, [dispatch]);

  useEffect(() => {
    if (loadingState === "COMPLETE") {
      setContactLoading(loadingState);
      setConvertedContacts(converterContacts(contacts));
      setSearchedContacts(converterContacts(contacts));
    }
  }, [contactState]);

  const converterContacts = (contacts: Array<any>) => {
    const convertedContacts = aToZArray.map((character: string) => {
      const listByCharacter: Array<any> = [];
      contacts?.forEach((contact: any) => {
        if (character !== "#") {
          if (contact?.name[0].toLowerCase() === character) {
            listByCharacter.push(contact);
          }
        } else {
          if (
            !contact?.name[0].toLowerCase().match(/[a-z]/i) ||
            !contact.name
          ) {
            listByCharacter.push(contact);
          }
        }
      });
      return {
        character,
        listByCharacter,
      };
    });
    return convertedContacts;
  };

  const handleSearchContacts = useCallback(
    _.debounce((keyword: string) => {
      const searchedContacts = contacts.filter((contact: any) => {
        return contact.name.toLowerCase().includes(keyword.toLowerCase());
      });
      setSearchedContacts(converterContacts(searchedContacts));
    }),
    [contactState]
  );

  const handleDeleteContact = async (userId: string) => {
    await deleteContactService(userId);
    dispatch(getContactAction());
  };

  const data = {
    error,
    loading,
    count: applications.filter(
      (application: any) => application.status === "PENDING"
    ).length,
    contactLoading,
    contacts: [],
    convertedContacts,
    searchedContacts,
  };
  const methods = {
    handleSearchContacts,
    converterContacts,
    handleDeleteContact,
  };
  return {
    data,
    methods,
  };
};
