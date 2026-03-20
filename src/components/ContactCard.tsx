import React from 'react';
import {Card, Text, Avatar, IconButton, Chip} from 'react-native-paper';
import {Contact} from '../context/ContactsContext';

type ContactCardProps = {
  contact: Contact;
  onEdit: () => void;
  onDelete: () => void;
};

function ContactCard({
  contact,
  onEdit,
  onDelete,
}: ContactCardProps): React.JSX.Element {
  return (
    <Card style={{marginBottom: 12}}>
      <Card.Title
        title={contact.name}
        subtitle={contact.phone}
        left={(props) => (
          <Avatar.Text
            {...props}
            label={contact.name ? contact.name[0].toUpperCase() : '?'}
          />
        )}
      />

      <Card.Content>
        {contact.email ? <Text>Email: {contact.email}</Text> : null}

        {contact.syncStatus === 1 ? (
          <Chip icon="cloud-off-outline" style={{marginTop: 10, alignSelf: 'flex-start'}}>
            Pending Sync
          </Chip>
        ) : (
          <Chip icon="cloud-check-outline" style={{marginTop: 10, alignSelf: 'flex-start'}}>
            Synced
          </Chip>
        )}
      </Card.Content>

      <Card.Actions>
        <IconButton icon="pencil" onPress={onEdit} />
        <IconButton icon="delete" onPress={onDelete} />
      </Card.Actions>
    </Card>
  );
}

export default ContactCard;