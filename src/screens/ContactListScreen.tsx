import React from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { FAB, Text, Surface, Snackbar } from 'react-native-paper';
import ContactCard from '../components/ContactCard';
import { useContactsContext } from '../context/ContactsContext';

function ContactListScreen({ navigation }: any): React.JSX.Element {
  const {
    contacts,
    removeContact,
    isOnline,
    isSyncing,
    snackbarVisible,
    snackbarMessage,
    hideSnackbar,
  } = useContactsContext();

  const handleDelete = (id: string, name: string) => {
    Alert.alert(
      'Delete Contact',
      `Are you sure you want to delete ${name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => await removeContact(id),
        },
      ],
    );
  };

  const getBannerText = () => {                          //Banner
    if (!isOnline) {
      return 'Offline - changes will sync later';
    }

    if (isSyncing) {
      return 'Online - syncing contacts...';
    }

    return 'Online - all changes synced';
  };

  const getBannerStyle = () => {
    if (!isOnline) {
      return styles.offlineBanner;
    }

    if (isSyncing) {
      return styles.syncingBanner;
    }

    return styles.onlineBanner;
  };

  const getBannerTextStyle = () => {
    if (!isOnline) {
      return styles.offlineBannerText;
    }

    if (isSyncing) {
      return styles.syncingBannerText;
    }

    return styles.onlineBannerText;
  };

  return (
    <View style={styles.container}>
      <Surface style={[styles.statusBanner, getBannerStyle()]} elevation={1}>
        <Text style={[styles.bannerText, getBannerTextStyle()]}>
          {getBannerText()}
        </Text>
      </Surface>

      <FlatList                                             //Render Contacts
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ContactCard
            contact={item}
            onEdit={() => navigation.navigate('ContactForm', { contact: item })}
            onDelete={() => handleDelete(item.id, item.name)}
          />
        )}
        contentContainerStyle={styles.list}
      />

      <FAB                                                 //Add contact button
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('ContactForm')}
      />

      <Snackbar
        visible={snackbarVisible}
        onDismiss={hideSnackbar}
        duration={2500}>
        {snackbarMessage}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBanner: {
    padding: 12,
    margin: 12,
    borderRadius: 10,
  },
  bannerText: {
    fontWeight: 'bold',
  },
  offlineBanner: {
    backgroundColor: '#ffdddd',
  },
  syncingBanner: {
    backgroundColor: '#fff4cc',
  },
  onlineBanner: {
    backgroundColor: '#ddffdd',
  },
  list: {
    paddingHorizontal: 12,
    paddingBottom: 100,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },

  offlineBannerText: {
    color: '#8b0000',
  },
  syncingBannerText: {
    color: '#8a6d00',
  },
  onlineBannerText: {
    color: '#0a5c2f',
  },

});

export default ContactListScreen;