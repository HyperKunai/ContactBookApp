import React, {createContext, useContext, useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {
  openRealm,
  readAllContacts,
  createContactRealm,
  updateContactRealm,
  deleteContactRealm,
  getUnsyncedContacts,
  markContactAsSynced,
} from '../db/realm';

export type Contact = {
  id: string;
  name: string;
  phone: string;
  email: string;
  syncStatus?: number;
};

type ContactsContextType = {
  contacts: Contact[];
  isOnline: boolean;
  isSyncing: boolean;
  snackbarVisible: boolean;
  snackbarMessage: string;
  showSnackbar: (message: string) => void;
  hideSnackbar: () => void;
  addContact: (contact: Omit<Contact, 'id'>) => Promise<void>;
  editContact: (
    id: string,
    updatedContact: Omit<Contact, 'id'>,
  ) => Promise<void>;
  removeContact: (id: string) => Promise<void>;
  refreshContacts: () => Promise<void>;
  triggerSync: () => Promise<void>;
};

const ContactsContext = createContext<ContactsContextType | undefined>(undefined);  //Create Contexto

export function ContactsProvider({children}: {children: React.ReactNode}) {         // Use States
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isOnline, setIsOnline] = useState(false);            
  const [isSyncing, setIsSyncing] = useState(false);

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarVisible(true);
  };

  const hideSnackbar = () => {
    setSnackbarVisible(false);
  };

  const refreshContacts = async () => {
    const allContacts = await readAllContacts();
    setContacts(allContacts);
  };

  const triggerSync = async () => {                                //Sync
    setIsSyncing(true);

    try {
      const unsyncedContacts = await getUnsyncedContacts();

      for (const contact of unsyncedContacts) {
        console.log('Syncing contact to server:', contact.name);

        await new Promise<void>(resolve => setTimeout(resolve, 500));

        await markContactAsSynced(contact.id);
      }

      await refreshContacts();

      if (unsyncedContacts.length > 0) {
        showSnackbar('Contacts synced');
      }
    } catch (error) {
      console.log('Sync error:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      await openRealm();
      await refreshContacts();
    };

    init();

    const unsubscribe = NetInfo.addEventListener(state => {                 //Internet Detect
      const connected = !!state.isConnected;
      setIsOnline(connected);

      if (connected) {
        triggerSync();
      }
    });

    return () => unsubscribe();
  }, []);

  const addContact = async (contact: Omit<Contact, 'id'>) => {        //Funciones CRUD
    await createContactRealm(contact);
    await refreshContacts();
    showSnackbar('Contact saved');
  };

  const editContact = async (
    id: string,
    updatedContact: Omit<Contact, 'id'>,
  ) => {
    await updateContactRealm(id, updatedContact);
    await refreshContacts();
    showSnackbar('Contact updated');
  };

  const removeContact = async (id: string) => {
    await deleteContactRealm(id);
    await refreshContacts();
    showSnackbar('Contact deleted');
  };

  return (
    <ContactsContext.Provider
      value={{
        contacts,
        isOnline,
        isSyncing,
        snackbarVisible,
        snackbarMessage,
        showSnackbar,
        hideSnackbar,
        addContact,
        editContact,
        removeContact,
        refreshContacts,
        triggerSync,
      }}>
      {children}
    </ContactsContext.Provider>
  );
}

export function useContactsContext() {
  const context = useContext(ContactsContext);

  if (!context) {
    throw new Error('useContactsContext must be used inside ContactsProvider');
  }

  return context;
}