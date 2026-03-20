import React from 'react';
import {View, StyleSheet} from 'react-native';
import ContactForm from '../components/ContactForm';
import {useContactsContext} from '../context/ContactsContext';

function ContactFormScreen({navigation, route}: any): React.JSX.Element {
  const {addContact, editContact} = useContactsContext();

  const existingContact = route?.params?.contact;

  const handleSubmit = async (contact: {
    name: string;
    phone: string;
    email: string;
  }) => {
    if (existingContact) {
      await editContact(existingContact.id, contact);
    } else {
      await addContact(contact);
    }

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ContactForm contact={existingContact} onSubmit={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ContactFormScreen;