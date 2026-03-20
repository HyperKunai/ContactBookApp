import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider as PaperProvider} from 'react-native-paper';

import ContactListScreen from './src/screens/ContactListScreen';
import ContactFormScreen from './src/screens/ContactFormScreen';
import {ContactsProvider} from './src/context/ContactsContext';

const Stack = createStackNavigator();

function App(): React.JSX.Element {
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <ContactsProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="ContactList">
              <Stack.Screen
                name="ContactList"
                component={ContactListScreen}
                options={{title: 'Contacts'}}
              />
              <Stack.Screen
                name="ContactForm"
                component={ContactFormScreen}
                options={({route}: any) => ({
                  title: route.params?.contact
                    ? 'Edit Contact'
                    : 'Add Contact',
                })}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </ContactsProvider>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

export default App;