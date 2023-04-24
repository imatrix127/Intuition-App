import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { collection, getDocs, orderBy, query, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { Ionicons } from '@expo/vector-icons';

const Contacts = ({ navigation }) => {
    const [contacts, setContacts] = useState([]);

    const signOut = () => {
        auth.signOut().then(() => {
            // Sign-out successful.
            navigation.replace('Login');
        }).catch((error) => {
            // An error happened.
        });
    };

    const openChatScreen = (i) => {
        const email1 = String(auth?.currentUser?.email);
        const email2 = String(contacts[i].email);

        let databaseName;
        if (email1 < email2) {
            databaseName = email1 + email2;
        } else {
            databaseName = email2 + email1;
        }
        const selectedUser = contacts[i].name;
        const ListOfData = [databaseName, selectedUser];

        navigation.navigate('Chat', { ListOfData });
    };

    const deleteConversation = async (email) => {
        const q = query(collection(db, 'Conversations'), orderBy('timestamp', 'desc'));
        const querySnapshot = await getDocs(q);
        const conversationPromises = [];

        querySnapshot.forEach((doc) => {
            if (doc.id.includes(email)) {
                conversationPromises.push(deleteDoc(doc.ref));
            }
        });

        await Promise.all(conversationPromises);
    };

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            ),
        });

        const unsubscribe = onSnapshot(collection(db, 'Contacts'), (snapshot) => {
            setContacts(snapshot.docs.map((doc) => ({
                id: doc.id,
                name: doc.data().name,
                avatar: doc.data().avatar,
                email: doc.data().email,
            })));
        });

        return unsubscribe;
    }, []);

    const renderContact = (contact, index) => (
        <View style={styles.contactContainer} key={index}>
            <TouchableOpacity style={styles.contactButton} onPress={() => openChatScreen(index)}>
                <Avatar rounded source={{ uri: contact.avatar }} />
                <Text style={styles.contactName}>{contact.name}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => {
                    Alert.alert(
                        'Delete Conversation',
                        'Are you sure you want to delete this conversation?',
                        [
                            {
                                text: 'Cancel',
                                style: 'cancel',
                            },
                            {
                                text: 'Delete',
                                onPress: () => {
                                    deleteConversation(contact.email);
                                },
                                style: 'destructive',
                            },
                        ],
                        { cancelable: false }
                    );
                }}
            >
                <Ionicons name="trash-outline" size={24} color="#fff" />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            {contacts.map((contact, index) => renderContact(contact, index))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    contactContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    contactName: {
        marginLeft: 10,
        fontSize: 16,
    },
    deleteButton: {
        backgroundColor: "#ff0000",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    deleteButtonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});

export default Contacts;