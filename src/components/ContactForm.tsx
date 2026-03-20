import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput, Button, HelperText} from 'react-native-paper';

type ContactFormProps = {
  contact?: {
    name?: string;
    phone?: string;
    email?: string;
  };
  onSubmit: (contact: {name: string; phone: string; email: string}) => void;
};

function ContactForm({
  contact = {},
  onSubmit,
}: ContactFormProps): React.JSX.Element {
  const [name, setName] = useState(contact.name || '');
  const [phone, setPhone] = useState(contact.phone || '');
  const [email, setEmail] = useState(contact.email || '');

  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const handleSave = () => {
    const isNameEmpty = name.trim() === '';
    const isPhoneEmpty = phone.trim() === '';

    setNameError(isNameEmpty);
    setPhoneError(isPhoneEmpty);

    if (isNameEmpty || isPhoneEmpty) {
      return;
    }

    onSubmit({
      name,
      phone,
      email,
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Name"
        value={name}
        onChangeText={(text) => {
          setName(text);
          if (text.trim() !== '') {
            setNameError(false);
          }
        }}
        mode="outlined"
        style={styles.input}
        error={nameError}
      />
      {nameError && (
        <HelperText type="error" visible={true}>
          Name is required
        </HelperText>
      )}

      <TextInput
        label="Phone"
        value={phone}
        onChangeText={(text) => {
          setPhone(text);
          if (text.trim() !== '') {
            setPhoneError(false);
          }
        }}
        mode="outlined"
        keyboardType="phone-pad"
        style={styles.input}
        error={phoneError}
      />
      {phoneError && (
        <HelperText type="error" visible={true}>
          Phone is required
        </HelperText>
      )}

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        keyboardType="email-address"
        style={styles.input}
      />

      <Button mode="contained" onPress={handleSave} style={styles.button}>
        Save Contact
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    marginBottom: 6,
  },
  button: {
    marginTop: 12,
  },
});

export default ContactForm;