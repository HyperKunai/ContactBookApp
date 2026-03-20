import Realm from 'realm';

export type ContactRealmType = {
  _id: number;
  name: string;
  phone: string;
  email?: string;
  syncStatus: number;
};

const ContactSchema: Realm.ObjectSchema = {          //SchemaContact
  name: 'Contact',
  primaryKey: '_id',
  properties: {
    _id: 'int',
    name: 'string',
    phone: 'string',
    email: 'string?',
    syncStatus: {type: 'int', default: 0},
  },
};

let realmInstance: Realm | null = null;

export async function openRealm() {                           //Opens connection to db
  if (realmInstance && !realmInstance.isClosed) {
    return realmInstance;
  }

  realmInstance = await Realm.open({
    path: 'contactsRealm.realm',
    schema: [ContactSchema],
    schemaVersion: 2,
  });

  return realmInstance;
}

export async function readAllContacts() {                                             //Gets all contacts from db
  const realm = await openRealm();
  const contacts = realm.objects<ContactRealmType>('Contact').sorted('_id');

  return contacts.map(contact => ({
    id: contact._id.toString(),
    name: contact.name,
    phone: contact.phone,
    email: contact.email || '',
    syncStatus: contact.syncStatus,
  }));
}

export async function createContactRealm(contact: {
  name: string;
  phone: string;
  email: string;
}) {
  const realm = await openRealm();

  let newId = 1;

  realm.write(() => {
    const maxId = realm.objects<ContactRealmType>('Contact').max('_id');
    newId = typeof maxId === 'number' ? maxId + 1 : 1;

    realm.create('Contact', {
      _id: newId,
      name: contact.name,
      phone: contact.phone,
      email: contact.email || '',
      syncStatus: 1,
    });
  });

  return newId;
}

export async function updateContactRealm(
  id: string,
  updatedContact: {name: string; phone: string; email: string},
) {
  const realm = await openRealm();

  realm.write(() => {
    const contact = realm.objectForPrimaryKey<ContactRealmType>(
      'Contact',
      Number(id),
    );

    if (contact) {
      contact.name = updatedContact.name;
      contact.phone = updatedContact.phone;
      contact.email = updatedContact.email || '';
      contact.syncStatus = 1;
    }
  });
}

export async function deleteContactRealm(id: string) {
  const realm = await openRealm();

  realm.write(() => {
    const contact = realm.objectForPrimaryKey<ContactRealmType>(
      'Contact',
      Number(id),
    );

    if (contact) {
      realm.delete(contact);
    }
  });
}

export async function getUnsyncedContacts() {                   //gets unsynced contacts
  const realm = await openRealm();
  const contacts = realm
    .objects<ContactRealmType>('Contact')
    .filtered('syncStatus != 0');

  return contacts.map(contact => ({
    id: contact._id.toString(),
    name: contact.name,
    phone: contact.phone,
    email: contact.email || '',
    syncStatus: contact.syncStatus,
  }));
}

export async function markContactAsSynced(id: string) {          //marks contact as synced
  const realm = await openRealm();

  realm.write(() => {
    const contact = realm.objectForPrimaryKey<ContactRealmType>(
      'Contact',
      Number(id),
    );

    if (contact) {
      contact.syncStatus = 0;
    }
  });
}