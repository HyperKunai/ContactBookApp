Contact Book Mobile Application
Overview

This project is a Contact Book mobile application developed using React Native as part of the Mobile Computing course.
The application allows users to create, edit, delete, and manage contacts while supporting offline-first functionality and data synchronization logic.

The system stores data locally using a mobile database and synchronizes changes when network connectivity is restored.

Features

The application includes the following functionality:

• Create new contacts
• Edit existing contacts
• Delete contacts
• View a list of contacts
• Local data persistence using a mobile database
• Offline-first functionality
• Network connectivity detection
• Automatic synchronization when internet connectivity returns
• Visual indicators for synchronization status
• Snackbar notifications for user actions

Technologies Used:

This project was built using the following technologies:

• React Native – mobile application framework
• TypeScript – typed JavaScript for safer development
• React Navigation – navigation between screens
• React Native Paper – UI component library
• Realm Database – local mobile database storage
• NetInfo – network connectivity detection

Application Architecture

The project follows a modular architecture separating concerns between UI components, application state, and database logic.

Main components:

Screens
ContactListScreen
ContactFormScreen
Components
ContactCard
ContactForm
State Management
React Context (ContactsContext)
Database Layer
Realm database for local persistence
Network Layer
NetInfo for connectivity monitoring
Offline-First Behavior
The application supports an offline-first architecture.

When the device is offline:

• Contacts can still be created, edited, or deleted
• Changes are stored locally in the database
• Contacts are marked as Pending Sync

When the device reconnects to the internet:

• The application detects network availability
• A synchronization process is triggered
• Pending contacts are marked as Synced

Project Structure:
src
 ├── components
 │   ├── ContactCard.tsx
 │   └── ContactForm.tsx
 │
 ├── screens
 │   ├── ContactListScreen.tsx
 │   └── ContactFormScreen.tsx
 │
 ├── context
 │   └── ContactsContext.tsx
 │
 └── db
     └── realm.ts

How to Run the Project:
Requirements:

The following tools must be installed:

• Node.js
• Android Studio
• Android SDK
• A physical Android device or Android emulator

Installation

Clone or download the project and run:

npm install
Run the Metro Server
npx react-native start
Run the Application

In another terminal:

npm run android

Demonstration:

The application demonstrates the following workflow:

Create contacts
Edit contacts
Delete contacts
Local database persistence
Offline data creation
Automatic synchronization when connectivity returns
Future Improvements
Potential improvements for the application include:

• Integration with a real backend API
• Cloud synchronization
• User authentication
• Contact search functionality
• Improved UI design and animations

Author:
Student Name: Edward A. Navarreto Lassalle
Course: Mobile Computing
Project: Contact Book Application